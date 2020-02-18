const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const formView = document.querySelector('.container');


// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
} 

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Endereço de e-mail inválido!');
      valid = 0;
    }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if(input.value.trim() === '') {
      showError(input, `É obrigatório!`);
      formView.classList.add('validate-error');
      valid = 0;
    } else {
      showSuccess(input);
      valid = 1;
    }
    const formError = document.querySelector('.validate-error');
    if (formError) {
      formError.addEventListener('animationend', function(e) {
        if(event.animationName === 'wrong') {
          formError.classList.remove('validate-error');
        }
      })
    }
  });
}

// Ckeck input length
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `Deve conter no mínimo ${min} caracteres`);
    valid = 0;
  } else if(input.value.length > max) {
    showError(input, `Não pode ter mais que ${max} caracteres`);
    valid = 0;
  } else {
    showSuccess(input);
    valid = 1;
  }

}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Senhas devem ser iguais!' );
    valid = 0;
  }
}

// Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
  
  if (valid !== 0) {
    formView.classList.remove('validate-error');
    formView.classList.add('form-hide');
    console.log(valid);
  } else {
    console.log(valid);
  }
});