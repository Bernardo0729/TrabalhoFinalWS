const { Transaction } = require('../models');
const { body, validationResult } = require('express-validator');

const validateTransaction = [
    body('type').isIn(['deposit', 'withdraw', 'buy', 'sell']).withMessage('Tipo de transação inválido.'),
    body('amount').isNumeric().withMessage('O valor deve ser um número.'),
];

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar transações.', error: error.message });
    }
};

const createTransaction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const newTransaction = await Transaction.create(req.body);
        res.status(201).json({ message: 'Transação criada com sucesso!', transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar transação.', error: error.message });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transação não encontrada.' });

        await transaction.update(req.body);
        res.status(200).json({ message: 'Transação atualizada com sucesso!', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar transação.', error: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transação não encontrada.' });

        await transaction.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar transação.', error: error.message });
    }
};

const calculateMonthlyReturn = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ where: { type: 'buy' } });
        const totalInvested = transactions.reduce((acc, t) => acc + t.amount, 0);

        const dividends = await Transaction.findAll({ where: { type: 'dividend' } });
        const totalDividends = dividends.reduce((acc, t) => acc + t.amount, 0);

        const returnRate = ((totalDividends - totalInvested) / totalInvested) * 100;

        res.status(200).json({ returnRate });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao calcular rentabilidade mensal.', error: error.message });
    }
};

module.exports = { 
    getTransactions, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction, 
    calculateMonthlyReturn, 
    validateTransaction 
};
