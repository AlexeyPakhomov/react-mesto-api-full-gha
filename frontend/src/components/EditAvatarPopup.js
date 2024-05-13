import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const inputAvatarRef = React.useRef();
  const { urlError, setUrlError, handleChange, isValid, setIsValid } = useFormAndValidation({
    avatar: inputAvatarRef,
  });

  useEffect(() => {
    inputAvatarRef.current.value = '';
    setUrlError('');
    setIsValid(false);
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          className={`popup__input popup__input_text_avatar ${
            urlError ? 'popup__input_error' : ''
          }`}
          form="formAvatar"
          type="url"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка на изображение"
          required
          ref={inputAvatarRef}
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

export default EditAvatarPopup;
