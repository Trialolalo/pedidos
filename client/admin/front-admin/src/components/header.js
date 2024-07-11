class Header extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 0;
          }
        </style>
  
        <header>
          <slot></slot>
        </header>
      `
  }
}

customElements.define('header-component', Header)
