import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import s from './Product.module.scss';

import ArrowLeftIcon from 'components/Icons/ArrowLeftIcon';

import Text from 'components/Text';
import Button from 'components/Button';

import { CardType } from '../Catalog/components/ProductList';
import { routerUrls } from 'config/routes';
import { apiUrls } from 'config/apiUrls';
import ProductSkeleton from './components/ProductSkeleton';

const Product: React.FC = () => {
  const { id } = useParams();
  const [card, setCard] = useState<CardType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await axios({
          url: `${apiUrls.baseUrl}${apiUrls.products.detail(Number(id))}`,
        });

        if (result.data) {
          setCard(result.data);
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        setError('Error fetching cards');
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <Navigate to={routerUrls.notFound.create()} replace />;
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
        {card?.images.length ? (
          <img src={card?.images[0]} alt="card-img" className={s.product__image} />
        ) : (
          <div className={s['product__image-placeholder']}></div>
        )}
        <div className={s.product__about}>
          {card?.title && (
            <Text view="title" tag="h1" color="primary">
              {card.title}
            </Text>
          )}
          {card?.description && (
            <Text view="p-20" tag="h4" color="secondary">
              {card.description}
            </Text>
          )}
          {card?.price && <Text view="title" tag="h1" className={s.product__price}>{`$${card?.price}`}</Text>}

          <div className={s['product__buttons-container']}>
            <Button>Buy now</Button>
            <Button>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
