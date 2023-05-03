import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";

import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationStatus, setIsRegistrationStatus] = useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState("");
  const [menuBurgerActive, setMenuBurgerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .getAllCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log(`Ошибка получения данных Cards: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
      })
      .catch((err) => console.log(`Ошибка получения данных UserInfo: ${err}`));
  }, []);

  function handleToggleMenu() {
    setMenuBurgerActive(!menuBurgerActive);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api
        .deleteLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => console.log(`Ошибка удаления лайка: ${err}`));
    } else {
      api
        .addLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => console.log(`Ошибка добавления лайка: ${err}`));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data)
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка редактирования попап профиля: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка редактирования аватара: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка добавления новых карточек: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleRegister(data) {
    auth
      .register({ email: data.email, password: data.password })
      .then((data) => {
        setIsRegistrationStatus(true);
        handleInfoTooltip();
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`);
        setIsRegistrationStatus(false);
        handleInfoTooltip();
      });
  }

  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .validityToken(jwt)
        .then((res) => {
          setAuthorizationEmail(res.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }

  function handleAuthorization(data) {
    auth
      .authorization({ email: data.email, password: data.password })
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        handleTokenCheck();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка авторизации: ${err}`);
        setIsRegistrationStatus(false);
        handleInfoTooltip();
      });
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function handleOverlayClose(evt) {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains("popup") || targetClassList.contains("popup__close-icon-img")) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("mousedown", handleOverlayClose);
  }, []);

  function handleSignOut() {
    setLoggedIn(false);
    setAuthorizationEmail("");
    localStorage.removeItem("jwt");
    setMenuBurgerActive(false);
    navigate("/signin", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          currentUserEmail={authorizationEmail}
          onSignOut={handleSignOut}
          menuBurgerActive={menuBurgerActive}
          handleToggleMenu={handleToggleMenu}
        />
        <Routes>
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login onLogin={handleAuthorization} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
        </Routes>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={isLoading ? "Сохрание..." : "Сохранить"}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={isLoading ? "Сохрание..." : "Сохранить"}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={isLoading ? "Создание..." : "Cоздать"}
        />
        <ImagePopup card={selectedCard} isOpen={selectedCard} onClose={closeAllPopups} link={selectedCard.link} name={selectedCard.name} />
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isRegistrationStatus={isRegistrationStatus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
