const path = require('path');
const { check } = require('express-validator');

module.exports = [
    check('nome').notEmpty().withMessage('Campo obrigatório').bail().isString().isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 4 caracteres!'),
    check('sobrenome').notEmpty().withMessage('Campo obrigatório').bail().isString(),
    check('email').notEmpty().withMessage('Campo obrigatório').bail().isEmail().withMessage('Preencha com um e-mail válido!'),
    check('senha').notEmpty().withMessage('Campo obrigatório').bail().isLength({min: 6}).withMessage("A senha deve conter mais de 6 caracteres").bail(),
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Precisa escolher um arquivo');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`As extensões de arquivo permitidas são ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];