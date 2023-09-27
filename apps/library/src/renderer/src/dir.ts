export async function setupDirectory() {
  const dirHandle: never[] = await (window as any).showDirectoryPicker()
  if (!dirHandle) {
    return
  }

  const result = []
  for await (const value of dirHandle) {
    result.push(value)
  }

  const container = document.getElementById('dirlist')
  const entries = (await result).sort()

  if (container && entries.length > 0) {
    container.innerHTML = ''
    document.querySelector<HTMLButtonElement>('#export')!.disabled = false
  }

  for await (let entry of entries as any) {
    entry = entry[1]
    if (
      entry.kind === 'file' &&
      (entry.name.endsWith('.jpg') || entry.name.endsWith('.jpeg'))
    ) {
      const link = document.createElement('button')
      const linkAttributes = {
        'id': entry.name,
        'class': 'dirlist__file',
        'href': 'javascript:;',
        'data-entry': entry,
        'data-name': entry.name,
        'data-kind': entry.kind,
      }
      for (const [key, val] of Object.entries(linkAttributes)) {
        link.setAttribute(key, val)
      }
      link.innerHTML = entry.name
      container?.appendChild(link)
      link.addEventListener('click', function () {
        setupView(entry)
        removeCurrentFile()
        this.setAttribute('class', 'dirlist__currentFile')
      })
    }
  }
}

function removeCurrentFile() {
  const curFile = document.querySelector<HTMLElement>('.dirlist__currentFile')
  if (curFile) {
    curFile.setAttribute('class', 'dirlist__file')
  }
}

async function setupView(entry: FileSystemFileHandle) {
  document.getElementById('app__right__content')!.style.display = 'none'

  const file = await entry.getFile()

  let quadPoints: Point[] = []
  let dragPointAndStart: number = -1
  let id = entry.name

  const viewArea = <Element>document.getElementById('app__right__view')

  viewArea.innerHTML = `<div id="app__right__view__controls" class="bottom_controls"></div><canvas id="app__right__view__canvas__image"></canvas><canvas id="app__right__view__canvas__quad"></canvas>`

  // set up bottom bar with preview button
  document.querySelector<HTMLDivElement>(
    '#app__right__view__controls'
  )!.innerHTML = `
  <button id='preview' type='button'>
    Preview
  </button>
  <div class="spacer"></div>
  <button id='prev' type='button'>
    Previous
  </button>
  <button id='next' type='button'>
    Next
  </button>`
  document.querySelector<HTMLButtonElement>('#preview')!.disabled = true
  document
    .querySelector<HTMLButtonElement>('#preview')!
    .addEventListener('click', () => preview(file))
  document
    .querySelector<HTMLButtonElement>('#prev')!
    .addEventListener('click', () => prevFile())
  document
    .querySelector<HTMLButtonElement>('#next')!
    .addEventListener('click', () => nextFile())

  const canvasImage = <HTMLCanvasElement>(
    document.getElementById('app__right__view__canvas__image')
  )
  const canvasQuad = <HTMLCanvasElement>(
    document.getElementById('app__right__view__canvas__quad')
  )
  const ctxImage = <CanvasRenderingContext2D>canvasImage.getContext('2d')
  const ctxQuad = <CanvasRenderingContext2D>canvasQuad.getContext('2d')
  const imageObj = new Image()
  const imageDimsOriginal: Dimensions = { width: -1, height: -1 }
  const imageDims: Dimensions = { width: -1, height: 800 }
  imageObj.onload = function () {
    imageDimsOriginal.width = imageObj.width
    imageDimsOriginal.height = imageObj.height
    const ratio = imageDims.height / imageObj.height
    imageDims.width = imageObj.width * ratio
    canvasImage?.setAttribute('width', imageDims.width.toString())
    canvasQuad?.setAttribute('width', imageDims.width.toString())
    canvasImage?.setAttribute('height', imageDims.height.toString())
    canvasQuad?.setAttribute('height', imageDims.height.toString())
    canvasImage?.setAttribute('data-name', id)
    ctxImage.imageSmoothingQuality = 'high'
    ctxImage.drawImage(imageObj, 0, 0, imageDims.width, imageDims.height)
    const anyExistingQuadPoints = GetQuadPointsFromLocalStorage(id)
    if (anyExistingQuadPoints && anyExistingQuadPoints.length == 4) {
      quadPoints = anyExistingQuadPoints
      drawRect(imageDims, quadPoints, ctxQuad)
      document.querySelector<HTMLButtonElement>('#preview')!.disabled = false
    }
  }
  imageObj.src = URL.createObjectURL(file)

  canvasQuad.addEventListener(
    'mouseup',
    function (e) {
      drawPoints(imageDims, quadPoints, ctxQuad, e)
      movePoint(imageDims, quadPoints, ctxQuad, e, dragPointAndStart)
      SaveQuadPointsToLocalStorage(id, quadPoints)
    },
    false
  )
  canvasQuad.addEventListener(
    'mousedown',
    function (e) {
      dragPointAndStart = dragPoints(imageDims, quadPoints, e)
    },
    false
  )
}

interface Dimensions {
  width: number
  height: number
}

interface Point {
  x: number
  y: number
}

function drawRect(
  imageDims: Dimensions,
  quadPoints: Point[],
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, imageDims.width, imageDims.height)

  ctx.fillStyle = 'red'
  for (let i of [0, 1, 2, 3]) {
    ctx.fillRect(
      quadPoints[i].x * imageDims.width - 4,
      quadPoints[i].y * imageDims.height - 4,
      8,
      8
    )
  }

  let region = new Path2D()
  region.moveTo(
    quadPoints[0].x * imageDims.width,
    quadPoints[0].y * imageDims.height
  )
  for (let i of [1, 2, 3]) {
    region.lineTo(
      quadPoints[i].x * imageDims.width,
      quadPoints[i].y * imageDims.height
    )
  }
  region.closePath()

  ctx.fillStyle = 'rgb(255 0 0 / 40%)'
  ctx.fill(region)
}

function drawPoints(
  imageDims: Dimensions,
  quadPoints: Point[],
  ctx: CanvasRenderingContext2D,
  e: MouseEvent
) {
  ctx.fillStyle = 'red'
  if (quadPoints && quadPoints.length < 4) {
    ctx.fillRect(e.offsetX - 4, e.offsetY - 4, 8, 8)
    quadPoints.push({
      x: e.offsetX / imageDims.width,
      y: e.offsetY / imageDims.height,
    })
  }
  if (quadPoints && quadPoints.length == 4) {
    ctx.fillRect(
      e.offsetX * imageDims.width - 4,
      e.offsetY * imageDims.height - 4,
      8,
      8
    )
    drawRect(imageDims, quadPoints, ctx)
    document.querySelector<HTMLButtonElement>('#preview')!.disabled = false
  }
}

function dragPoints(
  imageDims: Dimensions,
  quadPoints: Point[],
  e: MouseEvent
): number {
  if (quadPoints && quadPoints.length == 4) {
    const pad = 20
    let closestPoint = -1
    for (let i of [0, 1, 2, 3]) {
      if (
        e.offsetX > quadPoints[i].x * imageDims.width - pad &&
        e.offsetX < quadPoints[i].x * imageDims.width + pad
      ) {
        if (
          e.offsetY > quadPoints[i].y * imageDims.height - pad &&
          e.offsetY < quadPoints[i].y * imageDims.height + pad
        ) {
          closestPoint = i
          break
        }
      }
    }
    return closestPoint
  }
  return -1
}

function movePoint(
  imageDims: Dimensions,
  quadPoints: Point[],
  ctx: CanvasRenderingContext2D,
  e: MouseEvent,
  point: number
) {
  if (point > -1) {
    const moveThreshold = 0
    if (
      Math.abs(e.offsetX - quadPoints[point].x * imageDims.width) >=
        moveThreshold ||
      Math.abs(e.offsetY - quadPoints[point].y * imageDims.height) >=
        moveThreshold
    ) {
      quadPoints[point] = {
        x: e.offsetX / imageDims.width,
        y: e.offsetY / imageDims.height,
      }
      drawRect(imageDims, quadPoints, ctx)
    }
  }
}

export function setLocalStorage(key: string, value: string) {
  const store = (window as any).localStorage
  store.setItem(key, value)
}

export function getLocalStorage(key: string) {
  const store = (window as any).localStorage
  return store.getItem(key)
}

export function removeLocalStorage(key: string) {
  const store = (window as any).localStorage
  store.removeItem(key)
}

function SaveQuadPointsToLocalStorage(id: string, quadPoints: Point[]) {
  if (quadPoints && quadPoints.length == 4) {
    setLocalStorage(id, JSON.stringify(quadPoints))
  }
}

function GetQuadPointsFromLocalStorage(id: string) {
  return JSON.parse(getLocalStorage(id))
}

export async function exportQuadPoints() {
  // collect data
  let data: any = {}
  const container = document.getElementById('dirlist')
  if (container) {
    for (const file of container.childNodes) {
      const name = file.textContent
      if (name) {
        const res = GetQuadPointsFromLocalStorage(name)
        if (res != null && res.length > 0) {
          data[name] = res
        }
      }
    }
  }

  // error check data
  if (Object.keys(data).length === 0) {
    alert('Error: Data not found.')
    return
  }

  // setup export file
  let json: any = { pageRatio: getLocalStorage('pageRatio') }
  json.files = data

  // get file handler to save to
  const fileHandle = await (window as any).showSaveFilePicker({
    suggestedName: 'files.json',
    types: [
      {
        description: 'Text documents',
        accept: {
          'application/json': ['.json'],
        },
      },
    ],
  })

  const writable = await fileHandle.createWritable()
  await writable.write(JSON.stringify(json))
  await writable.close()

  // delete data from localstorage
  if (window.confirm('Remove cached data?')) {
    if (container) {
      for (const file of container.childNodes) {
        const name = file.textContent
        if (name) {
          removeLocalStorage(name)
        }
      }
    }
    const defaultPageRatio = '0.71'
    setLocalStorage('pageRatio', defaultPageRatio)
    document.querySelector<HTMLButtonElement>('#pageratioinput')!.value =
      defaultPageRatio
    document.querySelector<HTMLButtonElement>('#preview')!.disabled = false
  }

  // reset ui
  container!.innerHTML = ''
  document.getElementById('app__right__view')!.innerHTML = ''
  document.getElementById('app__right__preview')!.innerHTML = ''
  document.getElementById('app__right__content')!.style.display = 'flex'
  document.getElementById('dirlist')!.innerHTML = ''
  document.querySelector<HTMLButtonElement>('#export')!.disabled = true
}

export async function importQuadPoints() {
  const [fileHandle] = await (window as any).showOpenFilePicker()
  if (!fileHandle) {
    return
  }

  // check for existing data on current image
  const canvasImage = document.getElementById('app__right__view__canvas__image')
  const name = canvasImage?.getAttribute('data-name') as string
  const anyExistingQuadPoints = GetQuadPointsFromLocalStorage(name)

  // import data from file into local storage
  const file = await fileHandle.getFile()
  const text = await file.text()
  const json = JSON.parse(text)
  setLocalStorage('pageRatio', json.pageRatio)
  document.querySelector<HTMLButtonElement>('#pageratioinput')!.value =
    json.pageRatio
  for await (const [key, value] of Object.entries(json.files)) {
    SaveQuadPointsToLocalStorage(key, value as Point[])
  }

  // alert user to update image if imported data is different than previous existing
  if (
    name &&
    JSON.stringify(anyExistingQuadPoints) !==
      JSON.stringify(GetQuadPointsFromLocalStorage(name))
  ) {
    alert('Reload image to draw newly imported quadrilateral.')
  }
}

export async function preview(file) {
  // this function should only be called if it's possible to preview the image (four quad points saved in local storage, etc.)

  // get current file
  const cur: any = document.querySelector<HTMLElement>('.dirlist__currentFile')!

  // get quad points of current file
  const name = cur?.getAttribute('data-name') as string
  const points = GetQuadPointsFromLocalStorage(name)

  // set up html
  const previewArea = <Element>document.getElementById('app__right__preview')
  previewArea.innerHTML = `
    <div id="modal">
      <div id="modal__controls" class="bottom_controls">
        <button id='modal__close' type='button'>Close Preview</button>
      </div>
      <canvas id="modal__canvas" ></canvas>
    </div>
  `

  const cv: any = (window as any).cv

  // transform image onload
  const imageObj = new Image()
  imageObj.onload = function () {
    const pageRatio = parseFloat(getLocalStorage('pageRatio'))
    const maxHeight = 800

    let srcImage = cv.imread(imageObj)
    const { width, height } = srcImage.size()

    const imageRatio = width / height

    const scaledWidth = maxHeight * imageRatio
    const scaledHeight = maxHeight

    let scaledImage = new cv.Mat()
    cv.resize(srcImage, scaledImage, {
      width: scaledWidth,
      height: scaledWidth,
    })

    let dstImage = new cv.Mat()

    const scaledPoints = [
      points[0]['x'] * scaledWidth,
      points[0]['y'] * scaledHeight,
      points[1]['x'] * scaledWidth,
      points[1]['y'] * scaledHeight,
      points[3]['x'] * scaledWidth,
      points[3]['y'] * scaledHeight,
      points[2]['x'] * scaledWidth,
      points[2]['y'] * scaledHeight,
    ]

    const dstPoints = [
      0,
      0,
      scaledWidth,
      0,
      0,
      scaledHeight,
      scaledWidth,
      scaledHeight,
    ]

    const scaledPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, scaledPoints)
    const dstPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, dstPoints)

    const transformMatrix = cv.getPerspectiveTransform(
      scaledPointsMat,
      dstPointsMat
    )

    cv.warpPerspective(
      scaledImage,
      dstImage,
      transformMatrix,
      scaledImage.size(),
      cv.INTER_LINEAR,
      cv.BORDER_CONSTANT,
      new cv.Scalar()
    )

    const dstSize = dstImage.size()

    cv.resize(dstImage, dstImage, {
      width: dstSize.height * pageRatio,
      height: dstSize.height,
    })

    cv.imshow('modal__canvas', dstImage)
  }
  imageObj.src = URL.createObjectURL(file)

  document.getElementById('app__right__view')!.style.display = 'none'
  document.getElementById('app__right__preview')!.style.display = 'block'

  document
    .querySelector<HTMLButtonElement>('#modal__close')!
    .addEventListener('click', () => {
      document.getElementById('app__right__view')!.style.display = 'block'
      document.getElementById('app__right__preview')!.style.display = 'none'
    })
}

export function setPageRatio(value: string) {
  const pageRatio = parseFloat(value)
  if (isNaN(pageRatio)) {
    alert('Could not parse information. Page ratio has not been changed.')
    return
  }
  setLocalStorage('pageRatio', pageRatio.toString())
  alert('Page ratio set to ' + pageRatio.toString())
}

function iterateFile(dir: string = 'nextSibling') {
  const currentFile: any = document.querySelector<HTMLElement>(
    '.dirlist__currentFile'
  )!
  if (currentFile[dir] == null) {
    alert('No files left')
    return
  }
  removeCurrentFile()
  currentFile[dir].click()
  currentFile[dir].focus()
  currentFile[dir].blur()
  currentFile[dir].scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function nextFile() {
  iterateFile('nextSibling')
}

function prevFile() {
  iterateFile('previousSibling')
}
