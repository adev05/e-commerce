import ArrowLeftIcon from 'components/Icons/ArrowLeftIcon';
import s from './ProductSkeleton.module.scss';
import Text from 'components/Text';

const ProductSkeleton: React.FC = () => {
  return (
    <div className={s['product-skeleton']}>
      <div className={s['product-skeleton__return-back']}>
        <ArrowLeftIcon />
        <Text view="p-20" tag="h4" color="primary">
          Назад
        </Text>
      </div>

      <div className={s['product-skeleton__container']}>
        <div className={s['product-skeleton__image']}></div>
        <div className={s['product-skeleton__about']}>
          <div className={s['product-skeleton__title']}></div>
          <div className={s['product-skeleton__description']}></div>
          <div className={s['product-skeleton__price']}></div>
          <div className={s['product-skeleton__buttons-container']}>
            <div className={s['product-skeleton__button']}></div>
            <div className={s['product-skeleton__button']}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
