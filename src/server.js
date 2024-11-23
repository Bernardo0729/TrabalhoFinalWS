const express = require('express');
const passport = require('./config/passport'); 
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes'); 
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(passport.initialize());

app.use('/auth', authRoutes);

app.use('/users', userRoutes);
app.use('/assets', assetRoutes);
app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
    try {
        await sequelize.sync();
        console.log('Banco de dados SQLite sincronizado com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados SQLite:', error);
    }
});
