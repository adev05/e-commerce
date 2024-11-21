import Button from '@components/Button';
import React from 'react';
import s from './AddToCartButton.module.scss';

const AddToCartButton: React.FC<{ id: number; price: number }> = ({ id, price }) => {
  const [clicked, setClicked] = React.useState(false);
  const [amount, setAmount] = React.useState(1);
  return clicked ? (
    <div className={s['button-container']}>
      <Button
        className={s.button}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (amount > 1) setAmount((currentAmount) => currentAmount - 1);
          else setClicked(false);
        }}
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
        {amount} x {price}$
      </Button>
      <Button
        className={s.button}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (amount < 10) setAmount((currentAmount) => currentAmount + 1);
        }}
        variant="secondary"
      >
        +
      </Button>
    </div>
  ) : (
    <Button
      className={s['button-full']}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setClicked(true);
      }}
    >
      {price}$
    </Button>
  );
};
export default AddToCartButton;
