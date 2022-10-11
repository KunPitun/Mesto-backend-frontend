function PopupWithForm(props) {
  
  const submitBtnClassName = (`popup__save-btn ${props.isBtnActive ? '' : 'popup__save-btn_disabled'}`);

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
        <form onSubmit={props.onSubmit} className="popup__form" name={`${props.name}-form`} noValidate>
          {props.children}
          <button disabled={!props.isBtnActive} className={submitBtnClassName} type="submit">{props.buttonText}</button>
        </form>
      </div>
      <button onClick={props.onClose} className={`popup__close-btn poup__close-btn_type_${props.name}`} type="button"></button>
    </section>
  );
}

export default PopupWithForm;