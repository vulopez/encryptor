const input = document.querySelector("#text"); // <textarea> selector
const output = document.querySelector(".output-msg"); // response <p> selector

const hash = {
    alura5: {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat",
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
    hash: hash.alura5,
};

function tryEncrypt() {
    const text = input.value;

    if (contains(text, config.exceptions)) return cannotEncrypt();

    return encrypt();
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

// TODO: Make this function work
function encrypt() {
    console.log("I can encrypt it! 😁");
}

// TODO: Make this function work
function cannotEncrypt() {
    console.log("I can't encrypt that! 😞");
}
