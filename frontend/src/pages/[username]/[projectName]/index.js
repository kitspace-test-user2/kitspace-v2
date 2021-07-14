// TODO: this page became monolithic, it needs global refactoring.
import React, { useEffect, useState, useContext } from 'react'
import { arrayOf, bool, objectOf, string, object, number } from 'prop-types'
import { useRouter } from 'next/router'
import { uniqBy } from 'lodash'
import {
  Button,
  Form,
  Input,
  Loader,
  Message,
  Segment,
  TextArea,
} from 'semantic-ui-react'

import Page from '@components/Page'
import useForm from '@hooks/useForm'
import ProjectUpdateFormModel from '@models/ProjectUpdateForm'
import { useMigrationStatus, useDefaultBranchFiles, useRepo } from '@hooks/Gitea'
import { commitFiles } from '@utils/giteaInternalApi'
import {
  canCommit,
  getDefaultBranchFiles,
  getRepo,
  repoExists,
  updateRepo,
} from '@utils/giteaApi'
import { findReadme, renderReadme } from '@utils/index'
import {
  getBoardBomInfo,
  getBoardGerberInfo,
  getKitspaceYAMLJson,
  hasInteractiveBom,
  processedKitspaceYaml,
} from '@utils/projectPage'
import { AuthContext } from '@contexts/AuthContext'
import ErrorPage from '@pages/_error'
import BoardShowcase from '@components/Board/BoardShowcase'
import BoardExtraMenus from '@components/Board/BoardExtrasMenu'
import OrderPCBs from '@components/Board/OrderPCBs'
import BuyParts from '@components/Board/BuyParts/index'
import InfoBar from '@components/Board/InfoBar'
import Readme from '@components/Board/Readme'
import UploadModal from '@components/UploadModal'
import useKitspaceYAML from '@hooks/useKitspaceYAML'

export const getServerSideProps = async ({ params, query, req }) => {
  const processorUrl = process.env.KITSPACE_PROCESSOR_URL
  // `repoFullname` is resolved by matching its name against the `page` dir.
  // Then it's used to access the repo by the Gitea API.
  const repoFullname = `${params.username}/${params.projectName}`
  const assetsPath = `${processorUrl}/files/${repoFullname}/HEAD`

  // The repo owner and collaborators can upload files.
  const hasUploadPermission = await canCommit(
    repoFullname,
    req?.session?.user?.username,
  )

  if (await repoExists(repoFullname)) {
    const repo = await getRepo(repoFullname)
    const repoFiles = await getDefaultBranchFiles(repoFullname)

    // TODO: ALL assets aren't available for the repos which are being processed,
    // or the repos that don't have assets from first place.
    // This should be handled properly currently, it breaks the page.
    const [gerberInfoExists, gerberInfo] = await getBoardGerberInfo(assetsPath)
    const [boardBomInfoExists, boardBomInfo] = await getBoardBomInfo(assetsPath)
    const [kitspaceYAMLExists, kitspaceYAML] = await getKitspaceYAMLJson(assetsPath)
    const finishedProcessing = await processedKitspaceYaml(repoFullname)

    const { zipPath, width, height, layers } = gerberInfo
    const zipUrl = `${assetsPath}/${zipPath}`

    const readmeFile = findReadme(repoFiles)
    const renderedReadme = await renderReadme(repoFullname, readmeFile)

    const hasIBOM = await hasInteractiveBom(repoFullname)

    return {
      props: {
        repo,
        hasUploadPermission,
        repoFiles,
        hasIBOM,
        kitspaceYAML,
        zipUrl,
        boardBomInfo,
        boardSpecs: { width, height, layers },
        renderedReadme,
        isSynced: repo?.mirror,
        // Whether the project were empty or not at the time of requesting the this page from the server.
        isEmpty: repo?.empty,
        user: params.username,
        projectName: params.projectName,
        isNew: query.create === 'true',
        boardAssetsExist: gerberInfoExists && boardBomInfoExists,
        readmeExists: readmeFile !== '',
        kitspaceYAMLExists,
        finishedProcessing,
      },
    }
  }
  return { notFound: true }
}

const UpdateProject = props => {
  const { full_name: projectFullname } = props.repo
  const { reload } = useRouter()
  const title = `${props.projectName} on Kitspace`
  const {
    repo: project,
    isLoading,
    isError,
  } = useRepo(projectFullname, {
    initialData: props.repo,
  })

  // If the repo is migrating, poll for update every second, otherwise use default config.
  const { status } = useMigrationStatus(props.repo.id, props.isEmpty, {
    refreshInterval: 1000,
  })

  const { isError: isProcessingKitspaceYaml } = useKitspaceYAML(
    projectFullname,
    !props.finishedProcessing,
    {
      refreshInterval: 1000,
    },
  )
  const [isSyncing, setIsSyncing] = useState(props.isEmpty)

  useEffect(() => {
    setIsSyncing(status === 'Queue' || status === 'Running')

    if (props.isEmpty && !props.isSynced && status === 'Finished') {
      reload()
    }
  }, [status, props.isEmpty, props.isSynced, reload])

  if (isLoading) {
    return (
      <Page title={title}>
        <Loader active />
      </Page>
    )
  }
  if (isSyncing) {
    return (
      <Page title={title}>
        <Loader active>Syncing repository...</Loader>
      </Page>
    )
  }

  if (isProcessingKitspaceYaml) {
    return (
      <Page title={title}>
        <Loader active>Processing Repo...</Loader>
      </Page>
    )
  }
  if (status === 'Failed') {
    return (
      <Page title={title}>
        <Loader active>Migration Failed, please try again later!</Loader>
      </Page>
    )
  }
  if (isError) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Page title={title}>
      {props.isSynced && props.hasUploadPermission ? (
        <Message data-cy="sync-msg" color="yellow">
          <Message.Header>A synced repository!</Message.Header>
          <Message.Content>
            <p>Files uploading isn&apos;t supported for synced repositories.</p>
            Please commit files to the original git repository and it will be synced
            automatically.
          </Message.Content>
        </Message>
      ) : null}
      <UpdateForm
        {...props}
        projectFullname={projectFullname}
        description={project?.description}
        previewOnly={props.isSynced}
        url={project?.original_url}
        owner={props.user}
        name={props.projectName}
      />
    </Page>
  )
}

const UpdateForm = ({
  repoFiles,
  hasUploadPermission,
  hasIBOM,
  kitspaceYAML,
  boardBomInfo,
  zipUrl,
  renderedReadme,
  boardSpecs,
  isNew,
  previewOnly,
  owner,
  name,
  description,
  projectFullname,
  url,
  boardAssetsExist,
  readmeExists,
  kitspaceYAMLExists,
}) => {
  // The files in the Gitea repo associated with this project and the newly loaded files
  const {
    files: remoteFiles,
    isLoading,
    mutate,
  } = useDefaultBranchFiles(projectFullname, { initialData: repoFiles })
  // Details(name, path, last_modified, etc...) for files dropped in the update page
  const [newlyUploadedDetails, setNewlyUploadedDetails] = useState([])
  const [allFiles, setAllFiles] = useState([])
  const [isValidProjectName, setIsValidProjectName] = useState(false)
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const { csrf, user } = useContext(AuthContext)
  const { form, onChange, populate, isValid, formatErrorPrompt } = useForm(
    ProjectUpdateFormModel,
  )
  const [canUpload, setCanUpload] = useState(hasUploadPermission && !previewOnly)

  const submit = async e => {
    e.preventDefault()
    setLoading(true)

    const updatedSuccessfully = await updateRepo(
      projectFullname,
      { name: form.name, description: form.description },
      csrf,
    )

    // If the user changed the project name redirect to the new project page
    if (updatedSuccessfully) {
      if (name !== `${owner}/${form.name}`) {
        await push(`/${owner}/${form.name}`)
      }
      setLoading(false)
    }
  }

  const onDrop = async files => {
    setNewlyUploadedDetails(files)

    const committedSuccessfully = await commitFiles({
      repo: projectFullname,
      files,
      csrf,
    })
    if (committedSuccessfully) {
      // After uploading the files successfully, revalidate the files from gitea, and clear `newlyUploadedDetails`
      mutate().then(mutatedFiles => {
        setNewlyUploadedDetails([])
        setAllFiles(mutatedFiles)
      })
    }
  }

  const formatProjectNameError = () => {
    // disjoint form validation errors, e.g, maximum length, not empty, etc, with conflicting project name errors
    const formErrors = formatErrorPrompt('name')

    if (formErrors) {
      return formErrors
    }
    return !isValidProjectName
      ? {
          content: `A project named "${form.name}" already exists!`,
          pointing: 'below',
        }
      : null
  }

  // Set values of the form as the values of the project stored in the Gitea repo
  useEffect(() => {
    populate({ name, description })
  }, [name, description, populate])

  useEffect(() => {
    // Handle client side rendering for uploading permissions,
    // `canUpload` previously relied on `hasUploadPermission` which is only provided in SSR mode.
    if (!hasUploadPermission) {
      canCommit(projectFullname, user?.username).then(res => {
        setCanUpload(res && !previewOnly)
      })
    }
  }, [user, projectFullname, hasUploadPermission, previewOnly])

  // A disjoint between the newly uploaded files(waiting for submission) and the files
  // on the Gitea repo for this project
  useEffect(() => {
    setAllFiles(uniqBy([...remoteFiles, ...newlyUploadedDetails], 'name'))
  }, [remoteFiles, newlyUploadedDetails])

  useEffect(() => {
    const validateProjectName = async () => {
      // Check if the new name will cause a conflict.
      const repoFullname = `${owner}/${form.name}`

      // If the project name hasn't changed it's valid
      if (repoFullname === `${owner}/${name}`) {
        setIsValidProjectName(isValid)
      } else if (!(await repoExists(repoFullname))) {
        // Otherwise check if there's no repo with same name
        setIsValidProjectName(isValid)
      } else {
        setIsValidProjectName(false)
      }
    }

    if (form.name) {
      validateProjectName()
    }
  }, [form.name, isValid, name, owner])

  if (isLoading) return <Loader active />

  return (
    <>
      <InfoBar
        name={name}
        url={url}
        site={kitspaceYAML?.site}
        description={kitspaceYAML?.summary || description}
      />
      <div>
        {canUpload && (
          <UploadModal
            kitspaceYAMLExists={kitspaceYAMLExists}
            files={allFiles}
            kitspaceYAML={kitspaceYAML}
            projectFullname={projectFullname}
            onDrop={onDrop}
          />
        )}
        {boardAssetsExist ? (
          <>
            <BoardShowcase projectFullname={projectFullname} />
            <BoardExtraMenus
              projectFullname={projectFullname}
              hasInteractiveBom={hasIBOM}
              zipUrl={zipUrl}
            />
          </>
        ) : (
          <AssetPlaceholder asset="board" />
        )}
      </div>
      <div>
        {boardAssetsExist ? (
          <>
            <OrderPCBs
              projectFullname={projectFullname}
              zipUrl={zipUrl}
              boardSpecs={boardSpecs}
            />
            <BuyParts
              projectFullName={projectFullname}
              lines={boardBomInfo?.bom?.lines}
              parts={boardBomInfo?.bom?.parts}
            />
          </>
        ) : (
          <AssetPlaceholder asset="bill of materials" />
        )}
      </div>
      <div>
        {readmeExists ? (
          <Readme renderedReadme={renderedReadme} />
        ) : (
          <AssetPlaceholder asset="readme" />
        )}
      </div>
      {canUpload && (
        <Form>
          <Segment>
            <Form.Field
              data-cy="update-form-name"
              fluid
              required
              readOnly={previewOnly}
              control={Input}
              label="Project name"
              placeholder="Project name"
              name="name"
              value={form.name || ''}
              onChange={onChange}
              error={formatProjectNameError('name')}
            />
            <Form.Field
              data-cy="update-form-description"
              readOnly={previewOnly}
              control={TextArea}
              label="Project description"
              placeholder="Project description"
              name="description"
              value={form.description || ''}
              onChange={onChange}
              error={formatErrorPrompt('description')}
            />
            <Form.Field
              data-cy="update-form-submit"
              fluid
              control={Button}
              content={isNew ? 'Create' : 'Update'}
              disabled={previewOnly || !isValidProjectName || loading}
              onClick={submit}
              positive
              loading={loading}
            />
          </Segment>
        </Form>
      )}
    </>
  )
}

const AssetPlaceholder = ({ asset }) => (
  <div
    style={{
      width: '70%',
      margin: 'auto',
      textAlign: 'center',
      padding: '5em',
      borderStyle: 'dashed',
      borderRadius: '0.8em',
    }}
  >
    No {asset} files were found, upload some.
  </div>
)

UpdateForm.propTypes = {
  repoFiles: arrayOf(object).isRequired,
  hasUploadPermission: bool.isRequired,
  hasIBOM: bool.isRequired,
  kitspaceYAML: objectOf(string).isRequired,
  boardBomInfo: object.isRequired,
  zipUrl: string.isRequired,
  renderedReadme: string.isRequired,
  boardSpecs: objectOf(number).isRequired,
  isNew: bool.isRequired,
  previewOnly: bool.isRequired,
  owner: string.isRequired,
  name: string.isRequired,
  description: string.isRequired,
  projectFullname: string.isRequired,
  url: string.isRequired,
  boardAssetsExist: bool.isRequired,
  readmeExists: bool.isRequired,
  kitspaceYAMLExists: bool.isRequired,
}

UpdateProject.propTypes = {
  repo: object.isRequired,
  user: string.isRequired,
  projectName: string.isRequired,
  isEmpty: bool.isRequired,
  isSynced: bool.isRequired,
  hasUploadPermission: bool.isRequired,
}

AssetPlaceholder.propTypes = {
  asset: string.isRequired,
}

export default UpdateProject
