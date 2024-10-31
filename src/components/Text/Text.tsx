import * as React from 'react';
import './Text.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag, weight, children, color, maxLines }) => {
  if (tag === 'h1') {
    return (
      <h1
        className={`${className ? className : ''}${view ? ' text-' + view : ''}${
          color ? ' text-' + color : ' text-primary'
        }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
        style={maxLines ? { WebkitLineClamp: maxLines } : {}}
      >
        {children}
      </h1>
    );
  }
  if (tag === 'h2') {
    return (
      <h2
        className={`${className ? className : ''}${view ? ' text-' + view : ''}${
          color ? ' text-' + color : ' text-primary'
        }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
        style={maxLines ? { WebkitLineClamp: maxLines } : {}}
      >
        {children}
      </h2>
    );
  }
  if (tag === 'h3') {
    return (
      <h3
        className={`${className ? className : ''}${view ? ' text-' + view : ''}${
          color ? ' text-' + color : ' text-primary'
        }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
        style={maxLines ? { WebkitLineClamp: maxLines } : {}}
      >
        {children}
      </h3>
    );
  }
  if (tag === 'h4') {
    return (
      <h4
        className={`${className ? className : ''}${view ? ' text-' + view : ''}${
          color ? ' text-' + color : ' text-primary'
        }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
        style={maxLines ? { WebkitLineClamp: maxLines } : {}}
      >
        {children}
      </h4>
    );
  }
  if (tag === 'h5') {
    return (
      <h5
        className={`${className ? className : ''}${view ? ' text-' + view : ''}${
          color ? ' text-' + color : ' text-primary'
        }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
        style={maxLines ? { WebkitLineClamp: maxLines } : {}}
      >
        {children}
      </h5>
    );
  }
  if (tag === 'h6') {
    return (
      <h6
        className={`${className ? className : ''}${view ? ' text-' + view : ''}${
          color ? ' text-' + color : ' text-primary'
        }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
        style={maxLines ? { WebkitLineClamp: maxLines } : {}}
      >
        {children}
      </h6>
    );
  }
  if (tag === 'div') {
    return (
      <div
        className={`${className ? className : ''}${view ? ' text-' + view : ''}${
          color ? ' text-' + color : ' text-primary'
        }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
        style={maxLines ? { WebkitLineClamp: maxLines } : {}}
      >
        {children}
      </div>
    );
  }
  if (tag === 'p') {
    return (
      <p
        className={`${className ? className : ''}${view ? ' text-' + view : ''}${
          color ? ' text-' + color : ' text-primary'
        }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
        style={maxLines ? { WebkitLineClamp: maxLines } : {}}
      >
        {children}
      </p>
    );
  }
  if (tag === 'span') {
    return (
      <span
        className={`${className ? className : ''}${view ? ' text-' + view : ''}${
          color ? ' text-' + color : ' text-primary'
        }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
        style={maxLines ? { WebkitLineClamp: maxLines } : {}}
      >
        {children}
      </span>
    );
  }
  return (
    <p
      className={`${className ? className : ''}${view ? ' text-' + view : ''}${
        color ? ' text-' + color : ' text-primary'
      }${maxLines ? ' text-line-clamp' : ''}${weight ? ' text-' + weight : ''}`}
      style={maxLines ? { WebkitLineClamp: maxLines } : {}}
    >
      {children}
    </p>
  );
};

export default Text;
