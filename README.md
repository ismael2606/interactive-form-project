# Interactive Form project

## Real time error-message [Exceeds task #2]

* The code below allows to let the user know if the name thyey're entering is validated in real time using a regex condition to make sure that the name field is not blank.

* Example: if the user starts typing, it'll show a green check indictor, if the user deletes their input, an error message is triggered to inform that field cannot be empty.

```javascript
function realTimeErrorMessage(inputElement) {
    inputElement.addEventListener('keyup', (e) => {
        let userInput = e.target.value;

        if (userInput.includes(inputElement.value)) {
            validator(isNameValid(), nameInput);
        }
    })
}
realTimeErrorMessage(nameInput)
```

## Conditional error message [Exceeds task #3]

* This feature let's the user know if the card number entered contains special characters, spaces or if the card number is longer than 16 digits by providing an error message on screen to do the corresponding correction.

```javascript
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
conditionalErrorMessage(creditCardNum)
```
