const buttons = document.querySelectorAll('button');
const result = document.querySelector('.calc-result');
let functionStr = document.querySelector('.calc-function');
let isOperator = false;

const operators = {
    add: "+",
    sub: "-",
    mul: "×", 
    div: "÷", 
    ext: "^",
    perc: "%"
}

function checkOperator(str){
    let isOperator = false;
    for(const operator in operators){
        if(str.includes(operators[operator])){
            isOperator = true;
        }
    }
    return isOperator;
}

function calculate(str) {
    let arr = str.split(" ");
    let a = getNumber(arr[0]);
    let b = getNumber(arr[2]);
    let operator = arr[1];
    let equation;
    switch (operator) {
        case "+":
            equation = sum(a, b);
            break;
        case "-":
            equation = substract(a, b);
            break;
        case "×":
            equation = mulitply(a, b);
            break;
        case "÷":
            equation = divide(a, b);
            break;
        case "^":
            equation = extrapolate(a, b);
            break;
        case "%":
            equation = percentile(a);
            break;
    }
    return roundNumber(equation);
}

function sum(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function mulitply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0){
        return "LMFAO";
    }
    else{
        return a / b;
    }
}

function extrapolate(a, b){
    return a ** b;
}

function percentile(a){
    return a / 100;
}

function roundNumber(number){
    if(number % 1 != 0){
        try{
            number = number.toFixed(2);
        } catch(error){ };
    } 
    return number;
}

function getNumber(number){
    const parsedNumber = parseFloat(number);
    if(!isNaN(parsedNumber)){
    return parsedNumber;
  }
}

function populateDisplay(){
    buttons.forEach((button) => {
        button.addEventListener('click', () => checkDisplay(button));
    });
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

function addNumber(number){
    if(result.textContent == 0 && !result.textContent.includes(".")){
        result.textContent = number
    }
    else if(isOperator && checkOperator(functionStr.textContent)){
        result.textContent = number;
        isOperator = false;
    }
    else if(!functionStr.textContent.includes("=")){
        result.textContent += number;
    }
}

function addOperator(operator){
    if(!checkOperator(functionStr.textContent)){
        functionStr.textContent += result.textContent + " " + operator + " ";
        isOperator = true;
    }
    else if(checkOperator(functionStr.textContent) && isOperator){
        functionStr.textContent = result.textContent + " " + operator + " ";
    }
    else if(!isOperator){
        result.textContent = calculate(functionStr.textContent + result.textContent);
        functionStr.textContent = result.textContent + " " + operator + " ";
        isOperator = true;
    }
}

function addDecimal(){
    if(!result.textContent.includes(".")){
        result.textContent += ".";
    }
}

function setUpEquation(){
    functionStr.textContent = functionStr.textContent + result.textContent + " " + "=";
    result.textContent = calculate(functionStr.textContent + result.textContent);
}

function directEquation(operator){
    functionStr.textContent = result.textContent + " " + operator + " " + "=";
    result.textContent = calculate(functionStr.textContent);
}

function stringInUse(str){
 return functionStr.textContent.includes(str);
}

function stringEmpty(){
    return functionStr.textContent.length === 0;
}

function checkDisplay(button){
    let userChoice = button.textContent;
    if(!isNaN(userChoice)){
        addNumber(userChoice);
    }
    else if (userChoice === "%"){
        directEquation("%");
    }
    else if(userChoice === "=" && !stringEmpty() && !stringInUse("=")){
        setUpEquation();
    }
    else if(userChoice === "C" && !stringInUse("=")){
        deleteValues();
    }
    else if(userChoice === "CE"){
        clearValues();
    }
    else if(userChoice === "."){
        addDecimal();
    }
    else if(checkOperator(userChoice)){
        addOperator(userChoice);
    }
    }

populateDisplay();