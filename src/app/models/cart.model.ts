export interface Cart{
  items: Array<CartItem>;
}

export interface CartItem {
  productImg: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}
