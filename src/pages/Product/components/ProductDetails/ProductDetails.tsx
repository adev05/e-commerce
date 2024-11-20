import React from 'react';
import s from './ProductDetails.module.scss';
import Text from '@components/Text';
import Button from '@components/Button';

const ProductDetails: React.FC<{ images: string[]; title: string; price: number; description: string }> = ({
  images,
  title,
  price,
  description,
}) => {
  return (
    <div className={s.product__container}>
      {images.length ? (
        <img src={images[0]} alt="card-img" className={s.product__image} />
      ) : (
        <div className={s['product__image-placeholder']}></div>
      )}
      <div className={s.product__about}>
        {title && (
          <Text view="title" tag="h1" color="primary">
            {title}
          </Text>
        )}
        {description && (
          <Text view="p-20" tag="h4" color="secondary">
            {description}
          </Text>
        )}
        {price && <Text view="title" tag="h1" className={s.product__price}>{`$${price}`}</Text>}

        <div className={s['product__buttons-container']}>
          <Button>Buy now</Button>
          <Button variant="secondary">Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
