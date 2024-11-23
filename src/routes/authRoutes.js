const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/callback/google',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        console.log('Usuário autenticado:', req.user.user);
        console.log('Token JWT retornado:', req.user.token);

        res.status(200).json({
            message: 'Autenticado com sucesso!',
            user: req.user.user,
            token: req.user.token,
        });
    }
);

module.exports = router;
