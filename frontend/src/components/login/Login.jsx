import { useState } from "react";

export default function Login({ onLogin }) {
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
    onLogin({ password, email });
  }

  return (
    <section className="auth">
      <form
        className="auth__form"
        name="login"
        noValidate=""
        onSubmit={handleSubmitClick}
      >
        <h2 className="auth__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </section>
  );
}
