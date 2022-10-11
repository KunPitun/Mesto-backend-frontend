import { CurrentUserContext } from '../../src/contexts/CurrentUserContext';
import React from 'react';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `place-card__delete-btn ${isOwn ? 'place-card__delete-btn_visible' : ''}`
  );
  const isLiked = props.card.likes.some(userId => userId === currentUser._id);
  const cardLikeButtonClassName = (
    `place-card__like-btn ${isLiked ? 'place-card__like-btn_active' : ''}`
  );

  function handleImageClick() {
    props.onCardClick(props.card);
  }

  function handleCardLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place-card">
      <img onClick={handleImageClick} className="place-card__image" src={props.card.link} alt={props.card.name} />
      <h2 className="place-card__title">{props.card.name}</h2>
      <div className="place-card__like-container">
        <button onClick={handleCardLikeClick} className={cardLikeButtonClassName} type="button"></button>
        <p className="place-card__like-count">{props.card.likes.length}</p>
      </div>
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button"></button>
    </li>
  )
}

export default Card;