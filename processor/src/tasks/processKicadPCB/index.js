const path = require('path')
const cp = require('child_process')
const util = require('util')
const globule = require('globule')

const { existsAll, findKicadPcbFile } = require('../../utils')

const exec = util.promisify(cp.exec)

function processKicadPCB(job, { checkoutDir, kitspaceYaml, filesDir }) {
  if (kitspaceYaml.multi) {
    const projectNames = Object.keys(kitspaceYaml.multi)
    return Promise.all(
      projectNames.map(async projectName => {
        const projectOutputDir = path.join(filesDir, projectName)
        const projectKitspaceYaml = kitspaceYaml.multi[projectName]
        return {
          [projectName]: await _processKicadPCB(
            job,
            checkoutDir,
            projectKitspaceYaml,
            projectOutputDir,
          ),
        }
      }),
    ).then(all =>
      all.reduce(
        (result, plottedGerbers) => ({
          ...result,
          ...plottedGerbers,
        }),
        {},
      ),
    )
  }
  return _processKicadPCB(job, checkoutDir, kitspaceYaml, filesDir)
}

async function _processKicadPCB(job, inputDir, kitspaceYaml, outputDir) {
  const layoutSvgPath = path.join(outputDir, 'images/layout.svg')

  const filePaths = [layoutSvgPath]

  for (const file of filePaths) {
    job.updateProgress({ status: 'in_progress', file })
  }

  if (await existsAll(filePaths)) {
    for (const file of filePaths) {
      job.updateProgress({ status: 'done', file })
    }
    // XXX should really return gerbers here, but they are temp files
    return { inputFiles: {}, gerbers: [] }
  }

  try {
    const files = globule.find(path.join(inputDir, '**'))
    const kicadPcbFile = findKicadPcbFile(inputDir, files, kitspaceYaml)
    if (kicadPcbFile == null) {
      job.updateProgress({
        status: 'failed',
        file: layoutSvgPath,
        error: Error('No .kicad_pcb file found'),
      })
      return { inputFiles: {}, gerbers: [] }
    }

    const gerbersPromise = plotKicadGerbers(outputDir, kicadPcbFile)

    const layoutPromise = plotKicadLayoutSvg(outputDir, layoutSvgPath, kicadPcbFile)
      .then(() => job.updateProgress({ status: 'done', file: layoutSvgPath }))
      .catch(error =>
        job.updateProgress({ status: 'failed', file: layoutSvgPath, error }),
      )

    const gerbers = await gerbersPromise
    await layoutPromise

    const relativeKicadPcbFile = path.relative(inputDir, kicadPcbFile)
    const inputFiles = { [relativeKicadPcbFile]: { type: 'kicad', side: null } }
    return { inputFiles, gerbers }
  } catch (error) {
    for (const file of filePaths) {
      job.updateProgress({ status: 'failed', file, error })
    }
    return { inputFiles: {}, gerbers: [] }
  }
}

async function plotKicadGerbers(outputDir, kicadPcbFile) {
  const tempGerberFolder = path.join('/tmp/kitspace', outputDir, 'gerbers')
  await exec(`rm -rf ${tempGerberFolder} && mkdir -p ${tempGerberFolder}`)
  const plot_kicad_pcb = path.join(__dirname, 'plot_kicad_pcb')
  const plotCommand = `${plot_kicad_pcb} gerber ${kicadPcbFile} ${tempGerberFolder}`
  await exec(plotCommand)
  return globule.find(path.join(tempGerberFolder, '*'))
}

async function plotKicadLayoutSvg(outputDir, layoutSvgPath, kicadPcbFile) {
  const tempFolder = path.join('/tmp/kitspace', outputDir, 'svg')
  await exec(`rm -rf ${tempFolder} && mkdir -p ${tempFolder}`)
  const plot_kicad_pcb = path.join(__dirname, 'plot_kicad_pcb')
  const plotCommand = `${plot_kicad_pcb} svg ${kicadPcbFile} ${tempFolder} ${layoutSvgPath}`
  return exec(plotCommand)
}

module.exports = processKicadPCB
