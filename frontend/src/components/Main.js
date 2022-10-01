import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
    const user = React.useContext(CurrentUserContext);

    return (
        <main className="gallery">
            <section className="profile">
                <div className="profile__user">
                    <div className="profile__avatar">
                        <div className="profile__avatar-dark" onClick={props.onEditAvatar}></div>
                        <img src={`${user.avatar}`} alt="Аватар пользователя" className="profile__avatar-image" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{user.name}</h1>
                        <p className="profile__description">{user.about}</p>
                    </div>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile} aria-label="Редактировать профиль" />
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace} aria-label="Добавить изображение в галерею" />
            </section>
            <section className="photos">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;