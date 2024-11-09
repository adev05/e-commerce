import axios from 'axios';
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import { LIMIT } from './config';
import { apiUrls } from 'config/apiUrls';
import { Meta } from 'utils/meta';
import { CategoryItemModel, normalizeProductItem, ProductItemModel } from 'store/models/Catalog';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared/collection';
import rootStore from 'store/RootStore';
import { Option } from 'components/MultiDropdown';

type PrivateFields = '_list' | '_meta' | '_length' | '_search' | '_categories' | '_included';

export default class CatalogStore {
  private _list: CollectionModel<number, ProductItemModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _length: number = 0;
  private _search: string | null = null;
  private _categories: CategoryItemModel[] = [];
  private _included: Option[] = [];

  constructor() {
    makeObservable<CatalogStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _length: observable.ref,
      _search: observable.ref,
      _categories: observable.ref,
      _included: observable.ref,

      list: computed,
      meta: computed,
      length: computed,
      search: computed,
      options: computed,
      included: computed,

      getProducts: action.bound,
      getLength: action.bound,
      getCategories: action.bound,

      setSearch: action.bound,
      setIncluded: action.bound,
    });
  }

  get list(): ProductItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get length(): number {
    return this._length;
  }

  get search(): string | null {
    return this._search;
  }

  get options(): Option[] {
    return this._categories.map((item) => ({ key: item.id.toString(), value: item.name }));
  }

  get included(): Option[] {
    return this._included;
  }

  setSearch(search: string) {
    this._search = search;
  }

  setIncluded(value: Option[]) {
    this._included = value;
  }

  async getProducts() {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    try {
      const response = await axios({
        url: `${apiUrls.baseUrl}${apiUrls.products.list(0, LIMIT)}`,
        params: {
          title: this._search,
          categoryId: this._included[0]?.key,
        },
      });
      runInAction(() => {
        if (response.status === 200) {
          try {
            const list: ProductItemModel[] = [];
            for (const item of response.data) {
              list.push(normalizeProductItem(item));
            }

            this._meta = Meta.success;
            this._list = normalizeCollection(list, (item) => item.id);
          } catch (error) {
            this._meta = Meta.error;
          }
        } else {
          this._meta = Meta.error;
        }
      });
    } catch (error) {
      this._meta = Meta.error;
      this._list = getInitialCollectionModel();
    }
  }

  async getLength() {
    this._meta = Meta.loading;
    this._length = 0;

    try {
      const response = await axios({
        url: `${apiUrls.baseUrl}${apiUrls.products.list(0, 0)}`,
        params: {
          title: this._search,
          categoryId: this._included[0]?.key,
        },
      });
      runInAction(() => {
        if (response.status === 200) {
          this._length = response.data.length;
          this._meta = Meta.success;
        } else {
          this._meta = Meta.error;
        }
      });
    } catch (error) {
      this._meta = Meta.error;
    }
  }

  async getCategories() {
    this._meta = Meta.loading;
    this._categories = [];

    try {
      const response = await axios({
        url: `${apiUrls.baseUrl}${apiUrls.categories.list()}`,
      });
      runInAction(() => {
        if (response.status === 200) {
          this._categories = response.data;
          this._meta = Meta.success;
        }
      });
    } catch (error) {
      this._meta = Meta.error;
    }
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      this._search = search ?? null;
      console.log('search value change', search);
      this.getProducts();
      this.getLength();
    },
  );

  destroy(): void {
    this._qpReaction();
  }
}
