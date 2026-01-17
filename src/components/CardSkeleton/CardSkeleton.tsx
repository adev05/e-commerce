import React from 'react';
import s from './CardSkeleton.module.scss';

const CardSkeleton: React.FC = () => {
  return (
    <div className={s['card-skeleton']}>
      <div className={s['card-skeleton__image']}></div>

      <div className={s['card-skeleton__body']}>
        <div className={s['card-skeleton__caption']}></div>
        <div className={s['card-skeleton__title']}></div>
        <div className={s['card-skeleton__subtitle']}></div>
        <div className={s['card-skeleton__action']}></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
