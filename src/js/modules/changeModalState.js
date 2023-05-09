import getValidateInputs from './getValidateInputs';

const changeModalState = (state) => {
  // Получаем элементы с которыми будем работать
  // Для работы с этими элементами мы созданим одну функцию. Поэтому для всех элементов пропишем document.querySelectorAll, хоть windowWidth, windowHeight и windowType по одному элементу на странице

  // Выбор формы балкона
  const windowForm = document.querySelectorAll('.balcon_icons_img');
  // Вписываем ширину
  const windowWidth = document.querySelectorAll('#width');
  // Вписываем высоту
  const windowHeight = document.querySelectorAll('#height');
  // Выбираем тип (select-список)
  const windowType = document.querySelectorAll('#view_type');
  // Выбираем профиль (холодное или теплое (checkbox))
  const windowProfile = document.querySelectorAll('.checkbox');

  // Валидация инпутов ввода ширины и высоты
  getValidateInputs('#width');
  getValidateInputs('#height');

  // Функцтя для записи в объект выбора пользователя из калькулятора
  // element - элемент калькулятора; event - событие обработчика; prop - название значения для записи в объект
  function bindActionToElems(element, event, prop) {
    element.forEach((item, i) => {
      item.addEventListener(event, () => {
        // Проверяем элемент в калькуляторе на тип (что это за элемент, что за НОДА)(span где написано название (windowForm), так как все изображения находятся в <span></span>; intup type где вводить ширину или высоту (windowWidth и windowHeight); checkbox (windowProfile); select(выпадающий список (windowType))))
        switch (item.nodeName) {
          case 'SPAN':
            // Сюда подходит windowForm
            state[prop] = i;
            break;
          case 'INPUT':
            // Если INPUT это checkbox
            if (item.getAttribute('type') === 'checkbox') {
              // так как у нас два checkbox, сделаем условие.
              // Если чекбокс с i 0 - это первый checkbox (холодное)
              // Если чекбокс с i 1 - это второй checkbox (теплое)
              i === 0 ? (state[prop] = 'Холодное') : (state[prop] = 'Тёплое');
              // По ТЗ можно выбрать только 1 чекбокс
              // Перебираем чекбоксы
              element.forEach((checkbox, j) => {
                // Убираем check у всех checkbox кроме выбранного
                checkbox.checked = false;
                if (i == j) {
                  // i и j должны совпадать
                  checkbox.checked = true;
                }
              });
            } else {
              // Сюда подходят windowWidth и windowHeight
              state[prop] = item.value;
            }
            break;
          case 'SELECT':
            state[prop] = item.value;
            break;
        }
        console.log(state);
      });
    });
  }

  // Выбранные пользователем характеристики вписываем в объект
  // Выбираем форму балкона
  bindActionToElems(windowForm, 'click', 'form');
  // Ширина окон
  bindActionToElems(windowWidth, 'input', 'width');
  // Высота окон
  bindActionToElems(windowHeight, 'input', 'height');
  // Тип. Если элемент <select></select> - его событие change
  bindActionToElems(windowType, 'change', 'type');
  // Холодное или теплое. Если элемент checkbox - его событие change
  bindActionToElems(windowProfile, 'change', 'profile');
};

export default changeModalState;
