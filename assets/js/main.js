const input = document.querySelector("#text"); // <textarea> selector
const output = document.querySelector(".output-msg"); // response <p> selector

const alertIcon = document.querySelector(".alert-icon"); // alert title <p> selector
const alertText = document.querySelector(".alert-msg"); // alert title <p> selector

const errorTitle = document.querySelector(".error-title"); // error title <p> selector
const errorMsg = document.querySelector(".error-msg"); // error message <p> selector

const clearBtn = document.querySelector("#clear");
const copyBtn = document.querySelector("#copy");

const btnEncrypt = document.querySelector(".encrypt");
const btnDecrypt = document.querySelector(".decrypt");

input.addEventListener("input", function () {
  alertText.innerHTML = "Solo letras minúsculas y sin acentos";

  if (contains(input.value, config.exceptions)) {
    btnEncrypt.setAttribute("disabled", "true");
    btnDecrypt.setAttribute("disabled", "true");

    setTextColor("--red-500", alertText);
    alertIcon.setAttribute("src", "assets/icons/Alert-active.svg");

    alertIcon.classList.add("shake");
    delay(1000).then(() => alertIcon.classList.remove("shake"));
  } else {
    btnEncrypt.removeAttribute("disabled");
    btnDecrypt.removeAttribute("disabled");

    setTextColor("--gray-400", alertText);
    alertIcon.setAttribute("src", "assets/icons/Alert.svg");
  }

  if (input.value == "") {
    alertText.innerHTML = "Ingrese el texto a procesar";
    btnEncrypt.setAttribute("disabled", "true");
    btnDecrypt.setAttribute("disabled", "true");

    clearBtn.classList.add("disappear");
    delay(200).then(() => {
      clearBtn.classList.remove("disappear");
      displayElement("none", clearBtn);
    });
  } else {
    displayElement("flex", clearBtn);
  }
});

const hash = {
  alura5: {
    encrypt: pairValues,
    decrypt: replaceMatch,
    set: [
      ["a", "ai"],
      ["e", "enter"],
      ["i", "imes"],
      ["o", "ober"],
      ["u", "ufat"],
    ],
  },
};

let config = {
  method: hash.alura5,
  liveMode: true,
  strict: true,
  exceptions: {
    uppercase: /(?=.*[A-Z])/,
    // lowercase: /(?=.*[a-z])/,
    // space: /\s/,
    // punctuation: /(?=.*[,.;:¡!¿?])/,
    digits: /(?=.*\d)/,
    accents: /(?=.*[À-ÿ])/,
    symbols: /(?=.*[@#$%^&*)(=<>[\]/}{'"|~`+_-])/,
  },
};

function replaceMatch(text) {
  const keys = config.method.set;

  for (const set of keys) {
    text = text.replaceAll(set[1], set[0]);
  }

  return text;
}

function pairValues(text) {
  // TODO: Use `this`
  const keys = config.method.set;
  const result = text.split("");

  const fixed = result.map(function (char) {
    for (const element of keys) {
      if (char === element[0]) return element[1];
    }
    return char;
  });

  return fixed.join("");
}

function tryDecrypt() {
  const text = input.value;

  contains(text, config.exceptions) ? cannotEncrypt() : decrypt(text);
}

function tryEncrypt() {
  const text = input.value;

  contains(text, config.exceptions) ? cannotEncrypt() : encrypt(text);
}

/**
 * Check if some RegExp exceptions are in a string
 *
 * @param {string} str     The text input
 * @param {object} pattern Patterns that can't be in `str`
 *
 * @returns {boolean} `true` if some matchs else `false`
 */
function contains(str, pattern) {
  for (const regex in pattern) {
    if (pattern[regex].test(str)) {
      return true;
    }
  }

  return false;
}

function decrypt(text) {
  const method = config.method;

  displayElement("none", errorTitle, errorMsg);
  displayElement("block", output);

  output.innerHTML = method.decrypt(text);
  displayElement("flex", copy);
}

function encrypt(text) {
  const method = config.method;

  displayElement("none", errorTitle, errorMsg);
  displayElement("block", output);

  output.innerHTML = method.encrypt(text);
  displayElement("flex", copy);
}

function cannotEncrypt() {
  displayElement("block", errorTitle, errorMsg);
  displayElement("none", output);

  setTextColor("--red-500", alertText);
  alertIcon.setAttribute("src", "assets/icons/Alert-active.svg");

  alertIcon.classList.add("shake");
  delay(1000).then(() => alertIcon.classList.remove("shake"));
}

function displayElement(display, ...element) {
  for (const elem of element) {
    elem.style.display = display;
  }
}

function setTextColor(color, ...element) {
  const r = document.querySelector(":root");
  const rs = getComputedStyle(r);

  for (const elem of element) {
    elem.style.color = rs.getPropertyValue(color);
  }
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(output.innerHTML);
});

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
