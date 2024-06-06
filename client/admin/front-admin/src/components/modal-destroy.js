class ModalDestroy extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = ''
  }

  connectedCallback () {
    document.addEventListener('showModalDestroy', this.handleShowModalDestroy.bind(this))

    this.render()
  }

  handleShowModalDestroy (event) {
    this.endpoint = event.detail.endpoint
    const trashModal = this.shadow.querySelector('.trash-modal')
    trashModal.classList.add('active')
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
            button{
                background: none;
                border: none;
            }
            
            .form-row{
                display: flex;
                gap: 1rem;
            }
            
            .trash-modal{
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              background-color: hsla(0, 0%, 14%, 0.555);
              visibility: hidden;
              position: fixed;
              height: 100vh;
              width: 100%;
              left: 0;
              top: 0;
              opacity: 0.5;
              overflow: hidden;
              transition: opacity 200ms ease-in, visibility 0ms ease-in 0ms;
              z-index: 1002;
            }

            .trash-modal.active{
                opacity: 1;
                visibility: visible;
            }

            .trash-window{
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                background-color: hsl(195, 50%, 79%);
                padding: 1rem;
            }

            .trash-modal.form-row{
                justify-content: space-between;
            }

            .trash-modal h3{
                font-family: 'Roboto Condensed', sans-serif;
                font-weight: 700;
                text-align: center;
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
            }

            .button-confirmation button{
                font-family: 'Roboto Condensed', sans-serif;
                font-weight: 700;
                font-size: 1.5rem;
                background-color: hsl(88, 67%, 62%);
                padding: 1rem;
                cursor: pointer;
                width: 9rem;
            }

            .button-cancelation button{
                font-family: 'Roboto Condensed', sans-serif;
                font-weight: 700;
                font-size: 1.5rem;
                background-color: hsl(0, 77%, 66%);
                padding: 1rem;
                cursor: pointer;
                width: 9rem;
            }
        </style>
  
      
        <div class="trash-modal">
            <div class="trash-window">
            <h3>
                ¿Quiere eliminar el registro?
            </h3>
            <div class="form-row">
                <div class="button-confirmation">
                    <button>
                        Si
                    </button>
                </div>
                <div class="button-cancelation">
                    <button>
                        No
                    </button>
                </div>
            </div>
            </div>
        </div>            
      `

    const trashModal = this.shadow.querySelector('.trash-modal')

    trashModal?.addEventListener('click', async (event) => {
      if (event.target.closest('.button-cancelation')) {
        trashModal.classList.remove('active')
      }

      if (event.target.closest('.button-confirmation')) {
        try {
          const response = await fetch(this.endpoint, {
            method: 'DELETE'
          })

          if (response.status === 200) {
            document.dispatchEvent(new CustomEvent('message', {
              detail: {
                message: 'Registro eliminado correctamente'
              }
            }))

            trashModal.classList.remove('active')
          } else {
            throw response
          }
        } catch (error) {
          console.error('Error al eliminar el registro:', error)
        }
        document.dispatchEvent(new CustomEvent('refresh'))
      }
    })
  }
}

customElements.define('destroy-component', ModalDestroy)
