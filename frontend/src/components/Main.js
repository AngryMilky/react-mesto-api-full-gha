import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img className="profile__avatar" alt="Аватар профиля" src={currentUser.avatar} />
        <button type="button" className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
        <div className="profile__info">
          <div className="profile__name-and-button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" aria-label="Изменить" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;