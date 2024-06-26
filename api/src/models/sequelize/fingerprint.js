module.exports = function (sequelize, DataTypes) {
  const Fingerprint = sequelize.define('Fingerprint', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Ciudad".'
        }
      }
    },
    fingerprint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Navegador".'
        }
      }
    },
    browserVersion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Versión del Navegador".'
        }
      }
    },
    os: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Sistema operativo".'
        }
      }
    },
    osVersion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Versión del sistema opetarivo".'
        }
      }
    },
    screenHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Altura de pantalla".'
        }
      }
    },
    screenWidth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Anchura de pantalla".'
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
    tableName: 'fingerprints',
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
        name: 'fingerprints_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'fingerprints_cityId_fk',
        using: 'BTREE',
        fields: [
          { name: 'cityId' }
        ]
      }
    ]
  })

  Fingerprint.associate = function (models) {
    Fingerprint.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    Fingerprint.belongsTo(models.City, { as: 'city', foreignKey: 'cityId' })
    Fingerprint.hasMany(models.ApiTracking, { as: 'apiTrackings', foreignKey: 'fingerprintId' })
    Fingerprint.hasMany(models.Cart, { as: 'carts', foreignKey: 'fingerprintId' })
    Fingerprint.hasMany(models.Contact, { as: 'contacts', foreignKey: 'fingerprintId' })
    Fingerprint.hasMany(models.CustomerTracking, { as: 'customerTrackings', foreignKey: 'fingerprintId' })
    Fingerprint.hasMany(models.PageTracking, { as: 'pageTrackings', foreignKey: 'fingerprintId' })
  }

  return Fingerprint
}
