import React from 'react';
import cn from 'classnames';
import s from './Card.module.scss';
import Text from '../Text';
import ImageCarousel from '@components/ImageCarousel';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  images: string[];
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  images,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  actionSlot,
  onClick,
}) => {
  return (
    <div className={cn(s.card, className)} onClick={onClick}>
      <div className={s.card__header}>
        <ImageCarousel images={images} className={s['card__header-src']} />
      </div>

      <div className={s.card__body}>
        {captionSlot && (
          <Text className={s.card__caption} view="p-14" tag="span" weight="medium" color="secondary">
            {captionSlot}
          </Text>
        )}
        <Text maxLines={2} tag="h4" view="p-20" weight="medium" color="primary" className={s.card__title}>
          {title}
        </Text>
        <Text maxLines={3} tag="p" className={s.card__subtitle} view="p-16" color="secondary">
          {subtitle}
        </Text>
        <div className={s.card__footer}>
          <div className={s.card__action}>{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
