import * as React from 'react';
import s from './Home.module.scss';
import mainBanner from '@assets/images/main-banner.png';

const Home: React.FC = () => {
  return (
    <main className={s.home}>
      <img src={mainBanner} className={s.home__banner} />
    </main>
  );
};

export default Home;
