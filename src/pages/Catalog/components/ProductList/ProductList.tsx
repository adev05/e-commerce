import Card from 'components/Card';
import Text from 'components/Text';
import s from './ProductList.module.scss';
import Button from 'components/Button';
import { Link, Navigate } from 'react-router-dom';
import { routerUrls } from 'config/routerUrls';
import { LIMIT } from 'store/CatalogStore';
import React from 'react';
import CardSkeleton from 'components/CardSkeleton';
import { Meta } from 'utils/meta';
import { ProductItemModel } from 'store/models/Catalog';

const ProductList: React.FC<{ list: ProductItemModel[]; meta: Meta; length: number }> = ({ list, meta, length }) => {
  if (meta === Meta.loading) {
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
  }

  if (meta === Meta.error) {
    return <Navigate to={routerUrls.notFound.create()} />;
  }

  return (
    <div className={s['product-list']}>
      <div className={s['product-list__title']}>
        <Text view="title" tag="h1">
          Total Product
        </Text>
        <Text view="p-20" tag="h4" weight="bold" color="accent">
          {length}
        </Text>
      </div>

      <div className={s['product-list__cards']}>
        {list.map((product: ProductItemModel) => (
          <Link to={routerUrls.productDetail.create(product.id)} key={product.id}>
            <Card
              captionSlot={product.category.name}
              image={product.images[0]}
              title={product.title}
              subtitle={product.description}
              contentSlot={`$${product.price}`}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductList);
