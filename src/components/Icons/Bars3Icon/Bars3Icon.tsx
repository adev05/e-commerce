import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const Bars3Icon: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </Icon>
  );
};

export default Bars3Icon;
