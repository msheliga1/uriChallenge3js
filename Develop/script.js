// MJS 10.3.23 - URI Challenge 3 - Basic javascript password generator.
// Code at bottom from URI parakeet account. 
// Generally this file generates a random password, via the generatePassword function. 
// Functions getPasswordLength and getCharactersToUse return the number of characters in the password 
// and the types of characters (lowercase, uppercase, numbers, special) to use in the password. 
// Error checking is done inside of these 2 functions. There is also protection against 
// infinite loops.  If too many illegal values are entered, a default is used. 
// ==================================================================================

// the generatePassword method prompts users for the password length and types of characters to use, then generates 
// random characters using Math.random to create a random password. 
// The main output is the generated password, while console.log is used for debugging purposes.  (I think this is a good feature!)
function generatePassword() {
  const minLength = 8;    // declare constants first
  const maxLength = 128;  
  var result = "Error - Uncalculated";  // then declare variables
  var resultLog = "";

  var charsInPassword = getPasswordLength(minLength, maxLength);    // includes comprehensive error checking
  var charactersToUse = getCharactersToUse();                     // includes comprehensive error checking
  if (charsInPassword <= 0 || charactersToUse.length <= 0) {
    return result;  // you can never have too much error checking ... well, okay it can interfere with readability.
  }
  resultLog = "PwG data: " + charactersToUse.toString() + " Password Length: " + charsInPassword;
  console.log(resultLog);  /* for debugging */
  result = ""; 
  resultLog = "Indices and values: ";
  for (var i=0; i < charsInPassword; i++) {
    var index = Math.floor(Math.random() * charactersToUse.length);
    resultLog += index + "-" + charactersToUse[index] + " ";
    result += charactersToUse[index];  // repeating code is frowned upon, but I let it slide here.
  }

  console.log(resultLog);
  return result;
}  // end function generatePassword

/* This method gets the characters for the password from the user. (Often numbers, lowercase, etc.) */
/* It includes error checking, by making sure at least one type of password is selected. */ 
/* It includes infinite-loop control, which is nice (but is a slight addition to the criteria). */
function getCharactersToUse() {
  /* First we set up the charactersArray, which is an array of arrays of characters */
  const numbsString = "0123456789";
  const lowerString = "abcdefghijklmnopqrstuvwxyz";
  const upperString = lowerString.toUpperCase();
  // There is simply no way I'm allowing a space to be part of a password!!
  const specsString = '!"#$' + "%&'()*+,-./:;<=>?@[\]^_`{|}~";  // divide into 2 sections to avoid quote issues

  const numbsArray = numbsString.split('');  // split every single character
  const lowerArray = lowerString.split('');
  const upperArray = upperString.split('');
  const specsArray = specsString.split('');

  var charsArray = new Array();
  charsArray.push(numbsArray);
  charsArray.push(lowerArray);
  charsArray.push(upperArray);
  charsArray.push(specsArray);

  /* the names of the arrays matches up with the above arrays. Of course, once we learn types it */
  /* would be better to associate the characters and their names in a type ... */
  var namesArray = ["numbers", "lower case letters", "upper case letters", "special characters"];

  var done = false;
  var result = new Array();
  const maxAttempts = 4;  // always good to avoid an infinite loop! - Although very slightly violative of criteria.
  var attempts = 0;
  var promptValue = "Unset";

  do {
    for (var i = 0; i < charsArray.length; i++) {
      // per StackOverflow no easy cross browser way to change to Yes-No prompts.
      promptValue = confirm("Do you wish to include " + namesArray[i]);  // returns true or false.
      // alert("The promptValue is " + promptValue);  
      if (promptValue) {
        // it would be simplier to just concatenate the strings, but ... this way good for learning. 
        result = result.concat(charsArray[i]);
      }
    }  // end for each charsArray[]
    attempts++;
    if (result.length > 0) {  
        done = true;
    }
``
    if (!done) {
        if (attempts < maxAttempts) {
          alert("You must select at least one type of characters for your password! ");
        } else {
          done = true;
          result = lowerArray;  // if you've failed maxAttempts times, you really need some help! - Use lowercase characters.
          alert("You've failed miserably for the last time. Result auto-set to " + result);
        } 
    }
  } while (!done) 

  return result;
}  // end function getCharactersToUse

/* This method gets the length of the password from the user, which must be in [8-128].  */
/* It includes error checking, including for non-numbers and non-integers, but is hardwired to lengths of 8 to 128. */ 
/* It includes infinite-loop control, which is nice (but is a slight addition to the criteria). */
function getPasswordLength(minLength, maxLength) {  // for demo purposes and practcie, use parameters 
  var done = false;
  var result = 0;
  const maxAttempts = 10;  // always good to avoid an infinite loop! - Although very slightly violative of criteria.
  var attempts = 0;
  var promptValue = "Unset";
  do {
     promptValue = prompt("How many characters in your password (" + minLength + " to " + maxLength + "?"); 
     attempts++;
     if (!isNaN(promptValue)) {  // !isNaN = !IsNotANumber = IsANumber
        result = Number(promptValue);
        if (Number.isInteger(result)) {
          if (result >= minLength && result <= maxLength) {
            done = true;
         }
        }
     }

     if (!done) {
        if (attempts < maxAttempts) {
          alert("You must enter a number between " + minLength + " and " + maxLength + ", not " + promptValue);
        } else {
          done = true;
          result = minLength;  // if you've failed maxAttempts times, you really need some help! - Use the default.
          alert("You've failed miserably for the last time. Result auto-set to " + result);
        } 
     }
  } while (!done) 

  return result;
}  // end function getPasswordLength

// =================================================================================
// Code below this line from coding-boot-camp/friendly-parakeet repo. 
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
 
  var password = generatePassword();
  console.log("The password is: " + password);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
