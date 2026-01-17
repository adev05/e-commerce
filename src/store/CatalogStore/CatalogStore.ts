import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { LIMIT } from './config';
import { apiUrls } from '@config/apiUrls';
import { Meta } from '@utils/meta';
import { normalizeProductItem, ProductItem } from '@store/models/Catalog';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collection';
type PrivateFields =
  | '_list'
  | '_meta';

export default class CatalogStore {
  private _list: CollectionModel<number, ProductItem> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CatalogStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,

      list: computed,
      meta: computed,

      getProducts: action.bound,
    });
  }

  get list(): ProductItem[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProducts(search?: string | null, categoryId?: string | null, offset?: number) {
    console.log('getProducts called!', this._meta);
    if (this._meta === Meta.loading) return;
    this._meta = Meta.loading;

    try {
      const response = await axios({
        url: `${apiUrls.withBaseUrl(apiUrls.products.list)}`,
        params: {
          offset: offset,
          limit: LIMIT,
          title: search,
          categoryId: categoryId,
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
            this._list = normalizeCollection(list, (item) => item.id);
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
}