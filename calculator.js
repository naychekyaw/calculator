let runningTotal = 0; //to know previous input
let buffer = "0"; //show on screen
let previousOperator; //know last operator input

const screen = document.querySelector(".screen");

function buttonClick(value) {
    if(isNaN(value)) {
        handleSymbol(value);
    } else { 
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    /*if (symbol === "C") {
        buffer = "0";
        runningTotal = 0;
    }
    else if{}*/
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator= null;
            buffer= runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length=== 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    console.log('handle math',symbol)
    if (buffer === "0") {
        //no math when it's zero
        return; //just return to end function
    }
    
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0'; //reset for next input after symbol input
}

function flushOperation(intBuffer) {
    switch (previousOperator){
        case '÷':
            runningTotal /= intBuffer;
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
        case '−':
            runningTotal -= intBuffer;
            break;
        case '+':
            runningTotal += intBuffer;
            break;
    }
    console.log('running total',runningTotal)
}

function handleNumber(numberString) {
    if(buffer === "0") {
        buffer = numberString;
    } else { 
        buffer += numberString;
    }   
};

function init () {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(event) {
            buttonClick(event.target.innerText)
    })
};

init();
