const path = require('path');
const { body } = require('express-validator');


module.exports = [
    body('nome').isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 3 caracteres!'),
    body('nome').custom((value, { req }) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }
        return true
    }),

    body('sobrenome').custom((value) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }
        return true
    }),

    body('email').notEmpty().withMessage('Campo obrigatório').isEmail().withMessage('Preencha com um e-mail válido!'),

    body('senha').isLength({ min: 8 }).withMessage("A senha deve conter no mínimo 8 caracteres"),
    body('senha').custom((value, { req }) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }
        return true
    }),

    body('confirmar_senha').custom((value, { req }) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }
        if (value === req.body.senha) {
            return Promise.reject('Senhas não coincidem');
        }
        return true
    }),

    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                return Promise.reject(`As extensões de arquivo permitidas são ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    }),

];