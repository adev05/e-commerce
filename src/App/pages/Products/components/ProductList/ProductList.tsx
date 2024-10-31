import { useEffect, useState } from 'react';
import Card from '../../../../../components/Card';
import Text from '../../../../../components/Text';
import './ProductList.scss';
import axios from 'axios';
import Button from '../../../../../components/Button';
import Paginator from '../../../../../components/Paginator';
import { Link } from 'react-router-dom';

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

const LIMIT = 12;

const ProductList = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [cardsLength, setCardsLength] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchCards = async () => {
      const result = await axios({
        method: 'get',
        url: `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${LIMIT}`,
      });

      setCards(result.data);
    };

    const fetchLength = async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.escuelajs.co/api/v1/products',
      });

      const length = result.data.length;
      setCardsLength(length);
      setTotalPages(Math.ceil(length / LIMIT));
    };

    fetchCards();
    fetchLength();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      const result = await axios({
        method: 'get',
        url: `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${LIMIT}`,
      });

      setCards(result.data);
    };

    fetchCards();
  }, [offset]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * LIMIT);
  };

  return (
    <div className="product-list">
      <div className="title">
        <Text view="title">Total Product</Text>
        <Text view="p-20" weight="bold" color="accent">
          {cardsLength}
        </Text>
      </div>
      <div className="cards">
        {cards.map((card) => (
          <Link to={`/product/${card.id}`} key={card.id}>
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
