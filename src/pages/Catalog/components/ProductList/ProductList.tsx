import Card from '@components/Card';
import Text from '@components/Text';
import s from './ProductList.module.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { routerUrls } from '@config/routerUrls';
import React from 'react';
import { Meta } from '@utils/meta';
import { ProductItem } from '@store/models/Catalog';
import { observer } from 'mobx-react-lite';
import ProductListSkeleton from '../ProductListSkeleton';
import AddToCartButton from '@components/AddToCartButton';
import CatalogStore from '@store/CatalogStore';
import PaginatorStore from '@store/PaginatorStore';

const ProductList: React.FC<{ catalogStore: CatalogStore; paginatorStore: PaginatorStore }> = observer(({ catalogStore, paginatorStore }) => {
  const navigate = useNavigate();

  if (catalogStore.meta === Meta.loading) {
    return <ProductListSkeleton />;
  }

  if (catalogStore.meta === Meta.error) {
    return <Navigate to={routerUrls.notFound.create()} />;
  }

  console.log('[Render]: ProductList');

  return (
    <div className={s['product-list']}>
      <div className={s['product-list__title']}>
        <Text view="title" tag="h1">
          Total Product
        </Text>
        <Text view="p-20" tag="h4" weight="bold" color="accent">
          {paginatorStore.totalItems}
        </Text>
      </div>

      <div className={s['product-list__cards']}>
        {catalogStore.list.length === 0 && catalogStore.meta === Meta.success && (
          <Text view="p-20" tag="h4" color="secondary">
            No products found
          </Text>
        )}
        {catalogStore.list.map((product: ProductItem) => (
          <Card
            key={product.id}
            captionSlot={product.category.name}
            images={product.images}
            title={product.title}
            subtitle={product.description}
            contentSlot={`$${product.price}`}
            onClick={() => navigate(routerUrls.productDetail.create(product.id))}
            actionSlot={<AddToCartButton id={product.id} price={product.price} title={product.title} image={product.images[0]} />}
          />
        ))}
      </div>
    </div>
  );
});

export default ProductList;
