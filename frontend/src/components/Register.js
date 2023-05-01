import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(formValue);
    setFormValue({ email: "", password: "" });
  }

  return (
    <div className="sign">
      <h2 className="sign__title">Регистрация</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="sign__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formValue.email}
          onChange={handleChange}
        ></input>

        <input
          className="sign__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          required
        ></input>

        <button className="sign__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__link">
        Уже зарегистрированы? <Link to="/sign-in">Войти</Link>
      </p>
    </div>
  );
}

export default Register;
