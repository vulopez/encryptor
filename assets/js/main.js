const input = document.querySelector("#text"); // <textarea> selector
const output = document.querySelector(".output-msg"); // response <p> selector

const errorTitle = document.querySelector(".error-title"); // error title <p> selector
const errorMsg = document.querySelector(".error-msg"); // error message <p> selector

const hash = {
    alura5: {
        encrypt: pairValues,
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

function encrypt(text) {
    const method = config.method;

    displayElement('none', errorTitle, errorMsg);
    displayElement('block', output);

    output.innerHTML = method.encrypt(text)
}

// TODO: Make this function work
function cannotEncrypt() {
    console.log("I can't encrypt that! 😞");
}

function displayElement(display, ...element) {
    for (const e of element) {
        e.style.display = display;
    }
}
