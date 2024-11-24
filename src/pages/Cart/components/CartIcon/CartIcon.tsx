import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cartStore from '@store/CartStore';
import { routerUrls } from '@config/routerUrls';
import s from './CartIcon.module.scss';
import BagIcon from '@components/Icons/BagIcon';


const CartIcon: React.FC = observer(() => {
    return (
        <Link to={routerUrls.cart.create()} className={s.cart}>
            <BagIcon width={24} height={24} />
            {cartStore.totalItems > 0 && (
                <span className={s.cart__badge}>{cartStore.totalItems}</span>
            )}
        </Link>
    );
});

export default CartIcon;