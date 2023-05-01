import React from "react";

function BurgerMenu({ loggedIn, currentUserEmail, onSignOut, menuBurgerActive }) {
  return (
    <>
      {loggedIn && (
        <nav className={`burgerMenu ${menuBurgerActive ? "burgerMenu_active" : ""}`}>
          <p className="burgerMenu__email">{currentUserEmail}</p>
          <button className="burgerMenu__onSignOut link" onClick={onSignOut}>
            Выйти
          </button>
        </nav>
      )}
    </>
  );
}

export default BurgerMenu;
