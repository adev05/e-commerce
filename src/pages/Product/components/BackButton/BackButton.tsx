import Text from '@components/Text';
import ArrowLeftIcon from '@components/Icons/ArrowLeftIcon';
import { Link } from 'react-router-dom';
import s from './BackButton.module.scss';
import React from 'react';
import { routerUrls } from '@config/routerUrls';

const BackButton: React.FC = () => {
  return (
    <Link to={routerUrls.catalog.mask}>
      <div className={s['product__return-back']}>
        <ArrowLeftIcon />
        <Text view="p-20" tag="h4" color="primary">
          Назад
        </Text>
      </div>
    </Link>
  );
};

export default React.memo(BackButton);
