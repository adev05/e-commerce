import React from 'react';
import cn from 'classnames';
import s from './CheckBox.module.scss';
import CheckIcon from '../Icons/CheckIcon';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, className, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.checked);
  };

  return (
    <label className={cn(s['checkbox'], props.disabled && s.checkbox_disabled, className)}>
      <input {...props} type="checkbox" checked={checked} onChange={handleChange} className={s.checkbox__controller} />
      <CheckIcon className={s.checkbox__check} width={40} height={40} />
    </label>
  );
};

export default CheckBox;
