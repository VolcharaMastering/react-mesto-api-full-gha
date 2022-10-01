import React, { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    useEffect(() => {
        setCardName('');
        setCardLink('');
    }, [isOpen]);

    function handleCardNameSet(e) {
        setCardName(e.target.value);
    }
    function handleCardLinkSet(e) {
        setCardLink(e.target.value);
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        onAddPlaceSubmit({ name: cardName, link: cardLink });
    }

    return (
        <PopupWithForm
            name="addImage"
            title="Новое место"
            buttonText="Создать"
            buttonLabel="Добавить новое изображение в галерею"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmitForm}
        >
            <input type="text"
                className="popup__input popup__input_type_title"
                id="card-title"
                placeholder="Название"
                name="name"
                value={cardName}
                onChange={handleCardNameSet}
                required
                minLength="2"
                maxLength="30"
            />
            <span className="popup__input-error card-title-error"></span>
            <input
                type="url"
                className="popup__input popup__input_type_link"
                id="card-link"
                placeholder="Ссылка на картинку"
                name="link"
                value={cardLink}
                onChange={handleCardLinkSet}
                required
            />
            <span className="popup__input-error card-link-error"></span>
        </PopupWithForm>
    );
}
export default AddPlacePopup;