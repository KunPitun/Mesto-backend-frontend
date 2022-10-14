import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../auth.js';
import * as newApi from '../utils/Api';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({
    about: '', avatar: '', cohort: '', name: '', _id: ''
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '', _id: '' });
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isSubmitBtnActive, setIsSubmitBtnActive] = React.useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isEmailMatchesPassword, setIsEmailMatchesPassword] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getMainData();
    }
    handleTokenCheck();
  }, []);

  function getMainData() {
    newApi.getUserData()
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    newApi.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete() {
    setIsSubmitBtnActive(false);
    newApi.deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .finally(() => {
        setIsSubmitBtnActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(userId => userId === currentUser._id);

    newApi.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteClick(card) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setIsCardPopupOpen(!isCardPopupOpen);
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '', _id: '' });
    setIsEmailMatchesPassword(false);
  }

  function handleUpdateUser(name, description) {
    setIsSubmitBtnActive(false);
    newApi.giveUserInfo(name, description)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .finally(() => {
        setIsSubmitBtnActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    setIsSubmitBtnActive(false);
    newApi.giveAvatarInfo(link.value)
      .then((avatar) => {
        setCurrentUser(avatar.data);
        closeAllPopups();
      })
      .finally(() => {
        setIsSubmitBtnActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(place, link) {
    setIsSubmitBtnActive(false);
    newApi.giveCardInfo(place, link)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .finally(() => {
        setIsSubmitBtnActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          getMainData();
          setLoggedIn(true);
          localStorage.setItem('currentUserEmail', email);
          history.push("/");
        }
      })
      .catch(err => console.log(err));
  }

  function handleLogOut() {
    setLoggedIn(false);
    history.push("/sign-in");
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUserEmail');
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        history.push('/sign-in');
        setIsInfoTooltipOpen(true);
        setIsRegistered(true);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setIsRegistered(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={localStorage.getItem('currentUserEmail')} onLogOut={handleLogOut} isLoggedIn={loggedIn} />
        <Switch>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} isEmailMatchesPassword={setIsEmailMatchesPassword}
              isInfoTooltipOpen={setIsInfoTooltipOpen} />
          </Route>
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} cards={cards}
            onCardLike={handleCardLike} onCardDelete={handleDeleteClick}
            onCardClick={handleCardClick} onEditProfile={handleEditProfileClick}
            onAddPlace={handleEditPlaceClick} onEditAvatar={handleEditAvatarClick} />
        </Switch>
        {loggedIn && <Footer />}
        <EditProfilePopup isBtnActive={isSubmitBtnActive} onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup isBtnActive={isSubmitBtnActive} onAddPlace={handleAddPlace}
          isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup isBtnActive={isSubmitBtnActive} onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} />
        <DeletePlacePopup isBtnActive={isSubmitBtnActive} onDelete={handleCardDelete}
          onClose={closeAllPopups} isOpen={isDeletePopupOpen} />
        <ImagePopup onClose={closeAllPopups} isOpen={isCardPopupOpen} card={selectedCard} />
        <InfoTooltip isOpen={isInfoTooltipOpen} isRegistered={isRegistered} onClose={closeAllPopups}
          isEmailMatchesPassword={isEmailMatchesPassword} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);