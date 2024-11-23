const { Asset } = require('../models');
const { body, validationResult } = require('express-validator');

const validateAsset = [
    body('name').notEmpty().withMessage('O nome do ativo é obrigatório.'),
    body('symbol').notEmpty().withMessage('O símbolo do ativo é obrigatório.'),
    body('price').isNumeric().withMessage('O preço deve ser um número.'),
];

const getAssets = async (req, res) => {
    try {
        const assets = await Asset.findAll();
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar ativos.', error: error.message });
    }
};

const createAsset = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const newAsset = await Asset.create(req.body);
        res.status(201).json({ message: 'Ativo criado com sucesso!', asset: newAsset });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar ativo.', error: error.message });
    }
};

const updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByPk(req.params.id);
        if (!asset) return res.status(404).json({ message: 'Ativo não encontrado.' });

        await asset.update(req.body);
        res.status(200).json({ message: 'Ativo atualizado com sucesso!', asset });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar ativo.', error: error.message });
    }
};

const deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByPk(req.params.id);
        if (!asset) return res.status(404).json({ message: 'Ativo não encontrado.' });

        await asset.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar ativo.', error: error.message });
    }
};

module.exports = { getAssets, createAsset, updateAsset, deleteAsset, validateAsset };
