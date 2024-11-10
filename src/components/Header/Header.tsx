import Logotype from '../Logotype';
import Navbar from '../Navbar';
import BagIcon from '../Icons/BagIcon';
import s from './Header.module.scss';
import HeartIcon from '../Icons/HeartIcon';

const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <Logotype />
      <Navbar />
      <div className={s.header__icons}>
        <BagIcon width={24} height={24} />
        <HeartIcon width={24} height={24} />
      </div>
    </header>
  );
};

export default Header;
