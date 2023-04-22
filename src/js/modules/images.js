function images() {
  // Создаем обертку для фотографии (как у всплывающих форм)
  const imgPopup = document.createElement('div');
  // Находим контейнер с фотографиями
  const workSection = document.querySelector('.works');
  // Большое изображение
  const bigImage = document.createElement('img');

  // Добавим обертке для фото класс, как и у оберток форм
  imgPopup.classList.add('popup');
  workSection.append(imgPopup);

  // Выравниваем по центру экрана
  imgPopup.style.justifyContent = 'center';
  // Выравниваем по вертикали
  imgPopup.style.alignItems = 'center';
  // Скрываем элемент на странице
  imgPopup.style.display = 'none';

  imgPopup.append(bigImage);

  // Вешаем обработчик событий на контейнер с фото
  workSection.addEventListener('click', (evt) => {
    evt.preventDefault();

    let target = evt.target;

    // Если мы кликнули по элементу, который является фото (класс preview), то работаем с конкретной фотографией
    if (target && target.classList.contains('preview')) {
      // flex - Для выравнивания по центру
      imgPopup.style.display = 'flex';
      // Изображение, на которое мы кликаем - находится в ссылке, которая ведет на такое же большое изображение
      // Получаем ссылку (путь) через клик на маленькое изображение к большому изображению ( маленькое кликнутое изображение вложено в ссылку, которая ведет на большое такое же изображение)
      let path = target.parentNode.getAttribute('href');
      // Берем изображение, которое есть внутри модального окна
      bigImage.setAttribute('src', path);
      bigImage.style.borderBox;
    }

    // Если кликаем на попап - закрываем его (в нем находится фото)
    if (target && target.matches('div.popup')) {
      imgPopup.style.display = 'none';
    }
  });
}

export default images;
