import React from 'react';
import { CartItem as CartItemType } from '@store/CartStore/types';
import Text from '@components/Text';
import Button from '@components/Button';
import s from './CartItem.module.scss';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (quantity: number) => void;
    onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className={s.item}>
            <img src={item.image} alt={item.title} className={s.item__image} />
            <div className={s.item__content}>
                <Text view="p-20" tag="h3">{item.title}</Text>
                <div className={s.item__actions}>
                    <div className={s.item__quantity}>
                        <Button
                            variant="secondary"
                            onClick={() => onUpdateQuantity(item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            -
                        </Button>
                        <Text view="p-20" tag="span">{item.quantity}</Text>
                        <Button
                            variant="secondary"
                            onClick={() => onUpdateQuantity(item.quantity + 1)}
                            disabled={item.quantity >= 10}
                        >
                            +
                        </Button>
                    </div>
                    <Text view="p-20" tag="span" weight="bold">${item.price * item.quantity}</Text>
                    <Button variant="secondary" onClick={onRemove}>Remove</Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;