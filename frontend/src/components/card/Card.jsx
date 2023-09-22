import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Card({ card, onCardClicked, onCardLike, onDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card)
  }


  return (
    <div className="elements__item">
      {currentUser._id === card.owner._id &&  <button className="elements__delete-button" type="button" onClick={() => onDelete(card._id)}/>}
      <img
        className="elements__photo"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClicked({ link: card.link, name: card.name })}
      />
      <div className="elements__discription">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-section">

        <button 
   className={isLiked ? "elements__like-button elements__like-button_active" : "elements__like-button"}
  type="button" 
  onClick={handleLikeClick}
 >
</button>

          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
