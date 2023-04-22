import './slider';
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Объект с данными выбора пользователя из калькулятора
  let modalState = {};

  modals('.popup_engineer_btn', '.popup_engineer');
  modals('.phone_link', '.popup');
  modals('.popup_calc_btn', '.popup_calc');
  modals('.popup_calc_button', '.popup_calc_profile', false);
  modals('.popup_calc_profile_button', '.popup_calc_end', false);
  tabs('.glazing_slider', '.glazing_content', '.glazing_block', 'active');
  tabs(
    '.decoration_slider',
    '.decoration_content > div > div',
    '.no_click',
    'after_click'
  );
  tabs(
    '.balcon_icons',
    '.big_img > img',
    '.balcon_icons_img',
    'do_image_more',
    'inline-block'
  );
  changeModalState(modalState);
  forms('form', modalState);
  timer('#timer', '2023-05-06');
  // images();
});
