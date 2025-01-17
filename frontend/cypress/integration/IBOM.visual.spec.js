import faker from 'faker'

import { getFakeUsername } from '../support/getFakeUsername'

describe('Regression test for IBOM ', () => {
  it(
    'should match the existing snapshot for the IBOM',
    { browser: 'electron' },
    () => {
      const username = getFakeUsername()
      const email = faker.unique(faker.internet.email)
      const password = '123456'

      const repoName = 'CH330_Hardware'
      const syncedRepoUrl = 'https://github.com/kitspace-forks/CH330_Hardware'

      cy.createUser(username, email, password)
      cy.visit('/login')
      cy.signIn(username, password)
      cy.get('[data-cy=user-menu]')

      cy.forceVisit('/projects/new')

      // Migrate the repo
      cy.get('[data-cy=sync-field]').type(syncedRepoUrl)
      cy.get('button').contains('Sync').click()

      // Wait for redirection for project page
      cy.url({ timeout: 60_000 }).should('contain', `${username}/${repoName}`)
      // Wait for the repo to finish processing, by checking the visibility of info-bar.
      cy.get('[data-cy=info-bar]', { timeout: 60_000 }).should('be.visible')

      cy.visit(`${username}/${repoName}/IBOM`)
      // Wait until the ibom is visible
      cy.get('.topmostdiv').should('be.visible')

      // Compare/save the snapshot
      cy.get('#bot').matchImageSnapshot()
    },
  )
})
