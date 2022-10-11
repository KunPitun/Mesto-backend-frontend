import PopupWithForm from './PopupWithForm';
import React from 'react';

function DeletePlacePopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete()
  }
  
  return (
    <PopupWithForm isBtnActive={props.isBtnActive} onSubmit={handleSubmit} buttonText="Да" onClose={props.onClose} isOpen={props.isOpen} name="delete" title="Вы уверены?" />
  );
}

export default DeletePlacePopup;