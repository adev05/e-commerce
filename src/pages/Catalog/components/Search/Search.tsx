import Button from 'components/Button';
import Input from 'components/Input';
import s from './Search.module.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Search: React.FC<{ search: string | null; setSearch: (search: string | null) => void }> = ({
  search,
  setSearch,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState<string | null>(null);

  React.useEffect(() => {
    const search = searchParams.get('search');
    setSearchValue(search);
    setSearch(search);
  }, [searchParams]);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchValue !== search) {
        if (searchValue) {
          searchParams.set('search', searchValue);
          searchParams.delete('page');
        } else {
          searchParams.delete('search');
        }
        setSearch(searchValue);
        setSearchParams(searchParams);
      }
    },
    [searchParams, searchValue, search, setSearch, setSearchParams],
  );

  return (
    <form className={s.search} onSubmit={handleSubmit}>
      <Input value={searchValue ?? ''} onChange={setSearchValue} placeholder="Search product" />
      <Button type="submit">Find now</Button>
    </form>
  );
};

export default React.memo(Search);
