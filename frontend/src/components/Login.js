import React from "react";

function Login({ onLogin }) {
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
    onLogin(formValue);
    setFormValue({ email: "", password: "" });
  }

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="sign__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formValue.email || ""}
          onChange={handleChange}
          required
        ></input>
        <input
          className="sign__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={formValue.password || ""}
          onChange={handleChange}
          required
        ></input>
        <button className="sign__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
