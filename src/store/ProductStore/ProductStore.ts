import axios from 'axios';
import { apiUrls } from 'config/apiUrls';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getInitialProductItemModel, normalizeProductItem, ProductItemModel } from 'store/models/Catalog';
import { Meta } from 'utils/meta';

type PrivateFields = '_product' | '_meta';

export default class ProductStore {
  private _product: ProductItemModel = getInitialProductItemModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      _meta: observable,
      meta: computed,
      product: computed,
      getProduct: action,
    });
  }

  get product(): ProductItemModel {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProduct(id: number) {
    this._meta = Meta.loading;
    this._product = getInitialProductItemModel();

    try {
      const response = await axios({
        url: `${apiUrls.baseUrl}${apiUrls.products.detail(id)}`,
      });
      runInAction(() => {
        if (response.status === 200) {
          this._product = normalizeProductItem(response.data);
          this._meta = Meta.success;
        } else {
          this._meta = Meta.error;
        }
      });
    } catch (error) {
      this._meta = Meta.error;
    }
  }
}
