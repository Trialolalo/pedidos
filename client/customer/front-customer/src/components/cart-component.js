import isEqual from 'lodash-es/isEqual'
import { store } from '../redux/store.js'

class Cart extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.unsubscribe = null
    this.data = []
  }

  connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (!isEqual(currentState.cart.cartProducts, this.data)) {
        this.data = currentState.cart.cartProducts
        this.updateCart(this.data)
      }

      // if (currentState.cart.cartProducts.length === 0) {
      //   this.shadow.querySelector('.cart-button').classList.remove('active')
      // } else {
      //   this.shadow.querySelector('.cart-button').classList.add('active')
      // }
    })

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

            *{
              box-sizing: border-box;
            }
            
            button{
              background: none;
              border: none;
            }

            svg{
              width: 2rem;
              height: 2rem;
              padding: 1rem;
              z-index: 1000;
            }

            .close{
              fill: white;
            }

            .cart{
              position: absolute;
              inset: 0;
              z-index: 100;
              overflow: hidden;
              pointer-events: none;
            }

            .cart.center{
              align-items: center;
              background-image: linear-gradient(hsla(234, 100%, 50%, 0.11), hsl(340, 100%, 70%), hsl(24, 100%, 50%),  hsl(340, 100%, 70%), hsl(225, 100%, 60%));
              display: flex;
              height: 100vh;
              justify-content: center;
              width: 100%;
            }

            .container{
              display: flex;
              position: relative;
              flex-direction: column;
              align-items: stretch;
              width: 100%;
              height: 100%;
              transform: translateX(100%);
              transition: transform 0.5s ease-in-out;
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
              margin: 0 10%;
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
              margin: 0;
            }

            .details{
              grid-area: details;
              font-family: 'Exo 2', sans-serif;
            }

            .quantity{
              grid-area: quantity;
              text-align: end;
              font-family: 'Exo 2', sans-serif;
              margin: 0;
            }

            .price{
              font-family: 'Exo 2', sans-serif;
              grid-area: price;
              text-align: end;
              font-size: 1rem;
              font-weight: 700;
              margin: 0;
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
              margin: 0 10%;
            }

            .submit button{
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1rem;
              background-color: hsl(0, 0%, 0%);
              padding: 1rem;
              color: white;
              cursor: pointer;
              margin-bottom: 1rem;
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
              margin: 0 10%;
              align-items: center;
            }

            .message-container{
              font-family: 'Roboto Condensed', sans-serif;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              padding: 1rem;
            }

            .home-button{
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1rem;
              background-color: hsl(0, 0%, 0%);
              padding: 1rem;
              color: white;
              cursor: pointer;
              align-items: center;
            }

        </style>
        <div class="cart">
          <div class="container">
            <header-component title="Carrito">
              <button class="close" slot="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </button>
            </header-component>
            <div class="product-gallery">
              <div class="product">
                <p class="title"></p>
                <p class="price"></p>
                <p class="details"></p>
                <p class="quantity"></p>
              </div>
            </div>
            <div class="submit">
              <div class="submit-text">
                <p>Total</p>
                <p class="total">25.00 €</p>
              </div>
              <button class="end-order">Finalizar pedido</button>
            </div>
          </div>      
        </div> 

        <button class="select-button">Ver pedido</button>
      `

    const order = this.shadow.querySelector('.select-button')
    const close = this.shadow.querySelector('.close')
    const endOrder = this.shadow.querySelector('.end-order')

    order.addEventListener('click', (event) => {
      const cart = this.shadow.querySelector('.container')

      cart.classList.add('active')
    })

    close.addEventListener('click', (event) => {
      const cart = this.shadow.querySelector('.container')
      cart.classList.remove('active')
    })

    endOrder.addEventListener('click', async (event) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/sales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken'),
        },
        body: JSON.stringify({
          products: this.data
        })
      })

      const data = await response.json()
      const cart = this.shadow.querySelector('.cart')
      this.shadow.querySelector('.select-button').remove()
      cart.innerHTML = ''
      cart.classList.add('center')

      const messageContainer = document.createElement('div')
      messageContainer.classList.add('message-container')
      cart.appendChild(messageContainer)

      const title = document.createElement('h2')
      title.textContent = "Pedido realizado con éxito"
      messageContainer.appendChild(title)

      const message = document.createElement('p')
      message.textContent = `En breve recibirá un correo con los detalles. La referencia de su pedido es ${data.reference}.`
      messageContainer.appendChild(message)

      const homeLink = document.createElement('a')
      homeLink.href = 'http://dev-pedidos.com/cliente'
      messageContainer.appendChild(homeLink)

      const homeButton = document.createElement('button')
      homeButton.textContent = "Volver a Inicio"
      homeButton.classList.add('home-button')
      homeLink.appendChild(homeButton)
    })
  }

  updateCart (products) {
    const cart = this.shadowRoot.querySelector('.product-gallery')
    cart.innerHTML = ''

    const total = products.reduce((acc, product) => {
      return acc + parseFloat(product.quantity) * parseFloat(product.price.basePrice)
    }, 0)

    this.shadow.querySelector('.total').textContent = `${total.toFixed(2)}€`

    products.forEach(product => {
      const gallery = document.createElement('div')
      gallery.classList.add('product-gallery')
      cart.appendChild(gallery)

      const productContainer = document.createElement('div')
      productContainer.classList.add('product')
      gallery.appendChild(productContainer)

      const title = document.createElement('p')
      title.classList.add('title')
      title.textContent = product.title
      productContainer.appendChild(title)

      const details = document.createElement('span')
      details.textContent = `${product.units}u, ${product.measurement}${product.measurementUnit}`
      productContainer.appendChild(details)

      const price = document.createElement('p')
      price.classList.add('price')
      price.textContent = `${(parseFloat(product.quantity) * parseFloat(product.price.basePrice)).toFixed(2)}€`
      productContainer.appendChild(price)

      const quantity = document.createElement('p')
      quantity.classList.add('quantity')
      quantity.textContent = `${product.quantity} x ${product.price.basePrice}€`
      productContainer.appendChild(quantity)

      const divider = document.createElement('div')
      divider.classList.add('divider')
      gallery.appendChild(divider)
      divider.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z" /></svg>'
      const span = document.createElement('span')
      divider.appendChild(span)

      const submit = document.createElement('div')
      submit.classList.add('submit')
      cart.appendChild(submit)
    })
  }
}

customElements.define('cart-component', Cart)
