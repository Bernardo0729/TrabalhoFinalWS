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

app.use('/api/auth', authRoutes);

const authMiddleware = require('./middlewares/authMiddleware');
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/assets', authMiddleware, assetRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    try {
        await sequelize.sync({ force: true }); 
        console.log('Banco de dados sincronizado com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
});
