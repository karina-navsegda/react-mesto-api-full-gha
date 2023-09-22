import closeIcon from "../../images/CloseIcon.svg";
import failedIcon from "../../images/failedIcon.svg";
import succIcon from "../../images/succIcon.svg";

export default function InfoTooltip({ isOpen, onClose, authSuccessed }) {
  return (
    <section
      className={`popup popup_type_info-tooltip ${isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <div className="popup__info-tooltip-content">
          <button className="popup__close" type="button" onClick={onClose}>
            <img className="popup__svg" src={closeIcon} alt="закрыть" />
          </button>

          <img
            className="popup__info-tooltip-icon"
            src={authSuccessed ? succIcon : failedIcon}
          />
          <h2 className="popup__info-tooltip-title">
            {authSuccessed
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! \n Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    </section>
  );
}
