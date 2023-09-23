import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import PopupWithForm from "./popupWithForm/PopupWithForm.jsx";
import ImagePopup from "./imagePopup/ImagePopup.jsx";
import { useState } from "react";
import { useCallback } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useEffect } from "react";
import api from "../utils/api.js";
import EditProfilePopup from "./editProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup";
import Login from "./login/Login.jsx";
import Register from "./register/Register.jsx";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import InfoTooltip from "./infoTooltip/InfoTooltip.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [deleteCardId, setDeleteCardId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);

  const [userEmail, setEmail] = useState("");

  const setClosedAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImgPopupOpen(false);
    setIsQuestionPopupOpen(false);
    setIsTooltipPopupOpen(false);
  }, []);

  useEffect(() => {
    function closePopupOnEsc(evt) {
      if (evt.key === "Escape") {
        setClosedAllPopups();
      }
    }

    if (setClosedAllPopups) {
      document.addEventListener("keydown", closePopupOnEsc);
      return () => {
        document.removeEventListener("keydown", closePopupOnEsc);
      };
    }
  });

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImgPopupOpen(true);
  }

  function deleteCard(evt) {
    evt.preventDefault();
    setIsUpdating(true);
    api
      .deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        //  closeAllPopups();
        setClosedAllPopups();
        setIsUpdating(false);
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  function handleCardDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setIsQuestionPopupOpen(true);
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    isLiked
      ? api
          .removeLike(card._id, localStorage.jwt)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((error) => console.error(`Ошибка: ${error}`))
      : api
          .addLike(card._id, localStorage.jwt)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((error) => console.error(`Ошибка: ${error}`));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setProfile(name, about, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        //   closeAllPopups();
        setClosedAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatarImg(avatar, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        //  closeAllPopups();
        setClosedAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  function handleAddPlaceSubmit({ title, link }) {
    api
      .setCard(title, link, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards]);
        //  closeAllPopups();
        setClosedAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

   useEffect(() => {
      if (localStorage.jwt) {
        auth.checkToken(localStorage.jwt)
          .then(res => {
            console.log(res)
            setEmail(res.email)
            setisLoggedIn(true)
            navigate('/')
          })
          .catch(err => console.log(`Ошибкак авторизации повторном входе ${err}`))
      }
    }, [navigate])

     useEffect(() => {
      if (isLoggedIn) {
        Promise.all([api.getProfile(localStorage.jwt), api.getCards(localStorage.jwt)])
          .then(([dataUser, dataCards]) => {
            console.log(dataUser)
            setCurrentUser(dataUser)
            setCards(dataCards)
          })
          .catch((err) => console.error(`Ошибка при загрузке начальных данных ${err}`))
      }
    }, [isLoggedIn]) 


  function handleLogin(password, email) {
    auth
      .login(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setEmail(email);
        setisLoggedIn(true);
        navigate("/");
        console.log(res);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setIsTooltipPopupOpen(true);
        setIsSuccessed(false);
      });
  }


  function handleRegister(password, email) {
    auth
    .register(password, email)
      .then(res => {
        setIsSuccessed(true)
        navigate('/signin')
      })
      .catch((err) => {
        setIsTooltipPopupOpen(true);
        setIsSuccessed(false);
        console.error(`Ошибкак при регистрации ${err}`)
      })
  }

  function handleLogoutClick() {
    localStorage.removeItem("jwt");
    setisLoggedIn(false);
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header
          isLoggedIn={isLoggedIn}
          logOut={handleLogoutClick}
          userEmail={userEmail}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClicked={handleCardClick}
                cards={cards}
                onCardLike={handleLikeClick}
                onDelete={handleCardDeleteClick}
              />
            }
          />

          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />

          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} email={userEmail} />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={setClosedAllPopups}
          authSuccessed={isSuccessed}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={setClosedAllPopups}
          onUpdateUser={handleUpdateUser}
          isUpdating={setIsUpdating}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={setClosedAllPopups}
          isUpdating={isUpdating}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={setClosedAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          button="Да"
          isOpen={isQuestionPopupOpen}
          onClose={setClosedAllPopups}
          onSubmit={deleteCard}
          isUpdating={isUpdating}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImgPopupOpen}
          onClose={setClosedAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
