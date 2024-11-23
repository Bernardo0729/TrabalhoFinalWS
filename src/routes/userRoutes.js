const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, validateUser } = require('../controllers/userController');
const { validateRequest } = require('../middlewares/validationMiddleware');
const router = express.Router();

router.get('/', getUsers);
router.post('/', validateUser, validateRequest, createUser);
router.put('/:id', validateUser, validateRequest, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
