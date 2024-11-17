import Text from '@components/Text';
import React from 'react';
import s from './RelatedProducts.module.scss';
import { ProductItem } from '@store/models/Catalog';
import { Link } from 'react-router-dom';
import { routerUrls } from '@config/routerUrls';
import Card from '@components/Card';
import Button from '@components/Button';

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

export default RelatedProducts;
