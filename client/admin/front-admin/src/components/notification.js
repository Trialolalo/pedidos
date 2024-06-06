class Notification extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('message', this.handleShowNotification.bind(this))

    this.render()
  }

  handleShowNotification (event) {
    this.shadow.querySelector('.message').innerHTML = event.detail.message
    this.shadow.querySelector('.notification').classList.add('active')
    setTimeout(() => {
      this.shadow.querySelector('.notification').classList.remove('active')
    }, 2500)
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .notification {
            background: hsl(225, 54%, 33%);
            height: 8vh;
            width: 30vh;
            bottom: 5vh;
            position: fixed;
            z-index: 1003;
            padding: 1rem;
            opacity: 0.5;
            overflow: hidden;
            visibility: hidden;
            transition: opacity 200ms ease-in, visibility 0ms ease-in 0ms;
          }

          .notification.active {
            right: 10vh;
            opacity: 1;
            visibility: visible;
          }

          .notification h3 {
            color: hsl(0, 0%, 100%);
            font-family: 'Roboto Condensed', sans-serif;
            font-weight: 400;
          }
        </style>
  
        <div class="notification">
          <h3 class="message"></h3>
        </div>        
      `
  }
}

customElements.define('notification-component', Notification)
