const form = document.getElementById('form');
const inputBill = document.getElementById('bill');
const inputBillError = document.getElementById('bill-error');
const inputPeople = document.getElementById('number-people');
const inputPeopleError = document.getElementById('number-people-error');

const selectTip = document.getElementById('select-tip');
const customTip = document.getElementById('custom-tip');
const tipButtons = selectTip.querySelectorAll('button');

const resultTip = document.getElementById('result-tip');
const resultTotal = document.getElementById('result-total');
const resetButton = document.getElementById('reset');


let billAmount = 0;
let tip = 0;
let people= 0;

let totalTip = 0;
let total = 0;
let personTip = 0;
let personTotal = 0;


const validateForm = () => {
    if (billAmount != 0 && tip != 0 && people != 0) { form.requestSubmit(); }
};

const removeFocus = () => { document.activeElement.blur() };

const resetCustomTipState = () => {
    customTip.value = '';    
    customTip.style.textAlign = "center";
    customTip.setAttribute('state', 'void');
};

const resetButtonsStates = () => {
    tipButtons.forEach((button) => {
        button.setAttribute('state', 'unselected');
    })
}

const resetVariables  = () => {
    billAmount = 0;
    tip = 0;
    people= 0;
    totalTip = 0;
    total = 0;
    personTip = 0;
    personTotal = 0;
}

const calculateResult = () => {
    total = billAmount * (1 + tip);
    totalTip = total - billAmount;
    personTip = Math.floor((totalTip / people) * 100) / 100;
    personTotal = (total / people).toFixed(2);
}


inputBill.addEventListener("change", (e) => {
    pattern=/[0-9]+(\.[0-9]+)?$/;
    if (e.target.value.match(pattern)) {        
        inputBillError.textContent = ''
        inputBill.setAttribute('state', 'valid')
        billAmount = parseFloat(e.target.value).toFixed(2);
        
        validateForm();
    } else if (e.target.value === '') {             
        inputBillError.textContent = ''
        inputBill.setAttribute('state', 'void');
    } else {
        inputBillError.textContent = 'Input a valid bill';
        inputBill.setAttribute('state', 'error');
    }
    removeFocus();
})


inputPeople.addEventListener("change", (e) => {
    pattern=/[1-9]([0-9]+)?$/;
    if (e.target.value.match(pattern)) {        
        inputPeopleError.textContent = ''
        inputPeople.setAttribute('state', 'valid')
        people = parseInt(e.target.value);
        validateForm();
    } else if (e.target.value === '') {                
        inputPeopleError.textContent = ''
        inputPeople.setAttribute('state', 'void');
    } else {
        inputPeopleError.textContent = 'Can\'t be zero';
        inputPeople.setAttribute('state', 'error');
    }
    removeFocus();
})

customTip.addEventListener('change', (e) => {
    pattern=/[0-9]+(\.[0-9]+)?$/;
    if (e.target.value.match(pattern)) {  
        customTip.setAttribute('state', 'valid')
        customTip.style.textAlign = "right";
        tip = parseFloat(e.target.value).toFixed(2) / 100;
        resetButtonsStates();
        validateForm();
    } else if (e.target.value === '') {
        customTip.setAttribute('state', 'void');           
        customTip.style.textAlign = "center";
    } else {
        customTip.setAttribute('state', 'error');
    }
    removeFocus();
})

tipButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        resetButtonsStates();
        button.setAttribute('state', 'selected')
        tip = parseFloat(e.target.value) / 100;
        resetCustomTipState();
        validateForm();
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateResult();
    resultTip.textContent = `$${personTip}`;
    resultTotal.textContent = `$${personTotal}`;
    resetButton.disabled = false;
})

resetButton.addEventListener('click', () => {
    form.reset();
    inputBill.setAttribute('state', 'void');
    resetButtonsStates();
    resetCustomTipState();
    resetVariables();
    inputPeople.setAttribute('state', 'void');
    
    resultTip.textContent = '$0.00';
    resultTotal.textContent = '$0.00';
    resetButton.disabled = true;
})