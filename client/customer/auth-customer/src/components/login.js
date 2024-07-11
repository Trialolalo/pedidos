import { store } from '../redux/store.js'
import { removeImages, showImages } from '../redux/images-slice.js'

class Login extends HTMLElement {
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
                        Usuario
                      </label>
                    </div>
                    <div class="form-element-input">
                      <input class="validate" name="email" autocomplete="name" data-onlyletters="true"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row">
                  <div class="form-element">
                    <div class="form-element-label">
                      <label>
                        Contraseña
                      </label>
                    </div>
                    <div class="form-element-input">
                      <input type="password" class="validate" name="password"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="reset-button">
                <button>
                  ¿Has olvidado tu contraseña? 
                </button>
              </div>
              <div class="select-button">
                <button>
                  Entrar 
                </button>
             </div>
            </div>                
          </form>
        </section>            
      `

    const form = this.shadow.querySelector('form')

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.submitForm(form)
    })
  }

  async submitForm (form) {
    const endpoint = import.meta.env.VITE_API_URL
    const formData = new FormData(form)
    const formDataJson = Object.fromEntries(formData.entries())

    try {
      const result = await fetch(`${endpoint}/api/auth/customer/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJson)
      })

      if (result.ok) {
        const data = await result.json()
        localStorage.setItem("customerAccessToken", data.customerAccessToken)
        window.location.href = data.redirection
      } else {
        const error = await result.json()
        console.log(error.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

customElements.define('login-component', Login)
