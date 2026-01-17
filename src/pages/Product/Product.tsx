import { Navigate, useParams } from 'react-router-dom';
import s from './Product.module.scss';
import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { Meta } from '@utils/meta';
import ProductSkeleton from './components/ProductSkeleton';
import BackButton from './components/BackButton';
import ProductDetails from './components/ProductDetails';
import RelatedProducts from './components/RelatedProducts';
import { routerUrls } from '@config/routerUrls';
import ProductStore from '@store/ProductStore';

const Product: React.FC = observer(() => {
  const { id } = useParams();

  const productStore = useLocalObservable(() => new ProductStore());

  React.useEffect(() => {
    if (id) {
      productStore.setProductId(Number(id));
      productStore.getProduct();
      window.scrollTo(0, 0);
    }
  }, [productStore, id]);

  if (productStore.meta === Meta.loading) {
    return <ProductSkeleton />;
  }

  if (productStore.meta === Meta.error) {
    return <Navigate to={routerUrls.notFound.create()} />;
  }

  return (
    <div className={s.product}>
      <BackButton />

      {productStore.product && (
        <ProductDetails
          id={productStore.product.id}
          images={productStore.product?.images}
          title={productStore.product?.title}
          price={productStore.product?.price}
          description={productStore.product?.description}
        />
      )}

      {productStore.relatedProducts.length > 0 && <RelatedProducts products={productStore.relatedProducts} />}
    </div>
  );
});

export default Product;
