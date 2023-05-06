import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Api } from '../utils/Api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './Header';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isRegistrationStatus, setIsRegistrationStatus] = useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState('');
  const [menuBurgerActive, setMenuBurgerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const api = new Api({
    url: 'https://api.mesto-58.nomoredomains.monster',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      return;
    }
    loggedIn &&
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards.reverse());
        //console.log('Получаем данные юзера', user);
        //console.log('Получаем данные cards', user);
      })
      .catch((err) => console.log(`Ошибка получения данных Cards & User: ${err}`));
  }, [loggedIn]);

  function handleTokenCheck() {
    if (!localStorage.getItem('jwt')) {
      return;
    }
    const jwt = localStorage.getItem('jwt');
    auth
      .validityToken(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setAuthorizationEmail(res.email);
        navigate('/', { replace: true });
        //console.log('handleTokenCheck, токен проверен', res);
      })
      .catch((err) => console.log(`Ошибка валидации токена: ${err}`));
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleRegister(data) {
    auth
      .register({ email: data.email, password: data.password })
      .then((data) => {
        setIsRegistrationStatus(true);
        handleInfoTooltip();
        navigate('/signin', { replace: true });
        console.log('Пользователь зарегистрирован', data);
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`);
        setIsRegistrationStatus(false);
        handleInfoTooltip();
      });
  }

  function handleAuthorization(data) {
    auth
      .authorization({ email: data.email, password: data.password })
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        handleTokenCheck();
        navigate('/', { replace: true });
        //console.log('handleAuthorization, токен', data);
      })
      .catch((err) => {
        console.log(`Ошибка авторизации: ${err}`);
        setIsRegistrationStatus(false);
        handleInfoTooltip();
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    setAuthorizationEmail('');
    localStorage.removeItem('jwt');
    setMenuBurgerActive(false);
    setCurrentUser({});
    setCards([]);
    navigate('/signin', { replace: true });
    //console.log('Пользователь вышел', currentUser);
  }

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
    const isLiked = card.likes.some((i) => {
      //console.log('Это i в isLiked', i, i === currentUser._id);
      return i === currentUser._id;
    });
    //console.log('Текущий пользователь во время лайка', currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
          //console.log('Удален лайк', newCard);
        })
        .catch((err) => console.log(`Ошибка удаления лайка: ${err}`));
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
          //console.log('Добавлен лайк', newCard);
        })
        .catch((err) => console.log(`Ошибка добавления лайка: ${err}`));
    }
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        //console.log('Карточка добавлена', newCard);
      })
      .catch((err) => console.log(`Ошибка добавления новых карточек: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        //console.log('Карточка удалена', card);
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
        //console.log('Обновлены данные юзера', data);
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
        //console.log('Обновлена ава юзера', data);
      })
      .catch((err) => console.log(`Ошибка редактирования аватара: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleOverlayClose(evt) {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon-img')) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('mousedown', handleOverlayClose);
  }, []);

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
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleAuthorization} />}
          />
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
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate
                  to="/"
                  replace
                />
              ) : (
                <Navigate
                  to="/signin"
                  replace
                />
              )
            }
          />
        </Routes>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={isLoading ? 'Сохрание...' : 'Сохранить'}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={isLoading ? 'Сохрание...' : 'Сохранить'}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={isLoading ? 'Создание...' : 'Cоздать'}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard}
          onClose={closeAllPopups}
          link={selectedCard.link}
          name={selectedCard.name}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isRegistrationStatus={isRegistrationStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
