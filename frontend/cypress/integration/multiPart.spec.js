import faker from 'faker'
const syncedRepoUrlMultiParts =
  'https://github.com/kitspace-forks/DIY_particle_detector'
const syncedRepoUrl = 'https://github.com/kitspace-forks/CH330_Hardware'
const multiPartsNames = ['alpha-spectrometer', 'electron-detector']
const multiPartsRepoName = syncedRepoUrlMultiParts.split('/').slice(-1).toString()
const normalRepoName = 'CH330_Hardware'

describe('Render project cards', () => {
  before(() => {
    // visit home before running the tests, instead of using `wait`.
    cy.visit('/')
  })

  it('should render a card for each multiproject', () => {
    const username = faker.name.firstName()
    const email = faker.internet.email()
    const password = '123456'

    const repoName = syncedRepoUrlMultiParts.split('/').slice(-1).toString()

    cy.intercept('http://gitea.kitspace.test:3000/user/kitspace/**').as('sign_in')

    cy.createUser(username, email, password)
    cy.visit('/login')
    cy.signIn(username, password)
    cy.wait('@sign_in')

    cy.visit('/projects/new')

    cy.intercept('http://gitea.kitspace.test:3000/api/v1/repos/migrate**')

    cy.url().then(url => {
      if (!url.endsWith('/projects/new')) {
        cy.visit('/projects/new')
      }
    })

    // Migrate the multipart repo
    cy.get('input:first').type(syncedRepoUrlMultiParts)
    cy.get('button').contains('Sync').click()

    // Wait for redirection for project page
    cy.url({ timeout: 60_000 }).should('contain', `${username}/${repoName}`)
    // Wait for the repo to finish migration, by checking the visibility of processing-loader.
    cy.get('[data-cy=processing-loader]', { timeout: 60_000 })
    // Wait for the repo to finish processing, by checking the visibility of info-bar.
    cy.get('[data-cy=info-bar]', { timeout: 60_000 }).should('be.visible')

    // should render a card for each multiproject
    cy.visit(`/${username}`)

    multiPartsNames.forEach(name => {
      cy.get('[data-cy=project-card]').contains(name)
    })
  })

  it('should display card thumbnail', () => {
    const username = faker.name.firstName()
    const email = faker.internet.email()
    const password = '123456'

    cy.intercept('http://gitea.kitspace.test:3000/user/kitspace/**').as('sign_in')

    cy.createUser(username, email, password)
    cy.visit('/login')
    cy.signIn(username, password)
    cy.wait('@sign_in')

    cy.visit('/projects/new')

    cy.intercept('http://gitea.kitspace.test:3000/api/v1/repos/migrate**')

    cy.url().then(url => {
      if (!url.endsWith('/projects/new')) {
        cy.visit('/projects/new')
      }
    })

    // Migrate the multipart repo
    cy.get('input:first').type(syncedRepoUrlMultiParts)
    cy.get('button').contains('Sync').click()

    // Wait for redirection for project page
    cy.url({ timeout: 60_000 }).should(
      'contain',
      `${username}/${multiPartsRepoName}`,
    )
    // Wait for the repo to finish migration, by checking the visibility of processing-loader.
    cy.get('[data-cy=processing-loader]', { timeout: 60_000 })
    // Wait for the repo to finish processing, by checking the visibility of info-bar.
    cy.get('[data-cy=info-bar]', { timeout: 60_000 }).should('be.visible')

    /* Migrate the normal repo */
    cy.visit('/projects/new')

    cy.intercept('http://gitea.kitspace.test:3000/api/v1/repos/migrate**')

    cy.url().then(url => {
      if (!url.endsWith('/projects/new')) {
        cy.visit('/projects/new')
      }
    })

    cy.get('input:first').type(syncedRepoUrl)
    cy.get('button').contains('Sync').click()

    // Wait for redirection for project page
    cy.url({ timeout: 60_000 }).should('contain', `${username}/${normalRepoName}`)
    // Wait for the repo to finish migration, by checking the visibility of processing-loader.
    cy.get('[data-cy=processing-loader]', { timeout: 60_000 })
    // Wait for the repo to finish processing, by checking the visibility of info-bar.
    cy.get('[data-cy=info-bar]', { timeout: 60_000 }).should('be.visible')

    cy.visit(`/${username}`)
    // There should be 3 thumbnails = 2 form multiparts + 1 normal project
    cy.get('[data-cy=project-card-thumbnail]').should(
      'have.length',
      multiPartsNames.length + 1,
    )
  })

  it('should redirect to the multi project page', () => {
    const username = faker.name.firstName()
    const email = faker.internet.email()
    const password = '123456'

    cy.intercept('http://gitea.kitspace.test:3000/user/kitspace/**').as('sign_in')

    cy.createUser(username, email, password)
    cy.visit('/login')
    cy.signIn(username, password)
    cy.wait('@sign_in')

    cy.visit('/projects/new')

    cy.intercept('http://gitea.kitspace.test:3000/api/v1/repos/migrate**')

    cy.url().then(url => {
      if (!url.endsWith('/projects/new')) {
        cy.visit('/projects/new')
      }
    })

    /* Migrate the multipart repo */
    cy.get('input:first').type(syncedRepoUrlMultiParts)
    cy.get('button').contains('Sync').click()

    // Wait for redirection for project page
    cy.url({ timeout: 60_000 }).should(
      'contain',
      `${username}/${multiPartsRepoName}`,
    )
    // Wait for the repo to finish migration, by checking the visibility of processing-loader.
    cy.get('[data-cy=processing-loader]', { timeout: 60_000 })
    // Wait for the repo to finish processing, by checking the visibility of info-bar.
    cy.get('[data-cy=info-bar]', { timeout: 60_000 }).should('be.visible')

    // Go to the home page and click on a multipart project card
    const multiPartName = multiPartsNames[0]
    cy.visit('/')
    cy.get('[data-cy=project-card]').within(() => {
      cy.contains(username)
      cy.contains(multiPartName).click({ force: true })
    })

    // Should redirect to the `[username]/[projectName]/[multiProject]`
    cy.url({ timeout: 20_000 }).should(
      'contain',
      `${username}/${multiPartsRepoName}/${multiPartName}`,
    )
  })
})

describe('Multi project page', () => {
  before(() => {
    // visit home before running the tests, instead of using `wait`.
    cy.visit('/')
  })

  beforeEach(() => cy.clearCookies())

  it('should render the page components', () => {
    const username = faker.name.firstName()
    const email = faker.internet.email()
    const password = '123456'

    cy.intercept('http://gitea.kitspace.test:3000/user/kitspace/**').as('sign_in')

    cy.createUser(username, email, password)
    cy.visit('/login')
    cy.signIn(username, password)
    cy.wait('@sign_in')

    cy.visit('/projects/new')

    cy.intercept('http://gitea.kitspace.test:3000/api/v1/repos/migrate**')

    cy.url().then(url => {
      if (!url.endsWith('/projects/new')) {
        cy.visit('/projects/new')
      }
    })

    // Migrate the multipart repo
    cy.get('input:first').type(syncedRepoUrlMultiParts)
    cy.get('button').contains('Sync').click()

    cy.url({ timeout: 60_000 }).should(
      'contain',
      `${username}/${multiPartsRepoName}`,
    )
    // Wait for the repo to finish migration, by checking the visibility of processing-loader.
    cy.get('[data-cy=processing-loader]', { timeout: 60_000 })
    // Wait for the repo to finish processing, by checking the visibility of info-bar.
    cy.get('[data-cy=info-bar]', { timeout: 60_000 }).should('be.visible')

    // Go to the home page and click on a multipart project card
    const multiPartName = multiPartsNames[0]
    cy.visit('/')
    cy.get('[data-cy=project-card]').within(() => {
      cy.contains(username)
      cy.contains(multiPartName).click()
    })
    cy.url({ timeout: 10_000 }).should(
      'contain',
      `${username}/${multiPartsRepoName}/${multiPartName}`,
    )

    // Different page elements should be visible.
    const pageComponents = [
      'info-bar',
      'board-showcase',
      'board-showcase-top',
      'board-showcase-bottom',
      'board-extra-menus',
      'order-pcb',
      'buy-parts',
      'readme',
    ]

    pageComponents.forEach(c => {
      cy.get(`[data-cy=${c}]`)
    })
  })

  it('should render the readme specified in kitspace.yaml', () => {
    const username = faker.name.firstName()
    const email = faker.internet.email()
    const password = '123456'

    cy.intercept('http://gitea.kitspace.test:3000/user/kitspace/**').as('sign_in')

    cy.createUser(username, email, password)
    cy.visit('/login')
    cy.signIn(username, password)
    cy.wait('@sign_in')

    cy.visit('/projects/new')

    cy.intercept('http://gitea.kitspace.test:3000/api/v1/repos/migrate**')

    cy.url().then(url => {
      if (!url.endsWith('/projects/new')) {
        cy.visit('/projects/new')
      }
    })

    // Migrate the multipart repo
    cy.get('input:first').type(syncedRepoUrlMultiParts)
    cy.get('button').contains('Sync').click()

    cy.url({ timeout: 60_000 }).should(
      'contain',
      `${username}/${multiPartsRepoName}`,
    )
    // Wait for the repo to finish migration, by checking the visibility of processing-loader.
    cy.get('[data-cy=processing-loader]', { timeout: 60_000 })
    // Wait for the repo to finish processing, by checking the visibility of info-bar.
    cy.get('[data-cy=info-bar]', { timeout: 60_000 }).should('be.visible')

    // Go to the home page and click on a multipart project card
    const multiPartName = multiPartsNames[0]
    cy.visit('/')
    cy.get('[data-cy=project-card]').within(() => {
      cy.contains(username)
      cy.contains(multiPartName).click({ force: true })
    })

    /*
     ! The `Alpha-Spectrometer Variant` is dependant on the chosen repo for testing.
     ! Note, a kitspace fork is used not the upstream.
    */
    cy.get('[data-cy=readme]').should('contain', 'Alpha-Spectrometer Variant')
  })
})
