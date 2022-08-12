import "milligram";

const masks = {
    cpf(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    },

    cnpj(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    },

    phone(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1')
    },

    phoneDDI(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '+$1 $2')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1')
    },

    cep(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    },

    pis(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{5})(\d)/, '$1.$2')
            .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
            .replace(/(-\d)\d+?$/, '$1')
    },

    money(value) {
        const cleanValue = +value.replace(/\D+/g, '')
        const options = { style: 'currency', currency: 'BRL' }
        return new Intl.NumberFormat('pt-br', options).format(cleanValue / 100)
    },

    date(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\/\d{2})(\d)/, '$1/$2')
            .replace(/(\/\d{4})\d+?$/, '$1')
    },

    dateWithDashes(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '$1-$2')
            .replace(/(-\d{2})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
    },
}

document.querySelectorAll('input').forEach($input => {
    console.log($input)
    const field = $input.dataset.js

    $input.addEventListener('input', e => {
        e.target.value = masks[field](e.target.value)
    }, false)
})



/**
 * Mascara para CPF
 * @param {String} value
 * @returns {String} Valor convertido
 */
const cpfMask = (value) => {
    return value
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};

/**
 * Mascara para CNPJ
 * @param {String} value
 * @returns {String} Valor convertido
 */
const cpnjMask = (value) =>
    value
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");

/**
 * Mascara para CPF e CNPJ no mesmo input
 * @param {String} value
 * @returns {String} Valor convertido
 */
const cpf_cnpj_mask = (value) => {
    if (value.replace(/[^0-9 ]/g, "").length <= 11) {
        return value
            .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    } else {
        return value
            .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    }
};

/**
 * Remove todos os caracters especiais, permite apenas numeros e letras
 * @param {String} value
 * @returns {String} Valor convertido
 */
const removeSpecialCharacter = (value) =>
    value.replace(/[^a-zA-Z0-9]/g, "");

const justInt = (value, min, max) => {
    if (parseInt(value) < min) {
        return min;
    }
    if (parseInt(value) > max) {
        return max;
    }
    return value.replace(/[^0-9]/g, "");
};
/**
 * Formata input para MM/AAAA
 * @param {String} value
 * @returns {String} Valor convertido
 */
const monthYearMask = (value) =>
    value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{4})\d+?$/, "$1");

/**
 * Formata input para DD/MM/AAAA
 * @param {String} value
 * @returns {String} Valor convertido
 */
const dayMonthYearMask = (value) =>
    value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{4})\d+?$/, "$1");

/**
 * Formata input para (xx) xxxx-xxxx
 * @param {String} value
 * @returns {String} Valor convertido
 */
const phoneBrMask = (value) =>
    value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
/**
 * Formata input para (xx) x xxxx-xxxx
 * @param {String} value
 * @returns {String} Valor convertido
 */
const cellphoneBrMask = (value) => {
    if (value.length < 3) {
        return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2");
    } else {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)(\d)/, "($1) $2 $3")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    }
};