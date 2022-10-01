import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const user = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === user._id;
    const isLiked = card.likes.some(i => i._id === user._id);

    const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''}`);

    const cardRemoveClassName = (
        `card__remove ${isOwn ? '' : 'card__remove_hidden'}`
    );
    function handleCloseCard() {
        onCardClick(card);
    }
    function handleCardLike() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }
    return (
        <article className="card">
            <img
                className="card__image"
                src={card.link}
                onClick={handleCloseCard}
                alt={`Фотография: ${card.name}`}
            />
            <button className={`${cardRemoveClassName}`} type="submit" onClick={handleDeleteClick} aria-label="Удалить" />
            <div className="card__caption">
                <h2 className="card__name">{card.name}</h2>
                <div className="card__like-position">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike} aria-label="Нравится" />
                    <p className="card__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}
export default Card;