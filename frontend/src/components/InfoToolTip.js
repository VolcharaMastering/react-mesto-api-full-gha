import React from 'react';
import imgOk from "../images/okReg.svg";
import imgErr from "../images/errReg.svg";

function InfoTooltip(props) {
    return (

        <section
            className={`popup ${props.isOpen ? 'popup_active' : ''}`}>
            <div className="popup__modal-container popup_alert ">
                <img src={props.regState ? imgOk : imgErr} alt={props.regState ? 'Иконка OK' : 'Иконка ошибки'} className="popup__reg-image" />

                <h2 className="popup__header popup__header_alert">{props.message}</h2>
                <button
                    className="popup__close"
                    type="button"
                    onClick={props.onClose}
                    aria-label="Закрыть окно"
                >
                </button>
            </div>
        </section>

    );
}

export default InfoTooltip;