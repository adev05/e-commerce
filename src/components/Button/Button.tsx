import cn from 'classnames';
import * as React from 'react';
import s from './Button.module.scss';
import Text from '../Text';
import Loader from '../Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Вариант кнопки */
  variant?: 'primary' | 'secondary' | 'outline';
};

const Button: React.FC<ButtonProps> = React.memo(
  ({ className, loading, children = null, variant = 'primary', ...props }) => {
    return (
      <button
        {...props}
        className={cn(className, s.button, s[`button_${variant}`], props.disabled && s.button_disabled)}
        disabled={props.disabled || loading}
      >
        {loading && <Loader className={s.button__loader} size="s" />}
        <Text className={s.button__text} tag="span" view="button">
          {children}
        </Text>
      </button>
    );
  },
);

export default Button;
