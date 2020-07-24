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

// Retrieves which special characters the user wants, validates that with the given selection in the prompt


var specialChars = prompt(
  "Which special characters would you like to include? (!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)"
).split('');
