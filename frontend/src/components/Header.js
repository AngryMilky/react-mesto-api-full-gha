import React from 'react';
import logo from '../../src/styles/images/header_logo.svg';
import { Link, Route, Routes } from "react-router-dom";

function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <Routes>
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__link header__link-login ">Войти</Link>} />
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__link header__link-login ">Регистрация</Link>} />
        <Route path="/" element={
          <>
            <div className="header__menu">
              <p className="header__email">{userEmail}</p>
              <a className="header__link header__link-logout" onClick={onSignOut}>Выйти</a>
            </div>
          </>
        } />
      </Routes>
    </header>
  )
}

export default Header;
