import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Card from "../card/Card.jsx";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClicked,
  cards,
  onCardLike,
  onDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__profile-info">
          <img
            className="profile__avatar"
            alt="аватар пользователя"
            src={currentUser.avatar}
          />
          <button
            className="profile__overlay-button"
            type="button"
            onClick={onEditAvatar}
          />
          <div className="profile__name-section">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((data) => {
          return (
            <Card
              key={data._id}
              card={data}
              onCardClicked={onCardClicked}
              onCardLike={onCardLike}
              onDelete={onDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
