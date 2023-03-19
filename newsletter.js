
//VARIABLES: newsletter formulario, input email y mensaje de error si el mail no es correcto
const form = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const errorMessage = document.getElementById('error-message');
//EVENTO: Llamada al evento cuando le doy a Subscribe
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();//trim para eliminar los espacios en blanco
//Si no es válido, devuelve mensaje de mail erróneo
  if (!isEmailValid(email)) {
    errorMessage.textContent = 'Please enter a valid email address';
    return;
  }
//Para analizar el texto del mail en formato JSON
  const emails = JSON.parse(localStorage.getItem('emails')) || [];
  //Si ya está suscrito el usuario, le devuelve mensaje de "ya estás suscrito" 
  if (emails.includes(email)) {
    errorMessage.textContent = 'You are already subscribed to our newsletter';
    return;
  }
//para subir a localStorage los mails introducidos y devolver mensaje de agradecimiento
  emails.push(email);
  localStorage.setItem('emails', JSON.stringify(emails));
  emailInput.value = '';
  errorMessage.textContent = '¡Thank you, you are now a HAPPY JUICER!'; 
});
//EXPRESION REGULAR: para validar el mail (que no esté en blanco, que contenga @)
function isEmailValid(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
