import { postData } from './services/services';
import getValidateInputs from './getValidateInputs';

function forms(formSelector, state) {
  const forms = document.querySelectorAll(formSelector);

  getValidateInputs('input[name="user_phone"]');

  const message = {
    loading: 'Идет загрузка...',
    success: 'Спасибо, мы скоро свяжемся с вами',
    fail: 'Что-то пошло не так!',
    notAllData: 'Вы ввели не все данные! Попробуйте еще раз!',
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);

      // В случае с последней формой с калькулятора, мы должны отправить все данные с калькулятора (который вне формы, он не относится к форме) на сервер (эти данные, которые вне формы, находятся в объекте modalState), но в последней форме с калькулятора есть еще Имя и Телефон. Но это условие только в одной, последней форме! Проверим, если это та форма, у которой должен быть объект с данными
      if (form.getAttribute('data-calc') === 'end') {
        // Если это форма с объектом, ты мы объект разбираем на key и value
        for (let key in state) {
          formData.append(key, state[key]);
        }
        // Проверяем, что если у нас в объект не записаны все данные (а их у нас 5 пунктов) - то мы: не отправляем данные на сервер, выводим ошибку, очищаем объект с данными и закрываем модальное окно с формой
        if (Object.keys(state).length < 5) {
          statusMessage.textContent = message.notAllData;
          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
          closeFormParent('[data-modal]');
          clearDataObj(state);
          form.reset();
          return;
        }
      }

      postData('assets/server.php', formData)
        .then((data) => {
          console.log(data);
          statusMessage.textContent = message.success;
        })
        .catch(() => {
          statusMessage.textContent = message.fail;
        })
        .finally(() => {
          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
          closeFormParent('[data-modal]');
          if (form.getAttribute('data-calc') === 'end') {
            // Если мы отправили данные с последней всплывающей формы - объект с данными очищается (что бы если пользователь опять начнет взаимодействие с калькулятором, все данные выбора были очищены)
            clearDataObj(state);
          }
          form.reset();
        });
    });
  }

  // Закрытие всплывающего окна после отправки формы
  // Так-как у нас на странице есть статичные формы и всплывающие формы, необходимо после отправки данных на сервер закрывать ВСПЛЫВАЮЩИЕ ФОРМЫ
  function closeFormParent(parentFormSelector) {
    // Находим всех родителей (div), которые хранят всплывающие формы
    const modals = document.querySelectorAll(parentFormSelector);
    // Перебираем их
    modals.forEach((modal) => {
      const modalStyles = window.getComputedStyle(modal);
      // Проверяем каждый родитель всплывающих форм на css классы
      // Если какой-то родитель всплывающей формы имеет класс display: block - значит эта форма всплыла и открыта
      if (modalStyles.display === 'block') {
        // Закрываем данного родителя с всплывающей формой через 2 сек.
        setTimeout(() => {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }, 3000);
      }
    });
  }

  // Функция для очистки объекта с данными
  function clearDataObj(obj) {
    Object.keys(obj).forEach((k) => delete obj[k]);
  }
}

export default forms;
