import Search from './components/Search';
import Main from './components/Main';
import Filter from './components/Filter';
import ProductList from './components/ProductList';
import s from './Catalog.module.scss';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Paginator from '@components/Paginator';
import CategoryStore from '@store/CategoryStore';
import CatalogStore, { SEARCH } from '@store/CatalogStore';
import { action } from 'mobx';
import SearchStore from '@store/SearchStore';
import { useSearchParams } from 'react-router-dom';
import PaginatorStore from '@store/PaginatorStore';

const Catalog: React.FC = observer(() => {
  console.log('[Render]: Catalog');

  const catalogStore = React.useMemo(() => new CatalogStore(), []);
  const categoryStore = React.useMemo(() => new CategoryStore(), []);
  const searchStore = React.useMemo(() => new SearchStore(), []);
  const paginatorStore = React.useMemo(() => new PaginatorStore(), []);

  const [searchParams] = useSearchParams();
  const searchQuery = React.useMemo(() => searchParams.get(SEARCH) || '', [searchParams]);

  React.useEffect(action(() => {
    catalogStore.getProducts(searchQuery, categoryStore.categoryId, paginatorStore.offset);
    paginatorStore.getLength(searchQuery, categoryStore.categoryId);
  }), [searchQuery, categoryStore.categoryId, paginatorStore.currentPage]);

  return (
    <div className={s.catalog}>
      <Main />
      <Search searchStore={searchStore} />
      <Filter categoryStore={categoryStore} />
      <ProductList catalogStore={catalogStore} paginatorStore={paginatorStore} />
      <Paginator paginatorStore={paginatorStore} />
    </div>
  );
});

export default Catalog;
