import Button from '@components/Button';
import Input from '@components/Input';
import s from './Search.module.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE, SEARCH } from '@store/CatalogStore';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import SearchStore from '@store/SearchStore';

const Search: React.FC<{ searchStore: SearchStore }> = observer(({ searchStore }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = React.useMemo(() => searchParams.get(SEARCH) || '', [searchParams]);

  React.useEffect(action(() => {
    if (searchStore.search !== searchValue) {
      searchStore.setSearch(searchValue);
    }
  }), [searchValue, searchStore]);

  const handleSubmit = React.useCallback(
    action((e: React.FormEvent) => {
      e.preventDefault();

      if (searchStore.search) {
        searchParams.set(SEARCH, searchStore.search);
      } else {
        searchParams.delete(SEARCH);
      }
      searchParams.delete(PAGE);
      setSearchParams(searchParams);
    }),
    [searchStore, searchParams, setSearchParams]
  );

  console.log('[Render]: Search');

  return (
    <form className={s.search} onSubmit={handleSubmit}>
      <Input value={searchStore.search} onChange={searchStore.setSearch} placeholder="Search product" />
      <Button type="submit" className={s.search__button}>
        Find now
      </Button>
    </form>
  );
});

export default Search;
