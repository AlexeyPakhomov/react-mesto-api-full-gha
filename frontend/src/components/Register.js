import React from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function Register({ onRegister }) {
  const { values, setValues, handleChange, isValid, emailError, passwordError } =
    useFormAndValidation({
      email: '',
      password: '',
    });

  const { email, password } = values;

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
    setValues({ email: '', password: '' });
  }

  return (
    <div className="sign">
      <h2 className="sign__title">Регистрация</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <label className="sign__label">
          <input
            className={`sign__input ${emailError ? 'sign__input_error' : ''}`}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email || ''}
            onChange={handleChange}></input>
          {emailError && <span className="sign__span-error">{emailError}</span>}
        </label>

        <label className="sign__label">
          <input
            className={`sign__input ${passwordError ? 'sign__input_error' : ''}`}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password || ''}
            onChange={handleChange}
            required></input>
          {passwordError && <span className="sign__span-error">{passwordError}</span>}
        </label>

        <button className="sign__button" type="submit" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__link">
        Уже зарегистрированы? <Link to="/signin">Войти</Link>
      </p>
    </div>
  );
}

export default Register;
