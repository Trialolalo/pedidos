const sequelizeDb = require('../../models/sequelize')
const GraphService = require('../../services/graph-service.js')
const Product = sequelizeDb.Product
const Customer = sequelizeDb.Customer
const Sale = sequelizeDb.Sale
const SaleDetail = sequelizeDb.SaleDetail
const Op = sequelizeDb.Sequelize.Op

exports.create = async (req, res) => {
  try {
    const productsId = req.body.products.map(product => {
      return product.id
    })

    let products = await Product.findAll({
      where: {
        id: productsId
      },
      include: [
        {
          attributes: ['id', 'basePrice', 'deletedAt'],
          model: sequelizeDb.Price,
          as: 'price'
        }
      ]
    })

    products = products.map(item => {
      const quantity = req.body.products.find(product => product.id === item.id).quantity
      item.dataValues.quantity = quantity
      return item
    })

    const totalBasePrice = await products.reduce((total, item) => {
      const basePrice = item.price ? item.price.basePrice : 0;
      return total + (basePrice * item.dataValues.quantity);
    }, 0)

    const currentDateTime = new Date();
    const currentDateString = currentDateTime.toISOString().slice(0, 10).replace(/-/g, '');

    let reference = ''

    const lastSaleReturn = await Sale.findOne({
      order: [['createdAt', 'DESC']]
    });

    if (lastSaleReturn) {
      const lastReference = lastSaleReturn.reference;
      const lastDateString = lastReference.slice(0, 8);
      let lastSequenceNumber = parseInt(lastReference.slice(8), 10);

      if (currentDateString === lastDateString) {
        lastSequenceNumber += 1;
      } else {
        lastSequenceNumber = 1;
      }

      reference = `${currentDateString}${String(lastSequenceNumber).padStart(4, '0')}`;
    } else {
      reference = `${currentDateString}0001`;
    }

    const saleData = {
      customerId: req.customerId,
      reference,
      totalBasePrice: parseFloat(totalBasePrice).toFixed(2),
      saleDate: currentDateTime.toISOString().slice(0, 10),
      saleTime: currentDateTime.toTimeString().slice(0, 8)
    }

    const sale = await Sale.create(saleData)

    const graphService = new GraphService()

    await graphService.createNode('Sale', {
      id: sale.dataValues.id, 
      reference: sale.reference, 
      totalBasePrice: sale.totalBasePrice, 
      saleDate: sale.saleDate,
      saleTime: sale.saleTime
    })

    await graphService.createRelation('Customer', 'PURCHASED', 'Sale', {
      entityId : req.customerId,
      relatedEntityId: sale.dataValues.id
    })

    const saleDetailsData = products.map(product => {

      const saleDetailData = {
        saleId: sale.dataValues.id,
        productId: product.id,
        priceId: product.price.dataValues.id,
        productName: product.dataValues.name,
        basePrice: product.price.dataValues.basePrice,
        quantity: product.dataValues.quantity
      }

      return saleDetailData
    })

    await SaleDetail.bulkCreate(saleDetailsData)

    saleDetailsData.forEach(async saleDetail => {
      await graphService.createRelation('Product', 'PART_OF', 'Sale', {
        entityId : saleDetail.productId,
        relatedEntityId: saleDetail.saleId,
        properties: {
          quantity: saleDetail.quantity
        }
      })

      await graphService.createRelation('Customer', 'PURCHASED', 'Product', {
        entityId : req.customerId,
        relatedEntityId: saleDetail.productId,
        properties: {
          quantity: saleDetail.quantity
        }
      })
    });

    const customer = await Customer.findByPk(req.customerId)

    const saleInfo = {
      sale,
      customer,
      saleDetailsData
    }

    req.redisClient.publish('new-sale', JSON.stringify({
      userId: req.customerId,
      userType: 'customer',
      template: 'order-details',
      saleInfo
    }))
    
    res.status(201).send(sale)

  } catch (err) {
    console.log(err)
  }
}

exports.findAll = (req, res) => {
  const saleWhereStatement = {}
  saleWhereStatement.deletedAt = { [Op.is]: null }

  Sale.findAll({
    where: saleWhereStatement,
    order: [['createdAt', 'DESC']],
  })
  .then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}

exports.findOne = (req, res) => {
  const saleWhereStatement = {}
  saleWhereStatement.deletedAt = { [Op.is]: null }
  saleWhereStatement.id = req.params.id

  Sale.findOne({
    where: saleWhereStatement,
    order: [['createdAt', 'DESC']],
    include: [
      {
        attributes: ['productName', 'basePrice', 'quantity'],
        model: sequelizeDb.SaleDetail,
        as: 'saleDetails'
      }
    ]
  })
  .then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}
