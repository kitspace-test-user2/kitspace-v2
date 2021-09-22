import React from 'react'

import { canCommit, getRepo, repoExists } from '@utils/giteaApi'
import {
  getBoardBomInfo,
  getBoardGerberInfo,
  getKitspaceYAMLJson,
  hasInteractiveBom,
  getIsProcessingDone,
  getReadme,
} from '@utils/projectPage'
import SharedProjectPage from '@components/SharedProjectPage'
import ErrorPage from '@pages/_error'

const MultiProjectPage = props =>
  props.notFound ? <ErrorPage statusCode={404} /> : <SharedProjectPage {...props} />

MultiProjectPage.getInitialProps = async ({ asPath, query, req }) => {
  const processorUrl = process.env.KITSPACE_PROCESSOR_URL
  // `repoFullname` is resolved by matching its name against the `page` dir.
  // Then it's used to access the repo by the Gitea API.
  const [ignored, username, projectName, multiProjectName] = asPath.split('/')

  const repoFullname = `${username}/${projectName}`

  const kitspaceYAMLPath = `${processorUrl}/files/${repoFullname}/HEAD`
  const assetsPath = `${processorUrl}/files/${repoFullname}/HEAD/${multiProjectName}`
  const session = req?.session ?? window?.session

  if (await repoExists(repoFullname)) {
    const [
      repo,
      readme,
      [boardBomInfoExists, boardBomInfo],
      [gerberInfoExists, gerberInfo],
      [kitspaceYAMLExists, kitspaceYAML],
      finishedProcessing,
      hasIBOM,
      hasUploadPermission,
    ] = await Promise.all([
      getRepo(repoFullname),
      getReadme(assetsPath),
      getBoardBomInfo(assetsPath),
      getBoardGerberInfo(assetsPath),
      getKitspaceYAMLJson(kitspaceYAMLPath),
      getIsProcessingDone(assetsPath),
      hasInteractiveBom(assetsPath),
      // The repo owner and collaborators can upload files.
      canCommit(repoFullname, session?.user?.username),
    ])

    const projectKitspaceYAML = kitspaceYAML.multi[multiProjectName]

    const { zipPath, width, height, layers } = gerberInfo
    const zipUrl = `${assetsPath}/${zipPath}`

    if (!projectKitspaceYAML) {
      // If there is not multiproject as specified in the url `{username}/{projectName}/{multiProjectName}`
      return { notFound: true }
    }

    return {
      assetsPath,
      repo,
      projectFullname: repoFullname,
      hasUploadPermission,
      hasIBOM,
      kitspaceYAML: projectKitspaceYAML,
      zipUrl,
      boardBomInfo,
      boardSpecs: { width, height, layers },
      readme,
      isSynced: repo?.mirror,
      // Whether the project were empty or not at the time of requesting the this page from the server.
      isEmpty: repo?.empty,
      user: username,
      projectName: multiProjectName,
      isNew: query.create === 'true',
      boardAssetsExist: gerberInfoExists && boardBomInfoExists,
      readmeExists: readme !== null,
      kitspaceYAMLExists,
      finishedProcessing,
      description: projectKitspaceYAML?.summary || repo?.description,
      originalUrl: repo?.original_url,
    }
  }

  return { notFound: true }
}

export default MultiProjectPage
