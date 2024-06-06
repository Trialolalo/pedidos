module.exports = function (sequelize, DataTypes) {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "UUID".'
        },
        isUUID: {
          args: 4,
          msg: 'Añade una UUID válida'
        }
      }
    },
    customerId: {
      type: DataTypes.INTEGER
    },
    fingerprintId: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'carts',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'carts_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'carts_fingerprintId_fk',
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      }
    ]
  })

  Cart.associate = function (models) {
    Cart.belongsTo(models.Customer, { as: 'customer', foreignKey: 'costumerId' })
    Cart.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId' })
    Cart.hasMany(models.CartDetail, { as: 'cartDetails', foreignKey: 'cartId' })
    Cart.hasMany(models.SaleError, { as: 'saleErrors', foreignKey: 'cartId' })
    Cart.hasMany(models.Sale, { as: 'sales', foreignKey: 'cartId' })
    Cart.hasOne(models.Sale, { as: 'sale', foreignKey: 'cartId' })
    Cart.belongsToMany(models.Product, { through: models.CartDetail, as: 'products', foreignKey: 'cartId' })
  }

  return Cart
}
