const sequelizeDb = require('../../models/sequelize');
const Return = sequelizeDb.Return
const Sale = sequelizeDb.Sale
const Customer = sequelizeDb.Customer
const Op = sequelizeDb.Sequelize.Op

exports.create = async (req, res) => {
  try {
    const { saleId, customerId, totalBasePrice } = req.body

    const currentDateTime = new Date();
    const currentDateString = currentDateTime.toISOString().slice(0, 10).replace(/-/g, '');

    const lastSaleReturn = await Return.findOne({
      order: [['createdAt', 'DESC']]
    });

    let reference = ''

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

    const returnData = {
      saleId,
      customerId,
      reference,
      totalBasePrice: parseFloat(totalBasePrice).toFixed(2),
      returnDate: currentDateTime.toISOString().slice(0, 10),
      returnTime: currentDateTime.toTimeString().slice(0, 8)
    };

    const newReturn = await Return.create(returnData)
    
    res.status(201).send(newReturn)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: err.message || 'Algún error ha surgido al crear la devolución.'
    });
  }
};

exports.findAll = (req, res) => {
  const returnWhereStatement = {}
  returnWhereStatement.deletedAt = { [Op.is]: null }

  Return.findAll({
    where: returnWhereStatement,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Sale,
        attributes: ['id', 'reference']
      },
      {
        model: Customer,
        attributes: ['id', 'name']
      }
    ]
  })
  .then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status500().send({
      message: err.message || 'Algún error ha surgido al recuperar los datos.'
    });
  });
};

exports.findOne = (req, res) => {
  const returnWhereStatement = {}
  returnWhereStatement.deletedAt = { [Op.is]: null }
  returnWhereStatement.id = req.params.id

  Return.findOne({
    where: returnWhereStatement,
    include: [
      {
        model: Sale,
        attributes: ['id', 'reference']
      },
      {
        model: Customer,
        attributes: ['id', 'name']
      }
    ]
  })
  .then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}
