import { action, computed, makeObservable, observable } from 'mobx';
import { CartItem } from './types';

const CART_STORAGE_KEY = 'cart_items';

type PrivateFields = '_items';

class CartStore {
    private _items: CartItem[] = [];

    constructor() {
        makeObservable<CartStore, PrivateFields>(this, {
            _items: observable,

            items: computed,
            totalItems: computed,
            totalPrice: computed,

            addItem: action,
            removeItem: action,
            updateQuantity: action,
            clearCart: action,
        });

        this.loadFromStorage();
    }

    get items(): CartItem[] {
        return this._items;
    }

    get totalItems(): number {
        return this._items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get totalPrice(): number {
        return this._items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    private saveToStorage() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this._items));
    }

    private loadFromStorage() {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                this._items = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse cart from localStorage:', e);
                this._items = [];
            }
        }
    }

    addItem(item: Omit<CartItem, 'quantity'>) {
        const existingItem = this._items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this._items.push({ ...item, quantity: 1 });
        }
        this.saveToStorage();
    }

    removeItem(id: number) {
        this._items = this._items.filter(item => item.id !== id);
        this.saveToStorage();
    }

    updateQuantity(id: number, quantity: number) {
        const item = this._items.find(i => i.id === id);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(id);
            }
        }
        this.saveToStorage();
    }

    clearCart() {
        this._items = [];
        this.saveToStorage();
    }
}

export default new CartStore();