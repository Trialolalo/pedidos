class Menu extends HTMLElement {
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
            .menu{
                background: hsl(0, 79%, 34%);
                height: 100vh;
                width: auto;
                left: 0;
                position: fixed;
                transition: top 1s;
                top: -100vh;
                width: 100%;
                z-index: 1000;
            }

            .menu.active{
                top: 0;
            }

            .menu-button{
                position: relative;
                z-index: 1001;
                width: 100%;
                border: none;
                background: none;
                padding: 0;
            }

            .menu-button.active{
                z-index: 1001;
            }

            .burger-menu{
                width: 5%;
            }
    
            .btn {
                position: relative;
                width: 75px;
                cursor: pointer;
            }
    
            .btn span {
                display: block;
                width: 100%;
                height: 8px;
                background: hsl(0, 0%, 100%);
                transition: all .3s;
                position: relative;
            }
    
            .btn span + span {
                margin-top: 14px;
            }
    
            .active .btn span:nth-child(1) {
                animation: ease .7s top forwards;
            }
    
            .btn span:nth-child(1) {
                animation: ease .7s top-2 forwards;
            }
    
            .active .btn span:nth-child(2) {
                animation: ease .7s scaled forwards;
            }
    
            .btn span:nth-child(2) {
                animation: ease .7s scaled-2 forwards;
            }
            
            .active .btn span:nth-child(3) {
                animation: ease .7s bottom forwards;
            }
            
            .not-active .btn span:nth-child(3) {
                animation: ease .7s bottom-2 forwards;
            }
            
            @keyframes top {
                0% {
                top: 0;
                transform: rotate(0);
                }
                50% {
                top: 22px;
                transform: rotate(0);
                }
                100% {
                top: 22px;
                transform: rotate(45deg);
                }
            }
    
            @keyframes top-2 {
                0% {
                top: 22px;
                transform: rotate(45deg);
                }
                50% {
                top: 22px;
                transform: rotate(0deg);
                }
                100% {
                top: 0;
                transform: rotate(0deg);
                }
            }
    
            @keyframes bottom {
                0% {
                bottom: 0;
                transform: rotate(0);
                }
                50% {
                bottom: 22px;
                transform: rotate(0);
                }
                100% {
                bottom: 22px;
                transform: rotate(135deg);
                }
            }
    
            @keyframes bottom-2 {
                0% {
                bottom: 22px;
                transform: rotate(135deg);
                }
                50% {
                bottom: 22px;
                transform: rotate(0);
                }
                100% {
                bottom: 0;
                transform: rotate(0);
                }
            }
    
            @keyframes scaled {
                50% {
                transform: scale(0);
                }
                100% {
                transform: scale(0);
                }
            }
    
            @keyframes scaled-2 {
                0% {
                transform: scale(0);
                }
                50% {
                transform: scale(0);
                }
                100% {
                transform: scale(1);
                }
            }
        </style>
  
        <div class="burger-menu">
            <button class="menu-button">
                <div class="btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
        <div class="menu"></div>
      `

    const menuButton = this.shadow.querySelector('.menu-button')
    const menu = this.shadow.querySelector('.menu')

    menuButton.addEventListener('click', () => {
      menu.classList.toggle('active')
      menuButton.classList.toggle('active')
    })
  }
}

customElements.define('menu-component', Menu)
