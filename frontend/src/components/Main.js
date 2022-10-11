import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
        </div>
        <div className="profile__intro">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} className="profile__edit-btn" type="button"></button>
          <p className="profile__user-info">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-btn" type="button"></button>
      </section>
      <section className="places">
        <ul className="places__container">
          {props.cards.map((card, i) => (
            <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} card={card} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;