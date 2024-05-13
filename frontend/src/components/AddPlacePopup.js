import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  const { values, nameError, urlError, handleChange, isValid, resetForm } = useFormAndValidation({
    name: '',
    link: '',
  });

  const { name, link } = values;

  useEffect(() => {
    resetForm({
      name: '',
      link: '',
    });
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          className={`popup__input popup__input_text_place ${
            nameError ? 'popup__input_error' : ''
          }`}
          form="formPlace"
          type="text"
          name="name"
          id="place-input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleChange}
        />
        {nameError && <span className="popup__span-error">{nameError}</span>}
      </div>
      <div className="popup__input-container">
        <input
          className={`popup__input popup__input_text_url ${urlError ? 'popup__input_error' : ''}`}
          form="formPlace"
          type="url"
          name="link"
          id="url-input"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChange}
        />
        {urlError && <span className="popup__span-error">{urlError}</span>}
      </div>
      <button
        className={`popup__button link ${!isValid ? 'popup__button_disabled' : ''}`}
        type="submit"
        disabled={!isValid}>
        {buttonText}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
