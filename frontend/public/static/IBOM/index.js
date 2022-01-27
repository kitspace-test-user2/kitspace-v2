/*
  Split.js - v1.3.5
  MIT License
  https://github.com/nathancahill/Split.js
*/
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : (e.Split = t())
})(this, function () {
  'use strict'
  var e = window,
    t = e.document,
    n = 'addEventListener',
    i = 'removeEventListener',
    r = 'getBoundingClientRect',
    s = function () {
      return !1
    },
    o = e.attachEvent && !e[n],
    a =
      ['', '-webkit-', '-moz-', '-o-']
        .filter(function (e) {
          var n = t.createElement('div')
          return (n.style.cssText = 'width:' + e + 'calc(9px)'), !!n.style.length
        })
        .shift() + 'calc',
    l = function (e) {
      return 'string' == typeof e || e instanceof String ? t.querySelector(e) : e
    }
  return function (u, c) {
    function z(e, t, n) {
      var i = A(y, t, n)
      Object.keys(i).forEach(function (t) {
        return (e.style[t] = i[t])
      })
    }
    function h(e, t) {
      var n = B(y, t)
      Object.keys(n).forEach(function (t) {
        return (e.style[t] = n[t])
      })
    }
    function f(e) {
      var t = E[this.a],
        n = E[this.b],
        i = t.size + n.size
      ;(t.size = (e / this.size) * i),
        (n.size = i - (e / this.size) * i),
        z(t.element, t.size, this.aGutterSize),
        z(n.element, n.size, this.bGutterSize)
    }
    function m(e) {
      var t
      this.dragging &&
        ((t = 'touches' in e ? e.touches[0][b] - this.start : e[b] - this.start) <=
        E[this.a].minSize + M + this.aGutterSize
          ? (t = E[this.a].minSize + this.aGutterSize)
          : t >= this.size - (E[this.b].minSize + M + this.bGutterSize) &&
            (t = this.size - (E[this.b].minSize + this.bGutterSize)),
        f.call(this, t),
        c.onDrag && c.onDrag())
    }
    function g() {
      var e = E[this.a].element,
        t = E[this.b].element
      ;(this.size = e[r]()[y] + t[r]()[y] + this.aGutterSize + this.bGutterSize),
        (this.start = e[r]()[G])
    }
    function d() {
      var t = this,
        n = E[t.a].element,
        r = E[t.b].element
      t.dragging && c.onDragEnd && c.onDragEnd(),
        (t.dragging = !1),
        e[i]('mouseup', t.stop),
        e[i]('touchend', t.stop),
        e[i]('touchcancel', t.stop),
        t.parent[i]('mousemove', t.move),
        t.parent[i]('touchmove', t.move),
        delete t.stop,
        delete t.move,
        n[i]('selectstart', s),
        n[i]('dragstart', s),
        r[i]('selectstart', s),
        r[i]('dragstart', s),
        (n.style.userSelect = ''),
        (n.style.webkitUserSelect = ''),
        (n.style.MozUserSelect = ''),
        (n.style.pointerEvents = ''),
        (r.style.userSelect = ''),
        (r.style.webkitUserSelect = ''),
        (r.style.MozUserSelect = ''),
        (r.style.pointerEvents = ''),
        (t.gutter.style.cursor = ''),
        (t.parent.style.cursor = '')
    }
    function S(t) {
      var i = this,
        r = E[i.a].element,
        o = E[i.b].element
      !i.dragging && c.onDragStart && c.onDragStart(),
        t.preventDefault(),
        (i.dragging = !0),
        (i.move = m.bind(i)),
        (i.stop = d.bind(i)),
        e[n]('mouseup', i.stop),
        e[n]('touchend', i.stop),
        e[n]('touchcancel', i.stop),
        i.parent[n]('mousemove', i.move),
        i.parent[n]('touchmove', i.move),
        r[n]('selectstart', s),
        r[n]('dragstart', s),
        o[n]('selectstart', s),
        o[n]('dragstart', s),
        (r.style.userSelect = 'none'),
        (r.style.webkitUserSelect = 'none'),
        (r.style.MozUserSelect = 'none'),
        (r.style.pointerEvents = 'none'),
        (o.style.userSelect = 'none'),
        (o.style.webkitUserSelect = 'none'),
        (o.style.MozUserSelect = 'none'),
        (o.style.pointerEvents = 'none'),
        (i.gutter.style.cursor = j),
        (i.parent.style.cursor = j),
        g.call(i)
    }
    function v(e) {
      e.forEach(function (t, n) {
        if (n > 0) {
          var i = F[n - 1],
            r = E[i.a],
            s = E[i.b]
          ;(r.size = e[n - 1]),
            (s.size = t),
            z(r.element, r.size, i.aGutterSize),
            z(s.element, s.size, i.bGutterSize)
        }
      })
    }
    function p() {
      F.forEach(function (e) {
        e.parent.removeChild(e.gutter),
          (E[e.a].element.style[y] = ''),
          (E[e.b].element.style[y] = '')
      })
    }
    void 0 === c && (c = {})
    var y,
      b,
      G,
      E,
      w = l(u[0]).parentNode,
      D = e.getComputedStyle(w).flexDirection,
      U =
        c.sizes ||
        u.map(function () {
          return 100 / u.length
        }),
      k = void 0 !== c.minSize ? c.minSize : 100,
      x = Array.isArray(k)
        ? k
        : u.map(function () {
            return k
          }),
      L = void 0 !== c.gutterSize ? c.gutterSize : 10,
      M = void 0 !== c.snapOffset ? c.snapOffset : 30,
      O = c.direction || 'horizontal',
      j = c.cursor || ('horizontal' === O ? 'ew-resize' : 'ns-resize'),
      C =
        c.gutter ||
        function (e, n) {
          var i = t.createElement('div')
          return (i.className = 'gutter gutter-' + n), i
        },
      A =
        c.elementStyle ||
        function (e, t, n) {
          var i = {}
          return (
            'string' == typeof t || t instanceof String
              ? (i[e] = t)
              : (i[e] = o ? t + '%' : a + '(' + t + '% - ' + n + 'px)'),
            i
          )
        },
      B =
        c.gutterStyle ||
        function (e, t) {
          return (n = {}), (n[e] = t + 'px'), n
          var n
        }
    'horizontal' === O
      ? ((y = 'width'), 'clientWidth', (b = 'clientX'), (G = 'left'), 'paddingLeft')
      : 'vertical' === O &&
        ((y = 'height'), 'clientHeight', (b = 'clientY'), (G = 'top'), 'paddingTop')
    var F = []
    return (
      (E = u.map(function (e, t) {
        var i,
          s = { element: l(e), size: U[t], minSize: x[t] }
        if (
          t > 0 &&
          ((i = {
            a: t - 1,
            b: t,
            dragging: !1,
            isFirst: 1 === t,
            isLast: t === u.length - 1,
            direction: O,
            parent: w,
          }),
          (i.aGutterSize = L),
          (i.bGutterSize = L),
          i.isFirst && (i.aGutterSize = L / 2),
          i.isLast && (i.bGutterSize = L / 2),
          'row-reverse' === D || 'column-reverse' === D)
        ) {
          var a = i.a
          ;(i.a = i.b), (i.b = a)
        }
        if (!o && t > 0) {
          var c = C(t, O)
          h(c, L),
            c[n]('mousedown', S.bind(i)),
            c[n]('touchstart', S.bind(i)),
            w.insertBefore(c, s.element),
            (i.gutter = c)
        }
        0 === t || t === u.length - 1
          ? z(s.element, s.size, L / 2)
          : z(s.element, s.size, L)
        var f = s.element[r]()[y]
        return f < s.minSize && (s.minSize = f), t > 0 && F.push(i), s
      })),
      o
        ? { setSizes: v, destroy: p }
        : {
            setSizes: v,
            getSizes: function () {
              return E.map(function (e) {
                return e.size
              })
            },
            collapse: function (e) {
              if (e === F.length) {
                var t = F[e - 1]
                g.call(t), o || f.call(t, t.size - t.bGutterSize)
              } else {
                var n = F[e]
                g.call(n), o || f.call(n, n.aGutterSize)
              }
            },
            destroy: p,
          }
    )
  }
})
/* Utility functions */

var storage

function initStorage(key) {
  try {
    window.localStorage.getItem('blank')
    storage = window.localStorage
  } catch (e) {
    // localStorage not available
  }
  if (!storage) {
    try {
      window.sessionStorage.getItem('blank')
      storage = window.sessionStorage
    } catch (e) {
      // sessionStorage also not available
    }
  }
}

function storagePrefix() {
  return (
    'KiCad_HTML_BOM__' +
    pcbdata.metadata.title +
    '__' +
    pcbdata.metadata.revision +
    '__#'
  )
}

function readStorage(key) {
  if (storage) {
    return storage.getItem(storagePrefix() + key)
  } else {
    return null
  }
}

function writeStorage(key, value) {
  if (storage) {
    storage.setItem(storagePrefix() + key, value)
  }
}

function fancyDblClickHandler(el, onsingle, ondouble) {
  return function () {
    if (el.getAttribute('data-dblclick') == null) {
      el.setAttribute('data-dblclick', 1)
      setTimeout(function () {
        if (el.getAttribute('data-dblclick') == 1) {
          onsingle()
        }
        el.removeAttribute('data-dblclick')
      }, 200)
    } else {
      el.removeAttribute('data-dblclick')
      ondouble()
    }
  }
}

function smoothScrollToRow(rowid) {
  document.getElementById(rowid).scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  })
}

function focusInputField(input) {
  input.scrollIntoView(false)
  input.focus()
  input.select()
}

function copyToClipboard() {
  var text = ''
  for (var node of bomhead.childNodes[0].childNodes) {
    if (node.firstChild) {
      text = text + node.firstChild.nodeValue
    }
    if (node != bomhead.childNodes[0].lastChild) {
      text += '\t'
    }
  }
  text += '\n'
  for (var row of bombody.childNodes) {
    for (var cell of row.childNodes) {
      for (var node of cell.childNodes) {
        if (node.nodeName == 'INPUT') {
          if (node.checked) {
            text = text + '✓'
          }
        } else if (node.nodeName == 'MARK') {
          text = text + node.firstChild.nodeValue
        } else {
          text = text + node.nodeValue
        }
      }
      if (cell != row.lastChild) {
        text += '\t'
      }
    }
    text += '\n'
  }
  var textArea = document.createElement('textarea')
  textArea.classList.add('clipboard-temp')
  textArea.value = text

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    if (document.execCommand('copy')) {
      console.log('Bom copied to clipboard.')
    }
  } catch (err) {
    console.log('Can not copy to clipboard.')
  }

  document.body.removeChild(textArea)
}

function removeGutterNode(node) {
  for (var i = 0; i < node.childNodes.length; i++) {
    if (
      node.childNodes[i].classList &&
      node.childNodes[i].classList.contains('gutter')
    ) {
      node.removeChild(node.childNodes[i])
      break
    }
  }
}

function cleanGutters() {
  removeGutterNode(document.getElementById('bot'))
  removeGutterNode(document.getElementById('canvasdiv'))
}

var units = {
  prefixes: {
    giga: ['G', 'g', 'giga', 'Giga', 'GIGA'],
    mega: ['M', 'mega', 'Mega', 'MEGA'],
    kilo: ['K', 'k', 'kilo', 'Kilo', 'KILO'],
    milli: ['m', 'milli', 'Milli', 'MILLI'],
    micro: ['U', 'u', 'micro', 'Micro', 'MICRO', 'μ', 'µ'], // different utf8 μ
    nano: ['N', 'n', 'nano', 'Nano', 'NANO'],
    pico: ['P', 'p', 'pico', 'Pico', 'PICO'],
  },
  unitsShort: ['R', 'r', 'Ω', 'F', 'f', 'H', 'h'],
  unitsLong: [
    'OHM',
    'Ohm',
    'ohm',
    'ohms',
    'FARAD',
    'Farad',
    'farad',
    'HENRY',
    'Henry',
    'henry',
  ],
  getMultiplier: function (s) {
    if (this.prefixes.giga.includes(s)) return 1e9
    if (this.prefixes.mega.includes(s)) return 1e6
    if (this.prefixes.kilo.includes(s)) return 1e3
    if (this.prefixes.milli.includes(s)) return 1e-3
    if (this.prefixes.micro.includes(s)) return 1e-6
    if (this.prefixes.nano.includes(s)) return 1e-9
    if (this.prefixes.pico.includes(s)) return 1e-12
    return 1
  },
  valueRegex: null,
}

function initUtils() {
  var allPrefixes = units.prefixes.giga
    .concat(units.prefixes.mega)
    .concat(units.prefixes.kilo)
    .concat(units.prefixes.milli)
    .concat(units.prefixes.micro)
    .concat(units.prefixes.nano)
    .concat(units.prefixes.pico)
  var allUnits = units.unitsShort.concat(units.unitsLong)
  units.valueRegex = new RegExp(
    '^([0-9.]+)' +
      '\\s*(' +
      allPrefixes.join('|') +
      ')?' +
      '(' +
      allUnits.join('|') +
      ')?' +
      '(\\b.*)?$',
    '',
  )
  units.valueAltRegex = new RegExp(
    '^([0-9]*)' +
      '(' +
      units.unitsShort.join('|') +
      ')?' +
      '([GgMmKkUuNnPp])?' +
      '([0-9]*)' +
      '(\\b.*)?$',
    '',
  )
  if (config.fields.includes('Value')) {
    var index = config.fields.indexOf('Value')
    pcbdata.bom['parsedValues'] = {}
    for (var id in pcbdata.bom.fields) {
      pcbdata.bom.parsedValues[id] = parseValue(pcbdata.bom.fields[id][index])
    }
  }
}

function parseValue(val, ref) {
  var inferUnit = (unit, ref) => {
    if (unit) {
      unit = unit.toLowerCase()
      if (unit == 'Ω' || unit == 'ohm' || unit == 'ohms') {
        unit = 'r'
      }
      unit = unit[0]
    } else {
      ref = /^([a-z]+)\d+$/i.exec(ref)
      if (ref) {
        ref = ref[1].toLowerCase()
        if (ref == 'c') unit = 'f'
        else if (ref == 'l') unit = 'h'
        else if (ref == 'r' || ref == 'rv') unit = 'r'
        else unit = null
      }
    }
    return unit
  }
  val = val.replace(/,/g, '')
  var match = units.valueRegex.exec(val)
  var unit
  if (match) {
    val = parseFloat(match[1])
    if (match[2]) {
      val = val * units.getMultiplier(match[2])
    }
    unit = inferUnit(match[3], ref)
    if (!unit) return null
    else
      return {
        val: val,
        unit: unit,
        extra: match[4],
      }
  }
  match = units.valueAltRegex.exec(val)
  if (match && (match[1] || match[4])) {
    val = parseFloat(match[1] + '.' + match[4])
    if (match[3]) {
      val = val * units.getMultiplier(match[3])
    }
    unit = inferUnit(match[2], ref)
    if (!unit) return null
    else
      return {
        val: val,
        unit: unit,
        extra: match[5],
      }
  }
  return null
}

function valueCompare(a, b, stra, strb) {
  if (a === null && b === null) {
    // Failed to parse both values, compare them as strings.
    if (stra != strb) return stra > strb ? 1 : -1
    else return 0
  } else if (a === null) {
    return 1
  } else if (b === null) {
    return -1
  } else {
    if (a.unit != b.unit) return a.unit > b.unit ? 1 : -1
    else if (a.val != b.val) return a.val > b.val ? 1 : -1
    else if (a.extra != b.extra) return a.extra > b.extra ? 1 : -1
    else return 0
  }
}

function validateSaveImgDimension(element) {
  var valid = false
  var intValue = 0
  if (/^[1-9]\d*$/.test(element.value)) {
    intValue = parseInt(element.value)
    if (intValue <= 16000) {
      valid = true
    }
  }
  if (valid) {
    element.classList.remove('invalid')
  } else {
    element.classList.add('invalid')
  }
  return intValue
}

function saveImage(layer) {
  var width = validateSaveImgDimension(document.getElementById('render-save-width'))
  var height = validateSaveImgDimension(
    document.getElementById('render-save-height'),
  )
  var bgcolor = null
  if (!document.getElementById('render-save-transparent').checked) {
    var style = getComputedStyle(topmostdiv)
    bgcolor = style.getPropertyValue('background-color')
  }
  if (!width || !height) return

  // Prepare image
  var canvas = document.createElement('canvas')
  var layerdict = {
    transform: {
      x: 0,
      y: 0,
      s: 1,
      panx: 0,
      pany: 0,
      zoom: 1,
    },
    bg: canvas,
    fab: canvas,
    silk: canvas,
    highlight: canvas,
    layer: layer,
  }
  // Do the rendering
  recalcLayerScale(layerdict, width, height)
  prepareLayer(layerdict)
  clearCanvas(canvas, bgcolor)
  drawBackground(layerdict, false)
  drawHighlightsOnLayer(layerdict, false)

  // Save image
  var imgdata = canvas.toDataURL('image/png')

  var filename = pcbdata.metadata.title
  if (pcbdata.metadata.revision) {
    filename += `.${pcbdata.metadata.revision}`
  }
  filename += `.${layer}.png`
  saveFile(filename, dataURLtoBlob(imgdata))
}

function saveSettings() {
  var data = {
    type: 'InteractiveHtmlBom settings',
    version: 1,
    pcbmetadata: pcbdata.metadata,
    settings: settings,
  }
  var blob = new Blob([JSON.stringify(data, null, 4)], {
    type: 'application/json',
  })
  saveFile(`${pcbdata.metadata.title}.settings.json`, blob)
}

function loadSettings() {
  var input = document.createElement('input')
  input.type = 'file'
  input.accept = '.settings.json'
  input.onchange = function (e) {
    var file = e.target.files[0]
    var reader = new FileReader()
    reader.onload = readerEvent => {
      var content = readerEvent.target.result
      var newSettings
      try {
        newSettings = JSON.parse(content)
      } catch (e) {
        alert('Selected file is not InteractiveHtmlBom settings file.')
        return
      }
      if (newSettings.type != 'InteractiveHtmlBom settings') {
        alert('Selected file is not InteractiveHtmlBom settings file.')
        return
      }
      var metadataMatches = newSettings.hasOwnProperty('pcbmetadata')
      if (metadataMatches) {
        for (var k in pcbdata.metadata) {
          if (
            !newSettings.pcbmetadata.hasOwnProperty(k) ||
            newSettings.pcbmetadata[k] != pcbdata.metadata[k]
          ) {
            metadataMatches = false
          }
        }
      }
      if (!metadataMatches) {
        var currentMetadata = JSON.stringify(pcbdata.metadata, null, 4)
        var fileMetadata = JSON.stringify(newSettings.pcbmetadata, null, 4)
        if (
          !confirm(
            `Settins file metadata does not match current metadata.\n\n` +
              `Page metadata:\n${currentMetadata}\n\n` +
              `Settings file metadata:\n${fileMetadata}\n\n` +
              `Press OK if you would like to import settings anyway.`,
          )
        ) {
          return
        }
      }
      overwriteSettings(newSettings.settings)
    }
    reader.readAsText(file, 'UTF-8')
  }
  input.click()
}

function overwriteSettings(newSettings) {
  initDone = false
  Object.assign(settings, newSettings)
  writeStorage('bomlayout', settings.bomlayout)
  writeStorage('bommode', settings.bommode)
  writeStorage('canvaslayout', settings.canvaslayout)
  writeStorage('bomCheckboxes', settings.checkboxes.join(','))
  document.getElementById('bomCheckboxes').value = settings.checkboxes.join(',')
  for (var checkbox of settings.checkboxes) {
    writeStorage('checkbox_' + checkbox, settings.checkboxStoredRefs[checkbox])
  }
  writeStorage('markWhenChecked', settings.markWhenChecked)
  padsVisible(settings.renderPads)
  document.getElementById('padsCheckbox').checked = settings.renderPads
  fabricationVisible(settings.renderFabrication)
  document.getElementById('fabricationCheckbox').checked =
    settings.renderFabrication
  silkscreenVisible(settings.renderSilkscreen)
  document.getElementById('silkscreenCheckbox').checked = settings.renderSilkscreen
  referencesVisible(settings.renderReferences)
  document.getElementById('referencesCheckbox').checked = settings.renderReferences
  valuesVisible(settings.renderValues)
  document.getElementById('valuesCheckbox').checked = settings.renderValues
  tracksVisible(settings.renderTracks)
  document.getElementById('tracksCheckbox').checked = settings.renderTracks
  zonesVisible(settings.renderZones)
  document.getElementById('zonesCheckbox').checked = settings.renderZones
  dnpOutline(settings.renderDnpOutline)
  document.getElementById('dnpOutlineCheckbox').checked = settings.renderDnpOutline
  setRedrawOnDrag(settings.redrawOnDrag)
  document.getElementById('dragCheckbox').checked = settings.redrawOnDrag
  setDarkMode(settings.darkMode)
  document.getElementById('darkmodeCheckbox').checked = settings.darkMode
  setHighlightPin1(settings.highlightpin1)
  document.getElementById('highlightpin1Checkbox').checked = settings.highlightpin1
  showFootprints(settings.show_footprints)
  writeStorage('boardRotation', settings.boardRotation)
  document.getElementById('boardRotation').value = settings.boardRotation / 5
  document.getElementById('rotationDegree').textContent = settings.boardRotation
  initDone = true
  prepCheckboxes()
  changeBomLayout(settings.bomlayout)
}

function saveFile(filename, blob) {
  var link = document.createElement('a')
  var objurl = URL.createObjectURL(blob)
  link.download = filename
  link.href = objurl
  link.click()
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime,
  })
}

var settings = {
  canvaslayout: 'default',
  bomlayout: 'default',
  bommode: 'grouped',
  checkboxes: [],
  checkboxStoredRefs: {},
  darkMode: false,
  highlightpin1: false,
  redrawOnDrag: true,
  boardRotation: 0,
  renderPads: true,
  renderReferences: true,
  renderValues: true,
  renderSilkscreen: true,
  renderFabrication: true,
  renderDnpOutline: false,
  renderTracks: true,
  renderZones: true,
  columnOrder: [],
  hiddenColumns: [],
}

function initDefaults() {
  settings.bomlayout = readStorage('bomlayout')
  if (settings.bomlayout === null) {
    settings.bomlayout = config.bom_view
  }
  if (!['bom-only', 'left-right', 'top-bottom'].includes(settings.bomlayout)) {
    settings.bomlayout = config.bom_view
  }
  settings.bommode = readStorage('bommode')
  if (settings.bommode === null) {
    settings.bommode = 'grouped'
  }
  if (!['grouped', 'ungrouped', 'netlist'].includes(settings.bommode)) {
    settings.bommode = 'grouped'
  }
  settings.canvaslayout = readStorage('canvaslayout')
  if (settings.canvaslayout === null) {
    settings.canvaslayout = config.layer_view
  }
  var bomCheckboxes = readStorage('bomCheckboxes')
  if (bomCheckboxes === null) {
    bomCheckboxes = config.checkboxes
  }
  settings.checkboxes = bomCheckboxes.split(',').filter(e => e)
  document.getElementById('bomCheckboxes').value = bomCheckboxes

  settings.markWhenChecked = readStorage('markWhenChecked') || ''
  populateMarkWhenCheckedOptions()

  function initBooleanSetting(storageString, def, elementId, func) {
    var b = readStorage(storageString)
    if (b === null) {
      b = def
    } else {
      b = b == 'true'
    }
    document.getElementById(elementId).checked = b
    func(b)
  }

  initBooleanSetting('padsVisible', config.show_pads, 'padsCheckbox', padsVisible)
  initBooleanSetting(
    'fabricationVisible',
    config.show_fabrication,
    'fabricationCheckbox',
    fabricationVisible,
  )
  initBooleanSetting(
    'silkscreenVisible',
    config.show_silkscreen,
    'silkscreenCheckbox',
    silkscreenVisible,
  )
  initBooleanSetting(
    'referencesVisible',
    true,
    'referencesCheckbox',
    referencesVisible,
  )
  initBooleanSetting('valuesVisible', true, 'valuesCheckbox', valuesVisible)
  if ('tracks' in pcbdata) {
    initBooleanSetting('tracksVisible', true, 'tracksCheckbox', tracksVisible)
    initBooleanSetting('zonesVisible', true, 'zonesCheckbox', zonesVisible)
  } else {
    document.getElementById('tracksAndZonesCheckboxes').style.display = 'none'
    tracksVisible(false)
    zonesVisible(false)
  }
  initBooleanSetting('dnpOutline', false, 'dnpOutlineCheckbox', dnpOutline)
  initBooleanSetting(
    'redrawOnDrag',
    config.redraw_on_drag,
    'dragCheckbox',
    setRedrawOnDrag,
  )
  initBooleanSetting('darkmode', config.dark_mode, 'darkmodeCheckbox', setDarkMode)
  initBooleanSetting(
    'highlightpin1',
    config.highlight_pin1,
    'highlightpin1Checkbox',
    setHighlightPin1,
  )

  var fields = ['checkboxes', 'References']
    .concat(config.fields)
    .concat(['Quantity'])
  var hcols = JSON.parse(readStorage('hiddenColumns'))
  if (hcols === null) {
    hcols = []
  }
  settings.hiddenColumns = hcols.filter(e => fields.includes(e))

  var cord = JSON.parse(readStorage('columnOrder'))
  if (cord === null) {
    cord = fields
  } else {
    cord = cord.filter(e => fields.includes(e))
    if (cord.length != fields.length) cord = fields
  }
  settings.columnOrder = cord

  settings.boardRotation = readStorage('boardRotation')
  if (settings.boardRotation === null) {
    settings.boardRotation = config.board_rotation * 5
  } else {
    settings.boardRotation = parseInt(settings.boardRotation)
  }
  document.getElementById('boardRotation').value = settings.boardRotation / 5
  document.getElementById('rotationDegree').textContent = settings.boardRotation
}

// Helper classes for user js callbacks.

const IBOM_EVENT_TYPES = {
  ALL: 'all',
  HIGHLIGHT_EVENT: 'highlightEvent',
  CHECKBOX_CHANGE_EVENT: 'checkboxChangeEvent',
  BOM_BODY_CHANGE_EVENT: 'bomBodyChangeEvent',
}

const EventHandler = {
  callbacks: {},
  init: function () {
    for (var eventType of Object.values(IBOM_EVENT_TYPES))
      this.callbacks[eventType] = []
  },
  registerCallback: function (eventType, callback) {
    this.callbacks[eventType].push(callback)
  },
  emitEvent: function (eventType, eventArgs) {
    event = {
      eventType: eventType,
      args: eventArgs,
    }
    var callback
    for (callback of this.callbacks[eventType]) callback(event)
    for (callback of this.callbacks[IBOM_EVENT_TYPES.ALL]) callback(event)
  },
}
EventHandler.init()
/* PCB rendering code */

var emptyContext2d = document.createElement('canvas').getContext('2d')

function deg2rad(deg) {
  return (deg * Math.PI) / 180
}

function calcFontPoint(linepoint, text, offsetx, offsety, tilt) {
  var point = [
    linepoint[0] * text.width + offsetx,
    linepoint[1] * text.height + offsety,
  ]
  // This approximates pcbnew behavior with how text tilts depending on horizontal justification
  point[0] -= (linepoint[1] + 0.5 * (1 + text.justify[0])) * text.height * tilt
  return point
}

function drawText(ctx, text, color) {
  if ('ref' in text && !settings.renderReferences) return
  if ('val' in text && !settings.renderValues) return
  ctx.save()
  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = text.thickness
  if ('svgpath' in text) {
    ctx.stroke(new Path2D(text.svgpath))
    ctx.restore()
    return
  }
  ctx.translate(...text.pos)
  ctx.translate(text.thickness * 0.5, 0)
  var angle = -text.angle
  if (text.attr.includes('mirrored')) {
    ctx.scale(-1, 1)
    angle = -angle
  }
  var tilt = 0
  if (text.attr.includes('italic')) {
    tilt = 0.125
  }
  var interline = text.height * 1.5 + text.thickness
  var txt = text.text.split('\n')
  // KiCad ignores last empty line.
  if (txt[txt.length - 1] == '') txt.pop()
  ctx.rotate(deg2rad(angle))
  var offsety = ((1 - text.justify[1]) / 2) * text.height // One line offset
  offsety -= (((txt.length - 1) * (text.justify[1] + 1)) / 2) * interline // Multiline offset
  for (var i in txt) {
    var lineWidth = text.thickness + (interline / 2) * tilt
    for (var j = 0; j < txt[i].length; j++) {
      if (txt[i][j] == '\t') {
        var fourSpaces = 4 * pcbdata.font_data[' '].w * text.width
        lineWidth += fourSpaces - (lineWidth % fourSpaces)
      } else {
        if (txt[i][j] == '~') {
          j++
          if (j == txt[i].length) break
        }
        lineWidth += pcbdata.font_data[txt[i][j]].w * text.width
      }
    }
    var offsetx = (-lineWidth * (text.justify[0] + 1)) / 2
    var inOverbar = false
    for (var j = 0; j < txt[i].length; j++) {
      if (txt[i][j] == '\t') {
        var fourSpaces = 4 * pcbdata.font_data[' '].w * text.width
        offsetx += fourSpaces - (offsetx % fourSpaces)
        continue
      } else if (txt[i][j] == '~') {
        j++
        if (j == txt[i].length) break
        if (txt[i][j] != '~') {
          inOverbar = !inOverbar
        }
      }
      var glyph = pcbdata.font_data[txt[i][j]]
      if (inOverbar) {
        var overbarStart = [offsetx, -text.height * 1.4 + offsety]
        var overbarEnd = [offsetx + text.width * glyph.w, overbarStart[1]]

        if (!lastHadOverbar) {
          overbarStart[0] += text.height * 1.4 * tilt
          lastHadOverbar = true
        }
        ctx.beginPath()
        ctx.moveTo(...overbarStart)
        ctx.lineTo(...overbarEnd)
        ctx.stroke()
      } else {
        lastHadOverbar = false
      }
      for (var line of glyph.l) {
        ctx.beginPath()
        ctx.moveTo(...calcFontPoint(line[0], text, offsetx, offsety, tilt))
        for (var k = 1; k < line.length; k++) {
          ctx.lineTo(...calcFontPoint(line[k], text, offsetx, offsety, tilt))
        }
        ctx.stroke()
      }
      offsetx += glyph.w * text.width
    }
    offsety += interline
  }
  ctx.restore()
}

function drawedge(ctx, scalefactor, edge, color) {
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = Math.max(1 / scalefactor, edge.width)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  if ('svgpath' in edge) {
    ctx.stroke(new Path2D(edge.svgpath))
  } else {
    ctx.beginPath()
    if (edge.type == 'segment') {
      ctx.moveTo(...edge.start)
      ctx.lineTo(...edge.end)
    }
    if (edge.type == 'rect') {
      ctx.moveTo(...edge.start)
      ctx.lineTo(edge.start[0], edge.end[1])
      ctx.lineTo(...edge.end)
      ctx.lineTo(edge.end[0], edge.start[1])
      ctx.lineTo(...edge.start)
    }
    if (edge.type == 'arc') {
      ctx.arc(
        ...edge.start,
        edge.radius,
        deg2rad(edge.startangle),
        deg2rad(edge.endangle),
      )
    }
    if (edge.type == 'circle') {
      ctx.arc(...edge.start, edge.radius, 0, 2 * Math.PI)
      ctx.closePath()
    }
    if (edge.type == 'curve') {
      ctx.moveTo(...edge.start)
      ctx.bezierCurveTo(...edge.cpa, ...edge.cpb, ...edge.end)
    }
    if ('filled' in edge && edge.filled) ctx.fill()
    else ctx.stroke()
  }
}

function getChamferedRectPath(size, radius, chamfpos, chamfratio) {
  // chamfpos is a bitmask, left = 1, right = 2, bottom left = 4, bottom right = 8
  var path = new Path2D()
  var width = size[0]
  var height = size[1]
  var x = width * -0.5
  var y = height * -0.5
  var chamfOffset = Math.min(width, height) * chamfratio
  path.moveTo(x, 0)
  if (chamfpos & 4) {
    path.lineTo(x, y + height - chamfOffset)
    path.lineTo(x + chamfOffset, y + height)
    path.lineTo(0, y + height)
  } else {
    path.arcTo(x, y + height, x + width, y + height, radius)
  }
  if (chamfpos & 8) {
    path.lineTo(x + width - chamfOffset, y + height)
    path.lineTo(x + width, y + height - chamfOffset)
    path.lineTo(x + width, 0)
  } else {
    path.arcTo(x + width, y + height, x + width, y, radius)
  }
  if (chamfpos & 2) {
    path.lineTo(x + width, y + chamfOffset)
    path.lineTo(x + width - chamfOffset, y)
    path.lineTo(0, y)
  } else {
    path.arcTo(x + width, y, x, y, radius)
  }
  if (chamfpos & 1) {
    path.lineTo(x + chamfOffset, y)
    path.lineTo(x, y + chamfOffset)
    path.lineTo(x, 0)
  } else {
    path.arcTo(x, y, x, y + height, radius)
  }
  path.closePath()
  return path
}

function getOblongPath(size) {
  return getChamferedRectPath(size, Math.min(size[0], size[1]) / 2, 0, 0)
}

function getPolygonsPath(shape) {
  if (shape.path2d) {
    return shape.path2d
  }
  if ('svgpath' in shape) {
    shape.path2d = new Path2D(shape.svgpath)
  } else {
    var path = new Path2D()
    for (var polygon of shape.polygons) {
      path.moveTo(...polygon[0])
      for (var i = 1; i < polygon.length; i++) {
        path.lineTo(...polygon[i])
      }
      path.closePath()
    }
    shape.path2d = path
  }
  return shape.path2d
}

function drawPolygonShape(ctx, scalefactor, shape, color) {
  ctx.save()
  if (!('svgpath' in shape)) {
    ctx.translate(...shape.pos)
    ctx.rotate(deg2rad(-shape.angle))
  }
  if ('filled' in shape && !shape.filled) {
    ctx.strokeStyle = color
    ctx.lineWidth = Math.max(1 / scalefactor, shape.width)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke(getPolygonsPath(shape))
  } else {
    ctx.fillStyle = color
    ctx.fill(getPolygonsPath(shape))
  }
  ctx.restore()
}

function drawDrawing(ctx, scalefactor, drawing, color) {
  if (['segment', 'arc', 'circle', 'curve', 'rect'].includes(drawing.type)) {
    drawedge(ctx, scalefactor, drawing, color)
  } else if (drawing.type == 'polygon') {
    drawPolygonShape(ctx, scalefactor, drawing, color)
  } else {
    drawText(ctx, drawing, color)
  }
}

function getCirclePath(radius) {
  var path = new Path2D()
  path.arc(0, 0, radius, 0, 2 * Math.PI)
  path.closePath()
  return path
}

function getCachedPadPath(pad) {
  if (!pad.path2d) {
    // if path2d is not set, build one and cache it on pad object
    if (pad.shape == 'rect') {
      pad.path2d = new Path2D()
      pad.path2d.rect(...pad.size.map(c => -c * 0.5), ...pad.size)
    } else if (pad.shape == 'oval') {
      pad.path2d = getOblongPath(pad.size)
    } else if (pad.shape == 'circle') {
      pad.path2d = getCirclePath(pad.size[0] / 2)
    } else if (pad.shape == 'roundrect') {
      pad.path2d = getChamferedRectPath(pad.size, pad.radius, 0, 0)
    } else if (pad.shape == 'chamfrect') {
      pad.path2d = getChamferedRectPath(
        pad.size,
        pad.radius,
        pad.chamfpos,
        pad.chamfratio,
      )
    } else if (pad.shape == 'custom') {
      pad.path2d = getPolygonsPath(pad)
    }
  }
  return pad.path2d
}

function drawPad(ctx, pad, color, outline) {
  ctx.save()
  ctx.translate(...pad.pos)
  ctx.rotate(deg2rad(pad.angle))
  if (pad.offset) {
    ctx.translate(...pad.offset)
  }
  ctx.fillStyle = color
  ctx.strokeStyle = color
  var path = getCachedPadPath(pad)
  if (outline) {
    ctx.stroke(path)
  } else {
    ctx.fill(path)
  }
  ctx.restore()
}

function drawPadHole(ctx, pad, padHoleColor) {
  if (pad.type != 'th') return
  ctx.save()
  ctx.translate(...pad.pos)
  ctx.rotate(deg2rad(pad.angle))
  ctx.fillStyle = padHoleColor
  if (pad.drillshape == 'oblong') {
    ctx.fill(getOblongPath(pad.drillsize))
  } else {
    ctx.fill(getCirclePath(pad.drillsize[0] / 2))
  }
  ctx.restore()
}

function drawFootprint(
  ctx,
  layer,
  scalefactor,
  footprint,
  colors,
  highlight,
  outline,
) {
  if (highlight) {
    // draw bounding box
    if (footprint.layer == layer) {
      ctx.save()
      ctx.globalAlpha = 0.2
      ctx.translate(...footprint.bbox.pos)
      ctx.rotate(deg2rad(-footprint.bbox.angle))
      ctx.translate(...footprint.bbox.relpos)
      ctx.fillStyle = colors.pad
      ctx.fillRect(0, 0, ...footprint.bbox.size)
      ctx.globalAlpha = 1
      ctx.strokeStyle = colors.pad
      ctx.strokeRect(0, 0, ...footprint.bbox.size)
      ctx.restore()
    }
  }
  // draw drawings
  for (var drawing of footprint.drawings) {
    if (drawing.layer == layer) {
      drawDrawing(ctx, scalefactor, drawing.drawing, colors.pad)
    }
  }
  // draw pads
  if (settings.renderPads) {
    for (var pad of footprint.pads) {
      if (pad.layers.includes(layer)) {
        drawPad(ctx, pad, colors.pad, outline)
        if (pad.pin1 && settings.highlightpin1) {
          drawPad(ctx, pad, colors.outline, true)
        }
      }
    }
    for (var pad of footprint.pads) {
      drawPadHole(ctx, pad, colors.padHole)
    }
  }
}

function drawEdgeCuts(canvas, scalefactor) {
  var ctx = canvas.getContext('2d')
  var edgecolor = getComputedStyle(topmostdiv).getPropertyValue('--pcb-edge-color')
  for (var edge of pcbdata.edges) {
    drawDrawing(ctx, scalefactor, edge, edgecolor)
  }
}

function drawFootprints(canvas, layer, scalefactor, highlight) {
  var ctx = canvas.getContext('2d')
  ctx.lineWidth = 3 / scalefactor
  var style = getComputedStyle(topmostdiv)

  var colors = {
    pad: style.getPropertyValue('--pad-color'),
    padHole: style.getPropertyValue('--pad-hole-color'),
    outline: style.getPropertyValue('--pin1-outline-color'),
  }

  for (var i = 0; i < pcbdata.footprints.length; i++) {
    var mod = pcbdata.footprints[i]
    var outline = settings.renderDnpOutline && pcbdata.bom.skipped.includes(i)
    var h = highlightedFootprints.includes(i)
    var d = markedFootprints.has(i)
    if (highlight) {
      if (h && d) {
        colors.pad = style.getPropertyValue('--pad-color-highlight-both')
        colors.outline = style.getPropertyValue(
          '--pin1-outline-color-highlight-both',
        )
      } else if (h) {
        colors.pad = style.getPropertyValue('--pad-color-highlight')
        colors.outline = style.getPropertyValue('--pin1-outline-color-highlight')
      } else if (d) {
        colors.pad = style.getPropertyValue('--pad-color-highlight-marked')
        colors.outline = style.getPropertyValue(
          '--pin1-outline-color-highlight-marked',
        )
      }
    }
    if (h || d || !highlight) {
      drawFootprint(ctx, layer, scalefactor, mod, colors, highlight, outline)
    }
  }
}

function drawBgLayer(
  layername,
  canvas,
  layer,
  scalefactor,
  edgeColor,
  polygonColor,
  textColor,
) {
  var ctx = canvas.getContext('2d')
  for (var d of pcbdata.drawings[layername][layer]) {
    if (['segment', 'arc', 'circle', 'curve', 'rect'].includes(d.type)) {
      drawedge(ctx, scalefactor, d, edgeColor)
    } else if (d.type == 'polygon') {
      drawPolygonShape(ctx, scalefactor, d, polygonColor)
    } else {
      drawText(ctx, d, textColor)
    }
  }
}

function drawTracks(canvas, layer, color, highlight) {
  ctx = canvas.getContext('2d')
  ctx.strokeStyle = color
  ctx.lineCap = 'round'
  for (var track of pcbdata.tracks[layer]) {
    if (highlight && highlightedNet != track.net) continue
    ctx.lineWidth = track.width
    ctx.beginPath()
    if ('radius' in track) {
      ctx.arc(
        ...track.center,
        track.radius,
        deg2rad(track.startangle),
        deg2rad(track.endangle),
      )
    } else {
      ctx.moveTo(...track.start)
      ctx.lineTo(...track.end)
    }
    ctx.stroke()
  }
}

function drawZones(canvas, layer, color, highlight) {
  ctx = canvas.getContext('2d')
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineJoin = 'round'
  for (var zone of pcbdata.zones[layer]) {
    if (!zone.path2d) {
      zone.path2d = getPolygonsPath(zone)
    }
    if (highlight && highlightedNet != zone.net) continue
    ctx.fill(zone.path2d)
    if (zone.width > 0) {
      ctx.lineWidth = zone.width
      ctx.stroke(zone.path2d)
    }
  }
}

function clearCanvas(canvas, color = null) {
  var ctx = canvas.getContext('2d')
  ctx.save()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  if (color) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  } else {
    if (!window.matchMedia('print').matches)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  ctx.restore()
}

function drawNets(canvas, layer, highlight) {
  var style = getComputedStyle(topmostdiv)
  if (settings.renderTracks) {
    var trackColor = style.getPropertyValue(
      highlight ? '--track-color-highlight' : '--track-color',
    )
    drawTracks(canvas, layer, trackColor, highlight)
  }
  if (settings.renderZones) {
    var zoneColor = style.getPropertyValue(
      highlight ? '--zone-color-highlight' : '--zone-color',
    )
    drawZones(canvas, layer, zoneColor, highlight)
  }
  if (highlight && settings.renderPads) {
    var padColor = style.getPropertyValue('--pad-color-highlight')
    var padHoleColor = style.getPropertyValue('--pad-hole-color')
    var ctx = canvas.getContext('2d')
    for (var footprint of pcbdata.footprints) {
      // draw pads
      var padDrawn = false
      for (var pad of footprint.pads) {
        if (highlightedNet != pad.net) continue
        if (pad.layers.includes(layer)) {
          drawPad(ctx, pad, padColor, false)
          padDrawn = true
        }
      }
      if (padDrawn) {
        // redraw all pad holes because some pads may overlap
        for (var pad of footprint.pads) {
          drawPadHole(ctx, pad, padHoleColor)
        }
      }
    }
  }
}

function drawHighlightsOnLayer(canvasdict, clear = true) {
  if (clear) {
    clearCanvas(canvasdict.highlight)
  }
  if (markedFootprints.size > 0 || highlightedFootprints.length > 0) {
    drawFootprints(
      canvasdict.highlight,
      canvasdict.layer,
      canvasdict.transform.s * canvasdict.transform.zoom,
      true,
    )
  }
  if (highlightedNet !== null) {
    drawNets(canvasdict.highlight, canvasdict.layer, true)
  }
}

function drawHighlights() {
  drawHighlightsOnLayer(allcanvas.front)
  drawHighlightsOnLayer(allcanvas.back)
}

function drawBackground(canvasdict, clear = true) {
  if (clear) {
    clearCanvas(canvasdict.bg)
    clearCanvas(canvasdict.fab)
    clearCanvas(canvasdict.silk)
  }

  drawNets(canvasdict.bg, canvasdict.layer, false)
  drawFootprints(
    canvasdict.bg,
    canvasdict.layer,
    canvasdict.transform.s * canvasdict.transform.zoom,
    false,
  )

  drawEdgeCuts(canvasdict.bg, canvasdict.transform.s * canvasdict.transform.zoom)

  var style = getComputedStyle(topmostdiv)
  var edgeColor = style.getPropertyValue('--silkscreen-edge-color')
  var polygonColor = style.getPropertyValue('--silkscreen-polygon-color')
  var textColor = style.getPropertyValue('--silkscreen-text-color')
  if (settings.renderSilkscreen) {
    drawBgLayer(
      'silkscreen',
      canvasdict.silk,
      canvasdict.layer,
      canvasdict.transform.s * canvasdict.transform.zoom,
      edgeColor,
      polygonColor,
      textColor,
    )
  }
  edgeColor = style.getPropertyValue('--fabrication-edge-color')
  polygonColor = style.getPropertyValue('--fabrication-polygon-color')
  textColor = style.getPropertyValue('--fabrication-text-color')
  if (settings.renderFabrication) {
    drawBgLayer(
      'fabrication',
      canvasdict.fab,
      canvasdict.layer,
      canvasdict.transform.s * canvasdict.transform.zoom,
      edgeColor,
      polygonColor,
      textColor,
    )
  }
}

function prepareCanvas(canvas, flip, transform) {
  var ctx = canvas.getContext('2d')
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  var fontsize = 1.55
  ctx.scale(transform.zoom, transform.zoom)
  ctx.translate(transform.panx, transform.pany)
  if (flip) {
    ctx.scale(-1, 1)
  }
  ctx.translate(transform.x, transform.y)
  ctx.rotate(deg2rad(settings.boardRotation))
  ctx.scale(transform.s, transform.s)
}

function prepareLayer(canvasdict) {
  var flip = canvasdict.layer == 'B'
  for (var c of ['bg', 'fab', 'silk', 'highlight']) {
    prepareCanvas(canvasdict[c], flip, canvasdict.transform)
  }
}

function rotateVector(v, angle) {
  angle = deg2rad(angle)
  return [
    v[0] * Math.cos(angle) - v[1] * Math.sin(angle),
    v[0] * Math.sin(angle) + v[1] * Math.cos(angle),
  ]
}

function applyRotation(bbox) {
  var corners = [
    [bbox.minx, bbox.miny],
    [bbox.minx, bbox.maxy],
    [bbox.maxx, bbox.miny],
    [bbox.maxx, bbox.maxy],
  ]
  corners = corners.map(v => rotateVector(v, settings.boardRotation))
  return {
    minx: corners.reduce((a, v) => Math.min(a, v[0]), Infinity),
    miny: corners.reduce((a, v) => Math.min(a, v[1]), Infinity),
    maxx: corners.reduce((a, v) => Math.max(a, v[0]), -Infinity),
    maxy: corners.reduce((a, v) => Math.max(a, v[1]), -Infinity),
  }
}

function recalcLayerScale(layerdict, width, height) {
  var bbox = applyRotation(pcbdata.edges_bbox)
  var scalefactor =
    0.98 *
    Math.min(width / (bbox.maxx - bbox.minx), height / (bbox.maxy - bbox.miny))
  if (scalefactor < 0.1) {
    scalefactor = 1
  }
  layerdict.transform.s = scalefactor
  var flip = layerdict.layer == 'B'
  if (flip) {
    layerdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor + width) * 0.5
  } else {
    layerdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor - width) * 0.5
  }
  layerdict.transform.y = -((bbox.maxy + bbox.miny) * scalefactor - height) * 0.5
  for (var c of ['bg', 'fab', 'silk', 'highlight']) {
    canvas = layerdict[c]
    canvas.width = width
    canvas.height = height
    canvas.style.width = width / devicePixelRatio + 'px'
    canvas.style.height = height / devicePixelRatio + 'px'
  }
}

function redrawCanvas(layerdict) {
  prepareLayer(layerdict)
  drawBackground(layerdict)
  drawHighlightsOnLayer(layerdict)
}

function resizeCanvas(layerdict) {
  var canvasdivid = {
    F: 'frontcanvas',
    B: 'backcanvas',
  }[layerdict.layer]
  var width = document.getElementById(canvasdivid).clientWidth * devicePixelRatio
  var height = document.getElementById(canvasdivid).clientHeight * devicePixelRatio
  recalcLayerScale(layerdict, width, height)
  redrawCanvas(layerdict)
}

function resizeAll() {
  resizeCanvas(allcanvas.front)
  resizeCanvas(allcanvas.back)
}

function pointWithinDistanceToSegment(x, y, x1, y1, x2, y2, d) {
  var A = x - x1
  var B = y - y1
  var C = x2 - x1
  var D = y2 - y1

  var dot = A * C + B * D
  var len_sq = C * C + D * D
  var dx, dy
  if (len_sq == 0) {
    // start and end of the segment coincide
    dx = x - x1
    dy = y - y1
  } else {
    var param = dot / len_sq
    var xx, yy
    if (param < 0) {
      xx = x1
      yy = y1
    } else if (param > 1) {
      xx = x2
      yy = y2
    } else {
      xx = x1 + param * C
      yy = y1 + param * D
    }
    dx = x - xx
    dy = y - yy
  }
  return dx * dx + dy * dy <= d * d
}

function modulo(n, mod) {
  return ((n % mod) + mod) % mod
}

function pointWithinDistanceToArc(x, y, xc, yc, radius, startangle, endangle, d) {
  var dx = x - xc
  var dy = y - yc
  var r_sq = dx * dx + dy * dy
  var rmin = Math.max(0, radius - d)
  var rmax = radius + d

  if (r_sq < rmin * rmin || r_sq > rmax * rmax) return false

  var angle1 = modulo(deg2rad(startangle), 2 * Math.PI)
  var dx1 = xc + radius * Math.cos(angle1) - x
  var dy1 = yc + radius * Math.sin(angle1) - y
  if (dx1 * dx1 + dy1 * dy1 <= d * d) return true

  var angle2 = modulo(deg2rad(endangle), 2 * Math.PI)
  var dx2 = xc + radius * Math.cos(angle2) - x
  var dy2 = yc + radius * Math.sin(angle2) - y
  if (dx2 * dx2 + dy2 * dy2 <= d * d) return true

  var angle = modulo(Math.atan2(dy, dx), 2 * Math.PI)
  if (angle1 > angle2) return angle >= angle2 || angle <= angle1
  else return angle >= angle1 && angle <= angle2
}

function pointWithinPad(x, y, pad) {
  var v = [x - pad.pos[0], y - pad.pos[1]]
  v = rotateVector(v, -pad.angle)
  if (pad.offset) {
    v[0] -= pad.offset[0]
    v[1] -= pad.offset[1]
  }
  return emptyContext2d.isPointInPath(getCachedPadPath(pad), ...v)
}

function netHitScan(layer, x, y) {
  // Check track segments
  if (settings.renderTracks && pcbdata.tracks) {
    for (var track of pcbdata.tracks[layer]) {
      if ('radius' in track) {
        if (
          pointWithinDistanceToArc(
            x,
            y,
            ...track.center,
            track.radius,
            track.startangle,
            track.endangle,
            track.width / 2,
          )
        ) {
          return track.net
        }
      } else {
        if (
          pointWithinDistanceToSegment(
            x,
            y,
            ...track.start,
            ...track.end,
            track.width / 2,
          )
        ) {
          return track.net
        }
      }
    }
  }
  // Check pads
  if (settings.renderPads) {
    for (var footprint of pcbdata.footprints) {
      for (var pad of footprint.pads) {
        if (pad.layers.includes(layer) && pointWithinPad(x, y, pad)) {
          return pad.net
        }
      }
    }
  }
  return null
}

function pointWithinFootprintBbox(x, y, bbox) {
  var v = [x - bbox.pos[0], y - bbox.pos[1]]
  v = rotateVector(v, bbox.angle)
  return (
    bbox.relpos[0] <= v[0] &&
    v[0] <= bbox.relpos[0] + bbox.size[0] &&
    bbox.relpos[1] <= v[1] &&
    v[1] <= bbox.relpos[1] + bbox.size[1]
  )
}

function bboxHitScan(layer, x, y) {
  var result = []
  for (var i = 0; i < pcbdata.footprints.length; i++) {
    var footprint = pcbdata.footprints[i]
    if (footprint.layer == layer) {
      if (pointWithinFootprintBbox(x, y, footprint.bbox)) {
        result.push(i)
      }
    }
  }
  return result
}

function handlePointerDown(e, layerdict) {
  if (e.button != 0 && e.button != 1) {
    return
  }
  e.preventDefault()
  e.stopPropagation()

  if (!e.hasOwnProperty('offsetX')) {
    // The polyfill doesn't set this properly
    e.offsetX = e.pageX - e.currentTarget.offsetLeft
    e.offsetY = e.pageY - e.currentTarget.offsetTop
  }

  layerdict.pointerStates[e.pointerId] = {
    distanceTravelled: 0,
    lastX: e.offsetX,
    lastY: e.offsetY,
    downTime: Date.now(),
  }
}

function handleMouseClick(e, layerdict) {
  if (!e.hasOwnProperty('offsetX')) {
    // The polyfill doesn't set this properly
    e.offsetX = e.pageX - e.currentTarget.offsetLeft
    e.offsetY = e.pageY - e.currentTarget.offsetTop
  }

  var x = e.offsetX
  var y = e.offsetY
  var t = layerdict.transform
  if (layerdict.layer == 'B') {
    x = ((devicePixelRatio * x) / t.zoom - t.panx + t.x) / -t.s
  } else {
    x = ((devicePixelRatio * x) / t.zoom - t.panx - t.x) / t.s
  }
  y = ((devicePixelRatio * y) / t.zoom - t.y - t.pany) / t.s
  var v = rotateVector([x, y], -settings.boardRotation)
  if ('nets' in pcbdata) {
    var net = netHitScan(layerdict.layer, ...v)
    if (net !== highlightedNet) {
      netClicked(net)
    }
  }
  if (highlightedNet === null) {
    var footprints = bboxHitScan(layerdict.layer, ...v)
    if (footprints.length > 0) {
      footprintsClicked(footprints)
    }
  }
}

function handlePointerLeave(e, layerdict) {
  e.preventDefault()
  e.stopPropagation()

  if (!settings.redrawOnDrag) {
    redrawCanvas(layerdict)
  }

  delete layerdict.pointerStates[e.pointerId]
}

function resetTransform(layerdict) {
  layerdict.transform.panx = 0
  layerdict.transform.pany = 0
  layerdict.transform.zoom = 1
  redrawCanvas(layerdict)
}

function handlePointerUp(e, layerdict) {
  if (!e.hasOwnProperty('offsetX')) {
    // The polyfill doesn't set this properly
    e.offsetX = e.pageX - e.currentTarget.offsetLeft
    e.offsetY = e.pageY - e.currentTarget.offsetTop
  }

  e.preventDefault()
  e.stopPropagation()

  if (e.button == 2) {
    // Reset pan and zoom on right click.
    resetTransform(layerdict)
    layerdict.anotherPointerTapped = false
    return
  }

  // We haven't necessarily had a pointermove event since the interaction started, so make sure we update this now
  var ptr = layerdict.pointerStates[e.pointerId]
  ptr.distanceTravelled +=
    Math.abs(e.offsetX - ptr.lastX) + Math.abs(e.offsetY - ptr.lastY)

  if (
    e.button == 0 &&
    ptr.distanceTravelled < 10 &&
    Date.now() - ptr.downTime <= 500
  ) {
    if (Object.keys(layerdict.pointerStates).length == 1) {
      if (layerdict.anotherPointerTapped) {
        // This is the second pointer coming off of a two-finger tap
        resetTransform(layerdict)
      } else {
        // This is just a regular tap
        handleMouseClick(e, layerdict)
      }
      layerdict.anotherPointerTapped = false
    } else {
      // This is the first finger coming off of what could become a two-finger tap
      layerdict.anotherPointerTapped = true
    }
  } else {
    if (!settings.redrawOnDrag) {
      redrawCanvas(layerdict)
    }
    layerdict.anotherPointerTapped = false
  }

  delete layerdict.pointerStates[e.pointerId]
}

function handlePointerMove(e, layerdict) {
  if (!layerdict.pointerStates.hasOwnProperty(e.pointerId)) {
    return
  }
  e.preventDefault()
  e.stopPropagation()

  if (!e.hasOwnProperty('offsetX')) {
    // The polyfill doesn't set this properly
    e.offsetX = e.pageX - e.currentTarget.offsetLeft
    e.offsetY = e.pageY - e.currentTarget.offsetTop
  }

  var thisPtr = layerdict.pointerStates[e.pointerId]

  var dx = e.offsetX - thisPtr.lastX
  var dy = e.offsetY - thisPtr.lastY

  // If this number is low on pointer up, we count the action as a click
  thisPtr.distanceTravelled += Math.abs(dx) + Math.abs(dy)

  if (Object.keys(layerdict.pointerStates).length == 1) {
    // This is a simple drag
    layerdict.transform.panx += (devicePixelRatio * dx) / layerdict.transform.zoom
    layerdict.transform.pany += (devicePixelRatio * dy) / layerdict.transform.zoom
  } else if (Object.keys(layerdict.pointerStates).length == 2) {
    var otherPtr = Object.values(layerdict.pointerStates).filter(
      ptr => ptr != thisPtr,
    )[0]

    var oldDist = Math.sqrt(
      Math.pow(thisPtr.lastX - otherPtr.lastX, 2) +
        Math.pow(thisPtr.lastY - otherPtr.lastY, 2),
    )
    var newDist = Math.sqrt(
      Math.pow(e.offsetX - otherPtr.lastX, 2) +
        Math.pow(e.offsetY - otherPtr.lastY, 2),
    )

    var scaleFactor = newDist / oldDist

    if (scaleFactor != NaN) {
      layerdict.transform.zoom *= scaleFactor

      var zoomd = (1 - scaleFactor) / layerdict.transform.zoom
      layerdict.transform.panx += devicePixelRatio * otherPtr.lastX * zoomd
      layerdict.transform.pany += devicePixelRatio * otherPtr.lastY * zoomd
    }
  }

  thisPtr.lastX = e.offsetX
  thisPtr.lastY = e.offsetY

  if (settings.redrawOnDrag) {
    redrawCanvas(layerdict)
  }
}

function handleMouseWheel(e, layerdict) {
  e.preventDefault()
  e.stopPropagation()
  var t = layerdict.transform
  var wheeldelta = e.deltaY
  if (e.deltaMode == 1) {
    // FF only, scroll by lines
    wheeldelta *= 30
  } else if (e.deltaMode == 2) {
    wheeldelta *= 300
  }
  var m = Math.pow(1.1, -wheeldelta / 40)
  // Limit amount of zoom per tick.
  if (m > 2) {
    m = 2
  } else if (m < 0.5) {
    m = 0.5
  }
  t.zoom *= m
  var zoomd = (1 - m) / t.zoom
  t.panx += devicePixelRatio * e.offsetX * zoomd
  t.pany += devicePixelRatio * e.offsetY * zoomd
  redrawCanvas(layerdict)
}

function addMouseHandlers(div, layerdict) {
  div.addEventListener('pointerdown', function (e) {
    handlePointerDown(e, layerdict)
  })
  div.addEventListener('pointermove', function (e) {
    handlePointerMove(e, layerdict)
  })
  div.addEventListener('pointerup', function (e) {
    handlePointerUp(e, layerdict)
  })
  var pointerleave = function (e) {
    handlePointerLeave(e, layerdict)
  }
  div.addEventListener('pointercancel', pointerleave)
  div.addEventListener('pointerleave', pointerleave)
  div.addEventListener('pointerout', pointerleave)

  div.onwheel = function (e) {
    handleMouseWheel(e, layerdict)
  }
  for (var element of [
    div,
    layerdict.bg,
    layerdict.fab,
    layerdict.silk,
    layerdict.highlight,
  ]) {
    element.addEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault()
      },
      false,
    )
  }
}

function setRedrawOnDrag(value) {
  settings.redrawOnDrag = value
  writeStorage('redrawOnDrag', value)
}

function setBoardRotation(value) {
  settings.boardRotation = value * 5
  writeStorage('boardRotation', settings.boardRotation)
  document.getElementById('rotationDegree').textContent = settings.boardRotation
  resizeAll()
}

function initRender() {
  allcanvas = {
    front: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
      },
      pointerStates: {},
      anotherPointerTapped: false,
      bg: document.getElementById('F_bg'),
      fab: document.getElementById('F_fab'),
      silk: document.getElementById('F_slk'),
      highlight: document.getElementById('F_hl'),
      layer: 'F',
    },
    back: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
      },
      pointerStates: {},
      anotherPointerTapped: false,
      bg: document.getElementById('B_bg'),
      fab: document.getElementById('B_fab'),
      silk: document.getElementById('B_slk'),
      highlight: document.getElementById('B_hl'),
      layer: 'B',
    },
  }
  addMouseHandlers(document.getElementById('frontcanvas'), allcanvas.front)
  addMouseHandlers(document.getElementById('backcanvas'), allcanvas.back)
}
/*!
 * PEP v0.4.3 | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */
!(function (a, b) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = b())
    : 'function' == typeof define && define.amd
    ? define(b)
    : (a.PointerEventsPolyfill = b())
})(this, function () {
  'use strict'
  function a(a, b) {
    b = b || Object.create(null)
    var c = document.createEvent('Event')
    c.initEvent(a, b.bubbles || !1, b.cancelable || !1)
    for (var d, e = 2; e < m.length; e++) (d = m[e]), (c[d] = b[d] || n[e])
    c.buttons = b.buttons || 0
    var f = 0
    return (
      (f = b.pressure && c.buttons ? b.pressure : c.buttons ? 0.5 : 0),
      (c.x = c.clientX),
      (c.y = c.clientY),
      (c.pointerId = b.pointerId || 0),
      (c.width = b.width || 0),
      (c.height = b.height || 0),
      (c.pressure = f),
      (c.tiltX = b.tiltX || 0),
      (c.tiltY = b.tiltY || 0),
      (c.twist = b.twist || 0),
      (c.tangentialPressure = b.tangentialPressure || 0),
      (c.pointerType = b.pointerType || ''),
      (c.hwTimestamp = b.hwTimestamp || 0),
      (c.isPrimary = b.isPrimary || !1),
      c
    )
  }
  function b() {
    ;(this.array = []), (this.size = 0)
  }
  function c(a, b, c, d) {
    ;(this.addCallback = a.bind(d)),
      (this.removeCallback = b.bind(d)),
      (this.changedCallback = c.bind(d)),
      A && (this.observer = new A(this.mutationWatcher.bind(this)))
  }
  function d(a) {
    return 'body /shadow-deep/ ' + e(a)
  }
  function e(a) {
    return '[touch-action="' + a + '"]'
  }
  function f(a) {
    return '{ -ms-touch-action: ' + a + '; touch-action: ' + a + '; }'
  }
  function g() {
    if (F) {
      D.forEach(function (a) {
        String(a) === a
          ? ((E += e(a) + f(a) + '\n'), G && (E += d(a) + f(a) + '\n'))
          : ((E += a.selectors.map(e) + f(a.rule) + '\n'),
            G && (E += a.selectors.map(d) + f(a.rule) + '\n'))
      })
      var a = document.createElement('style')
      ;(a.textContent = E), document.head.appendChild(a)
    }
  }
  function h() {
    if (!window.PointerEvent) {
      if (((window.PointerEvent = a), window.navigator.msPointerEnabled)) {
        var b = window.navigator.msMaxTouchPoints
        Object.defineProperty(window.navigator, 'maxTouchPoints', {
          value: b,
          enumerable: !0,
        }),
          u.registerSource('ms', _)
      } else
        Object.defineProperty(window.navigator, 'maxTouchPoints', {
          value: 0,
          enumerable: !0,
        }),
          u.registerSource('mouse', N),
          void 0 !== window.ontouchstart && u.registerSource('touch', V)
      u.register(document)
    }
  }
  function i(a) {
    if (!u.pointermap.has(a)) {
      var b = new Error('InvalidPointerId')
      throw ((b.name = 'InvalidPointerId'), b)
    }
  }
  function j(a) {
    for (var b = a.parentNode; b && b !== a.ownerDocument; ) b = b.parentNode
    if (!b) {
      var c = new Error('InvalidStateError')
      throw ((c.name = 'InvalidStateError'), c)
    }
  }
  function k(a) {
    var b = u.pointermap.get(a)
    return 0 !== b.buttons
  }
  function l() {
    window.Element &&
      !Element.prototype.setPointerCapture &&
      Object.defineProperties(Element.prototype, {
        setPointerCapture: { value: W },
        releasePointerCapture: { value: X },
        hasPointerCapture: { value: Y },
      })
  }
  var m = [
      'bubbles',
      'cancelable',
      'view',
      'detail',
      'screenX',
      'screenY',
      'clientX',
      'clientY',
      'ctrlKey',
      'altKey',
      'shiftKey',
      'metaKey',
      'button',
      'relatedTarget',
      'pageX',
      'pageY',
    ],
    n = [!1, !1, null, null, 0, 0, 0, 0, !1, !1, !1, !1, 0, null, 0, 0],
    o = window.Map && window.Map.prototype.forEach,
    p = o ? Map : b
  b.prototype = {
    set: function (a, b) {
      return void 0 === b
        ? this['delete'](a)
        : (this.has(a) || this.size++, void (this.array[a] = b))
    },
    has: function (a) {
      return void 0 !== this.array[a]
    },
    delete: function (a) {
      this.has(a) && (delete this.array[a], this.size--)
    },
    get: function (a) {
      return this.array[a]
    },
    clear: function () {
      ;(this.array.length = 0), (this.size = 0)
    },
    forEach: function (a, b) {
      return this.array.forEach(function (c, d) {
        a.call(b, c, d, this)
      }, this)
    },
  }
  var q = [
      'bubbles',
      'cancelable',
      'view',
      'detail',
      'screenX',
      'screenY',
      'clientX',
      'clientY',
      'ctrlKey',
      'altKey',
      'shiftKey',
      'metaKey',
      'button',
      'relatedTarget',
      'buttons',
      'pointerId',
      'width',
      'height',
      'pressure',
      'tiltX',
      'tiltY',
      'pointerType',
      'hwTimestamp',
      'isPrimary',
      'type',
      'target',
      'currentTarget',
      'which',
      'pageX',
      'pageY',
      'timeStamp',
    ],
    r = [
      !1,
      !1,
      null,
      null,
      0,
      0,
      0,
      0,
      !1,
      !1,
      !1,
      !1,
      0,
      null,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      '',
      0,
      !1,
      '',
      null,
      null,
      0,
      0,
      0,
      0,
    ],
    s = { pointerover: 1, pointerout: 1, pointerenter: 1, pointerleave: 1 },
    t = 'undefined' != typeof SVGElementInstance,
    u = {
      pointermap: new p(),
      eventMap: Object.create(null),
      captureInfo: Object.create(null),
      eventSources: Object.create(null),
      eventSourceList: [],
      registerSource: function (a, b) {
        var c = b,
          d = c.events
        d &&
          (d.forEach(function (a) {
            c[a] && (this.eventMap[a] = c[a].bind(c))
          }, this),
          (this.eventSources[a] = c),
          this.eventSourceList.push(c))
      },
      register: function (a) {
        for (
          var b, c = this.eventSourceList.length, d = 0;
          d < c && (b = this.eventSourceList[d]);
          d++
        )
          b.register.call(b, a)
      },
      unregister: function (a) {
        for (
          var b, c = this.eventSourceList.length, d = 0;
          d < c && (b = this.eventSourceList[d]);
          d++
        )
          b.unregister.call(b, a)
      },
      contains: function (a, b) {
        try {
          return a.contains(b)
        } catch (c) {
          return !1
        }
      },
      down: function (a) {
        ;(a.bubbles = !0), this.fireEvent('pointerdown', a)
      },
      move: function (a) {
        ;(a.bubbles = !0), this.fireEvent('pointermove', a)
      },
      up: function (a) {
        ;(a.bubbles = !0), this.fireEvent('pointerup', a)
      },
      enter: function (a) {
        ;(a.bubbles = !1), this.fireEvent('pointerenter', a)
      },
      leave: function (a) {
        ;(a.bubbles = !1), this.fireEvent('pointerleave', a)
      },
      over: function (a) {
        ;(a.bubbles = !0), this.fireEvent('pointerover', a)
      },
      out: function (a) {
        ;(a.bubbles = !0), this.fireEvent('pointerout', a)
      },
      cancel: function (a) {
        ;(a.bubbles = !0), this.fireEvent('pointercancel', a)
      },
      leaveOut: function (a) {
        this.out(a), this.propagate(a, this.leave, !1)
      },
      enterOver: function (a) {
        this.over(a), this.propagate(a, this.enter, !0)
      },
      eventHandler: function (a) {
        if (!a._handledByPE) {
          var b = a.type,
            c = this.eventMap && this.eventMap[b]
          c && c(a), (a._handledByPE = !0)
        }
      },
      listen: function (a, b) {
        b.forEach(function (b) {
          this.addEvent(a, b)
        }, this)
      },
      unlisten: function (a, b) {
        b.forEach(function (b) {
          this.removeEvent(a, b)
        }, this)
      },
      addEvent: function (a, b) {
        a.addEventListener(b, this.boundHandler)
      },
      removeEvent: function (a, b) {
        a.removeEventListener(b, this.boundHandler)
      },
      makeEvent: function (b, c) {
        this.captureInfo[c.pointerId] && (c.relatedTarget = null)
        var d = new a(b, c)
        return (
          c.preventDefault && (d.preventDefault = c.preventDefault),
          (d._target = d._target || c.target),
          d
        )
      },
      fireEvent: function (a, b) {
        var c = this.makeEvent(a, b)
        return this.dispatchEvent(c)
      },
      cloneEvent: function (a) {
        for (var b, c = Object.create(null), d = 0; d < q.length; d++)
          (b = q[d]),
            (c[b] = a[b] || r[d]),
            !t ||
              ('target' !== b && 'relatedTarget' !== b) ||
              (c[b] instanceof SVGElementInstance &&
                (c[b] = c[b].correspondingUseElement))
        return (
          a.preventDefault &&
            (c.preventDefault = function () {
              a.preventDefault()
            }),
          c
        )
      },
      getTarget: function (a) {
        var b = this.captureInfo[a.pointerId]
        return b ? (a._target !== b && a.type in s ? void 0 : b) : a._target
      },
      propagate: function (a, b, c) {
        for (
          var d = a.target, e = [];
          d !== document && !d.contains(a.relatedTarget);

        )
          if ((e.push(d), (d = d.parentNode), !d)) return
        c && e.reverse(),
          e.forEach(function (c) {
            ;(a.target = c), b.call(this, a)
          }, this)
      },
      setCapture: function (b, c, d) {
        this.captureInfo[b] && this.releaseCapture(b, d),
          (this.captureInfo[b] = c),
          (this.implicitRelease = this.releaseCapture.bind(this, b, d)),
          document.addEventListener('pointerup', this.implicitRelease),
          document.addEventListener('pointercancel', this.implicitRelease)
        var e = new a('gotpointercapture')
        ;(e.pointerId = b), (e._target = c), d || this.asyncDispatchEvent(e)
      },
      releaseCapture: function (b, c) {
        var d = this.captureInfo[b]
        if (d) {
          ;(this.captureInfo[b] = void 0),
            document.removeEventListener('pointerup', this.implicitRelease),
            document.removeEventListener('pointercancel', this.implicitRelease)
          var e = new a('lostpointercapture')
          ;(e.pointerId = b), (e._target = d), c || this.asyncDispatchEvent(e)
        }
      },
      dispatchEvent: /*scope.external.dispatchEvent || */ function (a) {
        var b = this.getTarget(a)
        if (b) return b.dispatchEvent(a)
      },
      asyncDispatchEvent: function (a) {
        requestAnimationFrame(this.dispatchEvent.bind(this, a))
      },
    }
  u.boundHandler = u.eventHandler.bind(u)
  var v = {
      shadow: function (a) {
        if (a) return a.shadowRoot || a.webkitShadowRoot
      },
      canTarget: function (a) {
        return a && Boolean(a.elementFromPoint)
      },
      targetingShadow: function (a) {
        var b = this.shadow(a)
        if (this.canTarget(b)) return b
      },
      olderShadow: function (a) {
        var b = a.olderShadowRoot
        if (!b) {
          var c = a.querySelector('shadow')
          c && (b = c.olderShadowRoot)
        }
        return b
      },
      allShadows: function (a) {
        for (var b = [], c = this.shadow(a); c; )
          b.push(c), (c = this.olderShadow(c))
        return b
      },
      searchRoot: function (a, b, c) {
        if (a) {
          var d,
            e,
            f = a.elementFromPoint(b, c)
          for (e = this.targetingShadow(f); e; ) {
            if ((d = e.elementFromPoint(b, c))) {
              var g = this.targetingShadow(d)
              return this.searchRoot(g, b, c) || d
            }
            e = this.olderShadow(e)
          }
          return f
        }
      },
      owner: function (a) {
        for (var b = a; b.parentNode; ) b = b.parentNode
        return (
          b.nodeType !== Node.DOCUMENT_NODE &&
            b.nodeType !== Node.DOCUMENT_FRAGMENT_NODE &&
            (b = document),
          b
        )
      },
      findTarget: function (a) {
        var b = a.clientX,
          c = a.clientY,
          d = this.owner(a.target)
        return d.elementFromPoint(b, c) || (d = document), this.searchRoot(d, b, c)
      },
    },
    w = Array.prototype.forEach.call.bind(Array.prototype.forEach),
    x = Array.prototype.map.call.bind(Array.prototype.map),
    y = Array.prototype.slice.call.bind(Array.prototype.slice),
    z = Array.prototype.filter.call.bind(Array.prototype.filter),
    A = window.MutationObserver || window.WebKitMutationObserver,
    B = '[touch-action]',
    C = {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeOldValue: !0,
      attributeFilter: ['touch-action'],
    }
  c.prototype = {
    watchSubtree: function (a) {
      //
      this.observer && v.canTarget(a) && this.observer.observe(a, C)
    },
    enableOnSubtree: function (a) {
      this.watchSubtree(a),
        a === document && 'complete' !== document.readyState
          ? this.installOnLoad()
          : this.installNewSubtree(a)
    },
    installNewSubtree: function (a) {
      w(this.findElements(a), this.addElement, this)
    },
    findElements: function (a) {
      return a.querySelectorAll ? a.querySelectorAll(B) : []
    },
    removeElement: function (a) {
      this.removeCallback(a)
    },
    addElement: function (a) {
      this.addCallback(a)
    },
    elementChanged: function (a, b) {
      this.changedCallback(a, b)
    },
    concatLists: function (a, b) {
      return a.concat(y(b))
    },
    installOnLoad: function () {
      document.addEventListener(
        'readystatechange',
        function () {
          'complete' === document.readyState && this.installNewSubtree(document)
        }.bind(this),
      )
    },
    isElement: function (a) {
      return a.nodeType === Node.ELEMENT_NODE
    },
    flattenMutationTree: function (a) {
      var b = x(a, this.findElements, this)
      return b.push(z(a, this.isElement)), b.reduce(this.concatLists, [])
    },
    mutationWatcher: function (a) {
      a.forEach(this.mutationHandler, this)
    },
    mutationHandler: function (a) {
      if ('childList' === a.type) {
        var b = this.flattenMutationTree(a.addedNodes)
        b.forEach(this.addElement, this)
        var c = this.flattenMutationTree(a.removedNodes)
        c.forEach(this.removeElement, this)
      } else 'attributes' === a.type && this.elementChanged(a.target, a.oldValue)
    },
  }
  var D = [
      'none',
      'auto',
      'pan-x',
      'pan-y',
      { rule: 'pan-x pan-y', selectors: ['pan-x pan-y', 'pan-y pan-x'] },
    ],
    E = '',
    F = window.PointerEvent || window.MSPointerEvent,
    G = !window.ShadowDOMPolyfill && document.head.createShadowRoot,
    H = u.pointermap,
    I = 25,
    J = [1, 4, 2, 8, 16],
    K = !1
  try {
    K = 1 === new MouseEvent('test', { buttons: 1 }).buttons
  } catch (L) {}
  var M,
    N = {
      POINTER_ID: 1,
      POINTER_TYPE: 'mouse',
      events: ['mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout'],
      register: function (a) {
        u.listen(a, this.events)
      },
      unregister: function (a) {
        u.unlisten(a, this.events)
      },
      lastTouches: [],
      isEventSimulatedFromTouch: function (a) {
        for (
          var b,
            c = this.lastTouches,
            d = a.clientX,
            e = a.clientY,
            f = 0,
            g = c.length;
          f < g && (b = c[f]);
          f++
        ) {
          var h = Math.abs(d - b.x),
            i = Math.abs(e - b.y)
          if (h <= I && i <= I) return !0
        }
      },
      prepareEvent: function (a) {
        var b = u.cloneEvent(a),
          c = b.preventDefault
        return (
          (b.preventDefault = function () {
            a.preventDefault(), c()
          }),
          (b.pointerId = this.POINTER_ID),
          (b.isPrimary = !0),
          (b.pointerType = this.POINTER_TYPE),
          b
        )
      },
      prepareButtonsForMove: function (a, b) {
        var c = H.get(this.POINTER_ID)
        0 !== b.which && c ? (a.buttons = c.buttons) : (a.buttons = 0),
          (b.buttons = a.buttons)
      },
      mousedown: function (a) {
        if (!this.isEventSimulatedFromTouch(a)) {
          var b = H.get(this.POINTER_ID),
            c = this.prepareEvent(a)
          K ||
            ((c.buttons = J[c.button]),
            b && (c.buttons |= b.buttons),
            (a.buttons = c.buttons)),
            H.set(this.POINTER_ID, a),
            b && 0 !== b.buttons ? u.move(c) : u.down(c)
        }
      },
      mousemove: function (a) {
        if (!this.isEventSimulatedFromTouch(a)) {
          var b = this.prepareEvent(a)
          K || this.prepareButtonsForMove(b, a),
            (b.button = -1),
            H.set(this.POINTER_ID, a),
            u.move(b)
        }
      },
      mouseup: function (a) {
        if (!this.isEventSimulatedFromTouch(a)) {
          var b = H.get(this.POINTER_ID),
            c = this.prepareEvent(a)
          if (!K) {
            var d = J[c.button]
            ;(c.buttons = b ? b.buttons & ~d : 0), (a.buttons = c.buttons)
          }
          H.set(this.POINTER_ID, a),
            (c.buttons &= ~J[c.button]),
            0 === c.buttons ? u.up(c) : u.move(c)
        }
      },
      mouseover: function (a) {
        if (!this.isEventSimulatedFromTouch(a)) {
          var b = this.prepareEvent(a)
          K || this.prepareButtonsForMove(b, a),
            (b.button = -1),
            H.set(this.POINTER_ID, a),
            u.enterOver(b)
        }
      },
      mouseout: function (a) {
        if (!this.isEventSimulatedFromTouch(a)) {
          var b = this.prepareEvent(a)
          K || this.prepareButtonsForMove(b, a), (b.button = -1), u.leaveOut(b)
        }
      },
      cancel: function (a) {
        var b = this.prepareEvent(a)
        u.cancel(b), this.deactivateMouse()
      },
      deactivateMouse: function () {
        H['delete'](this.POINTER_ID)
      },
    },
    O = u.captureInfo,
    P = v.findTarget.bind(v),
    Q = v.allShadows.bind(v),
    R = u.pointermap,
    S = 2500,
    T = 200,
    U = 'touch-action',
    V = {
      events: ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
      register: function (a) {
        M.enableOnSubtree(a)
      },
      unregister: function () {},
      elementAdded: function (a) {
        var b = a.getAttribute(U),
          c = this.touchActionToScrollType(b)
        c &&
          ((a._scrollType = c),
          u.listen(a, this.events),
          Q(a).forEach(function (a) {
            ;(a._scrollType = c), u.listen(a, this.events)
          }, this))
      },
      elementRemoved: function (a) {
        ;(a._scrollType = void 0),
          u.unlisten(a, this.events),
          Q(a).forEach(function (a) {
            ;(a._scrollType = void 0), u.unlisten(a, this.events)
          }, this)
      },
      elementChanged: function (a, b) {
        var c = a.getAttribute(U),
          d = this.touchActionToScrollType(c),
          e = this.touchActionToScrollType(b)
        d && e
          ? ((a._scrollType = d),
            Q(a).forEach(function (a) {
              a._scrollType = d
            }, this))
          : e
          ? this.elementRemoved(a)
          : d && this.elementAdded(a)
      },
      scrollTypes: {
        EMITTER: 'none',
        XSCROLLER: 'pan-x',
        YSCROLLER: 'pan-y',
        SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/,
      },
      touchActionToScrollType: function (a) {
        var b = a,
          c = this.scrollTypes
        return 'none' === b
          ? 'none'
          : b === c.XSCROLLER
          ? 'X'
          : b === c.YSCROLLER
          ? 'Y'
          : c.SCROLLER.exec(b)
          ? 'XY'
          : void 0
      },
      POINTER_TYPE: 'touch',
      firstTouch: null,
      isPrimaryTouch: function (a) {
        return this.firstTouch === a.identifier
      },
      setPrimaryTouch: function (a) {
        ;(0 === R.size || (1 === R.size && R.has(1))) &&
          ((this.firstTouch = a.identifier),
          (this.firstXY = { X: a.clientX, Y: a.clientY }),
          (this.scrolling = !1),
          this.cancelResetClickCount())
      },
      removePrimaryPointer: function (a) {
        a.isPrimary &&
          ((this.firstTouch = null), (this.firstXY = null), this.resetClickCount())
      },
      clickCount: 0,
      resetId: null,
      resetClickCount: function () {
        var a = function () {
          ;(this.clickCount = 0), (this.resetId = null)
        }.bind(this)
        this.resetId = setTimeout(a, T)
      },
      cancelResetClickCount: function () {
        this.resetId && clearTimeout(this.resetId)
      },
      typeToButtons: function (a) {
        var b = 0
        return ('touchstart' !== a && 'touchmove' !== a) || (b = 1), b
      },
      touchToPointer: function (a) {
        var b = this.currentTouchEvent,
          c = u.cloneEvent(a),
          d = (c.pointerId = a.identifier + 2)
        ;(c.target = O[d] || P(c)),
          (c.bubbles = !0),
          (c.cancelable = !0),
          (c.detail = this.clickCount),
          (c.button = 0),
          (c.buttons = this.typeToButtons(b.type)),
          (c.width = 2 * (a.radiusX || a.webkitRadiusX || 0)),
          (c.height = 2 * (a.radiusY || a.webkitRadiusY || 0)),
          (c.pressure = a.force || a.webkitForce || 0.5),
          (c.isPrimary = this.isPrimaryTouch(a)),
          (c.pointerType = this.POINTER_TYPE),
          (c.altKey = b.altKey),
          (c.ctrlKey = b.ctrlKey),
          (c.metaKey = b.metaKey),
          (c.shiftKey = b.shiftKey)
        var e = this
        return (
          (c.preventDefault = function () {
            ;(e.scrolling = !1), (e.firstXY = null), b.preventDefault()
          }),
          c
        )
      },
      processTouches: function (a, b) {
        var c = a.changedTouches
        this.currentTouchEvent = a
        for (var d, e = 0; e < c.length; e++)
          (d = c[e]), b.call(this, this.touchToPointer(d))
      },
      shouldScroll: function (a) {
        if (this.firstXY) {
          var b,
            c = a.currentTarget._scrollType
          if ('none' === c) b = !1
          else if ('XY' === c) b = !0
          else {
            var d = a.changedTouches[0],
              e = c,
              f = 'Y' === c ? 'X' : 'Y',
              g = Math.abs(d['client' + e] - this.firstXY[e]),
              h = Math.abs(d['client' + f] - this.firstXY[f])
            b = g >= h
          }
          return (this.firstXY = null), b
        }
      },
      findTouch: function (a, b) {
        for (var c, d = 0, e = a.length; d < e && (c = a[d]); d++)
          if (c.identifier === b) return !0
      },
      vacuumTouches: function (a) {
        var b = a.touches
        if (R.size >= b.length) {
          var c = []
          R.forEach(function (a, d) {
            if (1 !== d && !this.findTouch(b, d - 2)) {
              var e = a.out
              c.push(e)
            }
          }, this),
            c.forEach(this.cancelOut, this)
        }
      },
      touchstart: function (a) {
        this.vacuumTouches(a),
          this.setPrimaryTouch(a.changedTouches[0]),
          this.dedupSynthMouse(a),
          this.scrolling ||
            (this.clickCount++, this.processTouches(a, this.overDown))
      },
      overDown: function (a) {
        R.set(a.pointerId, { target: a.target, out: a, outTarget: a.target }),
          u.enterOver(a),
          u.down(a)
      },
      touchmove: function (a) {
        this.scrolling ||
          (this.shouldScroll(a)
            ? ((this.scrolling = !0), this.touchcancel(a))
            : (a.preventDefault(), this.processTouches(a, this.moveOverOut)))
      },
      moveOverOut: function (a) {
        var b = a,
          c = R.get(b.pointerId)
        if (c) {
          var d = c.out,
            e = c.outTarget
          u.move(b),
            d &&
              e !== b.target &&
              ((d.relatedTarget = b.target),
              (b.relatedTarget = e),
              (d.target = e),
              b.target
                ? (u.leaveOut(d), u.enterOver(b))
                : ((b.target = e), (b.relatedTarget = null), this.cancelOut(b))),
            (c.out = b),
            (c.outTarget = b.target)
        }
      },
      touchend: function (a) {
        this.dedupSynthMouse(a), this.processTouches(a, this.upOut)
      },
      upOut: function (a) {
        this.scrolling || (u.up(a), u.leaveOut(a)), this.cleanUpPointer(a)
      },
      touchcancel: function (a) {
        this.processTouches(a, this.cancelOut)
      },
      cancelOut: function (a) {
        u.cancel(a), u.leaveOut(a), this.cleanUpPointer(a)
      },
      cleanUpPointer: function (a) {
        R['delete'](a.pointerId), this.removePrimaryPointer(a)
      },
      dedupSynthMouse: function (a) {
        var b = N.lastTouches,
          c = a.changedTouches[0]
        if (this.isPrimaryTouch(c)) {
          var d = { x: c.clientX, y: c.clientY }
          b.push(d)
          var e = function (a, b) {
            var c = a.indexOf(b)
            c > -1 && a.splice(c, 1)
          }.bind(null, b, d)
          setTimeout(e, S)
        }
      },
    }
  M = new c(V.elementAdded, V.elementRemoved, V.elementChanged, V)
  var W,
    X,
    Y,
    Z = u.pointermap,
    $ =
      window.MSPointerEvent &&
      'number' == typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,
    _ = {
      events: [
        'MSPointerDown',
        'MSPointerMove',
        'MSPointerUp',
        'MSPointerOut',
        'MSPointerOver',
        'MSPointerCancel',
        'MSGotPointerCapture',
        'MSLostPointerCapture',
      ],
      register: function (a) {
        u.listen(a, this.events)
      },
      unregister: function (a) {
        u.unlisten(a, this.events)
      },
      POINTER_TYPES: ['', 'unavailable', 'touch', 'pen', 'mouse'],
      prepareEvent: function (a) {
        var b = a
        return (
          $ &&
            ((b = u.cloneEvent(a)),
            (b.pointerType = this.POINTER_TYPES[a.pointerType])),
          b
        )
      },
      cleanup: function (a) {
        Z['delete'](a)
      },
      MSPointerDown: function (a) {
        Z.set(a.pointerId, a)
        var b = this.prepareEvent(a)
        u.down(b)
      },
      MSPointerMove: function (a) {
        var b = this.prepareEvent(a)
        u.move(b)
      },
      MSPointerUp: function (a) {
        var b = this.prepareEvent(a)
        u.up(b), this.cleanup(a.pointerId)
      },
      MSPointerOut: function (a) {
        var b = this.prepareEvent(a)
        u.leaveOut(b)
      },
      MSPointerOver: function (a) {
        var b = this.prepareEvent(a)
        u.enterOver(b)
      },
      MSPointerCancel: function (a) {
        var b = this.prepareEvent(a)
        u.cancel(b), this.cleanup(a.pointerId)
      },
      MSLostPointerCapture: function (a) {
        var b = u.makeEvent('lostpointercapture', a)
        u.dispatchEvent(b)
      },
      MSGotPointerCapture: function (a) {
        var b = u.makeEvent('gotpointercapture', a)
        u.dispatchEvent(b)
      },
    },
    aa = window.navigator
  aa.msPointerEnabled
    ? ((W = function (a) {
        i(a),
          j(this),
          k(a) && (u.setCapture(a, this, !0), this.msSetPointerCapture(a))
      }),
      (X = function (a) {
        i(a), u.releaseCapture(a, !0), this.msReleasePointerCapture(a)
      }))
    : ((W = function (a) {
        i(a), j(this), k(a) && u.setCapture(a, this)
      }),
      (X = function (a) {
        i(a), u.releaseCapture(a)
      })),
    (Y = function (a) {
      return !!u.captureInfo[a]
    }),
    g(),
    h(),
    l()
  var ba = {
    dispatcher: u,
    Installer: c,
    PointerEvent: a,
    PointerMap: p,
    targetFinding: v,
  }
  return ba
})
// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString = (function () {
  var o = String.fromCharCode,
    i = {}
  var n = {
    decompressFromBase64: function (o) {
      return null == o
        ? ''
        : '' == o
        ? null
        : n._decompress(o.length, 32, function (n) {
            return (function (o, n) {
              if (!i[o]) {
                i[o] = {}
                for (var t = 0; t < o.length; t++) i[o][o.charAt(t)] = t
              }
              return i[o][n]
            })(
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
              o.charAt(n),
            )
          })
    },
    _decompress: function (i, n, t) {
      var r,
        e,
        a,
        s,
        p,
        u,
        l,
        f = [],
        c = 4,
        d = 4,
        h = 3,
        v = '',
        g = [],
        m = { val: t(0), position: n, index: 1 }
      for (r = 0; r < 3; r += 1) f[r] = r
      for (a = 0, p = Math.pow(2, 2), u = 1; u != p; )
        (s = m.val & m.position),
          (m.position >>= 1),
          0 == m.position && ((m.position = n), (m.val = t(m.index++))),
          (a |= (s > 0 ? 1 : 0) * u),
          (u <<= 1)
      switch (a) {
        case 0:
          for (a = 0, p = Math.pow(2, 8), u = 1; u != p; )
            (s = m.val & m.position),
              (m.position >>= 1),
              0 == m.position && ((m.position = n), (m.val = t(m.index++))),
              (a |= (s > 0 ? 1 : 0) * u),
              (u <<= 1)
          l = o(a)
          break
        case 1:
          for (a = 0, p = Math.pow(2, 16), u = 1; u != p; )
            (s = m.val & m.position),
              (m.position >>= 1),
              0 == m.position && ((m.position = n), (m.val = t(m.index++))),
              (a |= (s > 0 ? 1 : 0) * u),
              (u <<= 1)
          l = o(a)
          break
        case 2:
          return ''
      }
      for (f[3] = l, e = l, g.push(l); ; ) {
        if (m.index > i) return ''
        for (a = 0, p = Math.pow(2, h), u = 1; u != p; )
          (s = m.val & m.position),
            (m.position >>= 1),
            0 == m.position && ((m.position = n), (m.val = t(m.index++))),
            (a |= (s > 0 ? 1 : 0) * u),
            (u <<= 1)
        switch ((l = a)) {
          case 0:
            for (a = 0, p = Math.pow(2, 8), u = 1; u != p; )
              (s = m.val & m.position),
                (m.position >>= 1),
                0 == m.position && ((m.position = n), (m.val = t(m.index++))),
                (a |= (s > 0 ? 1 : 0) * u),
                (u <<= 1)
            ;(f[d++] = o(a)), (l = d - 1), c--
            break
          case 1:
            for (a = 0, p = Math.pow(2, 16), u = 1; u != p; )
              (s = m.val & m.position),
                (m.position >>= 1),
                0 == m.position && ((m.position = n), (m.val = t(m.index++))),
                (a |= (s > 0 ? 1 : 0) * u),
                (u <<= 1)
            ;(f[d++] = o(a)), (l = d - 1), c--
            break
          case 2:
            return g.join('')
        }
        if ((0 == c && ((c = Math.pow(2, h)), h++), f[l])) v = f[l]
        else {
          if (l !== d) return null
          v = e + e.charAt(0)
        }
        g.push(v),
          (f[d++] = e + v.charAt(0)),
          (e = v),
          0 == --c && ((c = Math.pow(2, h)), h++)
      }
    },
  }
  return n
})()
'function' == typeof define && define.amd
  ? define(function () {
      return LZString
    })
  : 'undefined' != typeof module && null != module
  ? (module.exports = LZString)
  : 'undefined' != typeof angular &&
    null != angular &&
    angular.module('LZString', []).factory('LZString', function () {
      return LZString
    })
/*
 * Table reordering via Drag'n'Drop
 * Inspired by: https://htmldom.dev/drag-and-drop-table-column
 */

function setBomHandlers() {
  const bom = document.getElementById('bomtable')

  let dragName
  let placeHolderElements
  let draggingElement
  let forcePopulation
  let xOffset
  let yOffset
  let wasDragged

  const mouseUpHandler = function (e) {
    // Delete dragging element
    draggingElement.remove()

    // Make BOM selectable again
    bom.style.removeProperty('userSelect')

    // Remove listeners
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)

    if (wasDragged) {
      // Redraw whole BOM
      populateBomTable()
    }
  }

  const mouseMoveHandler = function (e) {
    // Notice the dragging
    wasDragged = true

    // Make the dragged element visible
    draggingElement.style.removeProperty('display')

    // Set elements position to mouse position
    draggingElement.style.left = `${e.screenX - xOffset}px`
    draggingElement.style.top = `${e.screenY - yOffset}px`

    // Forced redrawing of BOM table
    if (forcePopulation) {
      forcePopulation = false
      // Copy array
      phe = Array.from(placeHolderElements)
      // populate BOM table again
      populateBomHeader(dragName, phe)
      populateBomBody(dragName, phe)
    }

    // Set up array of hidden columns
    var hiddenColumns = Array.from(settings.hiddenColumns)
    // In the ungrouped mode, quantity don't exist
    if (settings.bommode === 'ungrouped') hiddenColumns.push('Quantity')
    // If no checkbox fields can be found, we consider them hidden
    if (settings.checkboxes.length == 0) hiddenColumns.push('checkboxes')

    // Get table headers and group them into checkboxes, extrafields and normal headers
    const bh = document.getElementById('bomhead')
    headers = Array.from(bh.querySelectorAll('th'))
    headers.shift() // numCol is not part of the columnOrder
    headerGroups = []
    lastCompoundClass = null
    for (i = 0; i < settings.columnOrder.length; i++) {
      cElem = settings.columnOrder[i]
      if (hiddenColumns.includes(cElem)) {
        // Hidden columns appear as a dummy element
        headerGroups.push([])
        continue
      }
      elem = headers.filter(e => getColumnOrderName(e) === cElem)[0]
      if (elem.classList.contains('bom-checkbox')) {
        if (lastCompoundClass === 'bom-checkbox') {
          cbGroup = headerGroups.pop()
          cbGroup.push(elem)
          headerGroups.push(cbGroup)
        } else {
          lastCompoundClass = 'bom-checkbox'
          headerGroups.push([elem])
        }
      } else {
        headerGroups.push([elem])
      }
    }

    // Copy settings.columnOrder
    var columns = Array.from(settings.columnOrder)

    // Set up array with indices of hidden columns
    var hiddenIndices = hiddenColumns.map(e => settings.columnOrder.indexOf(e))
    var dragIndex = columns.indexOf(dragName)
    var swapIndex = dragIndex
    var swapDone = false

    // Check if the current dragged element is swapable with the left or right element
    if (dragIndex > 0) {
      // Get left headers boundingbox
      swapIndex = dragIndex - 1
      while (hiddenIndices.includes(swapIndex) && swapIndex > 0) swapIndex--
      if (!hiddenIndices.includes(swapIndex)) {
        box = getBoundingClientRectFromMultiple(headerGroups[swapIndex])
        if (e.clientX < box.left + window.scrollX + box.width / 2) {
          swapElement = columns[dragIndex]
          columns.splice(dragIndex, 1)
          columns.splice(swapIndex, 0, swapElement)
          forcePopulation = true
          swapDone = true
        }
      }
    }
    if (!swapDone && dragIndex < headerGroups.length - 1) {
      // Get right headers boundingbox
      swapIndex = dragIndex + 1
      while (hiddenIndices.includes(swapIndex)) swapIndex++
      if (swapIndex < headerGroups.length) {
        box = getBoundingClientRectFromMultiple(headerGroups[swapIndex])
        if (e.clientX > box.left + window.scrollX + box.width / 2) {
          swapElement = columns[dragIndex]
          columns.splice(dragIndex, 1)
          columns.splice(swapIndex, 0, swapElement)
          forcePopulation = true
          swapDone = true
        }
      }
    }

    // Write back change to storage
    if (swapDone) {
      settings.columnOrder = columns
      writeStorage('columnOrder', JSON.stringify(columns))
    }
  }

  const mouseDownHandler = function (e) {
    var target = e.target
    if (target.tagName.toLowerCase() != 'td') target = target.parentElement

    // Used to check if a dragging has ever happened
    wasDragged = false

    // Create new element which will be displayed as the dragged column
    draggingElement = document.createElement('div')
    draggingElement.classList.add('dragging')
    draggingElement.style.display = 'none'
    draggingElement.style.position = 'absolute'
    draggingElement.style.overflow = 'hidden'

    // Get bomhead and bombody elements
    const bh = document.getElementById('bomhead')
    const bb = document.getElementById('bombody')

    // Get all compound headers for the current column
    var compoundHeaders
    if (target.classList.contains('bom-checkbox')) {
      compoundHeaders = Array.from(bh.querySelectorAll('th.bom-checkbox'))
    } else {
      compoundHeaders = [target]
    }

    // Create new table which will display the column
    var newTable = document.createElement('table')
    newTable.classList.add('bom')
    newTable.style.background = 'white'
    draggingElement.append(newTable)

    // Create new header element
    var newHeader = document.createElement('thead')
    newTable.append(newHeader)

    // Set up array for storing all placeholder elements
    placeHolderElements = []

    // Add all compound headers to the new thead element and placeholders
    compoundHeaders.forEach(function (h) {
      clone = cloneElementWithDimensions(h)
      newHeader.append(clone)
      placeHolderElements.push(clone)
    })

    // Create new body element
    var newBody = document.createElement('tbody')
    newTable.append(newBody)

    // Get indices for compound headers
    var idxs = compoundHeaders.map(e => getBomTableHeaderIndex(e))

    // For each row in the BOM body...
    var rows = bb.querySelectorAll('tr')
    rows.forEach(function (row) {
      // ..get the cells for the compound column
      const tds = row.querySelectorAll('td')
      var copytds = idxs.map(i => tds[i])
      // Add them to the new element and the placeholders
      var newRow = document.createElement('tr')
      copytds.forEach(function (td) {
        clone = cloneElementWithDimensions(td)
        newRow.append(clone)
        placeHolderElements.push(clone)
      })
      newBody.append(newRow)
    })

    // Compute width for compound header
    var width = compoundHeaders.reduce((acc, x) => acc + x.clientWidth, 0)
    draggingElement.style.width = `${width}px`

    // Insert the new dragging element and disable selection on BOM
    bom.insertBefore(draggingElement, null)
    bom.style.userSelect = 'none'

    // Determine the mouse position offset
    xOffset =
      e.screenX -
      compoundHeaders.reduce(
        (acc, x) => Math.min(acc, x.offsetLeft),
        compoundHeaders[0].offsetLeft,
      )
    yOffset = e.screenY - compoundHeaders[0].offsetTop

    // Get name for the column in settings.columnOrder
    dragName = getColumnOrderName(target)

    // Change text and class for placeholder elements
    placeHolderElements = placeHolderElements.map(function (e) {
      newElem = cloneElementWithDimensions(e)
      newElem.textContent = ''
      newElem.classList.add('placeholder')
      return newElem
    })

    // On next mouse move, the whole BOM needs to be redrawn to show the placeholders
    forcePopulation = true

    // Add listeners for move and up on mouse
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  // In netlist mode, there is nothing to reorder
  if (settings.bommode === 'netlist') return

  // Add mouseDownHandler to every column except the numCol
  bom.querySelectorAll('th').forEach(function (head) {
    if (!head.classList.contains('numCol')) {
      head.onmousedown = mouseDownHandler
    }
  })
}

function getBoundingClientRectFromMultiple(elements) {
  var elems = Array.from(elements)

  if (elems.length == 0) return null

  var box = elems.shift().getBoundingClientRect()

  elems.forEach(function (elem) {
    var elembox = elem.getBoundingClientRect()
    box.left = Math.min(elembox.left, box.left)
    box.top = Math.min(elembox.top, box.top)
    box.width += elembox.width
    box.height = Math.max(elembox.height, box.height)
  })

  return box
}

function cloneElementWithDimensions(elem) {
  var newElem = elem.cloneNode(true)
  newElem.style.height = window.getComputedStyle(elem).height
  newElem.style.width = window.getComputedStyle(elem).width
  return newElem
}

function getBomTableHeaderIndex(elem) {
  const bh = document.getElementById('bomhead')
  const ths = Array.from(bh.querySelectorAll('th'))
  return ths.indexOf(elem)
}

function getColumnOrderName(elem) {
  var cname = elem.getAttribute('col_name')
  if (cname === 'bom-checkbox') return 'checkboxes'
  else return cname
}

function resizableGrid(tablehead) {
  var cols = tablehead.firstElementChild.children
  var rowWidth = tablehead.offsetWidth

  for (var i = 1; i < cols.length; i++) {
    if (cols[i].classList.contains('bom-checkbox')) continue
    cols[i].style.width =
      ((cols[i].clientWidth - paddingDiff(cols[i])) * 100) / rowWidth + '%'
  }

  for (var i = 1; i < cols.length - 1; i++) {
    var div = document.createElement('div')
    div.className = 'column-width-handle'
    cols[i].appendChild(div)
    setListeners(div)
  }

  function setListeners(div) {
    var startX, curCol, nxtCol, curColWidth, nxtColWidth, rowWidth

    div.addEventListener('mousedown', function (e) {
      e.preventDefault()
      e.stopPropagation()

      curCol = e.target.parentElement
      nxtCol = curCol.nextElementSibling
      startX = e.pageX

      var padding = paddingDiff(curCol)

      rowWidth = curCol.parentElement.offsetWidth
      curColWidth = curCol.clientWidth - padding
      nxtColWidth = nxtCol.clientWidth - padding
    })

    document.addEventListener('mousemove', function (e) {
      if (startX) {
        var diffX = e.pageX - startX
        diffX = -Math.min(-diffX, curColWidth - 20)
        diffX = Math.min(diffX, nxtColWidth - 20)

        curCol.style.width = ((curColWidth + diffX) * 100) / rowWidth + '%'
        nxtCol.style.width = ((nxtColWidth - diffX) * 100) / rowWidth + '%'
        console.log(
          `${curColWidth + nxtColWidth} ${
            ((curColWidth + diffX) * 100) / rowWidth +
            ((nxtColWidth - diffX) * 100) / rowWidth
          }`,
        )
      }
    })

    document.addEventListener('mouseup', function (e) {
      curCol = undefined
      nxtCol = undefined
      startX = undefined
      nxtColWidth = undefined
      curColWidth = undefined
    })
  }

  function paddingDiff(col) {
    if (getStyleVal(col, 'box-sizing') == 'border-box') {
      return 0
    }

    var padLeft = getStyleVal(col, 'padding-left')
    var padRight = getStyleVal(col, 'padding-right')
    return parseInt(padLeft) + parseInt(padRight)
  }

  function getStyleVal(elm, css) {
    return window.getComputedStyle(elm, null).getPropertyValue(css)
  }
}
/* DOM manipulation and misc code */

var bomsplit
var canvassplit
var initDone = false
var bomSortFunction = null
var currentSortColumn = null
var currentSortOrder = null
var currentHighlightedRowId
var highlightHandlers = []
var footprintIndexToHandler = {}
var netsToHandler = {}
var markedFootprints = new Set()
var highlightedFootprints = []
var highlightedNet = null
var lastClicked

function dbg(html) {
  dbgdiv.innerHTML = html
}

function redrawIfInitDone() {
  if (initDone) {
    redrawCanvas(allcanvas.front)
    redrawCanvas(allcanvas.back)
  }
}

function padsVisible(value) {
  writeStorage('padsVisible', value)
  settings.renderPads = value
  redrawIfInitDone()
}

function referencesVisible(value) {
  writeStorage('referencesVisible', value)
  settings.renderReferences = value
  redrawIfInitDone()
}

function valuesVisible(value) {
  writeStorage('valuesVisible', value)
  settings.renderValues = value
  redrawIfInitDone()
}

function tracksVisible(value) {
  writeStorage('tracksVisible', value)
  settings.renderTracks = value
  redrawIfInitDone()
}

function zonesVisible(value) {
  writeStorage('zonesVisible', value)
  settings.renderZones = value
  redrawIfInitDone()
}

function dnpOutline(value) {
  writeStorage('dnpOutline', value)
  settings.renderDnpOutline = value
  redrawIfInitDone()
}

function setDarkMode(value) {
  if (value) {
    topmostdiv.classList.add('dark')
  } else {
    topmostdiv.classList.remove('dark')
  }
  writeStorage('darkmode', value)
  settings.darkMode = value
  redrawIfInitDone()
}

function setShowBOMColumn(field, value) {
  if (field === 'references') {
    var rl = document.getElementById('reflookup')
    rl.disabled = !value
    if (!value) {
      rl.value = ''
      updateRefLookup('')
    }
  }

  var n = settings.hiddenColumns.indexOf(field)
  if (value) {
    if (n != -1) {
      settings.hiddenColumns.splice(n, 1)
    }
  } else {
    if (n == -1) {
      settings.hiddenColumns.push(field)
    }
  }

  writeStorage('hiddenColumns', JSON.stringify(settings.hiddenColumns))

  if (initDone) {
    populateBomTable()
  }

  redrawIfInitDone()
}

function setFullscreen(value) {
  if (value) {
    document.getElementById('topmostdiv').requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

function fabricationVisible(value) {
  writeStorage('fabricationVisible', value)
  settings.renderFabrication = value
  redrawIfInitDone()
}

function silkscreenVisible(value) {
  writeStorage('silkscreenVisible', value)
  settings.renderSilkscreen = value
  redrawIfInitDone()
}

function setHighlightPin1(value) {
  writeStorage('highlightpin1', value)
  settings.highlightpin1 = value
  redrawIfInitDone()
}

function getStoredCheckboxRefs(checkbox) {
  function convert(ref) {
    var intref = parseInt(ref)
    if (isNaN(intref)) {
      for (var i = 0; i < pcbdata.footprints.length; i++) {
        if (pcbdata.footprints[i].ref == ref) {
          return i
        }
      }
      return -1
    } else {
      return intref
    }
  }
  if (!(checkbox in settings.checkboxStoredRefs)) {
    var val = readStorage('checkbox_' + checkbox)
    settings.checkboxStoredRefs[checkbox] = val ? val : ''
  }
  if (!settings.checkboxStoredRefs[checkbox]) {
    return new Set()
  } else {
    return new Set(
      settings.checkboxStoredRefs[checkbox]
        .split(',')
        .map(r => convert(r))
        .filter(a => a >= 0),
    )
  }
}

function getCheckboxState(checkbox, references) {
  var storedRefsSet = getStoredCheckboxRefs(checkbox)
  var currentRefsSet = new Set(references.map(r => r[1]))
  // Get difference of current - stored
  var difference = new Set(currentRefsSet)
  for (ref of storedRefsSet) {
    difference.delete(ref)
  }
  if (difference.size == 0) {
    // All the current refs are stored
    return 'checked'
  } else if (difference.size == currentRefsSet.size) {
    // None of the current refs are stored
    return 'unchecked'
  } else {
    // Some of the refs are stored
    return 'indeterminate'
  }
}

function setBomCheckboxState(checkbox, element, references) {
  var state = getCheckboxState(checkbox, references)
  element.checked = state == 'checked'
  element.indeterminate = state == 'indeterminate'
}

function createCheckboxChangeHandler(checkbox, references, row) {
  return function () {
    refsSet = getStoredCheckboxRefs(checkbox)
    var markWhenChecked = settings.markWhenChecked == checkbox
    eventArgs = {
      checkbox: checkbox,
      refs: references,
    }
    if (this.checked) {
      // checkbox ticked
      for (var ref of references) {
        refsSet.add(ref[1])
      }
      if (markWhenChecked) {
        row.classList.add('checked')
        for (var ref of references) {
          markedFootprints.add(ref[1])
        }
        drawHighlights()
      }
      eventArgs.state = 'checked'
    } else {
      // checkbox unticked
      for (var ref of references) {
        refsSet.delete(ref[1])
      }
      if (markWhenChecked) {
        row.classList.remove('checked')
        for (var ref of references) {
          markedFootprints.delete(ref[1])
        }
        drawHighlights()
      }
      eventArgs.state = 'unchecked'
    }
    settings.checkboxStoredRefs[checkbox] = [...refsSet].join(',')
    writeStorage('checkbox_' + checkbox, settings.checkboxStoredRefs[checkbox])
    updateCheckboxStats(checkbox)
    EventHandler.emitEvent(IBOM_EVENT_TYPES.CHECKBOX_CHANGE_EVENT, eventArgs)
  }
}

function clearHighlightedFootprints() {
  if (currentHighlightedRowId) {
    document.getElementById(currentHighlightedRowId).classList.remove('highlighted')
    currentHighlightedRowId = null
    highlightedFootprints = []
    highlightedNet = null
  }
}

function createRowHighlightHandler(rowid, refs, net) {
  return function () {
    if (currentHighlightedRowId) {
      if (currentHighlightedRowId == rowid) {
        return
      }
      document
        .getElementById(currentHighlightedRowId)
        .classList.remove('highlighted')
    }
    document.getElementById(rowid).classList.add('highlighted')
    currentHighlightedRowId = rowid
    highlightedFootprints = refs ? refs.map(r => r[1]) : []
    highlightedNet = net
    drawHighlights()
    EventHandler.emitEvent(IBOM_EVENT_TYPES.HIGHLIGHT_EVENT, {
      rowid: rowid,
      refs: refs,
      net: net,
    })
  }
}

function entryMatches(entry) {
  if (settings.bommode == 'netlist') {
    // entry is just a net name
    return entry.toLowerCase().indexOf(filter) >= 0
  }
  // check refs
  if (!settings.hiddenColumns.includes('references')) {
    for (var ref of entry) {
      if (ref[0].toLowerCase().indexOf(filter) >= 0) {
        return true
      }
    }
  }
  // check fields
  for (var i in config.fields) {
    var f = config.fields[i]
    if (!settings.hiddenColumns.includes(f)) {
      for (var ref of entry) {
        if (pcbdata.bom.fields[ref[1]][i].toLowerCase().indexOf(filter) >= 0) {
          return true
        }
      }
    }
  }
  return false
}

function findRefInEntry(entry) {
  return entry.filter(r => r[0].toLowerCase() == reflookup)
}

function highlightFilter(s) {
  if (!filter) {
    return s
  }
  var parts = s.toLowerCase().split(filter)
  if (parts.length == 1) {
    return s
  }
  var r = ''
  var pos = 0
  for (var i in parts) {
    if (i > 0) {
      r +=
        '<mark class="highlight">' +
        s.substring(pos, pos + filter.length) +
        '</mark>'
      pos += filter.length
    }
    r += s.substring(pos, pos + parts[i].length)
    pos += parts[i].length
  }
  return r
}

function checkboxSetUnsetAllHandler(checkboxname) {
  return function () {
    var checkboxnum = 0
    while (
      checkboxnum < settings.checkboxes.length &&
      settings.checkboxes[checkboxnum].toLowerCase() != checkboxname.toLowerCase()
    ) {
      checkboxnum++
    }
    if (checkboxnum >= settings.checkboxes.length) {
      return
    }
    var allset = true
    var checkbox
    var row
    for (row of bombody.childNodes) {
      checkbox = row.childNodes[checkboxnum + 1].childNodes[0]
      if (!checkbox.checked || checkbox.indeterminate) {
        allset = false
        break
      }
    }
    for (row of bombody.childNodes) {
      checkbox = row.childNodes[checkboxnum + 1].childNodes[0]
      checkbox.checked = !allset
      checkbox.indeterminate = false
      checkbox.onchange()
    }
  }
}

function createColumnHeader(name, cls, comparator, is_checkbox = false) {
  var th = document.createElement('TH')
  th.innerHTML = name
  th.classList.add(cls)
  if (is_checkbox) th.setAttribute('col_name', 'bom-checkbox')
  else th.setAttribute('col_name', name)
  var span = document.createElement('SPAN')
  span.classList.add('sortmark')
  span.classList.add('none')
  th.appendChild(span)
  var spacer = document.createElement('div')
  spacer.className = 'column-spacer'
  th.appendChild(spacer)
  spacer.onclick = function () {
    if (currentSortColumn && th !== currentSortColumn) {
      // Currently sorted by another column
      currentSortColumn.childNodes[1].classList.remove(currentSortOrder)
      currentSortColumn.childNodes[1].classList.add('none')
      currentSortColumn = null
      currentSortOrder = null
    }
    if (currentSortColumn && th === currentSortColumn) {
      // Already sorted by this column
      if (currentSortOrder == 'asc') {
        // Sort by this column, descending order
        bomSortFunction = function (a, b) {
          return -comparator(a, b)
        }
        currentSortColumn.childNodes[1].classList.remove('asc')
        currentSortColumn.childNodes[1].classList.add('desc')
        currentSortOrder = 'desc'
      } else {
        // Unsort
        bomSortFunction = null
        currentSortColumn.childNodes[1].classList.remove('desc')
        currentSortColumn.childNodes[1].classList.add('none')
        currentSortColumn = null
        currentSortOrder = null
      }
    } else {
      // Sort by this column, ascending order
      bomSortFunction = comparator
      currentSortColumn = th
      currentSortColumn.childNodes[1].classList.remove('none')
      currentSortColumn.childNodes[1].classList.add('asc')
      currentSortOrder = 'asc'
    }
    populateBomBody()
  }
  if (is_checkbox) {
    spacer.onclick = fancyDblClickHandler(
      spacer,
      spacer.onclick,
      checkboxSetUnsetAllHandler(name),
    )
  }
  return th
}

function populateBomHeader(placeHolderColumn = null, placeHolderElements = null) {
  while (bomhead.firstChild) {
    bomhead.removeChild(bomhead.firstChild)
  }
  var tr = document.createElement('TR')
  var th = document.createElement('TH')
  th.classList.add('numCol')

  var vismenu = document.createElement('div')
  vismenu.id = 'vismenu'
  vismenu.classList.add('menu')

  var visbutton = document.createElement('div')
  visbutton.classList.add('visbtn')
  visbutton.classList.add('hideonprint')

  var viscontent = document.createElement('div')
  viscontent.classList.add('menu-content')
  viscontent.id = 'vismenu-content'

  settings.columnOrder.forEach(column => {
    if (typeof column !== 'string') return

    // Skip empty columns
    if (column === 'checkboxes' && settings.checkboxes.length == 0) return
    else if (column === 'Quantity' && settings.bommode == 'ungrouped') return

    var label = document.createElement('label')
    label.classList.add('menu-label')

    var input = document.createElement('input')
    input.classList.add('visibility_checkbox')
    input.type = 'checkbox'
    input.onchange = function (e) {
      setShowBOMColumn(column, e.target.checked)
    }
    input.checked = !settings.hiddenColumns.includes(column)

    label.appendChild(input)
    if (column.length > 0) label.append(column[0].toUpperCase() + column.slice(1))

    viscontent.appendChild(label)
  })

  viscontent.childNodes[0].classList.add('menu-label-top')

  vismenu.appendChild(visbutton)
  if (settings.bommode != 'netlist') {
    vismenu.appendChild(viscontent)
    th.appendChild(vismenu)
  }
  tr.appendChild(th)

  var checkboxCompareClosure = function (checkbox) {
    return (a, b) => {
      var stateA = getCheckboxState(checkbox, a)
      var stateB = getCheckboxState(checkbox, b)
      if (stateA > stateB) return -1
      if (stateA < stateB) return 1
      return 0
    }
  }
  var stringFieldCompareClosure = function (fieldIndex) {
    return (a, b) => {
      var fa = pcbdata.bom.fields[a[0][1]][fieldIndex]
      var fb = pcbdata.bom.fields[b[0][1]][fieldIndex]
      if (fa != fb) return fa > fb ? 1 : -1
      else return 0
    }
  }
  var referenceRegex = /(?<prefix>[^0-9]+)(?<number>[0-9]+)/
  var compareRefs = (a, b) => {
    var ra = referenceRegex.exec(a)
    var rb = referenceRegex.exec(b)
    if (ra === null || rb === null) {
      if (a != b) return a > b ? 1 : -1
      return 0
    } else {
      if (ra.groups.prefix != rb.groups.prefix) {
        return ra.groups.prefix > rb.groups.prefix ? 1 : -1
      }
      if (ra.groups.number != rb.groups.number) {
        return parseInt(ra.groups.number) > parseInt(rb.groups.number) ? 1 : -1
      }
      return 0
    }
  }
  if (settings.bommode == 'netlist') {
    th = createColumnHeader('Net name', 'bom-netname', (a, b) => {
      if (a > b) return -1
      if (a < b) return 1
      return 0
    })
    tr.appendChild(th)
  } else {
    // Filter hidden columns
    var columns = settings.columnOrder.filter(
      e => !settings.hiddenColumns.includes(e),
    )
    var valueIndex = config.fields.indexOf('Value')
    var footprintIndex = config.fields.indexOf('Footprint')
    columns.forEach(column => {
      if (column === placeHolderColumn) {
        var n = 1
        if (column === 'checkboxes') n = settings.checkboxes.length
        for (i = 0; i < n; i++) {
          td = placeHolderElements.shift()
          tr.appendChild(td)
        }
        return
      } else if (column === 'checkboxes') {
        for (var checkbox of settings.checkboxes) {
          th = createColumnHeader(
            checkbox,
            'bom-checkbox',
            checkboxCompareClosure(checkbox),
            true,
          )
          tr.appendChild(th)
        }
      } else if (column === 'References') {
        tr.appendChild(
          createColumnHeader('References', 'references', (a, b) => {
            var i = 0
            while (i < a.length && i < b.length) {
              if (a[i] != b[i]) return compareRefs(a[i][0], b[i][0])
              i++
            }
            return a.length - b.length
          }),
        )
      } else if (column === 'Value') {
        tr.appendChild(
          createColumnHeader('Value', 'value', (a, b) => {
            var ra = a[0][1],
              rb = b[0][1]
            return valueCompare(
              pcbdata.bom.parsedValues[ra],
              pcbdata.bom.parsedValues[rb],
              pcbdata.bom.fields[ra][valueIndex],
              pcbdata.bom.fields[rb][valueIndex],
            )
          }),
        )
        return
      } else if (column === 'Footprint') {
        tr.appendChild(
          createColumnHeader(
            'Footprint',
            'footprint',
            stringFieldCompareClosure(footprintIndex),
          ),
        )
      } else if (column === 'Quantity' && settings.bommode == 'grouped') {
        tr.appendChild(
          createColumnHeader('Quantity', 'quantity', (a, b) => {
            return a.length - b.length
          }),
        )
      } else {
        // Other fields
        var i = config.fields.indexOf(column)
        if (i < 0) return
        tr.appendChild(
          createColumnHeader(column, `field${i + 1}`, stringFieldCompareClosure(i)),
        )
      }
    })
  }
  bomhead.appendChild(tr)
}

function populateBomBody(placeholderColumn = null, placeHolderElements = null) {
  while (bom.firstChild) {
    bom.removeChild(bom.firstChild)
  }
  highlightHandlers = []
  footprintIndexToHandler = {}
  netsToHandler = {}
  currentHighlightedRowId = null
  var first = true
  if (settings.bommode == 'netlist') {
    bomtable = pcbdata.nets.slice()
  } else {
    switch (settings.canvaslayout) {
      case 'F':
        bomtable = pcbdata.bom.F.slice()
        break
      case 'FB':
        bomtable = pcbdata.bom.both.slice()
        break
      case 'B':
        bomtable = pcbdata.bom.B.slice()
        break
    }
    if (settings.bommode == 'ungrouped') {
      // expand bom table
      expandedTable = []
      for (var bomentry of bomtable) {
        for (var ref of bomentry) {
          expandedTable.push([ref])
        }
      }
      bomtable = expandedTable
    }
  }
  if (bomSortFunction) {
    bomtable = bomtable.sort(bomSortFunction)
  }
  for (var i in bomtable) {
    var bomentry = bomtable[i]
    if (filter && !entryMatches(bomentry)) {
      continue
    }
    var references = null
    var netname = null
    var tr = document.createElement('TR')
    var td = document.createElement('TD')
    var rownum = +i + 1
    tr.id = 'bomrow' + rownum
    td.textContent = rownum
    tr.appendChild(td)
    if (settings.bommode == 'netlist') {
      netname = bomentry
      td = document.createElement('TD')
      td.innerHTML = highlightFilter(netname ? netname : '&lt;no net&gt;')
      tr.appendChild(td)
    } else {
      if (reflookup) {
        references = findRefInEntry(bomentry)
        if (references.length == 0) {
          continue
        }
      } else {
        references = bomentry
      }
      // Filter hidden columns
      var columns = settings.columnOrder.filter(
        e => !settings.hiddenColumns.includes(e),
      )
      columns.forEach(column => {
        if (column === placeholderColumn) {
          var n = 1
          if (column === 'checkboxes') n = settings.checkboxes.length
          for (i = 0; i < n; i++) {
            td = placeHolderElements.shift()
            tr.appendChild(td)
          }
          return
        } else if (column === 'checkboxes') {
          for (var checkbox of settings.checkboxes) {
            if (checkbox) {
              td = document.createElement('TD')
              var input = document.createElement('input')
              input.type = 'checkbox'
              input.onchange = createCheckboxChangeHandler(checkbox, references, tr)
              setBomCheckboxState(checkbox, input, references)
              if (input.checked && settings.markWhenChecked == checkbox) {
                tr.classList.add('checked')
              }
              td.appendChild(input)
              tr.appendChild(td)
            }
          }
        } else if (column === 'References') {
          td = document.createElement('TD')
          td.innerHTML = highlightFilter(references.map(r => r[0]).join(', '))
          tr.appendChild(td)
        } else if (column === 'Quantity' && settings.bommode == 'grouped') {
          // Quantity
          td = document.createElement('TD')
          td.textContent = references.length
          tr.appendChild(td)
        } else {
          // All the other fields
          var field_index = config.fields.indexOf(column)
          if (field_index < 0) return
          var valueSet = new Set()
          references
            .map(r => r[1])
            .forEach(id => valueSet.add(pcbdata.bom.fields[id][field_index]))
          td = document.createElement('TD')
          td.innerHTML = highlightFilter(Array.from(valueSet).join(', '))
          tr.appendChild(td)
        }
      })
    }
    bom.appendChild(tr)
    var handler = createRowHighlightHandler(tr.id, references, netname)
    tr.onmousemove = handler
    highlightHandlers.push({
      id: tr.id,
      handler: handler,
    })
    if (references !== null) {
      for (var refIndex of references.map(r => r[1])) {
        footprintIndexToHandler[refIndex] = handler
      }
    }
    if (netname !== null) {
      netsToHandler[netname] = handler
    }
    if ((filter || reflookup) && first) {
      handler()
      first = false
    }
  }
  EventHandler.emitEvent(IBOM_EVENT_TYPES.BOM_BODY_CHANGE_EVENT, {
    filter: filter,
    reflookup: reflookup,
    checkboxes: settings.checkboxes,
    bommode: settings.bommode,
  })
}

function highlightPreviousRow() {
  if (!currentHighlightedRowId) {
    highlightHandlers[highlightHandlers.length - 1].handler()
  } else {
    if (
      highlightHandlers.length > 1 &&
      highlightHandlers[0].id == currentHighlightedRowId
    ) {
      highlightHandlers[highlightHandlers.length - 1].handler()
    } else {
      for (var i = 0; i < highlightHandlers.length - 1; i++) {
        if (highlightHandlers[i + 1].id == currentHighlightedRowId) {
          highlightHandlers[i].handler()
          break
        }
      }
    }
  }
  smoothScrollToRow(currentHighlightedRowId)
}

function highlightNextRow() {
  if (!currentHighlightedRowId) {
    highlightHandlers[0].handler()
  } else {
    if (
      highlightHandlers.length > 1 &&
      highlightHandlers[highlightHandlers.length - 1].id == currentHighlightedRowId
    ) {
      highlightHandlers[0].handler()
    } else {
      for (var i = 1; i < highlightHandlers.length; i++) {
        if (highlightHandlers[i - 1].id == currentHighlightedRowId) {
          highlightHandlers[i].handler()
          break
        }
      }
    }
  }
  smoothScrollToRow(currentHighlightedRowId)
}

function populateBomTable() {
  populateBomHeader()
  populateBomBody()
  setBomHandlers()
  resizableGrid(bomhead)
}

function footprintsClicked(footprintIndexes) {
  var lastClickedIndex = footprintIndexes.indexOf(lastClicked)
  for (var i = 1; i <= footprintIndexes.length; i++) {
    var refIndex =
      footprintIndexes[(lastClickedIndex + i) % footprintIndexes.length]
    if (refIndex in footprintIndexToHandler) {
      lastClicked = refIndex
      footprintIndexToHandler[refIndex]()
      smoothScrollToRow(currentHighlightedRowId)
      break
    }
  }
}

function netClicked(net) {
  if (net in netsToHandler) {
    netsToHandler[net]()
    smoothScrollToRow(currentHighlightedRowId)
  } else {
    clearHighlightedFootprints()
    highlightedNet = net
    drawHighlights()
  }
}

function updateFilter(input) {
  filter = input.toLowerCase()
  populateBomTable()
}

function updateRefLookup(input) {
  reflookup = input.toLowerCase()
  populateBomTable()
}

function changeCanvasLayout(layout) {
  document.getElementById('fl-btn').classList.remove('depressed')
  document.getElementById('fb-btn').classList.remove('depressed')
  document.getElementById('bl-btn').classList.remove('depressed')
  switch (layout) {
    case 'F':
      document.getElementById('fl-btn').classList.add('depressed')
      if (settings.bomlayout != 'bom-only') {
        canvassplit.collapse(1)
      }
      break
    case 'B':
      document.getElementById('bl-btn').classList.add('depressed')
      if (settings.bomlayout != 'bom-only') {
        canvassplit.collapse(0)
      }
      break
    default:
      document.getElementById('fb-btn').classList.add('depressed')
      if (settings.bomlayout != 'bom-only') {
        canvassplit.setSizes([50, 50])
      }
  }
  settings.canvaslayout = layout
  writeStorage('canvaslayout', layout)
  resizeAll()
  changeBomMode(settings.bommode)
}

function populateMetadata() {
  document.getElementById('title').innerHTML = pcbdata.metadata.title
  document.getElementById('revision').innerHTML =
    'Rev: ' + pcbdata.metadata.revision
  document.getElementById('company').innerHTML = pcbdata.metadata.company
  document.getElementById('filedate').innerHTML = pcbdata.metadata.date
  if (pcbdata.metadata.title != '') {
    document.title = pcbdata.metadata.title + ' BOM'
  }
  // Calculate board stats
  var fp_f = 0,
    fp_b = 0,
    pads_f = 0,
    pads_b = 0,
    pads_th = 0
  for (var i = 0; i < pcbdata.footprints.length; i++) {
    if (pcbdata.bom.skipped.includes(i)) continue
    var mod = pcbdata.footprints[i]
    if (mod.layer == 'F') {
      fp_f++
    } else {
      fp_b++
    }
    for (var pad of mod.pads) {
      if (pad.type == 'th') {
        pads_th++
      } else {
        if (pad.layers.includes('F')) {
          pads_f++
        }
        if (pad.layers.includes('B')) {
          pads_b++
        }
      }
    }
  }
  document.getElementById('stats-components-front').innerHTML = fp_f
  document.getElementById('stats-components-back').innerHTML = fp_b
  document.getElementById('stats-components-total').innerHTML = fp_f + fp_b
  document.getElementById('stats-groups-front').innerHTML = pcbdata.bom.F.length
  document.getElementById('stats-groups-back').innerHTML = pcbdata.bom.B.length
  document.getElementById('stats-groups-total').innerHTML = pcbdata.bom.both.length
  document.getElementById('stats-smd-pads-front').innerHTML = pads_f
  document.getElementById('stats-smd-pads-back').innerHTML = pads_b
  document.getElementById('stats-smd-pads-total').innerHTML = pads_f + pads_b
  document.getElementById('stats-th-pads').innerHTML = pads_th
  // Update version string
  document.getElementById('github-link').innerHTML =
    'InteractiveHtmlBom&nbsp;' + /^v\d+\.\d+/.exec(pcbdata.ibom_version)[0]
}

function changeBomLayout(layout) {
  document.getElementById('bom-btn').classList.remove('depressed')
  document.getElementById('lr-btn').classList.remove('depressed')
  document.getElementById('tb-btn').classList.remove('depressed')
  switch (layout) {
    case 'bom-only':
      document.getElementById('bom-btn').classList.add('depressed')
      if (bomsplit) {
        bomsplit.destroy()
        bomsplit = null
        canvassplit.destroy()
        canvassplit = null
      }
      document.getElementById('frontcanvas').style.display = 'none'
      document.getElementById('backcanvas').style.display = 'none'
      document.getElementById('bot').style.height = ''
      break
    case 'top-bottom':
      document.getElementById('tb-btn').classList.add('depressed')
      document.getElementById('frontcanvas').style.display = ''
      document.getElementById('backcanvas').style.display = ''
      document.getElementById('bot').style.height = 'calc(100% - 80px)'
      document.getElementById('bomdiv').classList.remove('split-horizontal')
      document.getElementById('canvasdiv').classList.remove('split-horizontal')
      document.getElementById('frontcanvas').classList.add('split-horizontal')
      document.getElementById('backcanvas').classList.add('split-horizontal')
      if (bomsplit) {
        bomsplit.destroy()
        bomsplit = null
        canvassplit.destroy()
        canvassplit = null
      }
      bomsplit = Split(['#bomdiv', '#canvasdiv'], {
        sizes: [50, 50],
        onDragEnd: resizeAll,
        direction: 'vertical',
        gutterSize: 5,
      })
      canvassplit = Split(['#frontcanvas', '#backcanvas'], {
        sizes: [50, 50],
        gutterSize: 5,
        onDragEnd: resizeAll,
      })
      break
    case 'left-right':
      document.getElementById('lr-btn').classList.add('depressed')
      document.getElementById('frontcanvas').style.display = ''
      document.getElementById('backcanvas').style.display = ''
      document.getElementById('bot').style.height = 'calc(100% - 80px)'
      document.getElementById('bomdiv').classList.add('split-horizontal')
      document.getElementById('canvasdiv').classList.add('split-horizontal')
      document.getElementById('frontcanvas').classList.remove('split-horizontal')
      document.getElementById('backcanvas').classList.remove('split-horizontal')
      if (bomsplit) {
        bomsplit.destroy()
        bomsplit = null
        canvassplit.destroy()
        canvassplit = null
      }
      bomsplit = Split(['#bomdiv', '#canvasdiv'], {
        sizes: [50, 50],
        onDragEnd: resizeAll,
        gutterSize: 5,
      })
      canvassplit = Split(['#frontcanvas', '#backcanvas'], {
        sizes: [50, 50],
        gutterSize: 5,
        direction: 'vertical',
        onDragEnd: resizeAll,
      })
  }
  settings.bomlayout = layout
  writeStorage('bomlayout', layout)
  changeCanvasLayout(settings.canvaslayout)
}

function changeBomMode(mode) {
  document.getElementById('bom-grouped-btn').classList.remove('depressed')
  document.getElementById('bom-ungrouped-btn').classList.remove('depressed')
  document.getElementById('bom-netlist-btn').classList.remove('depressed')
  var chkbxs = document.getElementsByClassName('visibility_checkbox')

  switch (mode) {
    case 'grouped':
      document.getElementById('bom-grouped-btn').classList.add('depressed')
      for (var i = 0; i < chkbxs.length; i++) {
        chkbxs[i].disabled = false
      }
      break
    case 'ungrouped':
      document.getElementById('bom-ungrouped-btn').classList.add('depressed')
      for (var i = 0; i < chkbxs.length; i++) {
        chkbxs[i].disabled = false
      }
      break
    case 'netlist':
      document.getElementById('bom-netlist-btn').classList.add('depressed')
      for (var i = 0; i < chkbxs.length; i++) {
        chkbxs[i].disabled = true
      }
  }

  writeStorage('bommode', mode)
  if (mode != settings.bommode) {
    settings.bommode = mode
    bomSortFunction = null
    currentSortColumn = null
    currentSortOrder = null
    clearHighlightedFootprints()
  }
  populateBomTable()
}

function focusFilterField() {
  focusInputField(document.getElementById('filter'))
}

function focusRefLookupField() {
  focusInputField(document.getElementById('reflookup'))
}

function toggleBomCheckbox(bomrowid, checkboxnum) {
  if (!bomrowid || checkboxnum > settings.checkboxes.length) {
    return
  }
  var bomrow = document.getElementById(bomrowid)
  var checkbox = bomrow.childNodes[checkboxnum].childNodes[0]
  checkbox.checked = !checkbox.checked
  checkbox.indeterminate = false
  checkbox.onchange()
}

function checkBomCheckbox(bomrowid, checkboxname) {
  var checkboxnum = 0
  while (
    checkboxnum < settings.checkboxes.length &&
    settings.checkboxes[checkboxnum].toLowerCase() != checkboxname.toLowerCase()
  ) {
    checkboxnum++
  }
  if (!bomrowid || checkboxnum >= settings.checkboxes.length) {
    return
  }
  var bomrow = document.getElementById(bomrowid)
  var checkbox = bomrow.childNodes[checkboxnum + 1].childNodes[0]
  checkbox.checked = true
  checkbox.indeterminate = false
  checkbox.onchange()
}

function setBomCheckboxes(value) {
  writeStorage('bomCheckboxes', value)
  settings.checkboxes = value
    .split(',')
    .map(e => e.trim())
    .filter(e => e)
  prepCheckboxes()
  populateMarkWhenCheckedOptions()
  setMarkWhenChecked(settings.markWhenChecked)
}

function setMarkWhenChecked(value) {
  writeStorage('markWhenChecked', value)
  settings.markWhenChecked = value
  markedFootprints.clear()
  for (var ref of value ? getStoredCheckboxRefs(value) : []) {
    markedFootprints.add(ref)
  }
  populateBomTable()
  drawHighlights()
}

function prepCheckboxes() {
  var table = document.getElementById('checkbox-stats')
  while (table.childElementCount > 1) {
    table.removeChild(table.lastChild)
  }
  if (settings.checkboxes.length) {
    table.style.display = ''
  } else {
    table.style.display = 'none'
  }
  for (var checkbox of settings.checkboxes) {
    var tr = document.createElement('TR')
    var td = document.createElement('TD')
    td.innerHTML = checkbox
    tr.appendChild(td)
    td = document.createElement('TD')
    td.id = 'checkbox-stats-' + checkbox
    var progressbar = document.createElement('div')
    progressbar.classList.add('bar')
    td.appendChild(progressbar)
    var text = document.createElement('div')
    text.classList.add('text')
    td.appendChild(text)
    tr.appendChild(td)
    table.appendChild(tr)
    updateCheckboxStats(checkbox)
  }
}

function populateMarkWhenCheckedOptions() {
  var container = document.getElementById('markWhenCheckedContainer')

  if (settings.checkboxes.length == 0) {
    container.parentElement.style.display = 'none'
    return
  }

  container.innerHTML = ''
  container.parentElement.style.display = 'inline-block'

  function createOption(name, displayName) {
    var id = 'markWhenChecked-' + name

    var div = document.createElement('div')
    div.classList.add('radio-container')

    var input = document.createElement('input')
    input.type = 'radio'
    input.name = 'markWhenChecked'
    input.value = name
    input.id = id
    input.onchange = () => setMarkWhenChecked(name)
    div.appendChild(input)

    // Preserve the selected element when the checkboxes change
    if (name == settings.markWhenChecked) {
      input.checked = true
    }

    var label = document.createElement('label')
    label.innerHTML = displayName
    label.htmlFor = id
    div.appendChild(label)

    container.appendChild(div)
  }
  createOption('', 'None')
  for (var checkbox of settings.checkboxes) {
    createOption(checkbox, checkbox)
  }
}

function updateCheckboxStats(checkbox) {
  var checked = getStoredCheckboxRefs(checkbox).size
  var total = pcbdata.footprints.length - pcbdata.bom.skipped.length
  var percent = (checked * 100.0) / total
  var td = document.getElementById('checkbox-stats-' + checkbox)
  td.firstChild.style.width = percent + '%'
  td.lastChild.innerHTML = checked + '/' + total + ' (' + Math.round(percent) + '%)'
}

document.onkeydown = function (e) {
  switch (e.key) {
    case 'n':
      if (document.activeElement.type == 'text') {
        return
      }
      if (currentHighlightedRowId !== null) {
        checkBomCheckbox(currentHighlightedRowId, 'placed')
        highlightNextRow()
        e.preventDefault()
      }
      break
    case 'ArrowUp':
      highlightPreviousRow()
      e.preventDefault()
      break
    case 'ArrowDown':
      highlightNextRow()
      e.preventDefault()
      break
    default:
      break
  }
  if (e.altKey) {
    switch (e.key) {
      case 'f':
        focusFilterField()
        e.preventDefault()
        break
      case 'r':
        focusRefLookupField()
        e.preventDefault()
        break
      case 'z':
        changeBomLayout('bom-only')
        e.preventDefault()
        break
      case 'x':
        changeBomLayout('left-right')
        e.preventDefault()
        break
      case 'c':
        changeBomLayout('top-bottom')
        e.preventDefault()
        break
      case 'v':
        changeCanvasLayout('F')
        e.preventDefault()
        break
      case 'b':
        changeCanvasLayout('FB')
        e.preventDefault()
        break
      case 'n':
        changeCanvasLayout('B')
        e.preventDefault()
        break
      default:
        break
    }
    if (e.key >= '1' && e.key <= '9') {
      toggleBomCheckbox(currentHighlightedRowId, parseInt(e.key))
      e.preventDefault()
    }
  }
}

function hideNetlistButton() {
  document.getElementById('bom-ungrouped-btn').classList.remove('middle-button')
  document.getElementById('bom-ungrouped-btn').classList.add('right-most-button')
  document.getElementById('bom-netlist-btn').style.display = 'none'
}

function initBOM(e) {
  initUtils()
  initRender()
  initStorage()
  initDefaults()
  cleanGutters()
  populateMetadata()
  dbgdiv = document.getElementById('dbg')
  bom = document.getElementById('bombody')
  bomhead = document.getElementById('bomhead')
  filter = ''
  reflookup = ''
  if (!('nets' in pcbdata)) {
    hideNetlistButton()
  }
  initDone = true
  setBomCheckboxes(document.getElementById('bomCheckboxes').value)
  // Triggers render
  changeBomLayout(settings.bomlayout)

  // Users may leave fullscreen without touching the checkbox. Uncheck.
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement)
      document.getElementById('fullscreenCheckbox').checked = false
  })
}
