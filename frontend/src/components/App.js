/* eslint-disable react-hooks/exhaustive-deps */
import '../index.css';
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';

import api from '../utils/Api.js';
import authApi from '../utils/AuthApi.js';

import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import Main from './Main.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoToolTip.js';

function App() {
    //--------------------------------------states----------------------------------------
    //-------------popup states-------------
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen] = React.useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    //=============card states---------
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cards, setCards] = React.useState([]);

    //----------user-cards state------------
    const [currentUser, setCurrentUser] = React.useState({});

    //---------user state-------------
    const [userEmail, setUserEmail] = React.useState('');
    const [loggedIn, setLoggedIn] = React.useState(false);

    //------------------------------------------------------------------------------------

    const history = useHistory();

    //---------user functionality-------------
    function handleUpdateUser(userData) {
        api.setProfile(userData)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //-----------Check token-------------

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) { return };

        authApi.authByToken(jwt)
            .then((res) => {
                setUserEmail(res.email);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        tokenCheck();
    }, [loggedIn]);
    //------------------------------------------------------------------

    //--------Auth functionality-------------
    function onLogin(data) {
        setIsInfoToolTipOpen(true);
        return authApi.authorize(data)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setUserEmail(data.email);
                setLoggedIn(true);
                closeAllPopups();
                history.go('/');              
            });
    }

    function onRegister(data) {
        setIsInfoToolTipOpen(true);
        return authApi.register(data)
            .then(() => {
                history.push('/signin');
                closeAllPopups();
            })
    }

    function onLogout(e) {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/signin');
    }

    const loadPage = () => {
        api.getData('users/me')
            .then((usersInfo) => {
                setCurrentUser(usersInfo);
            })
            .catch((err) => {
                console.log(err);
            })
        api.getData('cards')
            .then((dbCards) => {
                setCards(dbCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        if (loggedIn) {
            loadPage();
            history.push('/');
        }
    }, [loggedIn, history]);
    //========================================


    //--------popups functionality-------------
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsEditAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAddPlacePopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard({})
    }
    //EscapeClose
    const isOpen =
        isEditAvatarPopupOpen || isEditProfilePopupOpen
        || isEditAddPlacePopupOpen || isInfoToolTipOpen || selectedCard.link;

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    //-----------------------------------------------

    function handleUpdateAvatar(newLink) {

        api.setAvatar(newLink)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //------------cards functionality-------------
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLike(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) =>
                        c._id === card._id ? newCard : c
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.delCard(card._id)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(newCard) {
        api.setCard(newCard)
            .then((returnedCard) => {
                setCards([returnedCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const [message, setMessage] = useState('');
    const [regState, setRegState] = useState(false);

    //------------------------------------------------------

    return (
        <div className="page-style">
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    userEmail={userEmail}
                    onLogout={onLogout}
                />
                <Switch>
                    <Route path='/signin'>
                        <Login
                            onLogin={onLogin}
                            setMessage={setMessage}
                            setRegState={setRegState}
                        />
                    </Route>
                    <Route path='/signup'>
                        <Register
                            onRegister={onRegister}
                            setMessage={setMessage}
                            setRegState={setRegState}
                        />
                    </Route>
                    <ProtectedRoute
                        exec path='/'
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                </Switch>
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <EditProfilePopup
                    onUpdateUser={handleUpdateUser}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                />
                <AddPlacePopup
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    isOpen={isEditAddPlacePopupOpen}
                    onClose={closeAllPopups}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    message={message}
                    regState={regState}
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                />
                <Footer />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;