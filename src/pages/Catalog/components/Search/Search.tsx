import Button from 'components/Button';
import Input from 'components/Input';
import s from './Search.module.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE, SEARCH } from 'store/CatalogStore';
import { observer } from 'mobx-react-lite';
import { CatalogContext } from 'pages/Catalog';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { catalogStore } = React.useContext(CatalogContext);
  const { search, setSearch } = catalogStore;

  console.log('[Render]: Search');

  React.useEffect(() => {
    const searchValue = searchParams.get(SEARCH);
    setSearch(searchValue);
  }, []);

  const searchSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log({ search });
      if (search) {
        searchParams.set(SEARCH, search);
      } else {
        searchParams.delete(SEARCH);
      }
      searchParams.delete(PAGE);
      catalogStore.getProducts();
      setSearchParams(searchParams);
    },
    [search, searchParams],
  );

  return (
    <form className={s.search} onSubmit={searchSubmit}>
      <Input value={search || ''} onChange={setSearch} placeholder="Search product" />
      <Button type="submit">Find now</Button>
    </form>
  );
};

export default observer(Search);
