export interface CartItem {
    id: number;
    quantity: number;
    price: number;
    title: string;
    image: string;
}

export interface CartStore {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}