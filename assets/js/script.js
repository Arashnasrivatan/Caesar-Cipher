// use $ instead of document
const $ = document;
// set daisy ui theme
$.documentElement.setAttribute("data-theme", "light");

$.addEventListener("DOMContentLoaded", function () {



// variables
const dropdownButton = $.getElementById("dropdown-button");
const dropdownMenu = $.getElementById("dropdown-menu");
const encodeDecodeOptions = $.querySelectorAll("[name='tab']");
const inputText = $.getElementById("input-text");
const outputText = $.getElementById("output-text");
const shiftInput = $.getElementById("shift-input");
const modInput = $.getElementById("mod-input");
const alphabetInput = $.getElementById("alphabet-input");
const letterCase = $.getElementById("letter-case");
const submitButton = $.getElementById("submit-button");

// dropdown display and animation
dropdownButton.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("dropdown-open")) {
    dropdownMenu.classList.remove("dropdown-open");
    dropdownMenu.classList.add("dropdown-close");

    dropdownMenu.addEventListener(
      "animationend",
      function () {
        dropdownMenu.style.display = "none";
      },
      { once: true }
    );
  } else {
    dropdownMenu.style.display = "block";
    dropdownMenu.classList.remove("dropdown-close");
    dropdownMenu.classList.add("dropdown-open");
  }
});

// encode/decode button
encodeDecodeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    inputText.placeholder =
      option.getAttribute("aria-label") === "encode"
        ? "Plaintext"
        : "Ciphertext";
    inputText.value = "";
  });
});

// caesar cipher function
function caesarCipher(text, shift, mod, alphabet, decode, letterCaseOption) {
  if (alphabet.length < 2) {
    Swal.fire({
      title: "Error",
      text: "Alphabet must contain at least two characters.",
      icon: "error",
      confirmButtonText: "OK"
    });
    return "";
  }

  let result = text
    .split("")
    .map((char) => {
      const isUpperCase = char === char.toUpperCase();
      const lowerChar = char.toLowerCase();
      const index = alphabet.indexOf(lowerChar);
      if (index === -1) return char;
      let newIndex = decode
        ? (index - shift + mod) % mod
        : (index + shift) % mod;
      const newChar = alphabet[newIndex];
      return isUpperCase ? newChar.toUpperCase() : newChar;
    })
    .join("");

  // apply letter case transformation based on the selection
  switch (letterCaseOption) {
    case "2":
      result = result.toLowerCase();
      break;
    case "3":
      result = result.toUpperCase();
      break;
    default:
      break;
  }

  return result;
}

// submit button event listener
submitButton.addEventListener("click", () => {
  const text = inputText.value.trim();
  if (!text) {
    Swal.fire({
      title: "Error",
      text: "Please enter a valid text",
      icon: "error",
      confirmButtonText: "OK"
    });
    return;
  }
  const shift = parseInt(shiftInput.value) || 3;
  const alphabet = alphabetInput.value || "abcdefghijklmnopqrstuvwxyz";
  const mod = alphabet.length;
  const isDecode = encodeDecodeOptions[1].checked;
  const letterCaseOption = letterCase.value;
  const result = caesarCipher(
    text,
    shift,
    mod,
    alphabet,
    isDecode,
    letterCaseOption
  );

  if (result) {
    Swal.fire({
      title: isDecode ? "Decoded Text" : "Encoded Text",
      text: result,
      icon: "success",
      confirmButtonText: "OK"
    });
  }
});

});