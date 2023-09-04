import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [userData, setUserData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(userData);
  }

  return (
    <div className="form__container">

      <h2 className="form__title">Регистрация</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input className="form__input"
          name="email"
          type="email"
          id="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input className="form__input"
          name="password"
          type="password"
          id="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <button className="form__submit-button form__button-submit_type_register"
          type="submit"
        >Зарегистрироваться
        </button>
      </form>
      <div className="form__caption">
        <p className="form__caption-text">Уже зарегистрированы? </p>
        <Link className="form__caption-link" to="/sign-in">Войти</Link>
      </div>
    </div>
  )
}

export default Register;