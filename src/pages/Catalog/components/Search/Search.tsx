import Button from 'components/Button';
import Input from 'components/Input';
import s from './Search.module.scss';
import React from 'react';

const Search: React.FC<{ search: string | null; setSearch: (search: string) => void }> = ({ search, setSearch }) => {
  const [searchValue, setSearchValue] = React.useState(search ?? '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearch(searchValue ?? '');
  };

  return (
    <form className={s.search} onSubmit={handleSubmit}>
      <Input value={searchValue} onChange={setSearchValue} placeholder="Search product" />
      <Button type="submit">Find now</Button>
    </form>
  );
};

export default React.memo(Search);
