import React from 'react';
import './Input.scss';
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <div className={`input${className ? ' ' + className : ''}`}>
        <input ref={ref} value={value} type="text" onChange={handleChange} {...props} />
        {afterSlot && <div className="input-icon">{afterSlot}</div>}
      </div>
    );
  },
);

export default Input;
