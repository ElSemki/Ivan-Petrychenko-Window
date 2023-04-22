// Валидация инпутов номеров телефона
function getValidateInputs(inputSelector) {
  const phoneInputs = document.querySelectorAll(inputSelector);
  phoneInputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/, '');
    });
  });
}

export default getValidateInputs;
