export interface CategoryType {
  categoryname: string;
  categoryid: string;
  createdat?: string;
  status?: boolean;
  productcount?: number | string;
}

export interface ProductType {
  categoryid: string;
  categoryname: string;
  createdAt?: string;
  description?: string;
  images?: string[] | any;
  status?: boolean;
  price?: number | string | any;
  productId?: string;
  cartId?: string;
  productname?: string;
  totalStock?: number | string;
  count?: number;
}

export interface UserDetails {
  user?: {
    email: string;
    name: string;
  };
}

export interface LocationDetails {
  address: string;
  state: string;
  city: string;
  country: string;
}
