import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/logo_white.svg";
import BurgerMenu from "./BurgerMenu";

function Header({ loggedIn, currentUserEmail, onSignOut, menuBurgerActive, handleToggleMenu }) {
  return (
    <>
      <BurgerMenu loggedIn={loggedIn} currentUserEmail={currentUserEmail} onSignOut={onSignOut} menuBurgerActive={menuBurgerActive} />

      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип. Mesto" />

        <Routes>
          <Route
            path="/signin"
            element={
              <nav className="header__nav">
                <Link className="header__link link" to="/signup">
                  Регистрация
                </Link>
              </nav>
            }
          />
          <Route
            path="/signup"
            element={
              <nav className="header__nav">
                <Link className="header__link link" to="/signin">
                  Войти
                </Link>
              </nav>
            }
          />
          <Route
            path="/"
            element={
              <>
                <div className="header__container">
                  <p className="header__email">{currentUserEmail}</p>
                  <Link className="header__link link" to="/signin" onClick={onSignOut}>
                    Выйти
                  </Link>
                </div>
                <div className={menuBurgerActive ? "header__burger_active link" : "header__burger link"} onClick={handleToggleMenu}>
                  <span />
                </div>
              </>
            }
          />
        </Routes>
      </header>
    </>
  );
}

export default Header;
