import cn from 'classnames';
import * as React from 'react';
import s from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
  return (
    <svg
      className={cn(s.loader, s[`loader-size-${size}`], className)}
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
    >
      <path fill="currentColor" />
    </svg>
  );
};

export default Loader;
