import Button from 'components/Button';
import Input from 'components/Input';
import s from './Search.module.scss';

const Search = () => {
  return (
    <div className={s.search}>
      <Input value="" onChange={() => console.log()} placeholder="Search product" />
      <Button>Find now</Button>
    </div>
  );
};

export default Search;
