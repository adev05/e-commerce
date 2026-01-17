import s from './ProductSkeleton.module.scss';
import BackButton from '../BackButton';
import React from 'react';

const ProductSkeleton: React.FC = () => {
  return (
    <div className={s['product-skeleton']}>
      <BackButton />

      <div className={s['product-skeleton__container']}>
        <div className={s['product-skeleton__image']}></div>
        <div className={s['product-skeleton__about']}>
          <div className={s['product-skeleton__title']}></div>
          <div className={s['product-skeleton__description']}></div>
          <div className={s['product-skeleton__price']}></div>
          <div className={s['product-skeleton__buttons-container']}>
            <div className={s['product-skeleton__button']}></div>
            <div className={s['product-skeleton__button']}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
