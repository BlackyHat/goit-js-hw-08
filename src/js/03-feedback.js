import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

//беремо посилання на форму
const refs = {
  form: document.querySelector('.feedback-form'),
};

//формуємо пустий обєкт даних для подальшого наповнення з форми
const formData = {};

//додаємо слухача на введення та затримку на фіксацію змін в 500мс
refs.form.addEventListener('input', throttle(onLocalStorageSave, 500));

//додаємо слухача на натиснення кнопки submit
refs.form.addEventListener('submit', onFormSubmit);

//перевіряємо чи є дані від попереднього введення у форму та якщо є - прописуємо збережені дані у форму
// getStorageKey();

//функція формує обєкт із введених даних у формі згідно назви елементів форми та перетворює в строку і зберігає в localStorage
function onLocalStorageSave(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//функція при натисненні на кнопку submit: відключаємо подію перезавантаження сторінки, очищуємо поля поточної форми, формуємо обєкт із даних в localStorage, очщаємо localStorage по ключу STORAGE_KEY та виводимо обєкт в консоль
function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();

  let userData = '';
  try {
    userData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    console.log(error.name);
    console.log(error.message);
  }

  localStorage.removeItem(STORAGE_KEY);
  return console.log(userData);
}

//перевіряємо чи є дані від попереднього введення у форму та якщо є - прописуємо збережені дані у форму, виклик функції в місці оголошення
// getStorageKey();
(function getStorageKey(e) {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    let userData = {};

    try {
      userData = JSON.parse(savedData);
    } catch {
      console.log(error.name);
      console.log(error.message);
    }

    refs.form.message.value = userData.message;
    refs.form.email.value = userData.email;
  }
})();
