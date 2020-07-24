var correctNumChars = false;
var correctChars = false;

// Gets input of number of chars and validates it.
while (!correctNumChars) {
  var numChars = parseInt(
    prompt(
      "How many characters would you like your password to be? (8-128 characters)"
    )
  );
  if (numChars > 7 && numChars < 129) {
    correctNumChars = true;
  }
  else {
    alert(
        "Invalid input, please enter an integer between or including 8 and 128"
      );
  }
}

// Retrieves whether or not the user wants capital letters, no need for validation
var includeCapitalization = confirm(
  "Would you like to include capital letters?"
);

// Retrieves whether or not the user wants numbers, no need for validation
var includeNumbers = confirm(
  "Would you like to include numbers?"
);

// Prompt retrieves special characters from the user
var specialChars = prompt(
  "Which special characters would you like to include? (!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)"
).trim().toLowerCase();

var uniqueCharObj = cleanString(specialChars);

var pw = generatePassword(numChars, includeCapitalization, includeNumbers, uniqueCharObj);

console.log(pw);

// Function to remove all non special characters, spaces and return only unique special characters
function cleanString(charString) {

  var unwantedChars = "abcdefghijklmnopqrstuvwxyz1234567890 ".split('');
  var uniqueChars = [];

  for (var i = 0; i < unwantedChars.length; i++) {
    charString = charString.split(unwantedChars[i]).join('');
  }
  for (var i = 0; i < charString.length; i++) {
    if (!(uniqueChars.includes(charString[i]))) {
      uniqueChars.push(charString[i]);
    }
  }
  return uniqueChars;
}


function generatePassword(pwLength, capitalization, numbers, specialChars) {
  var lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  var upperAlphabet;
  var numberCharacters;
  var specialCharacers = specialChars.join()

  if (capitalization) {
    upperAlphabet = lowerAlphabet.toUpperCase();
  }
  if (numbers) {
    numberCharacters = "1234567890";
  }

  getRandomChars(lowerAlphabet, upperAlphabet, numberCharacters, specialCharacers);

  return generatedPassword;
}

function getRandomChars(lowerAlphabet, upperAlphabet, numberCharacters, specialCharacers) {
  var charsInPassword = lowerAlphabet + upperAlphabet + numberCharacters + specialCharacers;
  var charObject = charsInPassword.split('');
  var generatedPassword;

  for (i = 0; i < 4; i++) {
    for (j = 0; j < 0; j++) {

    }
    index = Math.floor(Math.random() * (charObject.length));
    generatedPassword = generatedPassword + charObject[index];
  }
}