"use strict";
let form = document.forms[0];
form.addEventListener("submit", sendForm, false);

let textarea = document.querySelector(".form__textarea");

let radio = form.elements.confirmation;
let radioValue = radio.value;

let select = document.querySelector(".form__select");
let selectValue = select.value;

let nettoField = document.querySelector('.form__netto .form__input');
let nettoValue = nettoField.value;
let nettoValueInNum = parseFloat(nettoValue.replace(',', '.'));

let bruttoField = document.querySelector('.form__brutto .form__input');

textarea.addEventListener(
  "input",
  () => {
    let span = document.querySelector(".form__description .form__span");
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


for (let elem of radio) {
  elem.addEventListener(
    "change",
    () => {
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
      let span = document.querySelector(".form__VAT + .form__span");
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
      nettoValueInNum = parseFloat(nettoValue.replace(',', '.'));
      if(!isNaN(nettoValueInNum)&&nettoValueInNum>0) {
        span.classList.remove("incorrect");
        span.textContent = null;
        bruttoField.setAttribute('value', `${((+selectValue+100)/100*nettoValueInNum).toFixed(2)}`);
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

function sendForm(e) {
  e = e || window.event;
  e.preventDefault();
  let form = document.forms[0];
  validateFormInfo()?alert('Validation failed'):sendAllowded();
}

function sendAllowded() {
  let myData = collectData(form);
  $.ajax ({
    type: 'POST',
    url: 'https://fe.it-academy.by/AjaxStringStorage2.php',
    data: myData,
    success: () => {
      let wrapper = document.querySelector('.wrapper');
      let hiddenElement = document.querySelector('.hiddenElement');
      wrapper.classList.add('hidden');
      hiddenElement.classList.remove('hidden');
    },
    error: () => {
      alert('Unable to submit form. Try once again');
    }
  });
}

function collectData(form) {
  let elements = form.elements;
  let array = [];
  for (let elem of elements) {
    if (elem.name) {
      let obj ={};
      obj.name = elem.name;
      obj.value = elem.value;
      array.push(obj);
    }
  }
  return JSON.stringify(array);
}

function validateFormInfo() {
  let error = false;
  try {
    let textarea = document.querySelector(".form__textarea");
    var textareaValue = textarea.value;
    let radio = form.elements.confirmation;
    let radioValue = radio.value;

     
    if (!nettoValue||isNaN(nettoValueInNum)||nettoValueInNum<=0) {
      let span = document.querySelector(".form__netto + .form__span");
      span.textContent = "Please, input number";
      span.classList.add("incorrect");
      nettoField.focus(); 
      error = true;  
    } 
if (!selectValue) {
      let span = document.querySelector(".form__VAT + .form__span");
      span.textContent = "Text is required!";
      span.classList.add("incorrect");
      select.focus();
      error = true;
    }
   
    if (!radioValue) {
      let span = document.querySelector(".form__fieldset + .form__span");
      span.textContent = "Text is required!";
      span.classList.add("incorrect");
      document.querySelector('.second').scrollIntoView();
      error = true;
    }

    if (textareaValue.length < 1) {
      let span = document.querySelector(".form__description .form__span");
      span.classList.add("incorrect");
      span.textContent = "Text is required!";
      textarea.focus();
      error = true;
    }
  } catch (ex) {
    alert("Validation error!");
  }
  return error;
}
