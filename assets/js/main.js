/**
 * Variables
 */
let screenDisplay = document.querySelector("#calculator-screen");
let buttonsArray = document.querySelectorAll(".button");
let valueChar = "";

/**
 * Constantes
 */
const REGEX = /^[0-9+\-*/.]+$/;
const keyBoardValues = {
  clean: "Escape",
  equal: "Enter",
  erase: "Backspace",
  dot: ".",
  plus: "+",
  minus: "-",
  multiply: "*",
  divide: "/",
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function buttonAnimation(currentKey) {
  let activeKey = document.querySelector("." + currentKey);
  activeKey.classList.add("pressed");
  setTimeout(() => {
    activeKey.classList.remove("pressed");
  }, 200);
}

function validator(character) {
  if (REGEX.test(character)) {
    if (character === "." && valueChar.includes(".")) {
      return valueChar;
    }
    if (
      ["+", "-", "*", "/"].includes(character) &&
      ["+", "-", "*", "/"].includes(valueChar.slice(-1))
    ) {
      return valueChar;
    }
    return (valueChar += character);
  }
  return valueChar;
}

function display(character) {
  screenDisplay.setAttribute("value", validator(character));
}

function operationCalculator() {
  try {
    const divideByZero = /\b\/0\b/;
    const operatorAtStartOrEnd = /^[*/+-]|[*/+-]$/;
    let stringChar = screenDisplay.value;

    if (!operatorAtStartOrEnd.test(stringChar)) {
      if (!divideByZero.test(stringChar)) {
        let result = math.evaluate(stringChar);
        valueChar = result.toString();
        screenDisplay.setAttribute("value", valueChar);
      } else {
        cleanScreen();
        alert("Advertencia no se puede dividir entre 0");
      }
    } else {
      alert("No se puede empezar o terminar con un operador");
      cleanScreen();
    }
  } catch (e) {
    screenDisplay.setAttribute("value", "Error");
    valueChar = "";
  }
}

function keyBoardEventListener(keyPressed) {
  switch (keyPressed) {
    case "Enter":
      operationCalculator();
      break;
    case "Backspace":
      eraseScreen();
      break;
    case "Escape":
      cleanScreen();
      break;
    default:
      display(keyPressed);
      break;
  }
}

function eraseScreen() {
  screenDisplay.setAttribute("value", screenDisplay.value.slice(0, -1));
  valueChar = screenDisplay.value;
  if (valueChar === "") {
    screenDisplay.setAttribute("value", "0");
  }
}

function cleanScreen() {
  screenDisplay.setAttribute("value", "0");
  valueChar = "";
}

document.addEventListener("keydown", (e) => {
  keyBoardEventListener(e.key);
});

buttonsArray.forEach(button => {
  button.addEventListener("click", function () {
    let keyPress = this.classList[1];
    keyBoardEventListener(keyBoardValues[keyPress]);
    buttonAnimation(keyPress)
  })
});


