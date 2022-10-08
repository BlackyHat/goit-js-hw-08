import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

//персональні налаштування плеєру
player.setVolume(0); // зі старту вимкнений звук відео
player.setColor('#48ef00'); // замінив на зелений колір

// отримуємо поточний час переглянутого відео в секундах та зберігаємо до localStorage
const onTimeUpdate = function ({ seconds }) {
  if (seconds) {
    localStorage.setItem(STORAGE_KEY, seconds);
  }
};

// отримуємо збережий час з localStorage та передаємо до плеєру перед запуском перегляду
const onStartFromPrevTime = function () {
  const currentTime = localStorage.getItem(STORAGE_KEY);
  player.setCurrentTime(currentTime);
};

//додаємо слухача подій плеєра та кожні 1000мс отримуємо поточне значення в секундах переглянутого відео
player.on('timeupdate', throttle(onTimeUpdate, 1000));
//додаємо слухача на старт програвання відео та додаємо значення в секундахб де був зупинений перегляд останнього сеансу
player.on('play', onStartFromPrevTime);
