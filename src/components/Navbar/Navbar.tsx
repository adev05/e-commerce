import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import Text from '../Text';
import { navbarUrls } from '@config/navbarUrls';
import s from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const location = useLocation();

  return (
    <nav className={cn(s.navbar, className)}>
      {navbarUrls.map((item, index) => (
        <Link to={item.path} key={index}>
          <Text
            tag="p"
            view="p-18"
            color={location.pathname === item.path ? 'accent' : 'primary'}
            className={cn(
              s.navbar__item,
              location.pathname === item.path && s.navbar__item_active
            )}
          >
            {item.name}
          </Text>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;