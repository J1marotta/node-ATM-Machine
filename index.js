const say = require("say")
const S = f => say.speak(f)

const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.clear()
S("intro")
console.log("                                                                 ")
console.log("                                                                 ")
console.log("                     Welcome to ATM MACHINE 10000                ")
console.log("                We are here to make your life amazing            ")
console.log("                And definitely not steal your identity           ")
console.log("                                                                 ")
console.log("                I see you are a new bank customer                ")
console.log("                    Please enter your details                    ")
rl.question(
  "\n                            Name: \n                           ",
  name => {
    var name = name
    S(`Hello ${name}, now lets set up your PIN Number`)
  }
)

rl.on("close", () => {
  process.exit(0)
})
