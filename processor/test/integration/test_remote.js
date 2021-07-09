const supertest = require('supertest')
const assert = require('assert')
const cp = require('child_process')
const util = require('util')
const path = require('path')

const exec = util.promisify(cp.exec)

const { createApp } = require('../../src/app')

const tmpDir = '/tmp/kitspace-processor-test-from-remote'
const emptyRepoDir = '/tmp/kitspace-processor-test-empty-repo-dir'

describe('remote API', () => {
  beforeEach(async () => {
    await exec(`mkdir -p ${tmpDir}`)
    await exec(`mkdir -p ${emptyRepoDir}`)
    this.app = createApp(emptyRepoDir)
    this.supertest = supertest(this.app)
  })

  it('creates app', async () => {
    assert(this.app != null)
  })

  it('accepts post on /process-file ', async () => {
    await this.supertest
      .post('/process-file')
      .attach('upload', path.join(__dirname, 'fixtures/push-on-hold-off.kicad_pcb'))
      .expect(202)
  })

  it('gives a 422 error when no file uploaded ', async () => {
    await this.supertest.post('/process-file').expect(422)
  })

  it('plots layout.svg', async () => {
    let r = await this.supertest
      .post('/process-file')
      .attach('upload', path.join(__dirname, 'fixtures/push-on-hold-off.kicad_pcb'))
      .expect(202)
    assert(r.body.id != null)
    const layoutSvgStatus = path.join('/processed/status', r.body.id, 'images/layout.svg')
    const layoutSvg = path.join('/processed/files', r.body.id, 'images/layout.svg')
    r = await this.supertest.get(layoutSvgStatus)
    assert(r.body.status === 'in_progress')
    while (r.body.status === 'in_progress') {
      r = await this.supertest.get(layoutSvgStatus)
    }
    assert(r.body.status === 'done')
    r = await this.supertest.get(layoutSvg).expect(200)
  })

  afterEach(async () => {
    this.app.stop()
    await exec(`rm -rf ${tmpDir}`)
  })
})
