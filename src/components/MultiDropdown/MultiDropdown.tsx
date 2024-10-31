// components/MultiDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import Input from '../Input';
import ArrowDownIcon from '../Icons/ArrowDownIcon';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option) => {
    setFilter('');
    const isSelected = value.some((item) => item.key === option.key);
    const newValue = isSelected ? value.filter((item) => item.key !== option.key) : [...value, option];
    onChange(newValue);
  };

  const filteredOptions = options.filter((option) => option.value.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className={`multi-dropdown${className ? ' ' + className : ''}`} ref={dropdownRef}>
      <Input
        value={isOpen ? filter : value.length === 0 ? '' : getTitle(value)}
        onChange={setFilter}
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
        placeholder={getTitle(value)}
        ref={inputRef}
      />
      {!disabled && isOpen && (
        <ul className="dropdown-options">
          {filteredOptions.map((option) => (
            <li
              key={option.key}
              className={`dropdown-option ${value.some((item) => item.key === option.key) ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
