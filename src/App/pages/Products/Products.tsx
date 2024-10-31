import Search from './components/Search';
import Main from './components/Main';
import Filter from './components/Filter';
import './Products.scss';
import ProductList from './components/ProductList';

const Products = () => {
  return (
    <div className="products">
      <Main />
      <Search />
      <Filter />
      <ProductList />
    </div>
  );
};

export default Products;
