import { Link } from 'react-router-dom';
import Logotype from '../Logotype';
import './Header.scss';
import Navbar from '../Navbar';
import BagIcon from '../Icons/BagIcon';
import UserIcon from '../Icons/UserIcon';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <Logotype />
      </Link>
      <Navbar />
      <div className="header-action">
        <BagIcon width={30} height={30} />
        <UserIcon width={30} height={30} />
      </div>
    </header>
  );
};

export default Header;
