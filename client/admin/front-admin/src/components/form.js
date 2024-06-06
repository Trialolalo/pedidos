import { store } from '../redux/store.js'
import { removeImages, showImages } from '../redux/images-slice.js'

class Form extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('showElement', this.handleShowElement.bind(this))
    this.render()
  }

  handleShowElement (event) {
    this.showElement(event.detail.data)
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
            
            button{
              background: none;
              border: none;
            }
            .form{
              flex: 2;
            }

            .form-row{
              display: flex;
              gap: 1rem;
            }
            
            .form-element{
              flex: 1;
            }

            .form-element-label{
              background-color: hsl(225, 54%, 33%);
              padding: 0.2rem;
            }

            label{
              color: hsl(0, 0%, 100%);
              font-size: large;
              border: none;
              padding: 1rem;
              font-family: 'Roboto Condensed', sans-serif;
            }

            .form-element-input{
                margin-bottom: 1rem;
                background-color: hsl(0, 0%, 100%);
            }

            .form-element-input textarea{
              background-color: hsl(0, 0%, 100%);
              width: 100%;
            }

            input{
              box-sizing: border-box;
              padding: 0.5rem;
              width: 100%;
              height: 2rem;
            }

            .validate.active{
              border-color: hsl(0, 100%, 50%);
              border-width: 0.25rem;
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

            .tab.active{
              background-color: hsl(225, 54%, 33%);
              height: 100%;
              cursor: pointer;
              box-sizing: border-box;
            }

            .tab.active button{
              color: hsl(0, 0%, 100%);
              font-family: 'Roboto Condensed', sans-serif;
              font-weight: 400;
              font-size: 1rem;
            }

            .tab{
              background-color: transparent;
              height: 100%;
              cursor: pointer;
              box-sizing: border-box;
            }

            .tab button{
              font-family: 'Roboto Condensed', sans-serif;
              font-weight: 700;
              font-size: 1rem;
              background: transparent;
              cursor: pointer;
              padding: 1rem;
            }

            .form-buttons {
              display: flex;
              gap: 0.5rem;
              justify-content: flex-end;
              align-items: center;
              padding: 0.5rem;
            }
            
            .form-clean-button button,
            .form-save-button button {
              border: none;
              background: none;
            }

            .form-clean-button button svg,
            .form-save-button button svg {
              width: 2rem;
            }
            
            .form-clean-button button svg path,
            .form-save-button button svg path {
              fill: hsl(219, 79%, 66%);
            }
            
            .form-clean-button button:hover svg path,
            .form-save-button button:hover svg path {
              fill: hsl(225, 54%, 33%);
            }

            .tab-content{
              visibility: hidden;
              display: none;
            }

            .tab-content.active{
              visibility: visible;
              display: block;
            }

            .errors-container {
              background: hsl(225, 54%, 33%);
              z-index: 1006;
              padding: 1rem;
              opacity: 0.5;
              display:none;
              overflow: hidden;
              visibility: hidden;
              transition: opacity 200ms ease-in, visibility 0ms ease-in 0ms;
              margin-bottom: 1rem;
              height: 0;
            }

            .errors-container.active {
              right: 10vh;
              opacity: 1;
              visibility: visible;
              height: auto;
              display: block;
            }

            .errors-container li {
              color: hsl(0, 0%, 100%);
              font-family: 'Roboto Condensed', sans-serif;
              font-weight: 400;
            }
        </style>
  
        <section class="form">
            <div class="tabs">
                <div class="tab-selector">
                    <div class="tab active" data-tab="main">
                        <button>
                            Principal
                        </button>
                    </div>
                    <div class="tab" data-tab="images">            
                        <button>
                            Imágenes
                        </button>
                    </div> 
                </div>
                <div class="form-buttons">
                    <div class="form-clean-button">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" /></svg>
                        </button>
                    </div>
                    <div class="form-save-button">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <form action=""> 
                <input type="hidden" name="id" />
                <div class="errors-container">
                    <ul>
                    </ul>
                </div>
                <div class="tab-content active" data-tab="main">
                    <div class="form-row">
                        <div class="form-element">
                            <div class="form-element-label">
                                <label>
                                    Nombre
                                </label>
                            </div>
                            <div class="form-element-input">
                                <input class="validate" name="name" autocomplete="name" data-onlyletters="true" />
                            </div>
                        </div>
                    </div>
                    <div class="tabs">
                        <div class="tab-selector">
                            <div class="tab active" data-tab="es">
                                <button event= prevent>
                                    es
                                </button>
                            </div>
                            <div class="tab" data-tab="en">            
                                <button>
                                    en
                                </button>
                            </div> 
                        </div>
                    </div>
                    <div class="tab-content active" data-tab="es">
                        <div class="form-element">
                            <div class="form-element-label">
                                <label>
                                    Pregunta
                                </label>
                            </div>
                            <div class="form-element-input">
                                <input class="validate" type="text" name="locales.es.question"/>
                            </div>
                        </div>
                        <div class="form-element">
                            <div class="form-element-label">
                                <label>
                                    Respuesta
                                </label>
                            </div>
                            <div class="form-element-input">
                                <textarea name="locales.es.answer"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content" data-tab="en">
                        <div class="form-element">
                            <div class="form-element-label">
                                <label>
                                    Question
                                </label>
                            </div>
                            <div class="form-element-input">
                                <input class="validate" type="text" name="locales.en.question"/>
                            </div>
                        </div>
                        <div class="form-element">
                            <div class="form-element-label">
                                <label>
                                    Answer
                                </label>
                            </div>
                            <div class="form-element-input">
                                <textarea name="locales.en.answer"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" data-tab="images">
                  <div class="form-row">
                    <upload-image-component name="featured" image-configuration='{
                      "xs": {
                        "widthPx": "60",
                        "heightPx": "60"
                      },
                      "sm": {
                        "widthPx": "250",
                        "heightPx": "250"
                      },
                      "md": {
                        "widthPx": "500",
                        "heightPx": "500"
                      },
                      "lg": {
                        "widthPx": "1000",
                        "heightPx": "1000"
                      }
                    }'></upload-image-component>
                  </div>
                </div>

                
            </form>
        </section>            
      `

    const formSection = this.shadow.querySelector('.form')

    formSection.addEventListener('input', (event) => {
      if (event.target.closest('.validate')) {
        const validate = event.target.closest('.validate')

        if (validate.dataset.minlength) {
          const text = validate.value

          if (text.length < validate.dataset.minlength) {
            validate.classList.add('active')

            if (text.length === 0) {
              validate.classList.remove('active')
            }
          } else {
            validate.classList.remove('active')
          }
        }

        if (validate.dataset.onlyletters) {
          event.target.value = event.target.value.replace(/[^A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]/g, '')
        }
      }
    })

    formSection.addEventListener('click', async (event) => {
      if (event.target.closest('.tab')) {
        if (event.target.closest('.tab').classList.contains('active')) {
          return
        }

        const tabClicked = event.target.closest('.tab')
        const tabActive = tabClicked.parentElement.querySelector('.active')

        tabClicked.classList.add('active')
        tabActive.classList.remove('active')
        event.preventDefault()
        tabClicked.closest('section').querySelector(`.tab-content.active[data-tab="${tabActive.dataset.tab}"]`).classList.remove('active')
        tabClicked.closest('section').querySelector(`.tab-content[data-tab="${tabClicked.dataset.tab}"]`).classList.add('active')
      }

      if (event.target.closest('.form-save-button')) {
        const form = this.shadow.querySelector('form')
        const formData = new FormData(form)
        const formDataJson = {}

        formDataJson.images = store.getState().images.selectedImages

        for (const [key, value] of formData.entries()) {
          if (key.includes('locales')) {
            const [prefix, locales, field] = key.split('.')

            if (!(prefix in formDataJson)) {
              formDataJson[prefix] = {}
            }

            if (!(locales in formDataJson[prefix])) {
              formDataJson[prefix][locales] = {}
            }

            formDataJson[prefix][locales][field] = value ?? null
          } else if (key.includes('.')) {
            const [prefix, field] = key.split('.')

            if (!(prefix in formDataJson)) {
              formDataJson[prefix] = {}
            }

            formDataJson[prefix][field] = value ?? null
          } else {
            formDataJson[key] = value ?? null
          }
        }

        if (!formDataJson.id) {
          delete formDataJson.id
        }

        const endpoint = formDataJson.id ? `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${formDataJson.id}` : `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`
        const method = formDataJson.id ? 'PUT' : 'POST'
        delete formDataJson.id

        try {
          const response = await fetch(endpoint, {
            method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJson)
          })

          if (response.status === 500 || response.status === 422) {
            throw response
          }

          if (response.status === 200) {
            document.dispatchEvent(new CustomEvent('message', {
              detail: {
                message: 'Registro guardado correctamente'
              }
            }))
          }
        } catch (response) {
          const error = await response.json()
          this.displayErrors(error.message)
        }
        document.dispatchEvent(new CustomEvent('refresh'))
      }

      if (event.target.closest('.form-clean-button')) {
        this.shadow.querySelector('form').reset()
        store.dispatch(removeImages())
      }
    })
  }

  displayErrors (errors) {
    const formSection = this.shadow.querySelector('.form')
    const errorsContainer = formSection.querySelector('.errors-container')
    const errorsList = errorsContainer.querySelector('ul')

    errorsList.innerHTML = ''

    errorsContainer.classList.add('active')

    if (Array.isArray(errors)) {
      errors.forEach(errorMessage => {
        errorsList.innerHTML += `<li>${errorMessage.message || errorMessage}</li>`
      })
    } else {
      errorsList.innerHTML += `<li>${errors.message || errors}</li>`
    }

    formSection.addEventListener('click', async (event) => {
      errorsContainer.classList.remove('active')
    })
  }

  showElement (element) {
    Object.entries(element).forEach(([key, value]) => {
      if (typeof value === 'object') {
        if (key === 'locales') {
          Object.entries(value).forEach(([key, value]) => {
            const language = key
            Object.entries(value).forEach(([key, value]) => {
              const input = this.shadow.querySelector(`[name="locales.${language}.${key}"]`)
              input.value = value
            })
          })
        } else if (key === 'images') {
          store.dispatch(showImages(value))
        } else {

        }
      } else {
        const input = this.shadow.querySelector(`[name = "${key}"]`)
        if (input) {
          input.value = value
        }
      }
    })
  }
}

customElements.define('form-component', Form)
