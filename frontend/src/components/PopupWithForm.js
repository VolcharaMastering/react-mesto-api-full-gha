import React from 'react';
function PopupWithForm(props) {
    return (

        <section
            className={`popup popup_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
            <div className="popup__modal-container">
                <h2 className="popup__header">{props.title}</h2>
                <form 
                className={`popup__inputs name=${props.name}`}
                onSubmit={props.onSubmit}
                >
                    {props.children}

                    <button
                        className="popup__save"
                        type="submit"
                        aria-label={props.buttonLabel}>
                        {props.buttonText}
                    </button>
                </form>
                <button
                    className="popup__close"
                    type="button"
                    onClick={props.onClose}
                    aria-label="Закрыть окно профиля"
                >
                </button>
            </div>
        </section>

    );
}

export default PopupWithForm;