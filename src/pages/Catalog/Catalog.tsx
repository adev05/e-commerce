import Search from './components/Search';
import Main from './components/Main';
import Filter from './components/Filter';
import ProductList from './components/ProductList';
import s from './Catalog.module.scss';

const Catalog: React.FC = () => {
  return (
    <div className={s.catalog}>
      <Main />
      <Search />
      <Filter />
      <ProductList />
    </div>
  );
};

export default Catalog;
