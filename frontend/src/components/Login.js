import React from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function Login({ onLogin }) {
  const { values, setValues, handleChange, emailError, passwordError, isValid } =
    useFormAndValidation({
      email: '',
      password: '',
    });

  const { email, password } = values;

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
    setValues({ email: '', password: '' });
  }

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <label className="sign__label">
          {' '}
          <input
            className={`sign__input ${emailError ? 'sign__input_error' : ''}`}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email || ''}
            onChange={handleChange}
            required></input>
          {emailError && <span className="sign__span-error">{emailError}</span>}
        </label>
        <label className="sign__label">
          {' '}
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
