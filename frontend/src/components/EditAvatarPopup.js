import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const inputAvatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }

  useEffect(() => {
    inputAvatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_text_avatar"
          form="formAvatar"
          type="url"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка на изображение"
          required
          ref={inputAvatarRef}
        />
        <span className="popup__input-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
