import React from 'react';

function InfoTooltip({ isOpen, image, onClose, message }) {

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}>
        </button>
        <img className="popup__info-image"
          alt="Картинка"
          src={image} />
        <p className="popup__info-text">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;