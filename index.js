let currentInput = "";
let operator = "";
let previousInput = "";

function updateDisplay(value) {
    document.getElementById("final-result").innerText = value;
}

function clearAll() {
    currentInput = "";
    operator = "";
    previousInput = "";
    updateDisplay("0");
}

function clearLast() {
    if (currentInput !== "") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || "0");
    } else if (operator !== "") {
        operator = "";
        updateDisplay(previousInput);
    }
}

function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function chooseOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "";
    updateDisplay(op);
}

function calculate() {
    if (previousInput === "" || currentInput === "" || operator === "") return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = "";
    previousInput = "";
    updateDisplay(result);
}

document.querySelectorAll(".keypad-item").forEach(e => {
    e.addEventListener("click", () => {
        appendNumber(e.innerText);
    });
});

document.querySelectorAll(".operator-item").forEach(e => {
    e.addEventListener("click", () => {
        chooseOperator(e.innerText);
    });
});

document.querySelectorAll(".control-item").forEach(e => {
    e.addEventListener("click", () => {
        const value = e.innerText;
        if (value === "=") {
            calculate();
        } else if (value === "C") {
            clearLast();
        }
        else{
            clearAll();
        }
    });
});
