export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
