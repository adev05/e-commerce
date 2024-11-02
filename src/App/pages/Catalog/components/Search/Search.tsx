import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';
import './Search.scss';

const Search = () => {
  return (
    <div className="search">
      <Input value="" onChange={() => console.log()} placeholder="Search product" />
      <Button>Find now</Button>
    </div>
  );
};

export default Search;
