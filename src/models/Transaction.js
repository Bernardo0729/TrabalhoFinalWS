const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  type: {
    type: DataTypes.ENUM('compra', 'venda', 'dividendo'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
}, {
  timestamps: true,
});

module.exports = Transaction;
