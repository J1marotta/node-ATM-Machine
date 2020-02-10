const say = require("say")
const S = f => say.speak(f, null, 1.75)
const { speech } = require("./speech")
const prompt = require("prompt-sync")({ sigint: true })
const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const sp = speech(0)

const intro = async () => {
  S(sp("intro"))

  console.clear()
  console.log("                                                       ")
  console.log("                                                       ")
  console.log("            Welcome to ATM MACHINE 10000               ")
  console.log("         We are here to make your life amazing         ")
  console.log("            And definitely not steal your identity     ")
  console.log("                                                       ")
  console.log("           I see you are a new bank customer           ")
  console.log("               Please enter your details               ")
}

const pinControl = async () => {
  let pin
  do {
    pin = prompt("Enter a four digit pin  ")
    S("four ")
  } while (pin.length !== 4)
  S("pinaccept, keep your Pin Safe!")
  await wait(800)
  return pin
}

const choice = async (bal, chances) => {
  await wait(1200)
  S(sp("help"))

  let choice

  while (true) {
    switch (choice) {
      case "1":
        S(sp("Balance"))
        // balance(bal)
        break
      case "2":
        S(sp("deposit"))
        // deposit(bal)
        break
      case "3":
        S(sp("withdraw"))
        // withdrawal(bal)
        break
      case "4":
        S(sp("change pin"))
        // change_pin(chances)
        break
      case "q":
        // quit()
        break
      case "h":
        S(sp("help"))
      default:
        // send_help()
        break
    }
  }
}

const main = async () => {
  let bal = 100
  let chances = 3
  // await intro()
  const name = prompt(`Name(then push enter):  `)
  S(`Welcome ${name}, now lets set up a PIN:  `)

  const pin = await pinControl()
  console.log("Keep your Pin Safe!")

  await choice(bal, chances)
}

main()
