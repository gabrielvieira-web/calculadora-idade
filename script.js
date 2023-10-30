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
  hasDayInMonth();
}

function validateInputDay() {
  if(inputDay.value === '' || inputDay.value.length > 2 || inputDay.value <= 0) {
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

function hasDayInMonth() {
  // Verifica se o dia passado no input, existe no mês. ex: 31/04/2023 (DATA INVÁLIDA) pois não existe dia 31 no mês de Abril
  const dateForm = new Date(`${inputYear.value}, ${inputMonth.value}, ${inputDay.value}`);
  // Os números dos meses retornados pela função getMonth() vão de 0 á 11. sendo 0 JANEIRO e 11 
  const numberNextMonth = dateForm.getMonth();
  if(numberNextMonth == inputMonth.value) {
    errorMessage(0);
  }
}

function errorMessage(position) {
  messageError[position].textContent = "Este campo é obrigátorio";
}