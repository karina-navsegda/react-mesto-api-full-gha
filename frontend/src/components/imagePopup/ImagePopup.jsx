import closeIcon from "../../images/CloseIcon.svg";
export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup-zoom ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div
        className="popup-zoom__items"
        onClick={(evt) => evt.stopPropagation()}
      >
        <img className="popup-zoom__photo" alt={card.name} src={card.link} />
        <h2 className="popup-zoom__title">{card.name}</h2>
        <button
          className="popup__close popup-zoom__close-button"
          type="button"
          onClick={onClose}
        >
          <img className="popup__svg" src={closeIcon} alt="закрыть" />
        </button>
      </div>
    </div>
  );
}
