class Calculator{
    constructor(screenbeforeTextElement, screenafterTextElement){
        this.screenbeforeTextElement = screenbeforeTextElement
        this.screenafterTextElement = screenafterTextElement
        this.clear()
    }
    clear(){
        this.screenafter = ''
        this.screenbefore = ''
        this.operation = undefined
    }
    delete(){
        this.screenafter = this.screenafter.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number ==='.' && this.screenafter.includes('.')) return
        this.screenafter = this.screenafter.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.screenafter === '') return
        if (this.screenbefore !== '') {
            this.compute()
         }
        this.operation = operation
        this.screenbefore = this.screenafter
        this.screenafter = ''
      
    }
    compute(){ 
        let computation
        const prev = parseFloat(this.screenbefore) 
        const current = parseFloat(this.screenafter)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.screenafter = computation
        this.operation = undefined
        this.screenbefore = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.') [0])
        const decimalDigits = stringNumber.split('.') [1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.screenafterTextElement.innerText = 
            this.getDisplayNumber(this.screenafter)
        if (this.operation!= null){ 
            this.screenbeforeTextElement.innerText = 
                `${this.getDisplayNumber(this.screenbefore)} ${this.operation}` 
        } else{
            this.screenbeforeTextElement.innerText = ''
        }
          
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearAllButton = document.querySelector('[data-clearAll]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const screenafterTextElement = document.querySelector('[data-screenafter]');
const screenbeforeTextElement = document.querySelector('[data-screenbefore]');

const calculator = new Calculator(screenbeforeTextElement,screenafterTextElement)
 numberButtons.forEach(button =>{
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)  
        calculator.updateDisplay()  
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText)  
        calculator.updateDisplay()  
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})