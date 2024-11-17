import axios from 'axios';
import { apiUrls } from '@config/apiUrls';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { normalizeProductItem, ProductItem } from '@store/models/Catalog';
import { Meta } from '@utils/meta';

type PrivateFields = '_productId' | '_categoryId' | '_product' | '_relatedProducts' | '_meta';

export default class ProductStore {
  private _productId: number | null = null;
  private _categoryId: number | null = null;
  private _product: ProductItem | null = null;
  private _relatedProducts: ProductItem[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _productId: observable.ref,
      _categoryId: observable.ref,
      _product: observable.ref,
      _relatedProducts: observable.ref,
      _meta: observable,

      productId: computed,
      categoryId: computed,
      product: computed,
      relatedProducts: computed,
      meta: computed,

      getProduct: action,
      setProductId: action,
      getRelatedProducts: action,
    });
  }

  get productId(): number | null {
    return this._productId;
  }

  get categoryId(): number | null {
    return this._categoryId;
  }

  get product(): ProductItem | null {
    return this._product;
  }

  get relatedProducts(): ProductItem[] {
    return this._relatedProducts;
  }

  get meta(): Meta {
    return this._meta;
  }

  setProductId(id: number) {
    this._productId = id;
  }

  async getProduct() {
    if (this._meta === Meta.loading || !this._productId) return;

    console.info('getProduct called!', this._meta);

    this._meta = Meta.loading;

    try {
      const response = await axios.get(`${apiUrls.baseUrl}${apiUrls.products.detail(this._productId)}`);

      runInAction(() => {
        if (response.status === 200) {
          this._product = normalizeProductItem(response.data);
          console.log('normalizedProduct:', this._product);
          this._categoryId = this._product.category.id;
          this._meta = Meta.success;
          this.getRelatedProducts();
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

  async getRelatedProducts() {
    if (this._meta === Meta.loading || !this._categoryId) return;

    this._meta = Meta.loading;
    console.log('getRelatedProducts called!', this._meta);

    try {
      const response = await axios({
        url: `${apiUrls.baseUrl}${apiUrls.products.list}`,
        params: {
          categoryId: this._categoryId,
          offset: 0,
          limit: 5,
        },
      });

      runInAction(() => {
        if (response.status === 200) {
          this._relatedProducts = response.data
            .filter((product: ProductItem) => product.id !== this._productId)
            .slice(0, 4);
          console.log(this._relatedProducts);
          this._meta = Meta.success;
        } else {
          this._meta = Meta.error;
        }
      });
    } catch (error) {
      this._meta = Meta.error;
      console.log(error);
    }
  }
}
