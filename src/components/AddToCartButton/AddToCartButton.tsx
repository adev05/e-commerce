import Button from '@components/Button';
import React from 'react';
import s from './AddToCartButton.module.scss';
import cartStore from '@store/CartStore';
import { observer } from 'mobx-react-lite';

interface AddToCartButtonProps {
  id: number;
  price: number;
  title: string;
  image: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = observer(({ id, price, title, image }) => {
  const cartItem = cartStore.items.find(item => item.id === id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartStore.addItem({ id, price, title, image });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 0) {
      cartStore.updateQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity < 10) {
      cartStore.updateQuantity(id, quantity + 1);
    }
  };

  return quantity > 0 ? (
    <div className={s['button-container']}>
      <Button
        className={s.button}
        onClick={handleRemove}
        variant="secondary"
      >
        -
      </Button>
      <Button
        className={s['button-full']}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        variant="secondary"
      >
        {quantity} x {price}$
      </Button>
      <Button
        className={s.button}
        onClick={handleIncrease}
        variant="secondary"
      >
        +
      </Button>
    </div>
  ) : (
    <Button
      className={s['button-full']}
      onClick={handleAdd}
    >
      {price}$
    </Button>
  );
});

export default AddToCartButton;
