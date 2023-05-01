import React, { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_text_name"
          form="formUserSpecialization"
          type="text"
          name="name"
          id="name-input"
          placeholder="Имя пользователя"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__input-error name-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_text_job"
          form="formUserSpecialization"
          type="text"
          name="about"
          id="specialization-input"
          placeholder="Специализация"
          minLength="2"
          maxLength="200"
          required
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error specialization-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
