const inputDay = document.querySelector('#day');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');
let messageError = document.querySelectorAll('#messageError');
const button = document.querySelector('#button');

button.addEventListener('click', (event) => {
  event.preventDefault();
  validateDataForm();
})

function validateDataForm() {
  validateInputDay();
  validateInputMonth();
  validateInputYear();
}

function validateInputDay() {
  if(inputDay.value === '' || inputDay.value.length > 2 || inputDay.value <= 0 || inputDay.value > 31) {
    errorMessage(0);
  } else{
    messageError[0].textContent = "";
  }
}

function validateInputMonth() {
  if(inputMonth.value === '' || inputMonth.value.length > 2 || inputMonth.value <= 0 || inputMonth.value > 12) {
    errorMessage(1);
  } else{
    messageError[1].textContent = "";
  }
}

function validateInputYear() {
  const currentYear = new Date().getFullYear();
  if(inputYear.value === '' || inputYear.value.length !== 4 || inputYear.value <= 0 || inputYear.value > currentYear) {
    errorMessage(2);
  } else{
    messageError[2].textContent = "";
  }
}

function errorMessage(position) {
  messageError[position].textContent = "Este campo é obrigátorio";
}