let add = (a, b) => parseFloat(a) + parseFloat(b);
let substract = (a, b) => parseFloat(a) - parseFloat(b);
let multiply = (a, b) =>
  parseFloat((parseFloat(a) * parseFloat(b)).toFixed(5));
let divide = (a, b) =>
  parseFloat((parseFloat(a) / parseFloat(b)).toFixed(5));

function operate(operator, a, b) {
  let ans =
    operator == '+'
      ? add(a, b)
      : operator == '-'
      ? substract(a, b)
      : operator == '*'
      ? multiply(a, b)
      : operator == '/'
      ? divide(a, b)
      : 'ERR';
  return ans;
}

const numbers = document.querySelectorAll('.number');

const operators = document.querySelectorAll('.operator');

const equal = document.querySelector('#equal');

const displayDigit = document.querySelector('.displayDigit');

const displayMemo = document.querySelector('.displayMemo');

const clear = document.querySelector('#clear');

const point = document.querySelector('#point');

const del = document.querySelector('#delete');

let memo = ['', ''];
let digit = '';
displayDigit.textContent = '0';

if (isNaN(displayDigit.textContent)) {
  displayDigit.textContent = '';
}

numbers.forEach((button) =>
  button.addEventListener('click', () => {
    // console.log(displayDigit.textContent);

    digit += button.textContent;
    displayDigit.textContent = digit;
  })
);

clear.addEventListener('click', () => {
  memo = ['', ''];
  digit = '';
  displayDigit.textContent = '0';
  displayMemo.textContent = '';
  point.disabled = false;
});

operators.forEach((button) =>
  button.addEventListener('click', () => {
    /* if (digit == '' && memo[1] == '') {
      displayDigit.textContent = '';
    } else  */ if (memo[1] == '') {
      memo[1] = parseFloat(displayDigit.textContent);
    } else {
      memo[1] = operate(memo[0], memo[1], digit);
      displayDigit.textContent = memo[1];
    }
    memo[0] = button.textContent;
    displayMemo.textContent = memo[1] + ' ' + memo[0];
    // console.log(digit, memo[1]);
    digit = '';
    point.disabled = false;
  })
);

equal.addEventListener('click', () => {
  memo[1] = operate(memo[0], memo[1], digit);
  displayDigit.textContent = memo[1];
  point.disabled = false;
  memo[1] = '';
  digit = '';
});

point.addEventListener('click', () => {
  point.disabled = true;
});

del.addEventListener('click', () => {
  digit = digit.slice(0, digit.length - 1);
  displayDigit.textContent = digit;
  if (digit.length == 0) {
    displayDigit.textContent = '0';
  }
});
