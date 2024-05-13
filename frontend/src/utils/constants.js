import iconClosePopup from '../images/close-icon.svg';

export const PATTERN_EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/i;
export const PATTERN_URL =
  /https?:\/\/(www\.)?[0-9a-zA-Z-]{1,100}\.[0-9a-zA-Z]{1,6}(\/[0-9a-zA-Z/\S]*)*/;
export const INVALID_EMAIL_ERR = 'Указан неверный email';
export const INVALID_PASSWORD_ERR = 'Минимальная длина пароля - 8 символов';
export const INVALID_INPUT_LENGTH = 'Длина содержимого должна быть от 2 до 30 символов';
export const INVALID_URL = 'Некорректная ссылка';

export { iconClosePopup };
