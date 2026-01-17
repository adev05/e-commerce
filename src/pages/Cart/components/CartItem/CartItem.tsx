import React from 'react';
import { CartItem as CartItemType } from '@store/CartStore/types';
import Text from '@components/Text';
import Button from '@components/Button';
import s from './CartItem.module.scss';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (quantity: number) => void;
    onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = observer(({ item, onUpdateQuantity, onRemove }) => {
    const navigate = useNavigate();

    const productId = React.useMemo(() => item.id, [item.id]);

    const handleProductClick = React.useCallback(() => {
        navigate(`/product/${productId}`);
    }, [navigate, productId]);

    return (
        <div className={s.item}>
            <img src={item.image} alt={item.title} className={s.item__image} onClick={handleProductClick} />
            <div className={s.item__content}>
                <Text view="p-20" tag="h3">{item.title}</Text>
                <Text view="p-20" tag="span" weight="bold">${item.price * item.quantity}</Text>
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

                </div>
                <Button variant="secondary" onClick={onRemove}>Remove</Button>
            </div>
        </div>
    );
});

export default CartItem;