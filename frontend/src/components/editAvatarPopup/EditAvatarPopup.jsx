import { useRef, useEffect } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isUpdating,
}) {
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen) {
      inputRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      isUpdating={isUpdating}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <label className="popup__form-label">
          <input
            ref={inputRef}
            type="url"
            className="popup__item popup__item_type_link"
            placeholder="Ссылка на картинку"
            defaultValue=""
            name="avatar"
            id="avatar"
            required=""
          />
          <span className="popup__input-error avatar-error" />
        </label>
      </fieldset>{" "}
    </PopupWithForm>
  );
}
