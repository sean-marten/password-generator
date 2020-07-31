let pwLength;
let includeCapitalization = false;
let includeNumbers;
let rawSpecialChars;
let uniqueSpecialChars;
let maxNumSpecialChars;
let password;
const $numChars = document.querySelector(".num-chars");
const $specialChars = document.querySelector(".special-chars");
const $capitalLetters = document.querySelector(".capital-letters");
const $nums = document.querySelector(".nums");
const $generate = document.querySelector(".generate");
const $errorNumChar = document.querySelector(".num-char-error");
const $errorSpecialChar = document.querySelector(".special-char-error");
const $popUp = document.querySelector(".modal-body");

$generate.disabled = true;

$numChars.addEventListener("keyup", validateNumChars);

$specialChars.addEventListener("keyup", validateSpecialChars);

$generate.addEventListener("click", main);

function main() {
  uniqueSpecialChars = cleanString();
  console.log(uniqueSpecialChars);
  let pw = generatePassword();
  console.log(pw);
  password = shuffleChars(pw);
  $popUp.textContent = `Password: ${password}`;
}

// Method to prompt user for password requirements
function validateNumChars() {
  pwLength = parseInt($numChars.value);
  if (pwLength) {
    maxNumSpecialChars = Math.ceil(pwLength / 5); // Realistically, we don't want the whole password to be special characters
    validateSpecialChars();
  }
  else {
    $errorNumChar.textContent = "";
    $errorSpecialChar.textContent = "";
    return;
  }
  if (pwLength > 7 && pwLength < 129) {
    $generate.disabled = false;
    $errorNumChar.textContent = "";
  } else {
    $generate.disabled = true;
    $errorNumChar.textContent =
      "Please enter a valid number of password characters! (8-128)";
  }
}

// Prompt retrieves special characters from the user and validates it
function validateSpecialChars() {
  rawSpecialChars = $specialChars.value.trim().toLowerCase();
  if (rawSpecialChars && pwLength) {
    if (rawSpecialChars.length <= maxNumSpecialChars) {
      $errorSpecialChar.textContent = "";
      $generate.disabled = false;
    } else {
      $generate.disabled = true;
      $errorSpecialChar.textContent = `You may only have a maximum of ${maxNumSpecialChars} special characters for a ${pwLength} character long password. Please re-enter a valid number of special characters.`;
    }
  }
  else {
    $errorSpecialChar.textContent = "";
  }
}

// Retrieves whether or not the user wants capital letters, no need for validation
$capitalLetters.addEventListener("change", function () {
  if (this.checked) {
    includeCapitalization = true;
  } else {
    includeCapitalization = false;
  }
});

// Retrieves whether or not the user wants numbers, no need for validation
$nums.addEventListener("change", function () {
  if (this.checked) {
    includeNumbers = true;
  } else {
    includeNumbers = false;
  }
});

// Function to remove all non special characters, spaces and return only unique special characters
function cleanString() {
  var nonSpecialChars = "abcdefghijklmnopqrstuvwxyz1234567890 ".split("");
  var uniqueSpecialChars = [];

  for (var i = 0; i < nonSpecialChars.length; i++) {
    rawSpecialChars = rawSpecialChars.split(nonSpecialChars[i]).join("");
  }
  for (var i = 0; i < rawSpecialChars.length; i++) {
    if (!uniqueSpecialChars.includes(rawSpecialChars[i])) {
      uniqueSpecialChars.push(rawSpecialChars[i]);
    }
  }
  return uniqueSpecialChars.join("");
}

// Method to decide what is going to be included in the password
function generatePassword() {
  var lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  var upperAlphabet = "";
  var numberCharacters = "";

  if (includeCapitalization) {
    upperAlphabet = lowerAlphabet.toUpperCase();
  }
  if (includeNumbers) {
    numberCharacters = "1234567890";
  }

  var generatedPassword = getRandomChars(
    lowerAlphabet,
    upperAlphabet,
    numberCharacters
  );

  return generatedPassword;
}

// Method to retrieve the correct number of random characters for each character type
function getRandomChars(lowerAlphabet, upperAlphabet, numberCharacters) {
  var randomPassword = "";
  var index;
  var numCapitalLettersToInclude = (upperAlphabet.length === 0
    ? 0
    : Math.ceil(pwLength / 10));
  var numNumbersToInclude = (numberCharacters.length === 0
    ? 0
    : Math.ceil(pwLength / 10));
  var numSpecialCharsToInclude = uniqueSpecialChars.length;
  var numNormalLettersToInclude =
    pwLength -
    numCapitalLettersToInclude -
    numNumbersToInclude -
    numSpecialCharsToInclude;
  var passwordChars = [
    {
      charStr: lowerAlphabet,
      numChars: numNormalLettersToInclude,
    },
    {
      charStr: upperAlphabet,
      numChars: numCapitalLettersToInclude,
    },
    {
      charStr: numberCharacters,
      numChars: numNumbersToInclude,
    },
  ];

  for (j = 0; j < passwordChars.length; j++) {
    for (i = 0; i < passwordChars[j].numChars; i++) {
      index = Math.floor(Math.random() * passwordChars[j].charStr.length);
      randomPassword = randomPassword + passwordChars[j].charStr[index];
    }
  }

  randomPassword = randomPassword + uniqueSpecialChars;

  return randomPassword;
}

// Method to shuffle the characters of the password randomly
function shuffleChars(unrefinedPassword) {
  var refinedPassword = "";
  var pwArray = Array.from(unrefinedPassword);
  var ctr = pwArray.length;

  for (i = 0; i < ctr; i++) {
    index = Math.floor(Math.random() * pwArray.length);
    refinedPassword = refinedPassword + pwArray[index];
    pwArray.splice(index, 1);
  }

  return refinedPassword;
}