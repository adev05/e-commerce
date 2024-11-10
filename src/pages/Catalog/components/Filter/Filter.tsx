import MultiDropdown, { Option } from 'components/MultiDropdown';
import s from './Filter.module.scss';
import { useSearchParams } from 'react-router-dom';
import React from 'react';

const Filter: React.FC<{
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  getTitle: (value: Option[]) => string;
  setIncluded: (value: Option[]) => void;
  setCategoryId: (value: string | null) => void;
}> = ({ options, value, onChange, getTitle, setIncluded, setCategoryId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    setCategoryId(categoryId);
    if (categoryId) {
      const selectedOption = options.filter((option) => option.key === categoryId);
      if (selectedOption.length > 0) {
        onChange(selectedOption);
        setIncluded(selectedOption);
      }
    }
  }, [searchParams, options, onChange]);

  const handleFilterChange = (selectedOption: Option[]) => {
    if (selectedOption.length > 0) {
      searchParams.set('categoryId', selectedOption[0].key);
      searchParams.delete('page');
    } else {
      searchParams.delete('categoryId');
    }
    setSearchParams(searchParams);
    setIncluded(selectedOption);
    setCategoryId(selectedOption.length > 0 ? selectedOption[0].key : null);

    onChange(selectedOption);
  };

  return (
    <MultiDropdown
      className={s.filter}
      options={options}
      value={value}
      onChange={handleFilterChange}
      getTitle={getTitle}
    />
  );
};

export default React.memo(Filter);
