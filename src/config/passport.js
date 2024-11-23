const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('Perfil retornado pelo Google:', profile);

            try {
                let user = await User.findOne({ where: { googleId: profile.id } });

                if (!user) {
                    console.log('Criando novo usuário...');
                    user = await User.create({
                        username: profile.displayName,
                        email: profile.emails?.[0]?.value || 'email@desconhecido.com',
                        googleId: profile.id,
                    });
                }

                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log('Token JWT gerado:', token);

                done(null, { user, token });
            } catch (error) {
                console.error('Erro ao processar o callback:', error);
                done(error, null);
            }
        }
    )
);

module.exports = passport;
