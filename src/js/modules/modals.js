const modalTimerId = setTimeout(() => openModal('.popup', modalTimerId), 60000);

function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  if (modal.classList.contains('popup')) {
    modalTimerId;
  }

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function modals(triggerSelector, modalSelector, closeClickOverlay = true) {
  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);
  // Собираем в коллекцию все модальные окна при помощи data-атрибута
  const popups = document.querySelectorAll('[data-modal]');

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      if (evt.target) {
        evt.preventDefault();
      }

      // Закрываем всех родителей всплывающих форм перед открытием новой
      popups.forEach((popup) => {
        popup.style.display = 'none';
      });

      openModal(modalSelector);
    });
  });

  modal.addEventListener('click', (evt) => {
    if (
      (evt.target === modal && closeClickOverlay) ||
      evt.target.textContent === '×'
    ) {
      // Закрываем все модальные окна перед открытием нового
      popups.forEach((popup) => {
        popup.style.display = 'none';
      });

      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape' && modal.style.display === 'block') {
      // Закрываем все модальные окна перед открытием нового
      popups.forEach((popup) => {
        popup.style.display = 'none';
      });
      closeModal(modalSelector);
    }
  });
}

export default modals;
