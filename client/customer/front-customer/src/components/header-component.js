class Header extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
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
            }

            .row{
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
        </style>
  
        <header>
          <div class="row">
            <title-component title="${this.title}"></title-component>
              <div class="icon">
                <slot name="button"></slot>
              </div>
          </div>
        </header>            
      `
  }
}

customElements.define('header-component', Header)
