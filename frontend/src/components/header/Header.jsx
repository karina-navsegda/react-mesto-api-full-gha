import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ isLoggedIn, logOut, userEmail }) {
  const locate = useLocation();
  return (
    <header className="header">
      <img className="header__logo" alt="логотип" src={logo} />
      {isLoggedIn ? (
        <div className="header__menu">
          <p className="header__auth-button"> {userEmail} </p>
          <Link
            className="header__logout-button"
            to="/signin"
            onClick={logOut}
          >
            {" "}
            Выйти
          </Link>
        </div>
      ) : (
        <Link
          className="header__auth-button"
          to={locate.pathname === "/signin" ? "/signup" : "/signin"}
        >
          {" "}
          {locate.pathname === "/signin" ? "Регистрация" : "Войти"}{" "}
        </Link>
      )}
    </header>
  );
}
