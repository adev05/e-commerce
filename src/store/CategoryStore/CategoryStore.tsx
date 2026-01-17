import { Option } from '@components/MultiDropdown';
import { apiUrls } from '@config/apiUrls';
import { CategoryItem, normalizeCategoryItem } from '@store/models/Catalog';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@store/models/shared/collection';
import { Meta } from '@utils/meta';
import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

type PrivateFields = '_list' | '_included' | '_meta' | '_categoryId';

export default class CategoryStore {
  private _list: CollectionModel<number, CategoryItem> = getInitialCollectionModel();
  private _included: Option[] = [];
  private _meta: Meta = Meta.initial;
  private _categoryId: string | null = null;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _list: observable.ref,
      _included: observable.ref,
      _meta: observable,
      _categoryId: observable.ref,

      list: computed,
      options: computed,
      included: computed,
      meta: computed,
      categoryId: computed,

      setIncluded: action.bound,
      setCategoryId: action.bound,

      getCategories: action.bound,
    });
  }

  get list(): CategoryItem[] {
    return linearizeCollection(this._list);
  }

  get options(): Option[] {
    return this._list.order.map((id) => ({
      key: String(id),
      value: this._list.entities[id].name,
    }));
  }

  get included(): Option[] {
    return this._included;
  }

  get meta(): Meta {
    return this._meta;
  }

  get categoryId(): string | null {
    return this._categoryId;
  }

  setIncluded(included: Option[]) {
    this._included = included;
  }

  setCategoryId(categoryId: string | null) {
    if (categoryId === this._categoryId) return;
    this._categoryId = categoryId;
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
          try {
            const list: CategoryItem[] = [];
            for (const item of response.data) {
              list.push(normalizeCategoryItem(item));
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