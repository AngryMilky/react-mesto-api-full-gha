import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`element__button-delete ${isOwn ? '' : 'element__delete-button_hidden'}`);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${isLiked ? 'element__button-like_active' : ''}`;

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card)
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <article className="element">
      <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick} />
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Корзина"></button>
      <div className="element__caption">
        <h2 className="element__captiontext">{card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Лайк"></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;