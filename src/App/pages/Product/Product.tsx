import { Link, useParams } from 'react-router-dom';
import './Product.scss';
import ArrowLeftIcon from '../../../components/Icons/ArrowLeftIcon';
import Text from '../../../components/Text';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardType } from '../Products/components/ProductList';
import Button from '../../../components/Button';

const Product = () => {
  const { id } = useParams();
  const [card, setCard] = useState<CardType>();

  useEffect(() => {
    const fetchCard = async () => {
      const result = await axios({
        method: 'get',
        url: `https://api.escuelajs.co/api/v1/products/${id}`,
      });

      setCard(result.data);
    };

    fetchCard();
  });

  return (
    <div className="product">
      <Link to={'/products'}>
        <div className="back">
          <ArrowLeftIcon />
          <Text view="p-20">Назад</Text>
        </div>
      </Link>

      <div className="product-container">
        <img src={card?.images[0]} alt="card-img" className="product-image" />
        <div className="product-about">
          <Text view="title">{card?.title}</Text>
          <Text view="p-20" color="secondary">
            {card?.description}
          </Text>
          <Text view="title" className="product-price">{`$${card?.price}`}</Text>
          <div className="product-buttons">
            <Button>Buy now</Button>
            <Button>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
