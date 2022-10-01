import React, { useState } from "react";

function Login({ onLogin, setMessage, setRegState }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });


    const [errMessage, setErrMessage] = useState('');

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!loginData.email || !loginData.password) {
            return setErrMessage('Email или пароль не верные!');
        }
        onLogin(loginData)
            .then(() => {
                setMessage('Логироване прошло успешно!');
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
                <h2 className="registration__welcome">Вход</h2>
                <input
                    type="email"
                    className="registration__input"
                    id="registration-email"
                    name="email"
                    value={loginData.email}
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
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    placeholder="Пароль"
                    minLength="6"
                    maxLength="20"
                />
                <p className="compare-message">
                    {errMessage}
                </p>
                <button
                    className="registration__button"
                    type="submit"
                    aria-label="Кнопка входа">
                    <p className="registration__button_label">Войти</p>
                </button>
            </form>
        </section>
    )
}

export default Login;