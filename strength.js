function _getRateOfChars(password) {
  return password.length * 4
}

function _matchMinimusRequirements(password, additions) {
  const options = [
    ...Object.values(additions.count).map((req) => req > 0),
    password.length >= 8
  ]

  const metRequirements = options.filter((option) => {
    return option
  })

  const hasMatched = metRequirements.length >= 3 && password.length >= 8
  const minimumRequirementsRatio = hasMatched ? metRequirements.length * 2 : 0
  return minimumRequirementsRatio
}

function _calculateAdditions(password) {
  let numberOfUppercaseLetters = 0;
  let numberOfLowercaseLetters = 0
  let numberOfDigits = 0
  let numberOfSymbols = 0
  password.split("").forEach((letter) => {
    if (uppercaseCharacters.includes(letter)) {
      numberOfUppercaseLetters += 1
    }
    if (lowercaseCharacters.includes(letter)) {
      numberOfLowercaseLetters += 1
    }
    if (digits.includes(letter)) {
      numberOfDigits += 1
    }
    if (symbols.includes(letter)) {
      numberOfSymbols += 1
    }
  })

  const rateOfUppercaseLetters = !!numberOfUppercaseLetters ? (password.length - numberOfUppercaseLetters) * 2 : 0
  const rateOfLowercaseLetters = !!numberOfLowercaseLetters ? (password.length - numberOfLowercaseLetters) * 2 : 0
  const rateOfDigits = numberOfDigits * 2
  const rateOfSymbols = numberOfSymbols * 4

  return {
    count: {
      numberOfUppercaseLetters,
      numberOfLowercaseLetters,
      numberOfDigits,
      numberOfSymbols
    },
    rate: {
      rateOfUppercaseLetters,
      rateOfLowercaseLetters,
      rateOfDigits,
      rateOfSymbols
    }
  }
}

function _calculateDedutions(password) {
  const isOnlyNumbers = /^\d*$/.test(password)
  const isOnlyText = /^[a-zA-Z]*$/.test(password)
  const length = password.length
  
  const rateOnlyNumbers = isOnlyNumbers ? -(length * 4) : 0
  const rateOnlyText = isOnlyText ? -(length * 4) : 0
  return {
    rate: {
      rateOnlyNumbers,
      rateOnlyText
    }
  }

}

function calculateStrength(password) {
    const additions = _calculateAdditions(password)
    const deductions = _calculateDedutions(password)

    console.log('>>>', additions)

    const metrics = [
      _getRateOfChars(password),
      ...Object.values(additions.rate),
      ...Object.values(deductions.rate),
      _matchMinimusRequirements(password, additions)
    ]

    // console.log(">>>", metrics)

    const score = metrics.reduce((a, b) => a + b, 0)

    if (score >= 0 && score <= 20) {
      return {score, strength: 1}
    } else if (score > 20 && score <= 40) {
      return {score, strength: 2}
    } else if (score > 40 && score <= 60) {
      return {score, strength: 3}
    } else if (score > 60 && score <= 80) {
      return {score, strength: 4}
    } else {
      return {score, strength: 5}
    }
  }