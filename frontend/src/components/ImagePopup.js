function ImagePopup({ isOpen, card, onClose }) {

    return (
        <section 
        className={`
        popup popup_dark-shadow popup_big-image 
        ${card.link ? 'popup_active' : ''}`
        }>
            <div className="popup__image-container">
                <img 
                className="popup__image" 
                src={`${card.link}`} 
                alt={`Картинка ${card.name} в большом размере`} />
                <p className="popup__image-caption">{card.name}</p>
                <button
                    className="popup__close"
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть окно"
                >
                </button>
            </div>
        </section>
    )
}
export default ImagePopup;