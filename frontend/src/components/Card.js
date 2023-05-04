import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeBtnClassName = `elements__heart link ${isLiked ? 'elements__heart_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li>
      <article className="elements__card">
        <div className="elements__block-pic">
          <img
            className="elements__pic"
            src={props.link}
            alt={props.name}
            onClick={handleClick}
          />
        </div>
        {isOwn && (
          <button
            className="elements__recycle-bin link"
            onClick={handleDeleteClick}
          />
        )}
        {/* <button className="elements__recycle-bin link" type="button"></button> */}

        <div className="elements__caption">
          <h2 className="elements__title">{props.name}</h2>
          <div className="elements__like-container">
            <button
              className={cardLikeBtnClassName}
              type="button"
              onClick={handleLikeClick}></button>
            <p className="elements__like-number">{props.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
