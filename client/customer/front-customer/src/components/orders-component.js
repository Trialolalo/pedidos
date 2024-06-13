class Orders extends HTMLElement {
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
              margin-top: 5vh;
            }
            
            button{
              background: none;
              border: none;
            }

            .container{
              display: flex;
              flex-direction: column;
              align-items: stretch;
              width: 80%;
              max-height: 80vh;
              height: 80vh;
            }

            .product-gallery{
              flex: 1;
              overflow: auto;
            }

            .filter{
              display: grid;
              grid-template-areas: 
              "filter-reference   button-reference"
              "filter-calendar  button-calendar";
            }

            .filter-reference{
              grid-area: filter-reference;
              font-family: 'Exo 2', sans-serif;
              font-weight: 700;
            }

            .button-reference{
              grid-area: button-reference;
              font-family: 'Exo 2', sans-serif;
              font-weight: 700;
            }

            .button-reference button{
              font-family: 'Exo 2', sans-serif;
              background-color: black;
              color: white;
              justify-content: center;
              align-items: center;
              padding: 0.5rem;
              border-radius: 5px;
              font-weight: 1rem;
            }

            .filter-calendar{
              grid-area: filter-calendar;
              font-family: 'Exo 2', sans-serif;
              font-weight: 700;
            }

            .button-calendar{
              grid-area: button-calendar;
              font-family: 'Exo 2', sans-serif;
              font-weight: 700;
            }

            .button-calendar button{
              font-family: 'Exo 2', sans-serif;
              background-color: black;
              color: white;
              justify-content: center;
              align-items: center;
              padding: 0.5rem;
              border-radius: 5px;
              font-weight: 1rem;
            }

            .product{
              display: grid;
              grid-template-areas: 
              "title title price"
              "details details order";
              margin-top: 1rem;
            }

            .title{
              grid-area: title;
              font-family: 'Exo 2', sans-serif;
              font-weight: 700;
            }

            .details{
              grid-area: details;
              font-family: 'Exo 2', sans-serif;
            }

            .order{
              grid-area: order;
              text-align: end;
              font-family: 'Exo 2', sans-serif;
              margin-top: 0.5rem;
            }

            .order button{
              font-family: 'Exo 2', sans-serif;
              background-color: black;
              color: white;
              justify-content: center;
              align-items: center;
              padding: 0.5rem;
              border-radius: 5px;
              font-weight: 1rem;
            }

            .price{
              font-family: 'Exo 2', sans-serif;
              grid-area: price;
              text-align: end;
              font-size: 1rem;
              font-weight: 700;
            }

            .divider{
              display: flex;
              align-items: center;
              justify-content: space-between;
            }

            .divider span{
              height: 2px;
              background: hsl(0, 0%, 0%);
              box-sizing: border-box;
              width: 85%;
              border-radius: 5px;
              margin: .5rem 0rem;
            }

            .divider svg{
              width: 1.5rem;
            } 

        </style>
        <div class="container">

          <div class="filter">
            <input type="text" class="filter-reference">
            <div class="button-reference">
              <button>Buscar por preferencia</button>
            </div> 
            <input type="date" class="filter-calendar">
            <div class="button-calendar">
              <button>Buscar por fecha</button>
            </div>            
          </div>

          <div class="product-gallery">
            <div class="product">
              <p class="title">Pedido 1</p>
              <p class="price">75.00 €</p>
              <p class="details">Detalles</p>
              <div class="order">
                <button >Ver Pedido</button>
              </div>
            </div>
            <div class="divider">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z" />
              </svg>
              <span></span>
            </div>
            <div class="product">
              <p class="title">Pedido 2</p>
              <p class="price">10.50 €</p>
              <p class="details">Detalles</p>
              <div class="order">
                <button >Ver Pedido</button>
              </div>            
            </div>
            <div class="divider">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z" />
              </svg>
              <span></span>
            </div>
            <div class="product">
              <p class="title">Pedido 3</p>
              <p class="price">35.00 €</p>
              <p class="details">Detalles</p>
              <div class="order">
                <button >Ver Pedido</button>
              </div>
            </div>
          </div>
        </div>       
      `
  }
}

customElements.define('orders-component', Orders)
