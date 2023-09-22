import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmitClick(e) {
    e.preventDefault();
    onRegister({ password, email });
  }

  return (
    <section className="auth">
      <form
        className="auth__form"
        name="login"
        noValidate=""
        onSubmit={handleSubmitClick}
      >
        <h2 className="auth__title">Регистрация</h2>
        <fieldset className="auth__fieldset">
          <input
            className="auth__input auth__input_email"
            type="email"
            id="login-email"
            value={email}
            onChange={handleEmailChange}
            required={true}
            placeholder="E-mail"
            minLength="2"
            maxLength="40"
          />
          <input
            value={password}
            onChange={handlePasswordChange}
            className="auth__input auth__input_password"
            type="password"
            id="login-password"
            placeholder="Пароль"
            required={true}
            minLength="6"
            maxLength="16"
          />
        </fieldset>
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="auth__question">
          Уже зарегистрированы?{" "}
          <Link to={"/signin"} className="auth__link">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}
