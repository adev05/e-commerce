import * as React from 'react';
import s from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <main className={s.home}>
      <img src="./main-banner.png" className={s.home__banner} />
    </main>
  );
};

export default Home;
