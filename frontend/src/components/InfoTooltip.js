function InfoTooltip(props) {

  const popupIconClassName = (`popup__icon ${props.isRegistered ? '' : 'popup__icon_type_error'}`);

  return (
    <section className={`popup popup_type_register ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_register">
        <div className={popupIconClassName}></div>
        {props.isRegistered ? (<h2 className="popup__title popup__title_type_register">
          Вы успешно<br />зарегистрировались!</h2>) : (<h2 className="popup__title popup__title_type_register">
            Что-то пошло не так!<br />Попробуйте ещё раз.</h2>)}
      </div>
      <button onClick={props.onClose} className="popup__close-btn popup__close-btn_type_register"
        type="button"></button>
    </section>
  );
}

export default InfoTooltip;