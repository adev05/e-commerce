import Logotype from '../Logotype';
import Navbar from '../Navbar';
import BagIcon from '../Icons/BagIcon';
import UserIcon from '../Icons/UserIcon';
import s from './Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <Logotype />
      <Navbar />
      <div className={s.header__icons}>
        <BagIcon width={24} height={24} />
        <UserIcon width={24} height={24} />
      </div>
    </header>
  );
};

export default Header;
