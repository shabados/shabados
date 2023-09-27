import '../assets/style.css'
import favicon from '../../../resources/favicon.svg'
import {
  setupDirectory,
  exportQuadPoints,
  importQuadPoints,
  setPageRatio,
  getLocalStorage,
} from './dir.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class='app__left'>
  <div id='app__left__controls'>
  <button id='dirpik' type='button'>
    Open Directory
  </button>
  <br/>
  <br/>
  <input id='pageratioinput' type="number" min="0.5" max="2.5" step="0.1" value="0.71"/>
  <button id='pageratiosetter' type='button'>
    Set Page Ratio
  </button>
    <br/>
    <br/>
    <button id='import' type='button'>
      Import
    </button>
    <button id='export' type='button'>
      Export
    </button>
  </div>
  <div id='dirlist'></div>
</div>
<div class='app__right'>
  <div id='app__right__content'>
    <div>
      <img src="${favicon}" class='logo' alt='Shabad OS logo' />
      <h1>Shabad OS Library</h1>
      <p>Make quadrilateral shapes to dewarp pages.</p>
    </div>
  </div>
  <div id='app__right__view'></div>
  <div id='app__right__preview'></div>
</div>
`

if (getLocalStorage('pageRatio') != '0.71') {
  document.querySelector<HTMLButtonElement>('#pageratioinput')!.value =
    getLocalStorage('pageRatio')
}

document
  .querySelector<HTMLButtonElement>('#dirpik')!
  .addEventListener('click', () => setupDirectory())

document
  .querySelector<HTMLButtonElement>('#pageratiosetter')!
  .addEventListener('click', () =>
    setPageRatio(
      document.querySelector<HTMLButtonElement>('#pageratioinput')!.value
    )
  )

document
  .querySelector<HTMLButtonElement>('#import')!
  .addEventListener('click', () => importQuadPoints())

document
  .querySelector<HTMLButtonElement>('#export')!
  .addEventListener('click', () => exportQuadPoints())

document.querySelector<HTMLButtonElement>('#export')!.disabled = true

let keys = {}

function pushHotkeys(event) {
  const keyName = event.key
  keys[keyName] = true
  if (Object.keys(keys).length == 1) {
    const key = Object.keys(keys)[0]
    if (key == 'p') {
      const previewArea = document.getElementById('app__right__preview')?.style
        .display
      if (previewArea != null && previewArea == 'block') {
        document.querySelector<HTMLButtonElement>('#modal__close')?.click()
        return
      }
      document.querySelector<HTMLButtonElement>('#preview')?.click()
    }
    if (key == 'ArrowLeft') {
      document.querySelector<HTMLButtonElement>('#prev')?.click()
    }
    if (key == 'ArrowRight') {
      document.querySelector<HTMLButtonElement>('#next')?.click()
    }
  }
}

function releaseHotkeys() {
  keys = {}
}

document.addEventListener('keydown', (event) => {
  pushHotkeys(event)
})

document.addEventListener('keyup', () => {
  releaseHotkeys()
})
