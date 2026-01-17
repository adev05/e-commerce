import Text from '@components/Text';
import React from 'react';
import s from './RelatedProducts.module.scss';
import { ProductItem } from '@store/models/Catalog';
import { Link } from 'react-router-dom';
import { routerUrls } from '@config/routerUrls';
import Card from '@components/Card';
import AddToCartButton from '@components/AddToCartButton';

const RelatedProducts: React.FC<{ products: ProductItem[] }> = ({ products }) => {
  return (
    <div className={s['related-products']}>
      <Text view="title" tag="h1">
        Related Items
      </Text>
      <div className={s['related-products__cards']}>
        {products.map((product) => (
          <Link to={routerUrls.productDetail.create(product.id)} key={product.id}>
            <Card
              captionSlot={product.category.name}
              images={product.images}
              title={product.title}
              subtitle={product.description}
              contentSlot={`$${product.price}`}
              actionSlot={<AddToCartButton id={product.id} price={product.price} title={product.title} image={product.images[0]} />}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
