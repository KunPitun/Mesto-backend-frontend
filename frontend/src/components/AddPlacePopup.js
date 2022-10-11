import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setPlace('');
    setLink('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(place, link);
  }

  return (
    <PopupWithForm isBtnActive={props.isBtnActive} onSubmit={handleSubmit} buttonText="Создать" onClose={props.onClose} isOpen={props.isOpen} name="card" title="Новое место">
      <input onChange={handleChangePlace} value={place} className="popup__input popup__input_type_place" type="text" placeholder="Название" name="form-input-place"
        id="place-input" minLength="2" maxLength="30" required />
      <span className="popup__error place-input-error"></span>
      <input onChange={handleChangeLink} value={link} className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на картинку"
        name="form-input-link" id="link-input" required />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;