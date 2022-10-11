import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthForm from './AuthForm.js';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="login-register">
      <h2 className="login-register__title">Вход</h2>
      <AuthForm onSubmit={handleSubmit} onChangeEmail={handleChangeEmail} name="login" email={email}
        onChangePassword={handleChangePassword} password={password} buttonText="Войти" />
      <div className="login-register__singup-singin">
        <p className="login-register__text">Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="login-register__link"> Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export default withRouter(Login);