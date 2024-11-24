import React from 'react';
import Text from '@components/Text';
import Button from '@components/Button';
import s from './CartSummary.module.scss';

interface CartSummaryProps {
    totalItems: number;
    totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice }) => {
    return (
        <div className={s.summary}>
            <Text view="p-20" tag="h2">Order Summary</Text>
            <div className={s.summary__content}>
                <div className={s.summary__row}>
                    <Text view="p-16" tag="span" color="secondary">Items:</Text>
                    <Text view="p-16" tag="span">{totalItems}</Text>
                </div>
                <div className={s.summary__row}>
                    <Text view="p-16" tag="span" color="secondary">Total:</Text>
                    <Text view="p-20" tag="span" weight="bold">${totalPrice}</Text>
                </div>
            </div>
            <Button className={s.summary__checkout}>Proceed to Checkout</Button>
        </div>
    );
};

export default CartSummary;