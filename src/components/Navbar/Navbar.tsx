import { Link, useLocation } from 'react-router-dom';
import Text from '../Text';
import s from './Navbar.module.scss';
import { navbarUrls } from '@config/navbarUrls';
import cn from 'classnames';
import React from 'react';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={s.navbar}>
      {navbarUrls.map((item, index) => (
        <Link to={item.path} key={index}>
          <Text
            tag="p"
            view="p-18"
            color={location.pathname == item.path ? 'accent' : 'primary'}
            className={cn(s['navbar__item'], location.pathname == item.path && s['navbar__item_active'])}
          >
            {item.name}
          </Text>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
