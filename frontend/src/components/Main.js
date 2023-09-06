import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img className="profile__avatar" alt="Аватар профиля" src={currentUser.avatar} />
        <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar}></button>
        <div className="profile__info">
          <div className="profile__name-and-button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" aria-label="Изменить" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;