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
  const cleanValue = +value.replace(/\D+/g, ""); // substitui qualquer caracter que nao seja numero por nada
  const options = { style: "currency", currency: "BRL" };
  return new Intl.NumberFormat("pt-br", options).format(cleanValue / 100);
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
    .replace(/\D+/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

/**
 * Mascara para PIS
 * @param {String} value
 * @returns {String} Valor convertido
 */
const pis = (value) => {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{5})(\d)/, "$1.$2")
    .replace(/(\d{5}\.)(\d{2})(\d)/, "$1$2-$3")
    .replace(/(-\d)\d+?$/, "$1");
};

/**
 * Mascara para number
 * @param {String} value
 * @returns {String} Valor convertido
 */
const number = (value) => {
  return value.replace(/\D+/g, "");
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
    .replace(/(\/\d{4})\d+?$/, "$1");
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
    .replace(/(\/\d{4})\d+?$/, "$1");
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
    .replace(/(-\d{4})\d+?$/, "$1");
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
  document.querySelectorAll(".money").forEach((input) => {
    input.addEventListener(
      "input",
      (e) => {
        e.target.value = money(e.target.value);
      },
      false
    );
  });
}

function quantMask() {
  document.querySelectorAll(".quant").forEach((input) => {
    input.addEventListener(
      "input",
      (e) => {
        e.target.value = number(e.target.value);
      },
      false
    );
  });
}

// Meunu dropdown

function category(c) {
  let item = document.getElementById("item-" + c).innerHTML;
  document.getElementsByTagName("input")[3].value = item;
}

function dropdown(p) {
  let e = document.getElementsByClassName("dropDown")[0];
  let d = ["block", "none"];

  e.style.display = d[p];
  setTimeout(function () {
    e.style.transform = "translate(0px)";
  }, 0);
}

function activePagination(elemento) {
  let intens = document.getElementsByClassName("page-item");
  for (let i = 0; i < intens.length; i++) {
    itens[i].classList.remove("active");
  }
  elemento.classList.add("active");
}

// Window modal

const openModalButton = document.querySelectorAll("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

if (openModalButton) {
  openModalButton.forEach((el) => {
    el.addEventListener("click", () => {
      toggleModal();
    });
  });
}

if (closeModalButton || fade) {
  [closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => {
      toggleModal();
    });
  });
}

// Carrinho

var carts = [];

if (localStorage.getItem("myCart")) {
  carts = JSON.parse(localStorage.getItem("myCart"));
  console.log(carts.length);
}

function addItemCart() {
  let name = document.getElementById("name-product").innerText;
  let description = document.getElementById("description-product").innerText;
  let price = document.getElementById("price-product").innerText;

  carts.push({ name, description, price });
  const cartsJson = JSON.stringify(carts);
  localStorage.setItem("myCart", cartsJson);
  updateCart();
}

window.onload = () => {
  updateCart();
  const carrinho = document.getElementById("cart-list");
  if (carrinho) {
    showItemsCart();
  }
};

function updateCart() {
  let countCart = document.getElementById("count-cart");
  if (carts.length <= 0) {
    countCart.style.display = "none";
  } else {
    countCart.style.display = "block";
    countCart.innerText = carts.length;
  }
}

function showItemsCart() {
  carts.map((item) => {
    let modelsItem = document.querySelector(".view .itens").cloneNode(true);

    modelsItem.querySelector(".item--name").innerHTML = item.name;
    modelsItem.querySelector(".item--desc").innerHTML = item.description;
    modelsItem.querySelector(".item--price").innerHTML = item.price;

    document.querySelector(".view-cart").append(modelsItem);
  });
}

function removeItemCar() {
  carts.splice(carts, 1);
  const cartsJson = JSON.stringify(carts);
  localStorage.setItem("myCart", cartsJson);
}

function clearItemsCart() {
  carts = [];
  localStorage.myCart = JSON.stringify(carts);
}
