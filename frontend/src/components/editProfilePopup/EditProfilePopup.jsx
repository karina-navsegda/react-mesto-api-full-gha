import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <label className="popup__form-label">
          <input
            type="text"
            className="popup__item popup__item_type_username"
            placeholder="Имя"
            name="edit__username"
            required=""
            minLength={2}
            maxLength={40}
            id="name"
            value={name || ''} 
            onChange={handleNameChange}
          />
          <span className="popup__input-error name-error" />
        </label>
        <label className="popup__form-label">
          <input
            type="text"
            className="popup__item popup__item_type_description"
            placeholder="Вид деятельности"
            name="edit__description"
            required=""
            minLength={2}
            maxLength={200}
            id="description"
            onChange={handleDescriptionChange}
            value={description || ''} 
          />
          <span className="popup__input-error description-error" />
        </label>
      </fieldset>{" "}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
