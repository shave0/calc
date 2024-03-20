var firstNumber;
var secondNumber;
var currentOperator;
var op = false;
var opIndex;
var decimalOne = false;
var decimalTwo = false;
var decimalIndexOne
var decimalIndexTwo;

document.addEventListener('keydown', function(event){
    var keyPressed = event.key;
    console.log(keyPressed);
    if(keyPressed == '+' || keyPressed == '-' || keyPressed == '*' || keyPressed == '/' || keyPressed == '.'){
        getNumber(keyPressed);
    }
    else if(keyPressed >= 0 && keyPressed <= 9){
        getNumber(keyPressed);
    }
    else{
        switch(keyPressed){
            case 'Enter':
                console.log('Solution via Enter')
                getNumber('=');
                break;
            case 'Backspace':
                getNumber('Delete');
                break;
            case 'c':
                getNumber('Clear')
                break;
            default:
                console.log('Falsche Taste bra')
                break;
    
        }
    }
})

function getNumber(id){
    var display = document.getElementById('display');

    if(id == '+' || id == '-' || id == '*' || id == '/'){
        if(op){
            var latestValue = display.textContent.slice(display.textContent.length-1)
            if(latestValue == '+' || latestValue == '-' || latestValue == '*' || latestValue == '/'){
                console.log("replaced operator to " + id)
                display.textContent = display.textContent.replace(latestValue, id);
                currentOperator = id;
            }
            else{
                console.log("operator already been set before")
                getNumber('=');
                getNumber(id);
            }
        }
        else{
            opIndex = display.textContent.length + 1;
            console.log("Op Index = " + opIndex);
            display.textContent = display.textContent + " " + id;
            currentOperator = id;
            console.log( "operator " +currentOperator);
            op = true;
        }
    }
    else if( id == '.'){
        if(op){
            if(decimalTwo){

            }
            else{
                decimalTwo = true;
                decimalIndexTwo = display.textContent.length;
                console.log("Deicmal Index Two = " + decimalIndexTwo);
                secondNumber = secondNumber + id;
                display.textContent = display.textContent + id;
            }
        }
        else{
            if(decimalOne){

            }
            else{
                decimalOne = true;
                decimalIndexOne = display.textContent.length;
                console.log("Deicmal Index One = " + decimalIndexOne);
                firstNumber = firstNumber + id;
                display.textContent = firstNumber;
            }
        }
    }
    else if(id == 'Clear'){
        console.log("clear button");
        display.textContent = "";
        firstNumber = undefined;
        secondNumber = undefined;
        op = false;

    }
    else if(id == 'Delete'){
        console.log("deleted last entry");
        if(op){
            secondNumber = secondNumber.slice(0, secondNumber.length-1);
            display.textContent = display.textContent.slice(0, display.textContent.length -1);
            if(opIndex == display.textContent.length){
                console.log("Deleted Operator")
                op = false;
            }
            else if(decimalIndexTwo == display.textContent.length){
                console.log("Deleted Decimal Two")
                decimalTwo = false;
            }
        }
        else{
            firstNumber = firstNumber.slice(0, firstNumber.length-1);
            display.textContent = firstNumber;
            if(decimalIndexOne == display.textContent.length){
                console.log("Deleted Decimal One")
                decimalOne = false;
            }
        }
    }
    else if(id == '='){
        console.log("solution button");
        op = false;
        var solution = operator(firstNumber, currentOperator, secondNumber);
        display.textContent = solution;
        firstNumber = solution;
        secondNumber = undefined;
    }
    else if(op){
        if(!secondNumber){
            decimal = false;
            secondNumber = id;
            console.log("second " + secondNumber);
            display.textContent = display.textContent + " " + id;
        }
        else{
            secondNumber = secondNumber + id;
            console.log("second " + secondNumber);
            display.textContent = display.textContent + id;
        }
    }
    else{
        if(!firstNumber){
            firstNumber = id;
        }
        else{
            firstNumber = firstNumber + id;
        }
        console.log( "first " +firstNumber);
        display.textContent = firstNumber;
    }
}

function operator(a, op, b){
    var solution;
    switch(op){
        case '+':
            solution = +a + +b;
            break;
        case '-':
            solution = a-b;
            break;
        case '*':
            solution = a*b;
            break;
        case '/':
            solution = a / b;
            break;
    }
    return solution
    
}