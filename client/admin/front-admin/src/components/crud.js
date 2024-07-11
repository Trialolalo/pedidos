class Crud extends HTMLElement {
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
          .crud{
            display: flex;
            gap: 3rem;
          }

          .table-section{
            flex: 1;
          }

          .form-section{
            flex: 2;
          }
        </style>
  
        <div class="crud">
          <div class="table-section">
            <slot name="table"></slot>
          </div>
          <div class="form-section">
            <slot name="form"></slot>
          </div>
        </div>
      `
  }
}

customElements.define('crud-component', Crud)
