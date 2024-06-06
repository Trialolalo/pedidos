import isEqual from 'lodash-es/isEqual'
import { store } from '../redux/store.js'
import { setImageGallery, removeImage, addImage } from '../redux/images-slice.js'

class UploadImage extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.name = this.getAttribute('name')
    this.images = []
  }

  connectedCallback () {
    this.render()
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      console.log(currentState.images.showedImages)

      if (currentState.images.showedImages.length > 0 && !isEqual(this.images, currentState.images.showedImages)) {
        this.images = currentState.images.showedImages
        this.loadFile(this.images)
      }

      if (currentState.images.showedImages.length === 0) {
        this.images = []
        this.deleteFile()
      }
    })
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          button{
            background: none;
            border: none;
          }

          .upload-modal{
            display: flex;
            gap: 1rem;
          }
          
          .form-element{
            flex: 1;
            display: flex;
            justify-content: space-between;
          }

          .form-element-label label{
            min-width: 9rem;
            display: inline-block;
          }

          label{
            background-color: hsl(225, 54%, 33%);
            color: hsl(0, 0%, 100%);
            font-size: 1rem;
            border: none;
            padding: .5rem;
            font-family: 'Roboto Condensed', sans-serif;
          }

          .upload-button{
            display: flex;
            height: 10rem;
            width: 10rem;
            object-fit: cover;
            box-sizing: border-box;
            transition: opacity 0.3s ease;
            background-color: hsl(0, 0%, 100%);
            cursor: pointer;
          }

          .upload-button:hover{
            opacity: 0.6;
          }

          .upload-button button{
            height: 10rem;
            width: 10rem;
          }
          
          .upload-button svg{
            width: 4rem;
            cursor: pointer;
            position: relative;
          }

          .file img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            box-sizing: border-box;
            border: 5px solid white;
          }

          .file{
            width: 12.2rem;
            height: 12.2rem;
            box-sizing: border-box;
            position: relative;
          }

          .file:hover img{
            opacity: 0.6;
          }

          .button-close-img{
            position: absolute;
            cursor: pointer;
            left: 9.5rem;
            top: 0.5rem;
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
        <div class="form-element">
          <div class="form-element-label">
            <label>
                Imagen destacada
            </label>
            <div class="upload-button">
              <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
              </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      `
    const uploadModal = this.shadow.querySelector('.upload-modal')

    uploadModal?.addEventListener('click', async (event) => {
      if (event.target.closest('.upload-button')) {
        const image = {
          name: this.getAttribute('name')
        }

        store.dispatch(setImageGallery(image))
        document.dispatchEvent(new CustomEvent('showModalUpload'))
      }
    })
  }

  loadFile (images) {
    images.forEach(image => {
      if (image.name === this.name) {
        store.dispatch(addImage({
          ...image,
          imageConfiguration: JSON.parse(this.getAttribute('image-configuration'))
        }))
        const file = document.createElement('div')
        file.classList.add('file')
        const newImage = document.createElement('img')
        newImage.title = image.title
        newImage.alt = image.alt
        newImage.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${image.filename}`
        const buttonClose = document.createElement('button')
        buttonClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>'
        buttonClose.classList.add('button-close-img')
        file.appendChild(newImage)
        const uploadButton = this.shadow.querySelector('.upload-modal')
        file.appendChild(buttonClose)
        uploadButton.appendChild(file)

        buttonClose.addEventListener('click', (event) => {
          store.dispatch(removeImage(image))
        })
      }
    })
  }

  deleteFile () {
    const deleteThumbnail = this.shadow.querySelectorAll('.file')

    deleteThumbnail.forEach(thumbnail => {
      thumbnail.remove()
    })
  }
}

customElements.define('upload-image-component', UploadImage)
