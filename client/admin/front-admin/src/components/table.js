class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.rows = null
  }

  connectedCallback () {
    this.loadData().then(() => this.render())
    document.addEventListener('refresh', this.handleTableRecords.bind(this))
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    const data = await response.json()
    this.rows = data.rows
  }

  handleTableRecords () {
    this.loadData(this.currentPage).then(() => this.render())
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>

        button{
            background: none;
            border: none;
        }

        .filter-slide{
            background: transparent;
            border: none;
            cursor: pointer;
        }

        .table-buttons {
            background-color: hsl(0, 0%, 100%);
            padding: 0.5rem;
            margin-bottom: 1rem;
        }

        .tables{
            flex: 1;
        }

        .table-registers{
            max-height: 70vh;
            overflow-y: scroll;
        }

        ::-webkit-scrollbar-thumb{
            background: hsl(219, 79%, 66%);
        }

        .table-top{
            background-color: hsl(225, 54%, 33%);
        }

        .table-edit{
            display: flex;
            justify-content: flex-end;
        }

        .table-info{
            background-color: hsl(0, 0%, 100%);
        }   

        .table-info ul{
            list-style: none;
            padding: 1rem;
            font-weight: bold;
            color: hsl(0, 0%, 15%);
            font-family: 'Roboto Condensed', sans-serif;
            margin: 0;
            margin-bottom: 1rem;
        }

        .table-buttons svg{
            fill: hsl(219, 79%, 66%);
            width: 2rem;
        }

        .edit-button svg{
            width: 2rem;
            height: 2rem;
            fill: hsl(0, 0%, 100%);
            cursor: pointer;
        }

        .edit-button svg:hover{
            fill: hsl(88, 67%, 62%);
        }

        .delete-button svg{
            width: 2rem;
            height: 2rem;
            fill: hsl(0, 0%, 100%);
            cursor: pointer;
        }

        .delete-button svg:hover{
            fill: hsl(0, 77%, 66%);
        }    

        .table-pagination{
            background-color: hsl(0, 0%, 100%);
            color: hsl(0, 0%, 0%);
            font-family: 'Roboto Condensed', sans-serif;
            font-weight: 700;
            margin-top: 1rem;
            padding: 1rem;
        }

        </style>
  
        <div class="tables">
            <div class="table-buttons">
                <button class="table-button filter-slide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z" /></svg>
                </button>
            </div>

            <div class="table-registers"></div>
        </div>
      `

    this.rows.forEach(row => {
      const tableRegisters = this.shadow.querySelector('.table-registers')
      const tableRegister = document.createElement('div')
      tableRegisters.appendChild(tableRegister)
      tableRegister.classList.add('table-register')

      const tableTop = document.createElement('div')
      tableTop.classList.add('table-top')
      tableRegister.appendChild(tableTop)

      const tableEdit = document.createElement('div')
      tableEdit.classList.add('table-edit')
      tableTop.appendChild(tableEdit)

      const pencil = document.createElement('div')
      pencil.classList.add('edit-button')
      pencil.dataset.id = row.id
      tableEdit.appendChild(pencil)

      const editButton = document.createElement('button')
      pencil.appendChild(editButton)
      editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>'

      const trash = document.createElement('div')
      trash.classList.add('delete-button')
      trash.dataset.id = row.id
      tableEdit.appendChild(trash)

      const trashButton = document.createElement('button')
      trash.classList.add('trash-slide')
      trash.appendChild(trashButton)
      trashButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'

      const tableInfo = document.createElement('div')
      tableInfo.classList.add('table-info')
      tableRegister.appendChild(tableInfo)

      for (const [key, value] of Object.entries(row)) {
        if (key === 'id') {
          pencil.dataset.id = value
          trash.dataset.id = value
        }
      }

      const tableList = document.createElement('ul')
      tableInfo.appendChild(tableList)
      Object.entries(row).forEach(([key, value]) => {
        if (key !== 'id') {
          const tableItem = document.createElement('li')
          tableItem.innerHTML = `${key}: ${value}`
          tableList.appendChild(tableItem)
        }
      })
    })

    const tableSection = this.shadow.querySelector('.tables')

    tableSection?.addEventListener('click', async (event) => {
      if (event.target.closest('.delete-button')) {
        const deleteButton = event.target.closest('.delete-button')
        const id = deleteButton.dataset.id

        const endpoint = `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${id}`

        document.dispatchEvent(new CustomEvent('showModalDestroy', {
          detail: {
            endpoint
          }
        }))
      }

      if (event.target.closest('.filter-slide')) {
        document.dispatchEvent(new CustomEvent('showModalFilter'))
      }

      if (event.target.closest('.edit-button')) {
        const elementId = event.target.closest('.edit-button').dataset.id
        const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${elementId}`)
        const data = await response.json()

        document.dispatchEvent(new CustomEvent('showElement', {
          detail: {
            data
          }
        }))
      }
    })
  }
}

customElements.define('table-component', Table)
