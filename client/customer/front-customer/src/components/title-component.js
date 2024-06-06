class Title extends HTMLElement {
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

            .title{
              color: hsl(0, 0%, 100%);
              font-size: 0.7rem;
              font-family: 'Roboto Condensed', sans-serif;
              font-weight: 400;
            }

            .title h1{
              padding-left: 2rem;
            }
        </style>
          
        <div class="title">
          <h1>${this.title}</h1>
        </div>
      `
  }
}

customElements.define('title-component', Title)
