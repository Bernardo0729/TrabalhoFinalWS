const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dividend = sequelize.define('Dividend', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Dividend;
