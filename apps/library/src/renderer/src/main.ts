import '../assets/style.css'
import favicon from '../../../resources/favicon.svg'
import { setupDirectory, exportQuadPoints, importQuadPoints } from './dir.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class='app__left'>
  <div id='app__left__controls'>
    <button id='dirpik' type='button'>
      Open Directory
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
  <ul id='dirlist' />
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

document
  .querySelector<HTMLButtonElement>('#dirpik')!
  .addEventListener('click', () => setupDirectory())

document
  .querySelector<HTMLButtonElement>('#import')!
  .addEventListener('click', () => importQuadPoints())

document
  .querySelector<HTMLButtonElement>('#export')!
  .addEventListener('click', () => exportQuadPoints())

document.querySelector<HTMLButtonElement>('#export')!.disabled = true
