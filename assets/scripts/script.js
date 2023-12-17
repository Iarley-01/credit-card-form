const cardNumberInput = document.querySelector(".card-number-input");
const cardNumberBox = document.querySelector(".card-number-box");
const cardHolderInput = document.querySelector(".card-holder-input");
const cardHolderBox = document.querySelector(".card-holder-name");
const cardExpirationMonth = document.querySelector(".month-input");
const monthBox = document.querySelector(".exp-month");
const cardYearInput = document.querySelector(".year-input");
const yearBox = document.querySelector(".exp-year");
const cardCvvInput = document.querySelector(".cvv-input");
const cvvBox = document.querySelector(".cvv-box");
const cardFront = document.querySelector(".front");
const cardBack = document.querySelector(".back");
const cardContainer = document.querySelector(".card-container");

function formatCardNumber() {
  const cardNumberValue = cardNumberInput.value.replace(/\D/g, '');
  const formatedCardNumber = cardNumberValue.replace(/(\d{4})/g, '$1 ').trim();
  cardNumberInput.value = formatedCardNumber;
  cardNumberBox.innerText = cardNumberInput.value;
}

cardNumberInput.addEventListener("input", function() {
    cardNumberBox.innerText = cardNumberInput.value;
    cardNumberInput.addEventListener("input", formatCardNumber);
});

cardNumberInput.addEventListener("input", function () {
  const cleanValue = this.value.replace(/\D/g, '');
  
  if (cleanValue.length > 0) {
    this.value = cleanValue.substring(0, 19);
    formatCardNumber();
  } else {
    this.value = '';
  }
})

cardHolderInput.addEventListener("input", function() {
  const cardHolderValue = this.value;
  cardHolderBox.innerText = cardHolderValue || 'Full Name';
})

function formatCardName() {
  const cardHolderValue = cardHolderInput.value;
  const formatedCardName = cardHolderValue.replace(/[^a-zA-Z\s]/g, '');
  cardHolderInput.value = formatedCardName.replace(/\s+/g, ' ');
}

cardHolderInput.addEventListener("input", formatCardName);

cardCvvInput.addEventListener("input", function() {
  const cleanValue = this.value.replace(/\D/g, '');
  this.value = cleanValue.substring(0, 3);
  
  cvvBox.innerText = this.value;
})

cardCvvInput.addEventListener('focus', function() {
  cardContainer.classList.add('flipped');
});

cardCvvInput.addEventListener('blur', function() {
  cardContainer.classList.remove('flipped');
});

const currentMonth = new Date().getMonth();
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i < 10 ? "0" + i : i.toString();
    option.text = i < 10 ? "0" + i : i.toString();
    cardExpirationMonth.add(option);
  }


  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i <= currentYear + 10; i++) {
  const option = document.createElement("option");
  option.value = i.toString();
  option.text = i.toString();
  
  cardYearInput.add(option);
  }


cardExpirationMonth.addEventListener("change", function(){
  monthBox.innerText = cardExpirationMonth.value;
})

cardYearInput.addEventListener("change", function(){
  yearBox.innerText = cardYearInput.value;
})

cardYearInput.addEventListener("change", updateMonthOptions);

updateMonthOptions();

function updateMonthOptions() {
  const selectedYear = parseInt(cardYearInput.value, 10);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  for (let i = 1; i <= 12; i++) {
    const option = cardExpirationMonth.options[i];
    
    if (selectedYear === currentYear && i >= currentMonth) {
      option.disabled = true;
    } else {
      option.disabled = selectedYear === currentYear && i < currentMonth;
    }
  }
}

/*cardNumberInput = document.querySelector('.card-number-input').oninput = () => {
  document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

cardHolderInput = document.querySelector('.card-holder-input').oninput = () => {
  document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

cardMonthInput = document.querySelector('.month-input').oninput = () => {
  document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

cardYearInput = document.querySelector('.year-input').oninput = () => {
  document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

cardCvvInput = document.querySelector('.cvv-input').onmouseenter = () => {
  document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
  document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

cardCvvInput = document.querySelector('.cvv-input').onmouseleave = () => {
  document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
  document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

cardCvvInput = document.querySelector('.cvv-input').onmouseenter = () => {
  document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}*/