const inputDay = document.querySelector('#day');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');
const button = document.querySelector('#button');
const paragraph = document.querySelectorAll('.text');
const containerError = document.querySelector('#container-error');
let messageError = document.querySelectorAll('#messageError');
let spanYears = document.querySelector('#years');
let spanMonths = document.querySelector('#months');
let spanDays = document.querySelector('#days');

button.addEventListener('click', (event) => {
  event.preventDefault();
  const formValid = validateDataForm();
  if(formValid) {
    const age = calculateAge();
    displayAge(age);
  } 
})

function validateDataForm() {
  const dayValid = validateInputDay();
  const monthValid = validateInputMonth();
  const yearValid = validateInputYear();
  const dayInMonthValid = hasDayInMonth();
  const dateIsNotFutureValid = dateIsNotFuture();

  if(dayValid && monthValid && yearValid && dayInMonthValid && dateIsNotFutureValid) {
    return true;
  }
  return false;
}

function calculateAge() {
  const currentDate = new Date();
  const yearCurrent = currentDate.getFullYear();
  const monthCurrent = currentDate.getMonth() + 1;
  const dayCurrent = currentDate.getDate();

  let years;
  let months;
  let days;

  if(inputDay.value > dayCurrent || inputMonth.value > monthCurrent) {
    years = (yearCurrent - Number(inputYear.value)) - 1;
    months = 12 - (Number(inputMonth.value) - monthCurrent);
    const dayCalculated = inputDay.value > dayCurrent ? dayCurrent - 1 : dayCurrent - inputDay.value;
    days = dayCalculated;
  } else {
    years = yearCurrent - Number(inputYear.value);
    months = monthCurrent - Number(inputMonth.value);
    days = dayCurrent - Number(inputDay.value);
  }

  return {
    years,
    months,
    days
  }
}

function displayAge(age) {
  spanYears.textContent = age.years;
  spanMonths.textContent = age.months;
  spanDays.textContent = age.days;
}

function validateInputDay() {
  if(inputDay.value === '' || inputDay.value.length > 2 || inputDay.value <= 0) {
    errorMessage(0);
    return false;
  } else{
    messageError[0].textContent = "";
    return true;
  }
}

function validateInputMonth() {
  if(inputMonth.value === '' || inputMonth.value.length > 2 || inputMonth.value <= 0 || inputMonth.value > 12) {
    errorMessage(1);
    return false;
  } else{
    messageError[1].textContent = "";
    return true;
  }
}

function validateInputYear() {
  const currentYear = new Date().getFullYear();
  if(inputYear.value === '' || inputYear.value.length !== 4 || inputYear.value <= 0 || inputYear.value > currentYear) {
    errorMessage(2);
    return false;
  } else{
    messageError[2].textContent = "";
    return true;
  }
}

function hasDayInMonth() {
  // Verifica se o dia passado no input, existe no mês. ex: 31/04/2023 (DATA INVÁLIDA) pois não existe dia 31 no mês de Abril
  const lastDayMonth = new Date(inputYear.value, inputMonth.value, 0);

  if(inputDay.value > lastDayMonth.getDate()) {
    errorMessage(0);
    return false;
  }
  return true;
}

function dateIsNotFuture() {
  const currentDate = new Date();
  const dayCurrent = currentDate.getDate();
  const monthCurrent = currentDate.getMonth() + 1;
  const yearCurrent = currentDate.getFullYear();

  if(inputDay.value > dayCurrent && inputMonth.value >= monthCurrent && Number(inputYear.value) === yearCurrent) {
    errorMessageDateFutere();
    return false;
  } else if(inputDay.value <= dayCurrent && inputMonth.value > monthCurrent && Number(inputYear.value) === yearCurrent) {
    errorMessageDateFutere();
    return false;
  }

  if(containerError.firstChild) {
    containerError.firstChild.remove();
    paragraph.forEach(item => {
      if(item.style.display == 'none') {
        item.style.display = 'block';
      }
    })
  }
  return true;
}

function errorMessage(position) {
  messageError[position].textContent = "Este campo é obrigátorio";
  spanYears.textContent = '- -';
  spanMonths.textContent = '- -';
  spanDays.textContent = '- -';
}

function errorMessageDateFutere() {
  const paragraphError = document.createElement('p');
  paragraphError.innerText = 'Desculpe, mais a data que você passou é invalida. Ela está no fulturo';
  paragraphError.style.cssText = `
    color:  hsl(0, 100%, 67%);
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 800;
  `

  if(containerError.firstChild == null) {
    paragraph.forEach(item => item.style.display = 'none');
    containerError.appendChild(paragraphError);
  }
}
