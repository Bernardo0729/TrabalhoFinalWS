const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/callback/google',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const { user, token } = req.user;
        res.status(200).json({
            message: 'Autenticado com sucesso!',
            user,
            token,
        });
    }
);

module.exports = router;
