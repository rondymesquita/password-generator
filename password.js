  function contains(password, options){
    const { checkUppercase, checkLowercase, checkDigit, checkSymbol } = options
    let containsUpper = checkUppercase ? /[A-Z]/.test(password) : true
    let containsLower = checkLowercase ? /[a-z]/.test(password) : true
    let containsDigit = checkDigit ? /\d/.test(password) : true
    let containsSymbol = checkSymbol ? /[!@#$%^&*]/.test(password) : true

    const metrics = [containsUpper, containsLower, containsDigit, containsSymbol]
    return metrics.every((metric) => metric)
  }

  function generateSequence(state){

    const shuffle = function (value) {
      const a = value.split("")
      const n = a.length;

      for(let i = n - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
      }
      return a.join("");
    }

    const isUppercase = state.options.optionUppercase
    const isLowercase = state.options.optionLowercase
    const isDigit = state.options.optionDigit
    const isSymbol = state.options.optionSymbol

    let characters = ""
    if (isUppercase) {
      characters += uppercaseCharacters
    }
    if (isLowercase) {
      characters += lowercaseCharacters
    }
    if (isDigit) {
      characters += digits
    }
    if (isSymbol) {
      characters += symbols
    }

    characters = shuffle(characters)

    const result = []
    for ( var i = 0; i < state.size; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }

    return result.join("")
  }

  function generatePassword(state) {
    
    const options = {
      checkUppercase: state.options.optionUppercase,
      checkLowercase: state.options.optionLowercase,
      checkDigit: state.options.optionDigit,
      checkSymbol: state.options.optionSymbol,
    }
    
    let containsSelectedOptions = false
    let sequence;
    do {
      sequence = generateSequence(state)
      containsSelectedOptions = contains(sequence, options)
    } while(!containsSelectedOptions)

    return sequence
  }