const sequelize = require('../config/database');
const User = require('./User');
const Asset = require('./Asset');
const Transaction = require('./Transaction');
const Dividend = require('./Dividend');

User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Asset.hasMany(Transaction, { foreignKey: 'assetId', as: 'transactions' });
Transaction.belongsTo(Asset, { foreignKey: 'assetId', as: 'asset' });

Asset.hasMany(Dividend, { foreignKey: 'assetId', as: 'dividends' });
Dividend.belongsTo(Asset, { foreignKey: 'assetId', as: 'asset' });

module.exports = {
  sequelize,
  User,
  Asset,
  Transaction,
  Dividend,
};
