const buttons = document.querySelectorAll('button');
const display = document.querySelector('.calc-display');
let displayValue;

function calculate(number1, number2, operator) {
    let a = getNumber(number1)
    let b = getNumber(number2);
    let result;
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = a / b;
    }
    return result;
}

function getNumber(a){
  if(parseInt(a)){
    return parseInt(a);
  }
}

function populateDisplay(){
    buttons.forEach((button) => {
        
        button.addEventListener('click', () => {
            displayValue = button.textContent;
            display.textContent = button.textContent;
        });
    });
}
populateDisplay();