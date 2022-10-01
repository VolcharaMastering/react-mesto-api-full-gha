import React, { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarInput = React.useRef('');

    useEffect(() => {
        avatarInput.current.value = '';
    }, [isOpen]);

    function handleSubmitForm(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: avatarInput.current.value });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            buttonLabel="Изменить аватар пользователя"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmitForm}
        >
            <input
                type="url"
                className="popup__input popup__input_avatar_link"
                id="avatar-link"
                ref={avatarInput}
                placeholder="https://somewebsite.com/AvatarImage.jpg"
                name="avatar"
                required
            />
            <span className="popup__input-error avatar-link-error"></span>
        </PopupWithForm>
    );
}
export default EditAvatarPopup;