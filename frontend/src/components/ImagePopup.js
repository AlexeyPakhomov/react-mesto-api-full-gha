import React from "react";
import { iconClosePopup } from "../utils/constants";

function ImagePopup(card) {
  return (
    <div className={`popup popup_type_large-photo ${card.link ? "popup_opened popup_animation" : ""}`}>
      <div className="popup__container-large-photo">
        <button className="popup__close-icon" type="button">
          <img className="popup__close-icon-img link" src={iconClosePopup} alt="Кнопка закрытия окна" onClick={card.onClose} />
        </button>
        <figure className="popup__figure">
          <img className="popup__large-photo" src={card.link} alt={card.name} />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
