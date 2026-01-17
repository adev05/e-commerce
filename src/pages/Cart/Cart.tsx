import React from 'react';
import { observer } from 'mobx-react-lite';
import Text from '@components/Text';
import s from './Cart.module.scss';
import cartStore from '@store/CartStore';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

const Cart: React.FC = observer(() => {
    if (cartStore.items.length === 0) {
        return (
            <div className={s.cart}>
                <Text view="title" tag="h1">Cart</Text>
                <Text view="p-20" tag="p" color="secondary">Your cart is empty</Text>
            </div>
        );
    }

    return (
        <div className={s.cart}>
            <Text view="title" tag="h1">Cart</Text>
            <div className={s.cart__content}>
                <div className={s.cart__items}>
                    {cartStore.items.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={(quantity) => cartStore.updateQuantity(item.id, quantity)}
                            onRemove={() => cartStore.removeItem(item.id)}
                        />
                    ))}
                </div>
                <CartSummary
                    totalItems={cartStore.totalItems}
                    totalPrice={cartStore.totalPrice}
                />
            </div>
        </div>
    );
});

export default Cart;