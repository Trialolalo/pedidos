module.exports = function (sequelize, DataTypes) {
  const Tax = sequelize.define('Tax', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "País".'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Tipo".'
        }
      }
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Ratio".'
        }
      }
    },
    multiplier: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Multiplicador".'
        }
      }
    },
    current: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Actual".'
        }
      }
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
    tableName: 'taxes',
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
        name: 'taxes_countryId_fk',
        using: 'BTREE',
        fields: [
          { name: 'countryId' }
        ]
      }
    ]
  })

  Tax.associate = function (models) {
    Tax.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' })
    Tax.hasMany(models.CartDetail, { as: 'cartDetails', foreignKey: 'taxId' })
    Tax.hasMany(models.Price, { as: 'prices', foreignKey: 'taxId' })
    Tax.hasMany(models.ReturnDetail, { as: 'returnDetails', foreignKey: 'taxId' })
    Tax.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'taxId' })
  }

  return Tax
}
