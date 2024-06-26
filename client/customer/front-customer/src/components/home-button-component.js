class HomeButton extends HTMLElement {
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

            svg *{
              fill: white;
            }

            svg{
              width: 2rem;
              height: 2rem;
              padding: 1rem;
            }
        </style>
          
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
        </svg>
      `
  }
}

customElements.define('home-button-component', HomeButton)
