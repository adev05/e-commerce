import { Link, useParams } from 'react-router-dom';
import s from './Product.module.scss';
import ArrowLeftIcon from 'components/Icons/ArrowLeftIcon';
import Text from 'components/Text';
import Button from 'components/Button';
import { routerUrls } from 'config/routerUrls';
import { observer, useLocalObservable } from 'mobx-react-lite';
import ProductStore from 'store/ProductStore';
import React from 'react';
import { Meta } from 'utils/meta';

const Product: React.FC = () => {
  const { id } = useParams();

  const productStore = useLocalObservable(() => new ProductStore());

  React.useEffect(() => {
    productStore.getProduct(Number(id));
  }, [productStore, id]);

  if (productStore.meta === Meta.loading) {
    return (
      <div className={s.product}>
        <div className={s['product__return-back']}>
          <ArrowLeftIcon />
          <Text view="p-20" tag="h4" color="primary">
            Назад
          </Text>
        </div>

        <div className={s.product__container}>
          <div className={s['product__image-placeholder']}></div>
          <div className={s.product__about}>
            <div className={s['product-skeleton__title']}></div>
            <div className={s['product-skeleton__description']}></div>
            <div className={s['product-skeleton__description']}></div>
            <div className={s['product-skeleton__description']}></div>
            <div className={s['product-skeleton__price']}></div>

            <div className={s['product__buttons-container']}>
              <Button>Buy now</Button>
              <Button>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.product}>
      <Link to={routerUrls.catalog.mask}>
        <div className={s['product__return-back']}>
          <ArrowLeftIcon />
          <Text view="p-20" tag="h4" color="primary">
            Назад
          </Text>
        </div>
      </Link>

      <div className={s.product__container}>
        {productStore.product?.images.length ? (
          <img src={productStore.product?.images[0]} alt="card-img" className={s.product__image} />
        ) : (
          <div className={s['product__image-placeholder']}></div>
        )}
        <div className={s.product__about}>
          {productStore.product?.title && (
            <Text view="title" tag="h1" color="primary">
              {productStore.product.title}
            </Text>
          )}
          {productStore.product?.description && (
            <Text view="p-20" tag="h4" color="secondary">
              {productStore.product.description}
            </Text>
          )}
          {productStore.product?.price && (
            <Text view="title" tag="h1" className={s.product__price}>{`$${productStore.product?.price}`}</Text>
          )}

          <div className={s['product__buttons-container']}>
            <Button>Buy now</Button>
            <Button>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Product);
