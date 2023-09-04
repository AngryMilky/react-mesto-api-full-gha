import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleCardName = (evt) => {
    setName(evt.target.value);
  };

  const handleCardLink = (evt) => {
    setLink(evt.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    })
  };

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name={'content_element'}
      title='Новое место'
      buttonText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Название"
        className="popup__input"
        id="place"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleCardName}
        required />
      <span className="popup__error"
        id="place-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input"
        id="link"
        value={link}
        onChange={handleCardLink}
        required />
      <span className="popup__error"
        id="link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;