class Menu extends HTMLElement {
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
            :host {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 15vh;
            }
            
            button{
              background: none;
              border: none;
            }

            .row{
              width: 50%;
            }

            .select-button{
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            .select-button button{
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1rem;
              background-color: hsl(0, 0%, 0%);
              padding: 1rem;
              color: white;
              cursor: pointer;
            }

        </style>
  
        <div class="row">
          <logo-component></logo-component>
          <div class="select-button">
            <button>
              Nuevo pedido 
            </button>

            <button>
              Pedidos anteriores 
            </button>
          </div>
        </div>            
      `
  }
}

customElements.define('menu-component', Menu)
