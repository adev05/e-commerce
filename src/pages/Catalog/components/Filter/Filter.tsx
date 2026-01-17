import MultiDropdown, { Option } from '@components/MultiDropdown';
import s from './Filter.module.scss';
import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CATEGORY_ID, PAGE } from '@store/CatalogStore';
import CategoryStore from '@store/CategoryStore';

const Filter: React.FC<{ categoryStore: CategoryStore }> = observer(({ categoryStore }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = toJS(categoryStore.included);
  const getTitle = (options: Option[]) => (options.length === 0 ? 'Filter' : options[0].value);

  console.log('[Render]: Filter');

  React.useEffect(
    action(() => {
      categoryStore.getCategories();
    }),
    [],
  );

  React.useEffect(
    action(() => {
      const categoryId = searchParams.get(CATEGORY_ID);
      categoryStore.setCategoryId(categoryId);
      if (categoryId) {
        const selectedOption = categoryStore.options.filter((option) => option.key === categoryId);
        if (selectedOption.length > 0) {
          categoryStore.setIncluded(selectedOption);
        }
      }
    }),
    [searchParams, categoryStore.options, categoryStore.setCategoryId, categoryStore.setIncluded],
  );

  const handleFilterChange = React.useCallback((selectedOption: Option[]) => {
    if (selectedOption.length > 0) {
      searchParams.set(CATEGORY_ID, selectedOption[0].key);
      searchParams.delete(PAGE);
    } else {
      searchParams.delete(CATEGORY_ID);
    }
    setSearchParams(searchParams);
    categoryStore.setIncluded(selectedOption);
    categoryStore.setCategoryId(selectedOption.length > 0 ? selectedOption[0].key : null);
  }, [searchParams, categoryStore, setSearchParams]);

  return (
    <MultiDropdown
      className={s.filter}
      options={categoryStore.options}
      value={value}
      onChange={handleFilterChange}
      getTitle={getTitle}
    />
  );
});

export default Filter;
