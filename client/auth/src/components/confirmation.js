import { store } from '../../../admin/auth-admin/src/redux/store.js'
import { removeImages, showImages } from '../../../admin/auth-admin/src/redux/images-slice.js'

class Reset extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (!token) {
      window.location.href = '/'
    }

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
              margin-left: 30vh;
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
        <h2 class="title">Recuperar contraseña</h2>
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
                      <label class="password">
                        Activar cuenta
                      </label>
                    </div>
                    <div class="form-element-input">
                      <input type="password" class="validate" name="password"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row">
                  <div class="form-element">
                    <div class="form-element-label">
                      <label class="repeat-password">
                        Repetir contraseña
                      </label>
                    </div>
                    <div class="form-element-input">
                      <input type="password" class="validate" name="repeat-password"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="select-button">
                <button>
                  Activar 
                </button type="submit">
             </div>
            </div>                
          </form>
        </section>            
      `

    const formSection = this.shadow.querySelector('form')

    formSection.addEventListener('submit', async (event) => {
      event.preventDefault()
      const password = this.shadow.querySelector('input[name="password"]').value
      const repeatPassword = this.shadow.querySelector('input[name="repeat-password').value
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      })
      console.log(password)
      console.log(token)
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
}

customElements.define('confirmation-component', Reset)
