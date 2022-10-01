import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister, setMessage, setRegState }) {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [comparePassword, setComparePassword] = useState('');

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { confirmPassword, ...data } = registerData;
        if (confirmPassword !== data.password) {
            return setComparePassword('Пароли не совпадают!');
        }
        setComparePassword('Пароли совпадают');
        onRegister(data)
            .then(() => {
                setMessage('Вы успешно зарегистрировались!');
                setRegState(true);
            })
            .catch((err) => {
                setMessage('Что-то пошло не так! Попробуйте ещё раз.');
                setRegState(false);
            })
    }

    return (
        <section className="gallery">
            <form
                className="registration__form"
                onSubmit={handleSubmit}
            >
                <h2 className="registration__welcome">Регистрация</h2>
                <input
                    type="email"
                    className="registration__input"
                    id="registration-email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    minLength="2"
                    maxLength="40"
                />
                <input
                    type="password"
                    className="registration__input"
                    id="registration-password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                    placeholder="Пароль"
                    minLength="6"
                    maxLength="20"
                />
                <input
                    type="password"
                    className="registration__input"
                    id="registration-password-confirm"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Повторите пароль"
                    minLength="6"
                    maxLength="20"
                />
                <p className="compare-message">
                    {comparePassword}
                </p>
                <button
                    className="registration__button"
                    type="submit"
                    aria-label="Кнопка регистрации">
                    <p className="registration__button_label">Зарегистрироваться</p>
                </button>
                <div className="registration__label">
                    <p>Уже зарегистрированы?&nbsp;</p>
                    <Link to="/sign-in" className="registration__login-link">Войти</Link>
                </div>
            </form>
        </section>
    )
}

export default Register;