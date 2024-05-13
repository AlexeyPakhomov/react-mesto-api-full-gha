import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const { values, nameError, aboutError, handleChange, isValid, resetForm } = useFormAndValidation({
    name: currentUser.name,
    about: currentUser.about,
  });

  const { name, about } = values;

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          className={`popup__input popup__input_text_name ${nameError ? 'popup__input_error' : ''}`}
          form="formUserSpecialization"
          type="text"
          name="name"
          id="name-input"
          placeholder="Имя пользователя"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={handleChange}
        />
        {nameError && <span className="popup__span-error">{nameError}</span>}
      </div>
      <div className="popup__input-container">
        <input
          className={`popup__input popup__input_text_job ${aboutError ? 'popup__input_error' : ''}`}
          form="formUserSpecialization"
          type="text"
          name="about"
          id="specialization-input"
          placeholder="Специализация"
          minLength="2"
          maxLength="200"
          required
          value={about || ''}
          onChange={handleChange}
        />
        {aboutError && <span className="popup__span-error">{aboutError}</span>}
      </div>
      <button
        className={`popup__button link ${
          !isValid || (currentUser.name === name && currentUser.about === about)
            ? 'popup__button_disabled'
            : ''
        }`}
        type="submit"
        disabled={!isValid || (currentUser.name === name && currentUser.about === about)}>
        {buttonText}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
