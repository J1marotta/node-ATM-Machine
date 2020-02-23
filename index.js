const fs = require("fs")
const say = require("say")
const S = f => say.speak(f, null, 1.55)
const { speech } = require("./speech")
const prompt = require("prompt-sync")({ sigint: true })
const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const sp = speech(0)

const police = async () => {
  S(sp("police"))
  // 5 times do (from ruby code)
  Array(5)
    .fill(1)
    .map(async () => {
      console.log("                    WARNING WARNING WARNING")
      console.log("              : ! The police are on their way ! :")
      console.log("                    WARNING WARNING WARNING")
      await wait(1000)
    })
  // pause for dramatic effect
  await wait(2000)

  const police = await fs.readFileSync("police.txt", "utf8")

  console.log(police)

  process.exit()
}

const sendHelp = async () => {
  console.clear()
  console.log(`
                                ,d   10,0000
                               88
                  ,adPPYYba,  MM88MMM  88,dPYba,,adPYba,
                          Y8   88      88P     88      8a
                  ,adPPPPP88   88      88      88      88
                  88,    ,88   88,     88      88      88
                    8bbdP Y8   Y88     88      88      88
                      By James Marotta
 
                      `)
  console.log("                 1    for DISPLAY BALANCE")
  console.log("                 2    for DEPOSIT")
  console.log("                 3    for WITHDRAWAL")
  console.log("                 4    to CHANGE PIN")
  console.log("                 H    for HELP")
  console.log("                 Q    to QUIT")
}

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
  await wait(1500)
  return pin
}

const pinCheck = async (chances, pin) => {
  do {
    S("enter pin")
    const pinGuess = prompt("Enter PIN: ")
    if (pinGuess !== pin) {
      S(" Incorrect PIN")
      chances--
    }
    if (pinGuess === pin) {
      S("Correct")
      return true
    }

    if (chances === 0) {
      setTimeout(
        () => console.log(`       Three Strikes, you\'re OUT!      `),

        await police(),
        1000
      )
    }
  } while (chances > 0)
  return false
}

const displaybal = bal => {
  console.clear()
  console.log(`           Your Balance is `)
  console.log(`           $ ${bal} Dollaroos `)
}

const balance = async (bal, chances, pin) => {
  S("Balance")
  if (await pinCheck(chances, pin)) {
    await wait(500)
    S("pinaccept")
    await wait(2000)
    S(speech(bal)("bal"))
    displaybal(bal)
    await wait(2000)
  }
}

const quit = async () => {
  console.clear()
  S(sp('quit'))
  console.log()
  console.log( "      You can't quit yet we are buying stuff with your card in India")
  console.log( "                       hahaha, joking... ")
  console.log( "                             ... ")
  console.log( "                      Really Quit? [y/n]")
  S("Really?")
  const exit = prompt('y/n ? ')

  if(exit === 'y'){
    console.log()
    console.log( "              Thanks for choosing ATM Machine 10000")
    S(sp("thankyou"))
    console.log()
    process.exit()

  } else if (exit === 'n') {
      console.log()
      await wait(500)
      console.log( "        Great choice, we are just hacking your facebook now")
      S(sp("staying"))
      console.log()
      await wait(500)
      await sendHelp()
      return null
  }
}

const withdrawal = async (bal, chances, pin) => {
  console.clear()
  S(sp('withdraw'))
  console.log("       Make a withdrawal\n")

  if (await pinCheck(chances, pin)) {
    await wait(500)


  S(sp('how much w'))
   const amount = prompt("How much?: ")
   S(sp('confirm withdraw'))
   bal -= amount
   S(speech(bal)('Rbal'))
   await wait(1000)
   displaybal(bal)
   await wait(1000)
  }
  await wait(200)
  console.log('....dispensing...')
  console.clear()
  await wait(500)
  const dollars = await fs.readFileSync('dollaroos.txt', 'utf8')
  console.log(dollars)

  process.exit()

}

const changePin = async ( pin, chances ) => {
  if( await pinCheck(chances, pin)) {
    await wait(500)
    const newPin = await pinControl()
    return newPin
  }
}


const deposit = async (bal,chances,pin) => {
  console.clear()
  S(sp('deposit'))
  console.log("       Make a deposit\n")

  if (await pinCheck(chances, pin)) {
   await wait(500)
   S(sp('how much d'))
   const amount = Number(prompt("How much?: "))
   
   S(sp('confirm deposit'))
   bal += amount
   S(speech(bal)('Rbal'))
   await wait(1000)
   displaybal(bal)
   await wait(1000)
   return bal
  }
  
}


const mainMenu = async (bal, chances, pin, gs) => {
  await wait(1200)
  console.log('DEBUG: pin', pin)
  await sendHelp()
  
  let choice = prompt("Choice:  ")

  while (gs === "go") {
    switch (choice) {
      case "1":
        S(sp("Balance"))
        await balance(bal, chances, pin)
        await sendHelp()
        choice = prompt('Choice: ')
        break
      case "2":
        S(sp("deposit"))
        bal = await deposit(bal, chances, pin)
        await sendHelp()
        choice = prompt('Choice: ')
        break
      case "3":
        S(sp("withdraw"))
        await withdrawal(bal, chances, pin )
        choice = prompt('Choice: ')
        break
      case "4":
        S(sp("change pin"))
        pin = await changePin(pin, chances)
        await sendHelp()
        choice = prompt('Choice: ')
        break
      case "Q": case 'q':
        await quit()
        choice = prompt('Choice: ')
        break
      case "H": case 'h':
        S(sp("help"))
        choice = prompt('Choice: ')
        break;
      default:
        choice = prompt('Choice: ')
        break;
    }
  }
}




const main = async () => {
  let bal = 100
  let chances = 3
  let gs = "go"
  await intro()
  const name = prompt(`Name (then push enter):  `)
  S(`Welcome ${name}, now lets set up a PIN:  `)

  const pin = await pinControl()
  console.log("Keep your Pin Safe!")

  await mainMenu(bal, chances, pin, gs)
}

main()
