window.onload = function () {
  main()
}

const {log} = console

const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
const digits = "0123456789"
const symbols = "!@#$%^&*"

function main() {
  const generateButton = document.querySelector("#generate")
  const passwordField = document.querySelector("#password")

  const options = document.querySelectorAll(".options__input")
  const optionUppercase = document.querySelector("#optionUppercase")
  const optionLowercase = document.querySelector("#optionLowercase")
  const optionDigit = document.querySelector("#optionDigit")
  const optionSymbol = document.querySelector("#optionSymbol")


  const strengthText = document.querySelector("#strengthText")
  const score = document.querySelector("#score")
  const strengthTerrible = document.querySelector("#strengthTerrible")
  const strengthBad = document.querySelector("#strengthBad")
  const strengthOk = document.querySelector("#strengthOk")
  const strengthGood = document.querySelector("#strengthGood")
  const strengthAwesome = document.querySelector("#strengthAwesome")

  const sizeSlide = document.querySelector("#sizeSlide")
  const sizeInput = document.querySelector("#sizeInput")

  const state = {
    options: {
      optionUppercase: false,
      optionLowercase: true,
      optionDigit: true,
      optionSymbol: true
    },
    allOptionsDisabled: false,
    size: 12,
    password: "Clique para gerar uma nova senha...",
    strength: 1,
    strengthText: "",
    score: 0
  }

  strengthTexts = {
    1: "Terrível",
    2: "Fraca",
    3: "Ok",
    4: "Boa",
    5: "Ótima"
  }

  function render(){
    sizeInput.value = state.size
    sizeSlide.value = state.size

    optionUppercase.checked = state.options.optionUppercase
    optionLowercase.checked = state.options.optionLowercase
    optionDigit.checked = state.options.optionDigit
    optionSymbol.checked = state.options.optionSymbol
  
    generateButton.disabled = state.allOptionsDisabled
    passwordField.innerHTML = state.password

    strengthTerrible.classList.remove("visible")
    strengthBad.classList.remove("visible")
    strengthOk.classList.remove("visible")
    strengthGood.classList.remove("visible")
    strengthAwesome.classList.remove("visible")

    if (state.strength >= 1) {
      strengthTerrible.classList.add("visible")
    }
    if (state.strength >= 2) {
      strengthBad.classList.add("visible")
    }
    if (state.strength >= 3) {
      strengthOk.classList.add("visible")
    }
    if (state.strength >= 4) {
      strengthGood.classList.add("visible")
    }
    if (state.strength >= 5) {
      strengthAwesome.classList.add("visible")
    }

    strengthText.innerHTML = strengthTexts[state.strength] || state.strength
    score.innerHTML = state.score
  }

  function validateSize(value){
    if (value < 6) {
      return 6
    }
    return value
  }

  function watchOptionsChange(callback){
    options.forEach(option => {
      option.addEventListener("change", (event) => {
        const {name: optionName, checked } = event.target
        state.options[optionName] = checked
        callback()
      })
    })
  }

  function watchSizeSlideChange(callback){
    sizeSlide.addEventListener("change", (event)=> {
      const value = validateSize(event.target.value)
      state.size = event.target.value
      callback()
    })
  }
  
  function watchSizeInputChange(callback){
    sizeInput.addEventListener("change", (event)=> {
      const value = validateSize(event.target.value)
      state.size = value
      callback()
    })
  }

  function generateAndRender() {

    state.allOptionsDisabled = Object.values(state.options).every((value) =>  !value)

    if(state.allOptionsDisabled) {
      state.password = "Nenhuma opção selecionada"
      state.strength = "-"
      state.score = "-"
      render()
      return;
    }
    
    const password = generatePassword(state)
    state.password = password

    const {strength, score} = calculateStrength(password)
    state.strength = strength
    state.score = score
    render()
  }
  
  generateButton.addEventListener('click', () => {
    generateAndRender()
  })

  watchOptionsChange(() => {
    generateAndRender()
  })

  watchSizeSlideChange(() => {
    generateAndRender()
  })

  watchSizeInputChange(() => {
    generateAndRender()
  })

  generateAndRender()

}
