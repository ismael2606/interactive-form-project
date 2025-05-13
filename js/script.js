const nameInput = document.getElementById('name');
nameInput.focus(); // Focus name field by default


const email = document.getElementById('email');

const OtherRoleField = document.getElementById('other-job-role')
OtherRoleField.hidden = true; //Hide other role text field by default


const jobRolesSelect = document.getElementById('title');

//Activities selection
const checkboxes = document.querySelectorAll('input[type="checkbox"]');


const colorElement = document.getElementById('color')
colorElement.disabled = true;

const shirtDesignSelect = document.getElementById('design');

const ShirtColorSelect = document.getElementById('color');

const activities = document.getElementById('activities');


//Select credit card option during page load
let payment = document.querySelector('#payment');
payment.value = 'credit-card';

const creditCardNum = document.getElementById('cc-num');
const creditZipCode = document.getElementById('zip');
const creditCVV = document.getElementById('cvv');


const form = document.querySelector('form');




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
})

//Payment info section
payment.addEventListener('change', (e) => {
    const paymentformSection = document.querySelectorAll('#credit-card, #paypal, #bitcoin');

    for (let i = 0; i < paymentformSection.length; i++ ) {
        if (e.target.value == paymentformSection[i].getAttribute('id')) {
            paymentformSection[i].hidden = false;
        }
         else {
            paymentformSection[i].hidden = true;
        }
    }  
})


form.addEventListener('submit', (e)=> {

    //input validator regex check
    const isNameValid = () => /\w*\w$/.test(nameInput.value);
    const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    const cardNumberValid = () => /^\d{13,16}$/.test(creditCardNum.value);
    const isZipValid = () => /^\d{5}$/.test(creditZipCode.value);
    const isCodeValid = () => /^\d{3}$/.test(creditCVV.value);


    //name and email validator
    if (!isNameValid() || !isEmailValid()) {
        e.preventDefault();
        console.log('try again with checking name, or email')
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
            console.log('try again');
        } 
    }

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

