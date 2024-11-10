import Logo from '/Logotype.svg';
import s from './Logotype.module.scss';
import { Link } from 'react-router-dom';

const Logotype: React.FC = () => {
  return (
    <Link to="/" className={s.logotype}>
      <img src={Logo} alt="Lalasia logo" className={s.logotype} />
    </Link>
  );
};

export default Logotype;
