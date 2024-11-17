import { makeObservable, observable, computed, action, reaction, IReactionDisposer } from 'mobx';

type PrivateFields = '_currentPage' | '_totalPages';

export default class PaginatorModel {
  private _currentPage: number = 1;
  private _totalPages: number = 1;
  private readonly maxVisiblePages: number;

  constructor(totalPages: number, maxVisiblePages: number = 3) {
    this._totalPages = totalPages;
    this.maxVisiblePages = maxVisiblePages;

    makeObservable<PaginatorModel, PrivateFields>(this, {
      _currentPage: observable.ref,
      _totalPages: observable.ref,

      currentPage: computed,
      totalPages: computed,
      visiblePages: computed,

      setCurrentPage: action.bound,
      setTotalPages: action.bound,
    });
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];

    if (this._totalPages <= this.maxVisiblePages) {
      for (let i = 1; i <= this._totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(1, this._currentPage - Math.floor(this.maxVisiblePages / 2));
      const rightBound = Math.min(this._totalPages, leftBound + this.maxVisiblePages - 1);

      if (leftBound > 1) {
        pages.push(1, '...');
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }

      if (rightBound < this._totalPages) {
        pages.push('...', this._totalPages);
      }
    }

    return pages;
  }

  setCurrentPage(page: number) {
    console.log('setCurrentPage', { page });
    if (page >= 1 && page <= this._totalPages) {
      this._currentPage = page;
    }
  }

  setTotalPages(totalPages: number) {
    console.log('setTotalPages', { totalPages });
    this._totalPages = totalPages;
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => this._currentPage,
    (page) => {
      console.log('current page has been changed to:', page);
    },
  );

  destroy(): void {
    this._qpReaction();
  }
}
