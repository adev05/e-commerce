import React from 'react';
import s from './NotFound.module.scss';
import Text from '@components/Text';

const NotFound: React.FC = () => {
  return (
    <div className={s['not-found']}>
      <Text view="title" tag="h1">
        404
      </Text>
      <Text view="p-20" tag="h4" color="secondary">
        Page not found
      </Text>
    </div>
  );
};

export default NotFound;
