export interface CategoryType {
  categoryname: String;
  categoryid: String;
  createdat?: String;
  status?: boolean;
  productcount?: number | String;
}

export interface ProductType {
  categoryid: String;
  categoryname: String;
  createdAt?: String;
  description?: String;
  images?: String[];
  status?: boolean;
  price?: number | String | any;
  productid?: String;
  productname?: String;
  totalStock?: number | String;
}
