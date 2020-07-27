var numChars, includeCapitalization, includeNumbers, specialChars = promptUser();

var uniqueCharStr = cleanString(specialChars).join("");

var pw = generatePassword(
  numChars,
  includeCapitalization,
  includeNumbers,
  uniqueCharStr
);

var refinedPw = randomizeChars(pw);

alert(`Your password is ${refinedPw}`);

// Method to prompt user for password requirements
function promptUser() {
  var validNumChars = false;

  // Gets input of number of chars and validates it.
  while (!validNumChars) {
    var numChars = parseInt(
      prompt(
        "How many characters would you like your password to be? (8-128 characters)"
      )
    );
    if (numChars > 7 && numChars < 129) {
      validNumChars = true;
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

    return numChars, includeCapitalization, includeNumbers, specialChars
}

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
  var upperAlphabet = "";
  var numberCharacters = "";
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
  console.log(charsInPassword[3]);
  console.log(typeof charsInPassword[3]);
  var generatedPassword = "";
  var index;
  for (i = 0; i < charsInPassword.length - 1; i++) {
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

  for (i = 0; i < charsInPassword[3].length; i++) {
    generatedPassword = generatedPassword + charsInPassword[3][i];
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
  var refinedPassword = "";
  console.log(unrefinedPassword);
  console.log(typeof unrefinedPassword);
  var pwArray = Array.from(unrefinedPassword);
  var ctr = pwArray.length;
  for (i = 0; i < ctr; i++) {
    index = Math.floor(Math.random() * pwArray.length);
    refinedPassword = refinedPassword + pwArray[index];
    console.log(pwArray);
    pwArray.splice(index, 1);
    console.log(pwArray);
  }

  return refinedPassword;
}
