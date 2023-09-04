import React from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import imageFail from '../styles/images/popup-img-fail.svg';
import imageSuccess from '../styles/images/popup-img-success.svg';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = React.useState(imageSuccess);
  const [infoTooltipMessage, setinfoTooltipMessage] = React.useState('');

  const navigate = useNavigate();

  function handleTokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res.data) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);


  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
    }  
  }, [loggedIn])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        //создаём копию массива, исключив из него удалённую карточку
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((res) => {
        //обновление стейта из полученных данных
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then(res => {
        //обновление стейта из полученных данных
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        //обновление стейта с помощью расширенной копии текущего массива
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
  }

  function handleRegister(registerData) {
    auth.register(registerData)
      .then(() => {
        setInfoTooltipImage(imageSuccess);
        setinfoTooltipMessage('Вы успешно зарегистрировались!');
        setInfoTooltipOpen(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        //Попап ошибки регистрации
        setInfoTooltipImage(imageFail);
        setinfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      });
  }

  function handleLogin(loginData) {
    auth.authorize(loginData)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          setUserEmail(loginData.email);
          navigate('/');
        }
      })
      .catch((err) => {
        //Попап ошибки входа
        setInfoTooltipImage(imageFail);
        setinfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      })
  }

  //Выход из системы
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route exact path="/" element={
            <ProtectedRoute component={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards} />
          }
          />
          <Route exact path="/sign-up" element={
            <Register onRegister={handleRegister} />
          }
          />
          <Route exact path="/sign-in" element={
            <Login onLogin={handleLogin} />
          }
          />
          <Route path="/*" element={<Navigate to="/" replace/>} />
        </Routes>
        <Footer />
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          image={infoTooltipImage}
          message={infoTooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
