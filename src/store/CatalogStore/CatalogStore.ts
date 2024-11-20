import axios from 'axios';
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { LIMIT } from './config';
import { apiUrls } from '@config/apiUrls';
import { Meta } from '@utils/meta';
import { CategoryItemModel, normalizeProductItem, ProductItem } from '@store/models/Catalog';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collection';
import { Option } from '@components/MultiDropdown';

type PrivateFields =
  | '_list'
  | '_meta'
  | '_length'
  | '_search'
  | '_categories'
  | '_included'
  | '_categoryId'
  | '_currentPage'
  | '_totalPages';

export default class CatalogStore {
  private _list: CollectionModel<number, ProductItem> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _length: number = 0;
  private _search: string | null = null;
  private _categories: CategoryItemModel[] = [];
  private _included: Option[] = [];
  private _categoryId: string | null = null;

  private _currentPage: number = 1;
  private _totalPages: number = 1;

  constructor() {
    makeObservable<CatalogStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _length: observable.ref,
      _search: observable.ref,
      _categories: observable.ref,
      _included: observable.ref,
      _categoryId: observable.ref,
      _currentPage: observable.ref,
      _totalPages: observable.ref,

      list: computed,
      meta: computed,
      length: computed,
      search: computed,
      options: computed,
      included: computed,
      categoryId: computed,
      totalPages: computed,
      currentPage: computed,

      getProducts: action.bound,
      getLength: action.bound,
      getCategories: action.bound,

      setSearch: action.bound,
      setIncluded: action.bound,
      setCategoryId: action.bound,
      setCurrentPage: action.bound,
      setTotalPages: action.bound,
      setList: action.bound,
    });

    reaction(
      () => this._currentPage,
      (page) => {
        console.log('setCurrentPage reaction', page);
        Promise.all([this.getProducts(), this.getLength()]);
      },
    );
  }

  get list(): ProductItem[] {
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

  get categoryId(): string | null {
    return this._categoryId;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  setSearch(search: string | null) {
    if (this._search === search) return;

    this._search = search;
    console.log('setSearch', search);
  }

  setIncluded(value: Option[]) {
    if (this._included[0]?.key === value[0]?.key) return;
    console.log('setIncluded', value, this._included[0]?.key);
    this._included = value;
  }

  setCategoryId(categoryId: string | null) {
    if (this._categoryId === categoryId) return;
    console.log('setCategoryId', categoryId);
    this._categoryId = categoryId;
  }

  setCurrentPage(page: number) {
    console.log('setCurrentPage', { page });
    if (page != this._currentPage) {
      this._currentPage = page;
    }
  }

  setTotalPages(totalPages: number) {
    this._totalPages = totalPages;
  }

  setList(list: ProductItem[]) {
    this._list = normalizeCollection(list, (item) => item.id);
    console.log('setList:', this._list, this.list);
  }

  async getProducts() {
    console.log('getProducts called!', this._search, this._categoryId, this._currentPage, this._included, this._meta);
    if (this._meta === Meta.loading) return;
    this._meta = Meta.loading;

    try {
      const response = await axios({
        url: `${apiUrls.withBaseUrl(apiUrls.products.list)}`,
        params: {
          offset: LIMIT * (this._currentPage - 1),
          limit: LIMIT,
          title: this._search,
          categoryId: this._categoryId,
        },
      });
      runInAction(() => {
        if (response.status === 200) {
          try {
            const list: ProductItem[] = [];
            for (const item of response.data) {
              list.push(normalizeProductItem(item));
            }
            this._meta = Meta.success;
            this.setList(list);
          } catch (error: unknown) {
            this._meta = Meta.error;
            if (error instanceof Error) {
              console.error(error.message);
            }
          }
        } else {
          this._meta = Meta.error;
        }
      });
    } catch (error: unknown) {
      this._meta = Meta.error;
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async getLength() {
    console.log('getLength called!', this._meta, this._search);
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;
    try {
      const response = await axios({
        url: `${apiUrls.withBaseUrl(apiUrls.products.list)}`,
        params: {
          offset: 0,
          limit: 0,
          title: this._search,
          categoryId: this._categoryId,
        },
      });
      runInAction(() => {
        if (response.status === 200) {
          this._length = response.data.length;
          this.setTotalPages(Math.ceil(this._length / LIMIT));
          this._meta = Meta.success;
          console.log('getLength:', this._length, 'currentPage:', this._currentPage, 'meta:', this._meta);
        } else {
          this._meta = Meta.error;
        }
      });
    } catch (error: unknown) {
      this._meta = Meta.error;
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async getCategories() {
    if (this._meta === Meta.loading) {
      return;
    }
    this._meta = Meta.loading;
    console.log('getCategories called!', this._meta);
    try {
      const response = await axios({
        url: `${apiUrls.withBaseUrl(apiUrls.categories.list())}`,
      });
      runInAction(() => {
        if (response.status === 200) {
          this._categories = response.data;
          console.log('getCategories:', this._categories, 'meta:', this._meta);
          this._meta = Meta.success;
        } else {
          this._meta = Meta.error;
        }
      });
    } catch (error: unknown) {
      this._meta = Meta.error;
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  // private readonly _qpReaction: IReactionDisposer = reaction(
  //   () => this._currentPage,
  //   (page) => {
  //     console.log('current page has been changed! new page:', page);
  //     this.getProducts();
  //     this.getLength();
  //     // if (this._search !== params.title) {
  //     //   console.log('params.title has been updated!', params.title, this._search);
  //     //   this.setSearch((params.title as string) || null);
  //     //   this.getProducts();
  //     //   this.getLength();
  //     // }
  //   },
  // );

  // destroy(): void {
  //   this._qpReaction();
  // }
}
