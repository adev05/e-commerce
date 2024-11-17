import Search from './components/Search';
import Main from './components/Main';
import Filter from './components/Filter';
import ProductList from './components/ProductList';
import s from './Catalog.module.scss';
import React, { createContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import CatalogStore from '@store/CatalogStore';
import { useQueryParamsStoreInit } from '@store/RootStore/hooks/useQueryParamsStoreInit';
import Paginator from '@components/Paginator';

type CatalogContextType = {
  catalogStore: CatalogStore;
};

export const CatalogContext = createContext({} as CatalogContextType);

const Catalog: React.FC = () => {
  console.log('[Render]: Catalog');
  useQueryParamsStoreInit();

  const catalogStore = useLocalObservable(() => new CatalogStore());

  React.useEffect(() => {
    async function fetch() {
      await catalogStore.getCategories();
      await catalogStore.getProducts();
      await catalogStore.getLength();
    }

    fetch();
  }, []);

  const catalogContext = {
    catalogStore,
  };

  return (
    <CatalogContext.Provider value={catalogContext}>
      <div className={s.catalog}>
        <Main />
        <Search />
        <Filter />
        <ProductList />
        <Paginator />
      </div>
    </CatalogContext.Provider>
  );
};

export default React.memo(Catalog);
