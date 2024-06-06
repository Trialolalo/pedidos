class Header extends HTMLElement {
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

            header{
              background-color: hsl(0, 0%, 0%);
              justify-content: space-between;
            }

            .row{
              display: flex;
            }
        </style>
  
        <header>
          <div class="row">
            <title-component title="Inicio"></title-component>
              <div class="icon">
                <slot name="button"></slot>
              </div>
          </div>
        </header>            
      `
  }
}

customElements.define('header-component', Header)
