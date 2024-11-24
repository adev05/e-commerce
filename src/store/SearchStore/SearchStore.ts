import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_search';

export default class SearchStore {
    private _search: string = '';

    constructor() {
        makeObservable<SearchStore, PrivateFields>(this, {
            _search: observable.ref,
            search: computed,
            setSearch: action.bound,
        });
    }

    get search() {
        return this._search;
    }

    setSearch(value: string) {
        if (this._search === value) return;
        this._search = value;
    }
}
