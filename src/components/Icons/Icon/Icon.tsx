import * as React from 'react';
import './Icon.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';

  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className = '',
  color,
  width = 24,
  height = 24,
  children,
  ...props
}) => {
  return (
    <svg
      className={`${className} ${color ? 'icon-' + color : ''}`}
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
