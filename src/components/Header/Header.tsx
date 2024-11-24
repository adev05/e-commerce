import Logotype from '../Logotype';
import Navbar from '../Navbar';
import BagIcon from '../Icons/BagIcon';
import s from './Header.module.scss';
import HeartIcon from '../Icons/HeartIcon';
import React from 'react';
import CartIcon from '@pages/Cart/components/CartIcon/CartIcon';

const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <Logotype />
      <Navbar />
      <div className={s.header__icons}>
        <CartIcon />
        <HeartIcon width={24} height={24} />
      </div>
    </header>
  );
};

export default Header;
