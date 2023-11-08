let messageError = document.querySelectorAll('#messageError');
let spanYears = document.querySelector('#years');
let spanMonths = document.querySelector('#months');
let spanDays = document.querySelector('#days');

export class Age {
  inputDay
  inputMonth
  inputYear 
  currentDate
  dayCurrent
  monthCurrent
  yearCurrent
  paragraph = document.querySelectorAll('.text');
  containerError = document.querySelector('#container-error');
  
  constructor(inputDay, inputMonth, inputYear) {
    this.inputDay = inputDay
    this.inputMonth = inputMonth
    this.inputYear = inputYear
    this.currentDate = new Date();
    this.dayCurrent = this.currentDate.getDate()
    this.monthCurrent = this.currentDate.getMonth() + 1
    this.yearCurrent = this.currentDate.getFullYear()
  }

  calculateAge() {
    let years;
    let months;
    let days;

    if(this.inputDay > this.dayCurrent 
      || this.inputMonth > this.monthCurrent 
      && Number(this.inputYear) === this.yearCurrent) 
    {
      years = this.inputMonth > this.monthCurrent ? (this.yearCurrent - Number(this.inputYear)) - 1 : this.yearCurrent - Number(this.inputYear);
      months = this.inputMonth > this.monthCurrent ? 12 - (Number(this.inputMonth) - this.monthCurrent) : 12 - (this.monthCurrent - Number(this.inputMonth));
      days = this.inputDay - this.dayCurrent
      // days = this.inputDay > this.dayCurrent ? this.dayCurrent - 1 : this.dayCurrent - this.inputDay;
    } else {
      years = this.yearCurrent - Number(this.inputYear);
      months = this.monthCurrent - Number(this.inputMonth);
      days = this.dayCurrent - Number(this.inputDay);
    }

    this.displayAge(years, months, days)
  }

  displayAge(years, months, days) {
    spanYears.textContent = years;
    spanMonths.textContent = months;
    spanDays.textContent = days;
  }

  validateInputDay() {
    if(this.inputDay === '' || this.inputDay.length > 2 || this.inputDay <= 0) {
      this.errorMessage(0)
      // return false;
    } else{
      messageError[0].textContent = "";
      // return true;
    }
  }

  validateInputMonth() {
    if(this.inputMonth === '' || this.inputMonth.length > 2 || this.inputMonth <= 0 || this.inputMonth > 12) {
      this.errorMessage(1);
      // return false;
    } else{
      messageError[1].textContent = "";
      // return true;
    }
  }

  validateInputYear() {
    if(this.inputYear === '' || this.inputYear.length !== 4 || this.inputYear <= 0 || this.inputYear > this.yearCurrent) {
      this.errorMessage(2);
      // return false;
    } else{
      messageError[2].textContent = "";
      // return true;
    }
  }

  hasDayInMonth() {
    // Verifica se o dia passado no input, existe no mês. ex: 31/04/2023 (DATA INVÁLIDA) pois não existe dia 31 no mês de Abril
    const lastDayMonth = new Date(this.inputYear, this.inputMonth, 0);

    if(this.inputDay > lastDayMonth.getDate()) {
      this.errorMessage(0);
      // return false;
    }
    // return true;
  }

  dateIsNotFuture() {
    if(this.inputDay > this.dayCurrent && this.inputMonth >= this.monthCurrent && Number(this.inputYear) === this.yearCurrent) {
      this.errorMessageDateFutere();
      return false;
    } else if(this.inputDay <= this.dayCurrent && this.inputMonth > this.monthCurrent && Number(this.inputYear) === this.yearCurrent) {
      this.errorMessageDateFutere();
      return false;
    }

    if(this.containerError.firstChild) {
      this.containerError.firstChild.remove();
      this.paragraph.forEach(item => {
        if(item.style.display == 'none') {
          item.style.display = 'block';
        }
      })
    }
    return true;
  }

  errorMessage(position) {
    messageError[position].textContent = "Este campo é obrigátorio";
    spanYears.textContent = '- -';
    spanMonths.textContent = '- -';
    spanDays.textContent = '- -';
  }

  errorMessageDateFutere() {
    const paragraphError = document.createElement('p');
    paragraphError.innerText = 'Desculpe, mais a data que você passou é invalida. Ela está no fulturo';
    paragraphError.style.cssText = `
      color:  hsl(0, 100%, 67%);
      font-size: 1.5rem;
      font-style: italic;
      font-weight: 800;
    `

    if(this.containerError.firstChild === null) {
      this.paragraph.forEach(item => item.style.display = 'none');
      this.containerError.appendChild(paragraphError);
    }
  }
}

/*
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

function displayAge(age) {
  spanYears.textContent = age.years;
  spanMonths.textContent = age.months;
  spanDays.textContent = age.days;
}
*/