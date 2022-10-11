import logo from '../images/Logo.svg';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

function Header(props) {

  const location = useLocation();
  const linkTo = (`${props.isLoggedIn ? '/sign-in' : (location.pathname === '/sign-in' ?
    '/sign-up' : '/sign-in')}`);
  const linkClassName = (`header__link ${props.isLoggedIn ? 'header__link_type_logged-in' : ''}`);
  const [isMobileMenueOpen, setIsMobileMenueOpen] = React.useState(false);

  function handleLinkClick() {
    if (props.isLoggedIn) {
      props.onLogOut();
    }
  }

  function handleOpenMenueButton() {
    setIsMobileMenueOpen(true);
  }

  function handleCloseMenueButton() {
    setIsMobileMenueOpen(false);
  }

  return (
    <header className="header">
      {(isMobileMenueOpen && props.isLoggedIn) && <div className="header__menue">
        <p className="header__email header__email_type_mobile-menue">{props.email}</p>
        <Link onClick={handleLinkClick} className="header__link header__link_type_mobile-menue" to={linkTo}>{(location.pathname === '/') ?
          'Выйти' : (location.pathname === '/sign-in' ? 'Регистрация' : 'Вход')}</Link>
      </div>}
      <img className="header__logo" src={logo} alt="Логотип" />
      {props.isLoggedIn && <p className="header__email">{props.email}</p>}
      <Link onClick={handleLinkClick} className={linkClassName} to={linkTo}>{(location.pathname === '/') ?
        'Выйти' : (location.pathname === '/sign-in' ? 'Регистрация' : 'Вход')}</Link>
      {props.isLoggedIn && (isMobileMenueOpen ? <button onClick={handleCloseMenueButton}
        className="header__btn header__btn_type_close" /> : <button onClick={handleOpenMenueButton}
          className="header__btn header__btn_type_open" />)}
    </header>
  );
}

export default Header;