import React from 'react';

import Card from './Card';
import iconProfile from '../images/edit-button.svg';
import iconPhoto from '../images/add-button.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile" aria-label="секция-без-заголовка">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
          <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}></button>
        </div>

        <article className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__specialization">{currentUser.about}</p>
          <button className="profile__edit-button link" type="button" onClick={onEditProfile}>
            <img className="profile__edit-button-img" src={iconProfile} alt="Кнопка редактирования профиля" />
          </button>
        </article>
        <button className="profile__add-button link" type="button" onClick={onAddPlace}>
          <img className="profile__add-button-img" src={iconPhoto} alt="Кнопка добавления контента" />
        </button>
      </section>

      <section className="elements" aria-label="секция-без-заголовка">
        <ul className="elements__container list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                name={card.name}
                link={card.link}
                likes={card.likes}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
