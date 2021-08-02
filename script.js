class Calculator {
    constructor(prevText, currentText) {
        this.prevText = prevText;
        this.currentText = currentText;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = undefined;

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;

        }
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.prevOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    updateDisplay() {
        this.currentText.innerText = this.currentOperand;
        this.prevText.innerText = this.prevOperand;
    }


}

const numberButtons = document.querySelectorAll('[data-num]');
// console.log(numberButtons);
operationButtons = document.querySelectorAll('[data-op]');
// console.log(operationButtons);
const equalsButton = document.querySelector('[data-equal]');
const delButton = document.querySelector('[data-del]')
const prevText = document.querySelector('[data-pre]')
const currentText = document.querySelector('[data-cur]')
const clear = document.querySelector('[data-clear]')

const calculator = new Calculator(prevText, currentText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // console.log('h');
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // console.log('h');
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();

})
clear.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();

})
delButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();

})