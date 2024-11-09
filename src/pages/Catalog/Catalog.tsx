import Search from './components/Search';
import Main from './components/Main';
import Filter from './components/Filter';
import ProductList from './components/ProductList';
import s from './Catalog.module.scss';
import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import CatalogStore from 'store/CatalogStore';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';
import { toJS } from 'mobx';
import { Option } from 'components/MultiDropdown';

const Catalog: React.FC = () => {
  useQueryParamsStoreInit();
  const catalogStore = useLocalObservable(() => new CatalogStore());

  React.useEffect(() => {
    catalogStore.getCategories();
  }, [catalogStore]);

  React.useEffect(() => {
    catalogStore.getProducts();
    catalogStore.getLength();
  }, [catalogStore, catalogStore.search, catalogStore.included]);

  return (
    <div className={s.catalog}>
      <Main />
      <Search search={catalogStore.search} setSearch={catalogStore.setSearch} />
      <Filter
        options={catalogStore.options}
        value={toJS(catalogStore.included)}
        onChange={catalogStore.setIncluded}
        getTitle={(options: Option[]) => (options.length === 0 ? 'Filter' : options[0].value)}
      />
      <ProductList list={catalogStore.list} meta={catalogStore.meta} length={catalogStore.length} />
      {/* <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxVisiblePages={3}
      /> */}
    </div>
  );
};

export default observer(Catalog);
