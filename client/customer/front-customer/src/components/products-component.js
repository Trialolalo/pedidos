import { store } from '../redux/store.js'
import { updateCart } from '../redux/cart-slice.js'

class Products extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/products`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken'),
      }
    })
    
    this.data = await response.json()
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

            .products{
              width: 70%;
              min-height: 100%;
            }

            .product{
              display: flex;
              justify-content: space-between;
              align-items: center;
              max-height: 4rem;
              margin-bottom: 2rem;
              margin-top: 2rem;
            }

            .text{
              font-size: 1rem;
              font-family: 'Exo 2', sans-serif;
              font-weight: 400;
            }

            .price{
              font-size: 1.3rem;
              font-weight: 700;
              max-height: 1rem;
            }

            .quantity{
              display: flex;
              align-items: center;
              
            }

            .quantity button{
              display: flex;
              justify-content: center;
              align-items: center;
              background: hsl(0, 0%, 0%);
              width: 0.8rem;
              height: 0.8rem;
              padding: 0.8rem;
              color: white;
            }

            .quantity p{              
              font-family: 'Exo 2', sans-serif;
              background-color: white;
              padding: 0.2rem 0.6rem;
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

            .final-divider{
              display: block;
              background: hsl(0, 0%, 0%);
              box-sizing: border-box;
              height: 5px;
              width: 100%;
              border-radius: 5px;
              margin: .5rem 0rem;
              margin-bottom: 1rem;
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

        <section class="products"></section>           
      `

    const products = this.shadow.querySelector('.products')

    this.data.forEach(product => {
      const productContainer = document.createElement('div')
      productContainer.classList.add('product')
      products.appendChild(productContainer)

      const text = document.createElement('div')
      text.classList.add('text')
      productContainer.appendChild(text)

      const title = document.createElement('h4')
      title.textContent = product.name
      text.appendChild(title)

      const details = document.createElement('span')
      details.textContent = `${product.units}u, ${product.measurement}${product.measurementUnit}`
      text.appendChild(details)

      const price = document.createElement('h4')
      price.textContent = `${product.price.basePrice} €`
      text.appendChild(price)

      const quantity = document.createElement('div')
      quantity.classList.add('quantity')
      productContainer.appendChild(quantity)

      const minusButton = document.createElement('button')
      minusButton.classList.add('minus-button')
      minusButton.textContent = '-'
      quantity.appendChild(minusButton)

      const productQuantity = document.createElement('p')
      productQuantity.classList.add('product-quantity')
      productQuantity.textContent = 0
      quantity.appendChild(productQuantity)

      const plusButton = document.createElement('button')
      plusButton.classList.add('plus-button')
      plusButton.textContent = '+'
      quantity.appendChild(plusButton)

      plusButton.addEventListener('click', () => {
        productQuantity.textContent++

        store.dispatch(updateCart({
          ...product,
          quantity: parseInt(productQuantity.textContent)
        }))
      })

      minusButton.addEventListener('click', () => {
        if (productQuantity.textContent > 0) {
          productQuantity.textContent--

          store.dispatch(updateCart({
            ...product,
            quantity: parseInt(productQuantity.textContent)
          }))
        }

      })

      const divider = document.createElement('div')
      divider.classList.add('divider')
      products.appendChild(divider)
      divider.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z" /></svg>'
      const span = document.createElement('span')
      divider.appendChild(span)
    })
  }
}

customElements.define('products-component', Products)
