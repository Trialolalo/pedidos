import { store } from '../redux/store.js'
import { removeImages, showImages } from '../redux/images-slice.js'

class Reset extends HTMLElement {
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
              width: 40%;
              margin-top: 35vh;
              margin-left: 50vh;
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

            .title{
              font-family: 'Roboto Condensed', sans-serif;
              text-align: center;
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

            .tab.active{
              background-color: hsl(225, 54%, 33%);
              height: 100%;
              cursor: pointer;
              box-sizing: border-box;
            }

            .reset-button{
              margin-left: 21vh;
            }

            .reset-button button{
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1rem;   
              padding: 1rem;
              cursor: pointer;
            }

            .select-button{
              margin-left: 25vh;
            }

            .select-button button{
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1rem;
              background-color: hsl(225, 54%, 33%);
              padding: 1rem;
              width: 9rem;
              color: white;
              cursor: pointer;
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
        <h2 class="title">Recuperar email</h2>
          <form action=""> 
            <input type="hidden" name="id" />
            <div class="errors-container">
              <ul>
              </ul>
            </div>
            <div class="tab-content" data-tab="main">
              <div class="form-row">
                  <div class="form-element">
                    <div class="form-element-label">
                      <label>
                        Email
                      </label>
                    </div>
                    <div class="form-element-input">
                      <input class="validate" name="user" autocomplete="name" data-onlyletters="true"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="select-button">
                <button>
                  Enviar 
                </button>
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

customElements.define('reset-component', Reset)
