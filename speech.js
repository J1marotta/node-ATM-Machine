const speech = y => x => {
  switch (x) {
    case "intro":
      return `Welcome to ATM MACHINE 10000. We are here to make your life amazing.
      And definitely not steal your identity,
      I see you are a new bank customer. Please enter your details. What is your name?
    `
    case "Balance":
      return `Display Balance`

    case "bal":
      return `Your current balance is ${y} Dollaroos`

    case "Rbal":
      return `Your remaining balance is ${y} Dollaroos`

    case "deposit":
      return `Make a Deposit`

    case "withdraw":
      return `Make a Withdrawal`

    case "how much w":
      return `how much would you like to Withdraw`

    case "how much d":
      return `how much would you like to Deposit`

    case "confirm withdraw":
      return `withdrawing`

    case "confirm withdraw":
      return `Depositing`

    case "change pin":
      return `Change Pin`

    case "enter pin":
      return `enter Pin`

    case "incorrect":
      return `Incorrect PIN`

    case "pinaccept":
      return `PIN Accepted`

    case "changed":
      return `Pin Successfully Change`

    case "police":
      return `WARNING, WARNING, WARNING Three times wrong pin, you must be a criminal: We know you are trying to hack us,  YOU ARE UNDER ARREST!, The police are on their way`

    case "four":
      return `Please Enter a four Digit PIN`

    case "quit":
      return `You can't quit yet we are buying stuff with your card in India, hahaha, joking..`

    case "Really?":
      return `Really Quit?`

    case "staying":
      return `Great choice, we are just hacking your facebook now`

    case "thankyou":
      return `thank you for choosing ATM Machine 10000`

    case "help":
      return `Push 1 for DISPLAY BALANCE Push 2 for Deposit  Push 3 for Withdrawal Push 4 to change PIN Push H to Repeat the Help Push Q to QUIT`
  }
}

module.exports.speech = speech
