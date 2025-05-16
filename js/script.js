const nameInput = document.getElementById('name');
nameInput.focus(); // Focus name field by default

const email = document.getElementById('email');

const jobRolesSelect = document.getElementById('title');
const OtherRoleField = document.getElementById('other-job-role')
OtherRoleField.hidden = true; //Hide "other role" text field when the page loads 


//Activities checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// "Color" field is disabled when the page loads.
const colorElement = document.getElementById('color')
colorElement.disabled = true;


// T-shirt section variables
const shirtDesignSelect = document.getElementById('design');

const ShirtColorSelect = document.getElementById('color');


//Activities section selection
const activities = document.getElementById('activities');


//Selects credit card option during page load
let payment = document.querySelector('#payment');
payment.value = 'credit-card';


//Displays credit card form section only during page load
const bitCoinPaypalMethods = document.querySelectorAll('#paypal, #bitcoin');

for (let i = 0; i < bitCoinPaypalMethods.length; i++) {
    bitCoinPaypalMethods[i].style.display = 'none';
}


const creditCardNum = document.getElementById('cc-num');
const creditZipCode = document.getElementById('zip');
const creditCVV = document.getElementById('cvv');

const activityDateTime = document.querySelectorAll('[data-day-and-time]');

const form = document.querySelector('form');


//input validator regex check
const isNameValid = () => /\w*\w$/.test(nameInput.value);
const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
const cardNumberValid = () => /^\d{13,16}$/.test(creditCardNum.value);
const isZipValid = () => /^\d{5}$/.test(creditZipCode.value);
const isCodeValid = () => /^\d{3}$/.test(creditCVV.value);

// validator function for form submission
function validator(isInputValid, element) {
    if (!isInputValid) {
        element.parentElement.classList.remove('valid');
        element.parentElement.classList.add('not-valid');
        element.nextElementSibling.style.display = "inherit";
    } else {
        element.parentElement.classList.remove('not-valid');
        element.parentElement.classList.add('valid');
        element.nextElementSibling.style.display = "none";
    }
}


// Job Role section
jobRolesSelect.addEventListener('change', (e) => {
    if (e.target.value !== "other") {
        OtherRoleField.hidden = true;
    }
    else {
        OtherRoleField.hidden = false;
    }  
})

// T-shirt Info section
shirtDesignSelect.addEventListener('change', (e) => {
    for(let i = 0; i < ShirtColorSelect.length; i++){
        const shirtColorAttribute = ShirtColorSelect[i].getAttribute('data-theme')

        if (e.target.value == shirtColorAttribute) {
            colorElement.disabled = false;
            ShirtColorSelect[i].hidden = false;
        }
        else {
            ShirtColorSelect.value = "Select a design theme above";
            ShirtColorSelect[i].hidden = true;

        }
    }    
})

//Activities section
activities.addEventListener('change', (e) => {
    let costPerActivity = 0;
    let totalCost = document.getElementById('activities-cost');


    for (let i = 0; i < checkboxes.length; i++) {
        const activityCost = parseInt(checkboxes[i].getAttribute('data-cost'));

        if(checkboxes[i].checked) {
            totalCost.innerHTML = `Total: $${costPerActivity += activityCost}`;
        } else {
            totalCost.innerHTML = `Total: $${costPerActivity}`
        }
    }

    //Resolves conflict activity times [Exceeds task #1]
    activityDateTime.forEach(activity => {
        const clickedActivity = e.target.getAttribute('data-day-and-time');
        const activityTime = activity.getAttribute('data-day-and-time');

        if(e.target !== activity && clickedActivity === activityTime) {
            if (e.target.checked) {
                activity.disabled = true;
                activity.parentElement.classList.add('disabled');
            }
            else {
                activity.disabled = false;
                activity.parentElement.classList.remove('disabled');
            }
        }
    })

        
})

//Payment info section
payment.addEventListener('change', (e) => {

    const paymentformSection = document.querySelectorAll('#credit-card, #paypal, #bitcoin');

    for (let i = 0; i < paymentformSection.length; i++ ) {
        if (e.target.value == paymentformSection[i].getAttribute('id')) {
            paymentformSection[i].style.display = 'inherit';
        }
         else {
            paymentformSection[i].style.display = 'none';
        }
    }  
})


form.addEventListener('submit', (e)=> {

    //name and email validator
    if (!isNameValid() || !isEmailValid()) {
        e.preventDefault();
    } 

    //ensures at least 1 activity is selected to submit
    let activitesSelected = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            activitesSelected.push(checkboxes[i])
        }
    }

    if (activitesSelected.length === 0) {
        e.preventDefault();
    }
    
    //credit card info validator
    if (payment.value == 'credit-card') {
        if(!cardNumberValid() || !isZipValid() || !isCodeValid()) {
            e.preventDefault();
        } 
    }

    //function call to check if the data is valid for submission
    validator(isNameValid(), nameInput);
    validator(isEmailValid(), email);
    validator(cardNumberValid(), creditCardNum);
    validator(isZipValid(), creditZipCode);
    validator(isCodeValid(), creditCVV);
})


//Highlights the option(s) while navigating the Activities section
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('focus', () => {
        checkbox.parentElement.className = 'focus';
    })
    checkbox.addEventListener('blur', () => {
        checkbox.parentElement.className = 'focus';
        checkbox.parentElement.className = 'blur';

    })
})


//Real time error-message [Exceeds task #2]
function realTimeErrorMessage(inputElement) {
    inputElement.addEventListener('keyup', (e) => {
        let userInput = e.target.value;

        if (userInput.includes(inputElement.value)) {
            validator(isNameValid(), nameInput);
        }
    })
}

//Conditional error message [Exceeds task #3]
function conditionalErrorMessage(inputElement) {
    inputElement.addEventListener('keyup', (e) => {
        const numbersOnly = () => /^\d+$/.test(inputElement.value);
    
        let userInput = e.target.value;
        if(!numbersOnly() && userInput !== "") {
            inputElement.nextElementSibling.innerHTML = 'Card number must contain only digits — no spaces or special characters.';
            inputElement.nextElementSibling.style.display = 'inherit';
        } else {
            inputElement.nextElementSibling.style.display = 'none';
        }
    
        if(userInput.length > 16) {
            inputElement.nextElementSibling.innerHTML = 'Card number provided is more than 16 digits, it must 13-16  digits or less.';
            inputElement.nextElementSibling.style.display = 'inherit';
        }
    })

}

realTimeErrorMessage(nameInput)
conditionalErrorMessage(creditCardNum)



