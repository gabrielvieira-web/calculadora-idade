import { Age } from "./modules/age.js";

const button = document.querySelector('#button');

button.addEventListener('click', (event) => {
  event.preventDefault();
  const inputDay = document.querySelector('#day');
  const inputMonth = document.querySelector('#month');
  const inputYear = document.querySelector('#year');

  const age = new Age(inputDay.value, inputMonth.value, inputYear.value)
  age.validateInputDay()
  age.validateInputMonth()
  age.validateInputYear()
  age.hasDayInMonth()
  age.dateIsNotFuture()
  age.calculateAge()
})
