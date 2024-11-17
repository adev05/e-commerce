import { action, computed, makeObservable, observable } from 'mobx';
import { SetURLSearchParams } from 'react-router-dom';
import { LIMIT, PAGE } from '@store/CatalogStore';

type PrivateFields = '_curPage' | '_totalPages';

export default class PaginatorStore {
  private _curPage: number;
  private _totalPages: number = 0;
  private _pagesToShow: number;
  private _searchParams: URLSearchParams;
  private _setSearchParams: SetURLSearchParams;

  constructor(
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams,
    itemsLength: number,
    pagesToShow: number = 3,
  ) {
    makeObservable<PaginatorStore, PrivateFields>(this, {
      _curPage: observable,
      _totalPages: observable,
      curPage: computed,
      totalPages: computed,
      startEndPages: computed,
      goToPage: action,
      nextPage: action.bound,
      prevPage: action.bound,
    });
    this._curPage = parseInt(searchParams.get(PAGE) || '1');
    this._totalPages = Math.ceil(itemsLength / LIMIT);
    this._pagesToShow = pagesToShow;
    this._searchParams = searchParams;
    this._setSearchParams = setSearchParams;
  }

  get curPage(): number {
    return this._curPage;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  get startEndPages(): { startPage: number; endPage: number } {
    let startPage = this._curPage - Math.floor(this._pagesToShow / 2);
    let endPage = this._curPage + Math.floor(this._pagesToShow / 2);

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(this._pagesToShow, this._totalPages);
    }

    if (endPage > this._totalPages) {
      endPage = this._totalPages;
      startPage = Math.max(this._totalPages - this._pagesToShow + 1, 1);
    }

    return { startPage: startPage, endPage: endPage };
  }

  goToPage(page: number): void {
    this._searchParams.set(PAGE, String(page));
    this._setSearchParams(this._searchParams);
  }

  prevPage(): void {
    if (this._curPage > 1) {
      this.goToPage(this._curPage - 1);
    }
  }

  nextPage(): void {
    if (this._curPage < this._totalPages) {
      this.goToPage(this._curPage + 1);
    }
  }

  destroy(): void {}
}
