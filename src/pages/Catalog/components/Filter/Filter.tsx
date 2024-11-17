import MultiDropdown, { Option } from '@components/MultiDropdown';
import s from './Filter.module.scss';
import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CatalogContext } from '@pages/Catalog';
import { CATEGORY_ID, PAGE } from '@store/CatalogStore';

const Filter: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { catalogStore } = React.useContext(CatalogContext);
  const { options, setIncluded, setCategoryId } = catalogStore;
  const value = toJS(catalogStore.included);
  const onChange = catalogStore.setIncluded;
  const getTitle = (options: Option[]) => (options.length === 0 ? 'Filter' : options[0].value);

  console.log('[Render]: Filter');

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
  }, [searchParams, options, onChange, setCategoryId, setIncluded]);

  const handleFilterChange = (selectedOption: Option[]) => {
    if (selectedOption.length > 0) {
      searchParams.set(CATEGORY_ID, selectedOption[0].key);
      searchParams.delete(PAGE);
    } else {
      searchParams.delete(CATEGORY_ID);
    }
    setSearchParams(searchParams);

    setIncluded(selectedOption);
    setCategoryId(selectedOption.length > 0 ? selectedOption[0].key : null);

    async function fetch() {
      await catalogStore.getProducts();
      await catalogStore.getLength();
    }

    fetch();

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
});

export default Filter;
