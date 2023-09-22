import PopupWithForm from "../popupWithForm/PopupWithForm";
import { useEffect, useState } from "react";

export default function AddPlacePopup({
  isOpen,
  onClose,
  isUpdating,
  onAddPlace,
}) {
  const [formValues, setFormValues] = useState({ title: "", link: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  useEffect(() => {
    setFormValues({ title: "", link: "" });
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title: formValues.title, link: formValues.link });
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      isUpdating={isUpdating}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <label className="popup__form-label">
          <input
            type="text"
            className="popup__item popup__item_type_place-name"
            placeholder="Название"
            name="title"
            id="place"
            required=""
            minLength={2}
            maxLength={30}
            value={formValues.title}
            onChange={handleChange}
          />
          <span className="popup__input-error place-error" />
        </label>
        <label className="popup__form-label">
          <input
            type="url"
            className="popup__item popup__item_type_link"
            placeholder="Ссылка на картинку"
            name="link"
            id="link"
            required=""
            onChange={handleChange}
            value={formValues.link}
          />
          <span className="popup__input-error link-error" />
        </label>
      </fieldset>{" "}
    </PopupWithForm>
  );
}
