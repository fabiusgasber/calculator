const buttons = document.querySelectorAll('button');
const result = document.querySelector('.calc-display');
let functionStr = document.querySelector('.calc-result');
let isOperator = false;

function calculate(str) {
    let arr = str.split(" ");
    let a = getNumber(arr[0]);
    let b = getNumber(arr[2]);
    let operator = arr[1];
    let result;
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "×":
            result = a * b;
            break;
        case "÷":
            result = a / b;
    }
    return result;
}

function getNumber(number){
    const parsedNumber = parseInt(number);
    if(!isNaN(parsedNumber)){
    return parsedNumber;
  }
}

function populateDisplay(){
    buttons.forEach((button) => {
        button.addEventListener('click', () => checkDisplay(button));
    });
}

populateDisplay();