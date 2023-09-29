const buttons = document.querySelectorAll('button');
const result = document.querySelector('.calc-result');
let functionStr = document.querySelector('.calc-function');
let isOperator = false;

function calculate(str) {
    let arr = str.split(" ");
    let a = getNumber(arr[0]);
    let b = getNumber(arr[2]);
    let operator = arr[1];
    let equation;
    switch (operator) {
        case "+":
            equation = a + b;
            break;
        case "-":
            equation = a - b;
            break;
        case "×":
            equation = a * b;
            break;
        case "÷":
            if(b === 0){
                equation = "LMFAO";
            }
            else{
                equation = a / b;
            }
    }
        if(equation % 1 != 0){
            try{
                equation = equation.toFixed(2);
            } catch(error){ };
        } 
    return equation;
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

function deleteValues(){
    result.textContent = "";
    functionStr.textContent = "";
}

function clearValues(){
    result.textContent = 0;
    functionStr.textContent = "";
}

function deleteValues(){
    let arr = result.textContent.split("");
    arr.pop();
    result.textContent = arr.join("");
}

function hasOperator(){
    let hasOperator = false;
    if(functionStr.textContent.includes("+") || functionStr.textContent.includes("÷") || functionStr.textContent.includes("×") || functionStr.textContent.includes("-")){
        hasOperator = true;
    }
    return hasOperator;
}

function linkNumbers(number){
    if(!hasOperator() && !isOperator){
        result.textContent += number;
        isOperator = false;
    }
    else if(isOperator && hasOperator()){
        result.textContent = number;
        isOperator = false;
    }
    else {
        result.textContent += number;
    }
}

function addOperator(operator){
    if(!hasOperator()){
        functionStr.textContent += result.textContent + " " + operator + " ";
        isOperator = true;
    }
    else if(hasOperator() && isOperator){
        functionStr.textContent = result.textContent + " " + operator + " ";
    }
    else if(!isOperator){
        result.textContent = calculate(functionStr.textContent + result.textContent);
        functionStr.textContent = result.textContent + " " + operator + " ";
        isOperator = true;
    }
}

function checkDisplay(button){
    let userChoice = button.textContent;
    if(!isNaN(userChoice)){
        linkNumbers(userChoice);
    }
    else if(userChoice === "+" || userChoice === "÷" || userChoice === "×" || userChoice === "-"){
        addOperator(userChoice);
    }
    else if(userChoice === "=" && functionStr.textContent.length > 0 && !functionStr.textContent.includes("=")){
        functionStr.textContent = functionStr.textContent + result.textContent + " " + "="
        result.textContent = calculate(functionStr.textContent + result.textContent);
    }
    else if(userChoice === "Delete"){
        deleteValues();
    }
    else if(userChoice === "Clear"){
        clearValues();
    }
    }

populateDisplay();