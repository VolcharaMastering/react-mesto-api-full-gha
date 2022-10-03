import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const user = React.useContext(CurrentUserContext);
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');

  function handleNameChange(e) {
    setUserName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setUserDescription(e.target.value);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    onUpdateUser({ name: userName, about: userDescription });
  }

  React.useEffect(() => {
    setUserName(user.name);
    setUserDescription(user.about);
  }, [user, isOpen]);


  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      buttonLabel="Сохранить новые настройки профиля"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitForm}
    >

      <input
        type="text"
        className="popup__input popup__input_type_name"
        id="profile-name"
        name="name"
        value={userName || ''}
        onChange={handleNameChange}
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error profile-name-error"></span>
      <input
        type="text"
        className="popup__input popup__input_type_description"
        id="profile-description"
        placeholder="Профессиональная деятельность"
        name="about"
        value={userDescription || ''}
        onChange={handleDescriptionChange}
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error profile-description-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;