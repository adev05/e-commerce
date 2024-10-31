import React from 'react';
import Text from '../Text';
import './Card.scss';
export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
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
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={`${className} card`} onClick={onClick}>
      <img src={image} alt="card-img" className="card-image" />
      <div className="card-body">
        <div className="card-body-top">
          {captionSlot ? (
            <Text view="p-14" color="secondary">
              {captionSlot}
            </Text>
          ) : (
            ''
          )}
          <Text view="p-20" weight="medium" color="primary" className="card-title">
            {title}
          </Text>
          <Text view="p-16" color="secondary" className="card-subtitle">
            {subtitle}
          </Text>
        </div>
        <div className="card-body-bottom">
          {contentSlot ? (
            <Text view="p-18" weight="bold" color="primary">
              {contentSlot}
            </Text>
          ) : (
            ''
          )}
          {actionSlot && <div className="ml-auto">{actionSlot}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
