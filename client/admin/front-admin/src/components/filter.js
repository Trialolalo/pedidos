class Filter extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('showModalFilter', event => {
      this.openModal()
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>

        .form{
            flex: 2;
        }

        .form-row{
            display: flex;
            gap: 1rem;
        }

        button{
            background: none;
            border: none;
        }

        label{
            font-size: large;
            border: none;
            padding: 1rem;
            font-family: 'Roboto Condensed', sans-serif;
            font-weight: 700;
            font-size: 1rem;
        }

        .form-element-input{
            margin-bottom: 1rem;
            background-color: hsl(0, 0%, 100%);
        }

        input{
            box-sizing: border-box;
            padding: 0.5rem;
            width: 100%;
            height: 2rem;
        }
       
        .filter-modal{
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
        
        .filter-modal.active{
            opacity: 1;
            visibility: visible;
        }
        
        .filter-form{
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            background-color: hsl(195, 50%, 79%);
            padding: 1rem;
        }
        
        .filter-form .form-row{
            justify-content: space-between;
        }
        
        .filter-form h3{
            font-family: 'Roboto Condensed', sans-serif;
            font-weight: 700;
            text-align: center;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
        }
        
        .button-filter button{
            font-family: 'Roboto Condensed', sans-serif;
            font-weight: 700;
            font-size: 1rem;
            background-color: hsl(88, 67%, 62%);
            padding: 1rem;
            cursor: pointer;
            width: 9rem;
        }
        
        .button-cancel button{
            font-family: 'Roboto Condensed', sans-serif;
            font-weight: 700;
            font-size: 1rem;
            background-color: hsl(0, 77%, 66%);
            padding: 1rem;
            cursor: pointer;
            width: 9rem;
        }
        </style>
  
      
        <div class="filter-modal">
            <form class="filter-form">
                <h3>
                    Filtraje de tabla
                </h3>
                <div class="form-element">
                    <div class="form-element-label">
                        <label>
                            Nombre
                        </label>
                    </div>
                    <div class="form-element-input">
                        <input name="submitted-name" autocomplete="name" />
                    </div>
                </div>
                <div class="form-element">
                    <div class="form-element-label">
                        <label>
                            Email
                        </label>
                    </div>
                    <div class="form-element-input">
                        <input name="submitted-name" autocomplete="name" />
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="button-filter">
                        <button>
                            Filtrar
                        </button>
                    </div>
                    <div class="button-cancel">
                        <button>
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>  
      `

    const buttonCancel = this.shadow.querySelector('.button-cancel')

    buttonCancel.addEventListener('click', async (event) => {
      event.preventDefault()
      this.closeModal()
    })
  }

  openModal () {
    const filterModal = this.shadow.querySelector('.filter-modal')
    filterModal.classList.add('active')
  }

  closeModal () {
    const filterModal = this.shadow.querySelector('.filter-modal')
    filterModal.classList.remove('active')
  }
}

customElements.define('filter-component', Filter)
