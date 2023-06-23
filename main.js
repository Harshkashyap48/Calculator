const buttons = document.querySelectorAll ('.button');
const displayInput = document.querySelector ('.display-input');
const displayOutput = document.querySelector ('.display-output');

let input = '';

for (let button of buttons) {
    const value = button.dataset.key;
    button.addEventListener ('click', () => {
        if (value === 'clear') {
            input = '';
            displayInput.innerHTML = '';
            displayOutput.innerHTML = '';
        } else if (value === 'backspace') {
            input = input.slice (0, -1);
            displayInput.innerHTML = cleanInput(input);
        } else if (value === '=') {
            let result = eval(prepareInput(input));
            displayOutput.innerHTML = cleanOutput(result);
        } else {
            if (validateInput(value)) {
                input += value;
                displayInput.innerHTML = cleanInput(input);
            }
        }
    });
}

const cleanInput = input => {
    let inputArray = input.split ('');
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray [i] === '*') {
            inputArray [i] = `<span class="display-operator"> x </span>`;
        } else if (inputArray [i] === '/') {
            inputArray [i] = `<span class="display-operator"> ÷ </span>`;
        } else if (inputArray [i] === '+') {
            inputArray [i] = `<span class="display-operator"> + </span>`;
        } else if (inputArray [i] === '-') {
            inputArray [i] = `<span class="display-operator"> - </span>`;
        } else if (inputArray [i] === '%') {
            inputArray [i] = `<span class="display-operator">%</span>`;
        }
    }
    return inputArray.join ('');
}

const cleanOutput = output => {
    let outputString = output.toString ();
    let decimal = outputString.split('.')[1];
    outputString = outputString.split('.')[0];
    let outputArray = outputString.split ('');
    if (outputArray.length > 3) {
        for (let i = outputArray.length - 3; i > 0; i -= 3) {
            outputArray.splice (i, 0, ',');
        }
    }
    if (decimal) {
        outputArray.push (',');
        outputArray.push (decimal);
    }
    return outputArray.join ('');
}

const validateInput = value => {
    let lastInput = input.slice(-1);
    let operators = ['+', '-', '*', '/', '%'];
    if (value === ',' && lastInput === ',') {
        return false;
    }
    if (operators.includes(value)) {
        if (operators.includes(lastInput)) {
            return false;
        } else {
            return true;
        }
    }
    return true;
}

const prepareInput = input => {
    let inputArray = input.split ('');
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray [i] === '%') {
            inputArray [i] = '/100';
        }
    }
    return inputArray.join ('');
}