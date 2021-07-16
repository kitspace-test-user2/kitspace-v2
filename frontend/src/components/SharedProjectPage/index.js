import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Loader, Message } from 'semantic-ui-react'

import Page from '@components/Page'
import { useMigrationStatus, useRepo } from '@hooks/Gitea'
import ErrorPage from '@pages/_error'
import useKitspaceYAML from '@hooks/useKitspaceYAML'
import PageElements from './elements'

const SharedProjectPage = props => {
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
        <Loader active>Processing repository...</Loader>
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
      <PageElements
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

export default SharedProjectPage
