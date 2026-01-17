import React from 'react';
import s from '../ProductList/ProductList.module.scss';
import Text from '@components/Text';
import CardSkeleton from '@components/CardSkeleton';
import { LIMIT } from '@store/CatalogStore';

const ProductListSkeleton: React.FC = () => {
  return (
    <div className={s['product-list']}>
      <div className={s['product-list__title']}>
        <Text view="title" tag="h1">
          Total Product
        </Text>
      </div>
      <div className={s['product-list__cards']}>
        {[...Array(LIMIT)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductListSkeleton;
