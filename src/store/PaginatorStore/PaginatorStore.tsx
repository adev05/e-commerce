import { apiUrls } from '@config/apiUrls';
import { LIMIT } from '@store/CatalogStore';
import { Meta } from '@utils/meta';
import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

type PrivateFields = '_currentPage' | '_totalPages' | '_totalItems' | '_meta';

export default class PaginatorStore {
  private _currentPage: number = 1;
  private _totalPages: number = 1;
  private _totalItems: number = 0;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<PaginatorStore, PrivateFields>(this, {
      _currentPage: observable.ref,
      _totalPages: observable.ref,
      _totalItems: observable.ref,
      _meta: observable.ref,

      currentPage: computed,
      totalPages: computed,
      totalItems: computed,
      offset: computed,
      meta: computed,

      setCurrentPage: action.bound,
      setTotalItems: action.bound,

      getLength: action.bound,
    });
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  get totalItems(): number {
    return this._totalItems;
  }

  get offset(): number {
    return LIMIT * (this._currentPage - 1);
  }

  get meta(): Meta {
    return this._meta;
  }

  setCurrentPage(page: number) {
    if (page === this._currentPage) return;
    this._currentPage = page;
  }

  setTotalItems(total: number) {
    this._totalItems = total;
    this._totalPages = Math.ceil(total / LIMIT);
  }

  async getLength(search?: string | null, categoryId?: string | null) {
    if (this._meta === Meta.loading) return;

    this._meta = Meta.loading;
    try {
      const response = await axios({
        url: `${apiUrls.withBaseUrl(apiUrls.products.list)}`,
        params: {
          offset: 0,
          limit: 0,
          title: search,
          categoryId: categoryId,
        },
      });
      runInAction(() => {
        if (response.status === 200) {
          this.setTotalItems(response.data.length);
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
}