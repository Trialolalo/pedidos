import { store } from '../redux/store.js'
import { showImage, removeImage } from '../redux/images-slice.js'
class ImageGallery extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('showModalUpload', event => {
      const uploadModal = this.shadow.querySelector('.upload-modal')
      uploadModal.classList.add('active')
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
            button{
              background: none;
              border: none;
            }

            input[type="file"]{
              display: none;
            }

            .form-row{
              display: flex;
              gap: 1rem;
            }

            .upload-modal{
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              background-color: hsla(0, 0%, 14%, 0.555);
              position: fixed;
              height: 100%;
              width: 100%;
              left: 0;
              top: 0;
              overflow: hidden;
              transition: opacity 200ms ease-in, visibility 0ms ease-in 0ms;
              z-index: 1004;
              visibility: hidden;
            }

            .upload-modal.active{
              opacity: 1;
              visibility: visible;
            }

            .top{
              display: flex;
              justify-content: space-between;
            }

            .top svg{
              width: 3rem;
              cursor: pointer;
            }

            .top svg:hover{
              fill: hsl(0, 77%, 66%)
            }

            .upload-modal h2{
              font-family: 'Roboto Condensed', sans-serif;
              font-weight: bold;
              margin-bottom: 1.5rem;
              font-size: 1.5rem;
            }

            .upload-modal .select-button{
              margin-left: auto;
            }

            .upload-window{
              display: flex;
              flex-wrap: wrap;
              flex-direction: column;
              background-color: hsl(195, 50%, 79%);
              padding: 1rem;
            }

            .tabs{
              display: flex;
              background-color: hsl(0, 0%, 100%);
              justify-content: space-between;
              width: 100%;
              margin-bottom: 1rem;
            }

            .tab-selector{
              display: flex;
              justify-content: flex-start;
              gap: 0.5rem;
              box-sizing: border-box;
              align-items: center;
              width: 100%;
            }

            .tab button{
              color: hsl(225, 54%, 33%);
              font-family: 'Roboto Condensed', sans-serif;
              font-weight: 400;
              font-size: 2rem;
              cursor: pointer;
            }

            .tab{
              height: 100%;
              cursor: pointer;
              box-sizing: border-box;
            }

            .tab button{
              font-family: 'Roboto Condensed', sans-serif;
              font-weight: 700;
              font-size: 1.3rem;
              background: transparent;
              cursor: pointer;
              padding: 1rem;
            }

            .tab-content.active{
              width: 120vh;
              min-height: 50vh;
              display: flex;
              gap: 3rem;
              opacity: 1;
            }

            .form-row{
              display: flex;
              flex-wrap: wrap;
              gap: 1rem;
              overflow: auto;
            }
            
            .form-element-label{
              background-color: hsl(225, 54%, 33%);
              padding: 0.2rem;
              width: auto;
            }

            label{
              color: hsl(0, 0%, 100%);
              font-size: 1rem;
              border: none;
              padding: 0.5rem;
              font-family: 'Roboto Condensed', sans-serif;
              width: auto;
            }

            input{
              background: none;
              border: none;
              height: 2rem;
              width: auto;
            }

            .form-element-input{
              margin-bottom: 1rem;
              background-color: hsl(0, 0%, 100%);
            }

            .form-element-input textarea{
              background-color: hsl(0, 0%, 100%);
            }

            .images img{
              height: 100%;
              width: 100%;
              object-fit: cover;
              box-sizing: border-box;
              border: 5px solid white;
            }

            .images{
              width: 12rem;
              height: 12rem;
              position: relative;
              box-sizing: border-box;
            }

            .images:hover img{
              opacity: 0.6;
            }

            .images.selected{
              border: 5px solid green;
              
            }

            .input-file{
              display: flex;
              cursor: pointer;
              background-color: hsl(225, 54%, 33%);
              padding: 2rem;
              height: 8rem;
              width: 8rem;
              align-items: center;
              justify-content: center;
            }

            .input-file label{
              font-family: 'Roboto Condensed', sans-serif;
              color: hsl(0, 0%, 100%);
              font-weight: 400;
              cursor: pointer;
            }

            .input-file svg{
              fill: hsl(0, 0%, 100%);
              width: 8rem;
            }

            .select-button button{
              font-family: 'Roboto Condensed', sans-serif;
              font-weight: 700;
              font-size: 1rem;
              background-color: hsl(88, 67%, 62%);
              opacity: 0.6;
              padding: 1rem;
              width: 9rem;
            }

            .select-button.active button{
              cursor: pointer;
              opacity: 1;
            }

            .button-close-img{
              position: absolute;
              cursor: pointer;
              left: 9.5rem;
              top: 0.5rem;
              z-index: 1006;
            }

            .button-close-img svg{
              width: 1.5rem;
              background: transparent;
              background-color: red;
              border: none;
              border-radius: 20px;
              fill: white;
              opacity: 0.2;
            }

            .button-close-img svg:hover{
              opacity: 1;
            }

        </style>
  
      
      <div class="upload-modal">
        <div class="upload-window">
          <div class="top">
            <h2>Imagen destacada</h2>
            <div class="button-close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </div>
          </div>
          <div class="tabs">
            <div class="tab-selector">
              <div class="tab" data-tab="gallery">
                <button>
                  Galería
                </button>
              </div>
            </div>
          </div>
          <div class="tab-content active" data-tab="gallery">
            <div class="form-row">
                <div class="input-file">
                  <label>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
                    </svg>
                    <input type="file" name="file"/>
                  </label>
              </div>
               
            </div>
            <aside>
              <div class="form-element">
                <div class="form-element-label">
                    <label>
                        Título
                    </label>
                </div>
                <div class="form-element-input">
                    <input  name="title" autocomplete="name" />
                </div>
              </div>
              <div class="form-element">
                <div class="form-element-label">
                    <label>
                        Título alternativo
                    </label>
                </div>
                <div class="form-element-input">
                    <input  name="alt" autocomplete="name" />
                </div>
              </div>
            </aside>
          </div>
          <div class="select-button">
            <button>
              Elegir Imagen 
            </button>
          </div>
        </div>
      </div>            
      `

    this.getThumbnails()

    const uploadFile = this.shadow.querySelector('input')
    const uploadModal = this.shadow.querySelector('.upload-modal')

    uploadFile.addEventListener('change', (event) => {
      this.uploadFile(event.target.files[0])
    })

    uploadModal.addEventListener('click', async event => {
      if (event.target.closest('.button-close')) {
        uploadModal.classList.remove('active')
      }

      if (event.target.closest('.button-close-img')) {
        const deleteButton = event.target.closest('.button-close-img')
        const filename = deleteButton.dataset.filename

        try {
          await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images/${filename}`, {
            method: 'DELETE'
          })
          deleteButton.parentElement.remove()
        } catch (error) {
          console.error(error)
        }
      }

      if (event.target.closest('.images')) {
        const imageClicked = event.target.closest('.images')
        const imageActive = imageClicked.parentElement.querySelector('.selected')
        const chooseImage = this.shadow.querySelector('.select-button')

        imageClicked.classList.add('selected')
        chooseImage.classList.add('active')

        if (imageActive) {
          imageActive.classList.remove('selected')
          chooseImage.classList.remove('active')
        }
        event.preventDefault()
      }

      if (event.target.closest('.select-button.active')) {
        let image = store.getState().images.imageGallery
        const filename = this.shadow.querySelector('.selected img').dataset.filename
        const alt = this.shadow.querySelector('input[name="alt"]').value
        const title = this.shadow.querySelector('input[name="title"]').value
        image = { ...image, alt, title, filename }
        store.dispatch(showImage(image))
        uploadModal.classList.remove('active')
      }
    })
  }

  async getThumbnails () {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images`)
    const thumbnails = await result.json()

    thumbnails.rows.forEach(file => {
      this.createImage(file.filename)
    })
  }

  async uploadFile (file) {
    const formData = new FormData()
    formData.append('file', file)

    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images`, {
      method: 'POST',
      body: formData
    })

    const filenames = await result.json()

    filenames.forEach(filename => {
      const imageContainer = this.createImage(filename)
      imageContainer.classList.add('selected')
    })
  }

  createImage (filename) {
    const imagesContainer = this.shadow.querySelector('.form-row')
    const imageContainer = document.createElement('div')
    imageContainer.classList.add('images')
    imagesContainer.appendChild(imageContainer)

    const image = document.createElement('img')
    image.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${filename}`
    const buttonClose = document.createElement('button')
    buttonClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>'
    buttonClose.classList.add('button-close-img')
    image.dataset.filename = filename
    imageContainer.appendChild(image)
    imageContainer.appendChild(buttonClose)
    return imageContainer
  }
}

customElements.define('image-gallery-component', ImageGallery)
