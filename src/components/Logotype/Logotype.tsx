import Logo from '/Logotype.svg';
import s from './Logotype.module.scss';
import { Link } from 'react-router-dom';

const Logotype = () => {
  return (
    <Link to="/" className={s.logotype}>
      <img src={Logo} alt="Lalasia logo" />
    </Link>
  );
};

export default Logotype;
