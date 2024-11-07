import { useEffect, useState } from 'react';
import Card from 'components/Card';
import Text from 'components/Text';
import s from './ProductList.module.scss';
import axios from 'axios';
import Button from 'components/Button';
import Paginator from 'components/Paginator';
import { Link } from 'react-router-dom';
import { routerUrls } from 'config/routes';
import { apiUrls } from 'config/apiUrls';
import CardSkeleton from 'components/CardSkeleton';

export type CardType = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
};

const LIMIT = 15;

const ProductList: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [cardsLength, setCardsLength] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [cardsResult, lengthResult] = await Promise.all([
          axios({
            url: `${apiUrls.baseUrl}${apiUrls.products.list(offset, LIMIT)}`,
          }),
          axios({
            url: `${apiUrls.baseUrl}${apiUrls.products.list(0, 0)}`,
          }),
        ]);

        if (cardsResult.status !== 200 || lengthResult.status !== 200) {
          throw new Error('Failed to fetch data');
        }

        if (cardsResult.data) {
          setCards(cardsResult.data);
        } else {
          setError('Invalid data format for cards');
          throw new Error('Invalid data format for cards');
        }

        if (lengthResult.data) {
          const length = lengthResult.data.length;
          setCardsLength(length);
          setTotalPages(Math.ceil(length / LIMIT));
        } else {
          setError('Invalid data format for cards length');
          throw new Error('Invalid data format for cards length');
        }
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * LIMIT);
  };

  if (loading) {
    return (
      <div className={s['product-list']}>
        <div className={s['product-list__title']}>
          <Text view="title" tag="h1">
            Total Product
          </Text>
          <Text view="p-20" tag="h4" weight="bold" color="accent">
            {cardsLength}
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={s['product-list']}>
      <div className={s['product-list__title']}>
        <Text view="title" tag="h1">
          Total Product
        </Text>
        <Text view="p-20" tag="h4" weight="bold" color="accent">
          {cardsLength}
        </Text>
      </div>

      <div className={s['product-list__cards']}>
        {cards.map((card) => (
          <Link to={routerUrls.productDetail.create(card.id)} key={card.id}>
            <Card
              captionSlot={card.category.name}
              image={card.images[0]}
              title={card.title}
              subtitle={card.description}
              contentSlot={`$${card.price}`}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </Link>
        ))}
      </div>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxVisiblePages={3}
      />
    </div>
  );
};

export default ProductList;
