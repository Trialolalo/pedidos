class Orders extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
    this.returnButton()
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/sales`, {
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
              margin-top: 5vh;
            }
            
            button{
              background: none;
              border: none;
            }

            .sale{
              display: flex;
              flex-direction: column;
              align-items: stretch;
            }

            .sales-gallery{
              flex: 1;
              overflow-y: auto;
              max-height: 80vh;
              padding: 1rem 1rem;
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
              margin-top: 2rem;
              margin-bottom: 2rem;
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

            .sale-detail{
              display: flex;
              position: absolute;
              flex-direction: column;
              align-items: stretch;
              width: 100%;
              height: 100%;
              transform: translateX(100%);
              transition: transform 0.5s ease-in-out;
              z-index: 1000;
              top: 0;
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

            .product-details{
              display: flex;
              justify-content: space-between;
              margin-top: 1rem;
              align-items: center;
            }

            .total{
              display: flex;
              flex-direction: column;
              gap: 1rem;
              border-top: 5px solid black;
              padding: 1rem;
              margin-top: 1rem;
              margin: 0 10%;
            }

            .total-text{
              display: flex;
              justify-content: space-between;
              font-family: 'Exo 2', sans-serif;
              font-weight: 700;
              font-size: 1.3rem;
            }

            .title-detail{
              font-family: 'Exo 2', sans-serif;
              font-weight: 700;
            }

            .quantity-detail{
              text-align: end;
              font-family: 'Exo 2', sans-serif;
              margin: 0;
            }

            .gallery-details{

            }

            .return-container{
              min-width: 8rem;
              align-items: center;
              justify-content: center;
              margin-bottom: 2rem;
              margin-left: auto;
            }

            .return-button{
              font-family: 'Exo 2', sans-serif;
              background-color: black;
              color: white;
              padding: 0.75rem;
              border-radius: 5px;
              font-weight: 1rem;
            }


        </style>

        <section class="sales">
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
          <div class="sales-gallery">
          </div>
        </section> 

        <section class="sale-detail">
        <header-component title="Pedido">
          <title-component></title-component>
          <back-button-component slot="button"></back-button-component>
        </header-component>
          <div class="product-gallery">
           
          </div>

          <div class="total">
            <div class="total-text">
              <p>Total</p>
              <p class="total-price"></p>
            </div>
          </div>

          <div class="return-container">
            <button class="return-button">Devolver</button>
          </div>
          

          
        <section>   
      `
      const sales = this.shadow.querySelector('.sales-gallery')
      const saleDetails = this.shadow.querySelector('.sale-detail')

      this.data.forEach(sale => {
        const product = document.createElement('div')
        product.classList.add('product')
        sales.appendChild(product)
    
        const title = document.createElement('p')
        title.classList.add('title')
        title.textContent = `${sale.reference} €`
        product.appendChild(title)
    
        const price = document.createElement('p')
        price.classList.add('price')
        price.textContent = `${sale.totalBasePrice} €` 
        product.appendChild(price)
    
        const details = document.createElement('p')
        details.classList.add('details')
        details.textContent = `${sale.saleDate}` 
        product.appendChild(details)
    
        const orderContainer = document.createElement('div')
        orderContainer.classList.add('order')
        product.appendChild(orderContainer)
    
        const orderButton = document.createElement('button')
        orderButton.textContent = 'Ver Pedido'
        orderButton.dataset.saleId = sale.id
        orderContainer.appendChild(orderButton)

        orderButton.addEventListener('click', async (event) => {
          const saleDetail = this.shadow.querySelector('.sale-detail')
          const saleId = event.target.closest('.order button').dataset.saleId

          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/sales/${saleId}`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken'),
            }
          })

          const data = await response.json()
          const productGallery = this.shadow.querySelector('.product-gallery')

          let total = 0



          data.saleDetails.forEach(detail => {

            const galleryDetails = document.createElement('div')
            galleryDetails.classList.add('gallery-details')


            const productDetails = document.createElement('div')
            productDetails.classList.add('product-details')

            const titleDetail = document.createElement('p')
            titleDetail.classList.add('title-detail')
            titleDetail.textContent = `${detail.productName} x${detail.quantity}` 



            const quantityDetail = document.createElement('p')
            quantityDetail.classList.add('quantity-detail')
            quantityDetail.textContent = `${(detail.quantity * detail.basePrice).toFixed(2)}€`
            
            productDetails.appendChild(titleDetail)
            productDetails.appendChild(quantityDetail)
            galleryDetails.appendChild(productDetails)
            productGallery.appendChild(galleryDetails)

            total = total + detail.quantity * detail.basePrice

          })

          const totalPrice = this.shadow.querySelector('.total-price')

          totalPrice.textContent = `${total.toFixed(2)}€`

          saleDetail.classList.add('active')
          saleDetail.dataset.saleId = saleId
        })
    
        const divider = document.createElement('div')
        divider.classList.add('divider')
        sales.appendChild(divider)
        divider.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z" /></svg>'
      
        const span = document.createElement('span')
        divider.appendChild(span)
      })

    }

      returnButton() {
        const returnButton = this.shadow.querySelector('.return-button')
        returnButton.addEventListener('click', async () => {
          const saleId = this.shadow.querySelector('.sale-detail.active').dataset.saleId
          const sale = this.data.find(sale => sale.id == saleId)
          
          if (!sale) {
            alert('No se encontró el pedido para devolver.')
            return
          }
    
          const returnData = {
            saleId: sale.id,
            customerId: sale.customerId,
            reference: sale.reference,
            totalBasePrice: sale.totalBasePrice
          } 
          
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customer/returns`, {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('customerAccessToken'),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(returnData)
            })
            const result = await response.json()
            
          } catch (error) {
            console.error('Error:', error)
          }
        })
      }
    }

customElements.define('orders-component', Orders)
