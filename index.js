const say = require("say")
const S = f => say.speak(f)
const { speech } = require("./speech")
const prompt = require("prompt-sync")({ sigint: true })

const sp = speech(0)

const intro = async () => {
  S(sp("intro"))

  console.clear()
  console.log(
    "                                                                 "
  )
  console.log(
    "                                                                 "
  )
  console.log(
    "                     Welcome to ATM MACHINE 10000                "
  )
  console.log(
    "                We are here to make your life amazing            "
  )
  console.log(
    "                And definitely not steal your identity           "
  )
  console.log(
    "                                                                 "
  )
  console.log(
    "                I see you are a new bank customer                "
  )
  console.log(
    "                    Please enter your details                    "
  )
}

const pinControl = () => {
  let pin
  do {
    pin = prompt("Enter a four digit pin")
    S("four")
  } while (pin.length < 4)

  return pin
}

const main = async () => {
  // await intro()
  const name = await prompt(`Name(then push enter):  `)
  S(`Welcome ${name}, now lets set up a PIN: `)
  const pin = pinControl()
  S("pinaccept, keep your Pin Safe!")
  console.log("Keep your Pin Safe!")
}

main()
