import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import s from './Product.module.scss';

import ArrowLeftIcon from 'components/Icons/ArrowLeftIcon';

import Text from 'components/Text';
import Button from 'components/Button';

import { CardType } from '../Catalog/components/ProductList';
import { routerUrls } from 'config/routes';
import { apiUrls } from 'config/apiUrls';

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
          url: `${apiUrls.baseUrl}${apiUrls.products.detail(id)}`,
        });

        if (result.data) {
          setCard(result.data);
          const arrayString = result.data.images.join(',');
          const urls = JSON.parse(`[${arrayString}]`);
          result.data.images = urls;
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div className={s.product}>
      <Link to={routerUrls.root.mask}>
        <div className={s.back}>
          <ArrowLeftIcon />
          <Text view="p-20">Назад</Text>
        </div>
      </Link>

      <div className={s.product__container}>
        <img src={card?.images[0]} alt="card-img" className={s.product__image} />
        <div className={s.product__about}>
          <Text view="title">{card?.title}</Text>
          <Text view="p-20" color="secondary">
            {card?.description}
          </Text>
          <Text view="title" className={s.product__price}>{`$${card?.price}`}</Text>
          <div className={s.product__buttons}>
            <Button>Buy now</Button>
            <Button>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
