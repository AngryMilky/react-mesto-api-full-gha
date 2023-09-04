import React from "react";

function ImagePopup({ card, onClose }) {
  return (

    <div className={`popup popup_content_image ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__button-close button-close-image" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <div className="popup__image">
          <img className="popup__photo" src={card.link} alt={card.name} />
          <h2 className="popup__caption">{card.name}</h2>
        </div>
      </div>
    </div>

  )
}

export default ImagePopup;