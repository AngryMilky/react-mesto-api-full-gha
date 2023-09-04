import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [currentUser, props.isOpen]);

  return (

    <PopupWithForm
    name={'edit_avatar'}
    title='Обновить аватар'
    buttonText='Сохранить'
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input"
        id="avatar"
        required
        ref={avatarRef} />
      <span className="popup__error" 
        id="avatar-error">
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;