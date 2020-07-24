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
  } else {
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
var includeNumbers = confirm("Would you like to include numbers?");

// Prompt retrieves special characters from the user
var specialChars = prompt(
  "Which special characters would you like to include? (!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)"
)
  .trim()
  .toLowerCase();

var uniqueCharStr = cleanString(specialChars).join();

var pw = generatePassword(
  numChars,
  includeCapitalization,
  includeNumbers,
  uniqueCharStr
);

var refinedPw = randomizeChars(pw);

console.log(pw);
console.log(refinedPw);

// Function to remove all non special characters, spaces and return only unique special characters
function cleanString(charString) {
  var unwantedChars = "abcdefghijklmnopqrstuvwxyz1234567890 ".split("");
  var uniqueChars = [];

  for (var i = 0; i < unwantedChars.length; i++) {
    charString = charString.split(unwantedChars[i]).join("");
  }
  for (var i = 0; i < charString.length; i++) {
    if (!uniqueChars.includes(charString[i])) {
      uniqueChars.push(charString[i]);
    }
  }
  return uniqueChars;
}

function generatePassword(pwLength, capitalization, numbers, specialChars) {
  var lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  var upperAlphabet;
  var numberCharacters;
  var specialCharacers = specialChars;

  if (capitalization) {
    upperAlphabet = lowerAlphabet.toUpperCase();
  }
  if (numbers) {
    numberCharacters = "1234567890";
  }

  var generatedPassword = getRandomChars(
    lowerAlphabet,
    upperAlphabet,
    numberCharacters,
    specialCharacers,
    pwLength
  );

  return generatedPassword;
}

function getRandomChars(
  lowerAlphabet,
  upperAlphabet,
  numberCharacters,
  specialCharacers,
  pwLength
) {
  var charsInPassword = [
    lowerAlphabet,
    upperAlphabet,
    numberCharacters,
    specialCharacers,
  ];
  var generatedPassword = '';
  var index;
  for (i = 0; i < charsInPassword.length; i++) {
    for (
      j = 0;
      j <
      Math.ceil(
        (charsInPassword[i].length / charsInPassword.join().length) * pwLength
      );
      j++
    ) {
      index = Math.floor(Math.random() * charsInPassword[i].length);
      generatedPassword = generatedPassword + charsInPassword[i][index];
    }
  }

  if (generatedPassword.length > pwLength) {
    var diff = generatedPassword.length - pwLength;
    for (i = 0; i < diff; i++) {
      generatedPassword = generatedPassword.substring(1);
    }
  }

  return generatedPassword;
}

function randomizeChars(unrefinedPassword) {
  var refinedPassword = '';
  console.log(unrefinedPassword);
  console.log(typeof(unrefinedPassword));
  for (i = 0; i < unrefinedPassword.length; i++) {
    index = Math.floor(Math.random() * unrefinedPassword.length);
    refinedPassword = refinedPassword + unrefinedPassword[index];
  }

  return refinedPassword;
}