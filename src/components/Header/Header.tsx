import Logotype from '../Logotype';
import Navbar from '../Navbar';
import s from './Header.module.scss';
import HeartIcon from '../Icons/HeartIcon';
import React from 'react';
import CartIcon from '@pages/Cart/components/CartIcon/CartIcon';
import Bars3Icon from '@components/Icons/Bars3Icon';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={s.header}>
      <Logotype />
      <Navbar className={`${s.header__navbar} ${isMenuOpen ? s.header__navbar_open : ''}`} />
      <div className={s.header__icons}>
        <div className={s.header__burger}>
          <Bars3Icon onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
        {/* <HeartIcon /> */}
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;
