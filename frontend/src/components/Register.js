import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthForm from './AuthForm.js';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    if (email !== password) {
      props.onRegister(email, password);
    }
    else {
      props.isEmailMatchesPassword(true);
      props.isInfoTooltipOpen(true);
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="login-register">
      <h2 className="login-register__title">Регистрация</h2>
      <AuthForm onSubmit={handleSubmit} onChangeEmail={handleChangeEmail} name="register" email={email}
        onChangePassword={handleChangePassword} password={password} buttonText="Зарегистрироваться" />
      <div className="login-register__singup-singin">
        <p className="login-register__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login-register__link"> Войти</Link>
      </div>
    </div>
  );
}

export default withRouter(Register);