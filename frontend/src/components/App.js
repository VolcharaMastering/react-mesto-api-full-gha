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

    //---------user-cards functionality-------------
    useEffect(() => {
        api.getData('users/me')
            .then((usersInfo) => {
                setCurrentUser(usersInfo);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
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

    const authCheck = () => {
        if (!loggedIn) {
            authApi.authByToken()
                .then((res) => {
                    setUserEmail(res.data.email);
                    setLoggedIn(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        authCheck();
    }, []);
    useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn, history]);

    //------------------------------------------------------------------

    //--------Auth functionality-------------
    function onLogin(data) {
        setIsInfoToolTipOpen(true);
        return authApi.authorize(data)
            .then((res) => {
                setUserEmail(data.email);
                setLoggedIn(true);
                // localStorage.setItem('jwt', res.token)
            })
    }

    function onRegister(data) {
        setIsInfoToolTipOpen(true);
        return authApi.register(data)
            .then(() => {
                history.push('/signin');
            })
    }

    function onLogout(e) {
        return authApi.logout()
            .then((res) => {
                setUserEmail('');
                setLoggedIn(false);
            })
        // localStorage.removeItem('jwt');
        .finally(()=>{
            history.push('/signin');
        })
    }
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
    useEffect(() => {
        api.getData('cards')
            .then((dbCards) => {
                setCards(dbCards);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
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
                // const newCards = cards.filter(item => item._id !== card._id)
                // setCards(newCards);
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