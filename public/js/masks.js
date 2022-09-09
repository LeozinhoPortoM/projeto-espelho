
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
 * Mascara para dolar
 * @param {String} value
 * @returns {String} Valor convertido
 */
const money = (value) => {
    const cleanValue = +value.replace(/\D+/g, '') // substitui qualquer caracter que nao seja numero por nada
    const options = { style: 'currency', currency: 'BRL' }
    return new Intl.NumberFormat('pt-br', options).format(cleanValue / 100)

};



/**
 * Mascara para CNPJ
 * @param {String} value
 * @returns {String} Valor convertido
 */
const cpnjMask = (value) => {
    return value
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};


/**
* Mascara para CEP
* @param {String} value
* @returns {String} Valor convertido
*/
const cep = (value) => {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
};


/**
* Mascara para PIS
* @param {String} value
* @returns {String} Valor convertido
*/
const pis = (value) => {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{5})(\d)/, '$1.$2')
        .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
        .replace(/(-\d)\d+?$/, '$1')
};



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
 * Formata input para MM/AAAA
 * @param {String} value
 * @returns {String} Valor convertido
 */
const monthYearMask = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{4})\d+?$/, "$1")
};


/**
 * Formata input para DD/MM/AAAA
 * @param {String} value
 * @returns {String} Valor convertido
 */
const dayMonthYearMask = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{4})\d+?$/, "$1")
};


/**
 * Formata input para (xx) xxxx-xxxx
 * @param {String} value
 * @returns {String} Valor convertido
 */
const phoneBrMask = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
};


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


function precoMask() {
    document.querySelectorAll('.money').forEach(input => {
        input.addEventListener('input', e => {
            e.target.value = money(e.target.value)
        }, false)
    })
}

function category(c) {
    let item = document.getElementById('item-' + c).innerHTML;
    document.getElementsByTagName('input')[3].value = item;
}

function dropdown(p) {
    let e = document.getElementsByClassName('dropDown')[0];
    let d = ['block', 'none'];

    e.style.display = d[p];
    setTimeout(function () {
        e.style.transform = 'translate(0px)';
    }, 0)
};

function activePagination(elemento){
    let intens = document.getElementsByClassName('page-item');
    for (let i = 0; i < intens.length; i++){
        itens[i].classList.remove('active');
    }
    elemento.classList.add('active');
}


c('.cart--finalizar').addEventListener("click", () => {
    cart = [];
    updateCart();
});

// Carrinho

let cart = [];
let modalQt = 0;
let key = 0;
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

function updateCart() {
  c(".menu-openner span").innerHTML = cart.length;
  if (cart.length > 0) {
    c("aside").classList.add("show");
    c(".cart").innerHTML = "";
    let subtotal = 0;
    let desconto = 0;
    let total = 0;
    cart.map((itemCart, index) => {
      let modelItem = modelsJson.find((itemBD) => itemBD.id == itemCart.id);
      subtotal += modelItem.price[itemCart.size] * itemCart.qt;
      let cartItem = c(".models .cart--item").cloneNode(true);
      let modelSizeName;
      switch (itemCart.size) {
        case 0:
          modelSizeName = "P";
          break;
        case 1:
          modelSizeName = "M";
          break;
        case 2:
          modelSizeName = "G";
          break;
      }
      cartItem.querySelector("img").src = modelItem.img;
      //   cartItem.querySelector(".cart--item-nome").innerHTML = `${modelItem.name} (${modelSizeName})`;
      cartItem.querySelector(".cart--item-nome").innerHTML = `${
        modelItem.name
      } - ${modelItem.sizes[itemCart.size]}`;
      cartItem.querySelector(".cart--item--qt").innerHTML = itemCart.qt;
      cartItem
        .querySelector(".cart--item-qtmenos")
        .addEventListener("click", () => {
          if (itemCart.qt > 1) {
            itemCart.qt--;
          } else {
            cart.splice(index, 1);
          }
          updateCart();
        });
      cartItem
        .querySelector(".cart--item-qtmais")
        .addEventListener("click", () => {
          itemCart.qt++;
          updateCart();
        });

      c(".cart").append(cartItem);
    });
    desconto = subtotal * 0.1;
    total = subtotal - desconto;
    c(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`;
    c(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`;
    c(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
  } else {
    c("aside").classList.remove("show");
    c('aside').style.left = '100vw'
  }
}


