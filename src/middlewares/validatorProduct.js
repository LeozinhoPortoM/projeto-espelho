const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('nome').isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 3 caracteres!').bail(),
    body('nome').custom((value, { req }) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }
        return true
    }).bail(),

    body('descricao').isLength({ min: 20 }).withMessage('A descrição deve ter no mínimo 20 caracteres!').bail(),
    body('descricao').custom((value) => {
        if (!value) {            
            return Promise.reject('Campo obrigatório');
        }

        return true
    }).bail(),

    body('preco').custom((value, { req }) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }

        return true
    }),

    body('categoria').custom((value, { req }) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }

        return true
    }),

    body('quantidade').custom((value, { req }) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }

        return true
    }),

    body('imageProduct').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                return Promise.reject(`As extensões de arquivo permitidas são ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    }).bail(),

];