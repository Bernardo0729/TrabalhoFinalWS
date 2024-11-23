const { Transaction } = require('../models');

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar transações', error });
    }
};

const createTransaction = async (req, res) => {
    try {
        const newTransaction = await Transaction.create(req.body);
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar transação', error });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transação não encontrada' });
        await transaction.update(req.body);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar transação', error });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transação não encontrada' });
        await transaction.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar transação', error });
    }
};

module.exports = { getTransactions, createTransaction, updateTransaction, deleteTransaction };
