import React from "react";
import error_registr from "../images/error_registr.svg";
import ok_registr from "../images/ok_registr.svg";
import { iconClosePopup } from "../utils/constants";

function InfoTooltip({ isOpen, onClose, isRegistrationStatus }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""} `}>
      <div className="popup__container popup__container-infoToolTip">
        <button className="popup__close-icon" type="button" onClick={onClose}>
          <img className="popup__close-icon-img link" src={iconClosePopup} alt="Кнопка закрытия окна" />
        </button>
        <img className="popup__resultImg" src={isRegistrationStatus ? ok_registr : error_registr} alt="Статус регистрации" />
        <h2 className="popup__title-infoToolTip">
          {isRegistrationStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
