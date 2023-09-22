import closeIcon from "../../images/CloseIcon.svg";
export default function PopupWithForm({
  name,
  title,
  button,
  children,
  isOpen,
  onClose,
  onSubmit,
  isUpdating,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button className="popup__close" type="button" onClick={onClose}>
          <img className="popup__svg" src={closeIcon} alt="закрыть" />
        </button>
        <form className="popup__form" name={`${name}_form`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}

          <button className="popup__button" type="submit">
            {isUpdating ? "..." : button}
          </button>
        </form>
      </div>
    </div>
  );
}
