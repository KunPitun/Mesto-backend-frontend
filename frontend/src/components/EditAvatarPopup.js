import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current);
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm isBtnActive={props.isBtnActive} onSubmit={handleSubmit} buttonText="Сохранить" onClose={props.onClose} isOpen={props.isOpen} name="avatar" title="Обновить аватар">
      <input ref={avatarRef} className="popup__input popup__input_type_avatar" type="url" placeholder="Ссылка на картинку"
        name="form-input-avatar" id="avatar-input" required />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;