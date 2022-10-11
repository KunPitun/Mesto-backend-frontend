function AuthForm(props) {

  return (
    <form onSubmit={props.onSubmit} className="login-register__form" name={`${props.name}-form`} noValidate>
      <input onChange={props.onChangeEmail} value={props.email}
        className="login-register__input login-register__input_type_email" type="email"
        placeholder="Email" name={`form-input-${props.name}-email`} id={`${props.name}-email-input`} required />
      <span className="login-register__error login-register-input-error"></span>
      <input onChange={props.onChangePassword} value={props.password}
        className="login-register__input login-register__input_type_password" type="text"
        placeholder="Пароль" name={`form-input-${props.name}-password`} id={`${props.name}-passsword-input`} minLength="8"
        maxLength="30" required />
      <span className="login-register__error login-register-input-error"></span>
      <button className="login-register__submit-btn"
        type="submit">{props.buttonText}</button>
    </form>
  );
}

export default AuthForm;