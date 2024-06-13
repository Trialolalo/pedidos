class Cart extends HTMLElement {
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

            .cart{
              position: absolute;
              inset: 0;
              z-index: 100;
              overflow: hidden;
              pointer-events: none;
            }

            .container{
              display: flex;
              position: relative;
              flex-direction: column;
              align-items: stretch;
              width: 100%;
              height: 100%;
              transform: translateX(100%);
              z-index: 1000;
              pointer-events: all;
              background: white linear-gradient(hsla(234, 100%, 50%, 0.11), hsl(340, 100%, 70%), hsl(24, 100%, 50%),  hsl(340, 100%, 70%), hsl(225, 100%, 60%));
                &.active{
                 transform: translateX(0); 
                }
            }


            .product-gallery{
              flex: 1;
              overflow: auto;
            }

            .product{
              display: grid;
              grid-template-areas: 
              "title title price"
              "details details quantity";
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

            .quantity{
              grid-area: quantity;
              text-align: end;
              font-family: 'Exo 2', sans-serif;
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

            .submit{
              display: flex;
              flex-direction: column;
              gap: 1rem;
              border-top: 5px solid black;
              padding: 1rem;
              margin-top: 1rem;
            }

            .submit button{
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1rem;
              background-color: hsl(0, 0%, 0%);
              padding: 1rem;
              color: white;
              cursor: pointer;
            }

            .submit-text{
              display: flex;
              justify-content: space-between;
              font-family: 'Exo 2', sans-serif;
              font-weight: 700;
              font-size: 1.3rem;
            }

            .select-button{
              display: flex;
              flex-direction: column;
              gap: 1rem;
              position: fixed;
              bottom: 2rem;
              left: 0;
              right: 0;
              margin: auto;
            }

            button.select-button {
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1rem;
              background-color: hsl(0, 0%, 0%);
              padding: 1rem;
              color: white;
              cursor: pointer;
            }

        </style>
        <div class="cart">
          <div class="container">
          <header-component title="Carrito"></header-component>
            <div class="product-gallery">
              <div class="product">
                <p class="title">Blasphemous II</p>
                <p class="price">25.00 €</p>
                <p class="details">Detalles</p>
                <p class="quantity">Cantidad</p>
              </div>
            </div>
            <div class="submit">
              <div class="submit-text">
                <p>Total</p>
                <p>25.00 €</p>
              </div>
              <button>Finalizar pedido</button>
            </div>
          </div>      
        </div> 

        <button class="select-button">Ver pedido</button>
      `

    const order = this.shadow.querySelector('.select-button')

    order.addEventListener('click', (event) => {
      const cart = this.shadow.querySelector('.container')

      cart.classList.add('active')
    })
  }
}

customElements.define('cart-component', Cart)
