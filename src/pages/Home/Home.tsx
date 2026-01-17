import * as React from 'react';
import s from './Home.module.scss';
import mainBanner from '@assets/images/main-banner.png';
import Text from '@components/Text';

const Home: React.FC = React.memo(() => {
  return (
    <main className={s.home}>
      <div className={s.home__content}>
        <Text view="title" tag="h1" className={s.home__title}>
          Discover Furniture With
          <br /> High Quality Wood
        </Text>
        <Text view="p-20" tag="h4" color="secondary" className={s.home__subtitle}>
          Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi,
          <br /> adipiscing mauris non. Purus parturient viverra nunc, tortor sit laoreet. Quam tincidunt <br /> aliquam
          adipiscing tempor.
        </Text>
      </div>
      <img src={mainBanner} className={s.home__banner} />
    </main>
  );
});

export default Home;
