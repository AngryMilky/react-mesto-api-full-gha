import React from "react";

function Login({ onLogin }) {
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
    onLogin(userData);
  }

  return (
    <div className="form__container">
      <h2 className="form__title">Вход</h2>
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
        <button className="form__submit-button form__button-submit_type_login"
          type="submit"
        >Войти</button>
      </form>
    </div>
  )
}

export default Login;