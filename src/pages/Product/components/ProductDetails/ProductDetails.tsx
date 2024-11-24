import React from 'react';
import s from './ProductDetails.module.scss';
import Text from '@components/Text';
import Button from '@components/Button';
import imageNotFound from '@assets/images/image-not-found.svg';
import AddToCartButton from '@components/AddToCartButton';

const ProductDetails: React.FC<{
  id: number;
  images: string[];
  title: string;
  price: number;
  description: string
}> = ({
  id,
  images,
  title,
  price,
  description,
}) => {
    const [imageSrc, setImageSrc] = React.useState(images[0]);
    const handleError = () => {
      setImageSrc(imageNotFound);
    };
    return (
      <div className={s.product__container}>
        {images.length ? (
          <img src={imageSrc} alt="card-img" className={s.product__image} onError={handleError} />
        ) : (
          <img src={imageNotFound} alt="card-img" className={s.product__image} />
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
            <AddToCartButton
              id={Number(id)}
              price={price}
              title={title}
              image={images[0]}
            />
          </div>
        </div>
      </div>
    );
  };

export default ProductDetails;
