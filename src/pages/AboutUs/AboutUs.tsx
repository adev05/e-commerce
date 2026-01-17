import Text from '@components/Text';
import React from 'react';
import s from './AboutUs.module.scss';
import aboutBanner from '@assets/images/about-banner.png';

const AboutUs: React.FC = React.memo(() => {
  return (
    <main className={s.about}>
      <Text view="title" tag="h1" className={s.about__title}>
        About Us
      </Text>
      <Text view="p-20" tag="h4" color="secondary" className={s.about__subtitle}>
        We display products based on the latest products we have, if you want
        <br /> to see our old products please enter the name of the item
      </Text>
      <img src={aboutBanner} className={s.about__banner} />
    </main>
  );
});

export default AboutUs;
