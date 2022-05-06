"use strict";
let form = document.forms[0];
let textarea = document.querySelector(".form__textarea");
let span = document.querySelector(".form__description .form__span");
let radio = form.elements.confirmation;
let radioValue = radio.value;
let select = document.querySelector(".form__select");
let selectValue = select.value;
let nettoField = document.querySelector('.form__netto .form__input');
let nettoValue = nettoField.value;
let bruttoField = document.querySelector('.form__brutto .form__input');
textarea.addEventListener(
  "input",
  () => {
    let descriptionLength = textarea.value.length;
    span.textContent = `${255 - descriptionLength} characters left`;
    if (descriptionLength >= 255) {
      span.classList.add("incorrect");
      span.textContent = "You can’t enter more than 255 characters";
    }
    if (descriptionLength < 255) {
      span.classList.remove("incorrect");
    }
  },
  false
);

form.addEventListener("submit", validateFormInfo, false);

for (let elem of radio) {
  elem.addEventListener(
    "change",
    () => {
      console.log(radioValue);
      radioValue = radio.value;
      if (radioValue) {
        let span = document.querySelector(".form__fieldset + .form__span");
        span.textContent = null;
        span.classList.remove("incorrect");
      }
    },
    false
  );
}

select.addEventListener(
  "change",
  () => {
    
    selectValue = select.value;
    if (selectValue) {
      select.classList.remove('inactive');
      let span = document.querySelector(".form__VAT .form__span");
      span.textContent = null;
      span.classList.remove("incorrect");
      nettoField.removeAttribute('disabled');
    }
  },
  false
);

nettoField.addEventListener(
  "input",
  () => {
    nettoValue = nettoField.value;
    if (nettoValue.length > 0) {
      let span = document.querySelector(".form__netto + .form__span");
      let nettoValueInNum = parseFloat(nettoValue.replace(',', '.'));
      console.log(nettoValueInNum);
      if(!isNaN(nettoValueInNum)&&nettoValueInNum>0) {
        console.log('число');
        span.classList.remove("incorrect");
        span.textContent = null;
        bruttoField.setAttribute('placeholder', `${((+selectValue+100)/100*nettoValueInNum).toFixed(2)}`);
      } else {
        span.classList.add("incorrect");
        span.textContent = 'Please, input number';
      }
      
    } else {
      span.classList.add("incorrect");
      span.textContent = 'Please, input number';
    }
  },
  false
);

function validateFormInfo(e) {
  e = e || window.event;
  try {
    let form = document.forms[0];

    let textarea = document.querySelector(".form__textarea");
    var textareaValue = textarea.value;

    let radio = form.elements.confirmation;
    let radioValue = radio.value;

   
    

    
    if (!nettoValue) {
      let span = document.querySelector(".form__netto + .form__span");
      span.textContent = "Please, input number";
      span.classList.add("incorrect");
      nettoField.focus();
      e.preventDefault();
    }
if (!selectValue) {
      let span = document.querySelector(".form__VAT .form__span");
      span.textContent = "Text is required!";
      span.classList.add("incorrect");
      select.focus();
      e.preventDefault();
    }
   
    if (!radioValue) {
      let span = document.querySelector(".form__fieldset + .form__span");
      span.textContent = "Text is required!";
      span.classList.add("incorrect");
      document.querySelector('.second').scrollIntoView();
      e.preventDefault();
    }

    if (textareaValue.length < 1) {
      let span = document.querySelector(".form__description .form__span");
      span.classList.add("incorrect");
      span.textContent = "Text is required!";
      textarea.focus();
      e.preventDefault();
    }
  } catch (ex) {
    alert("Что-то пошло не так!");
    e.preventDefault();
  }
}
