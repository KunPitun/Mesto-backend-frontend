import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm isBtnActive={props.isBtnActive} onSubmit={handleSubmit} buttonText="Сохранить" onClose={props.onClose} isOpen={props.isOpen} name="profile" title="Редактировать профиль">
      <input onChange={handleChangeName} value={name} className="popup__input popup__input_type_name" type="text" placeholder="Имя пользователя"
        name="form-input-name" id="name-input" minLength="2" maxLength="40" required />
      <span className="popup__error name-input-error"></span>
      <input onChange={handleChangeDescription} value={description} className="popup__input popup__input_type_user-info" type="text" placeholder="Информация о пользователе"
        name="form-input-info" id="info-input" minLength="2" maxLength="200" required />
      <span className="popup__error info-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;