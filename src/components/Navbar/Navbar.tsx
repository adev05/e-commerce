import { Link, useLocation } from 'react-router-dom';
import { NAVBAR } from '../../config/navbar';
import './Navbar.scss';
import Text from '../Text';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      {NAVBAR.map((item, index) => (
        <Link to={item.path} className="navbar-element" key={index}>
          <Text
            view="p-18"
            weight={location.pathname == item.path ? 'semibold' : 'normal'}
            color={location.pathname == item.path ? 'accent' : 'primary'}
            className={location.pathname == item.path ? 'navbar-active' : ''}
          >
            {item.name}
          </Text>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
