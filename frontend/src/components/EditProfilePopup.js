import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      job: description
    });
  }

  return (
    <PopupWithForm
      name={'content_profile'}
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Введите имя"
        className="popup__input"
        id="name"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
        required />
      <span className="popup__error"
        id="name-error">
      </span>
      <input
        type="text"
        name="job"
        placeholder="Введите профессию"
        className="popup__input"
        id="job"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
        required />
      <span className="popup__error"
        id="job-error">
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;