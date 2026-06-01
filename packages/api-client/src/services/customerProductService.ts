import { ApiClient } from "..";

// 📋 1. Explicit Type Specifications for Customer Products
export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface CustomerProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  color: string;
  size: string;
  images: string[];
  category: string;
}

export interface CustomerProductDetailsResponse {
  product: CustomerProduct;
  relatedProducts: CustomerProduct[];
}

export interface GetCustomerProductsParams {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  sort?: string;
}

// ⚙️ 2. The Isolated Customer Product Domain Service
export class CustomerProductService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * 🛍️ READ: Fetch the categorical structure for navigational navigation arrays
   */
  public async getCustomerCategories(): Promise<ProductCategory[]> {
    return this.client.get<ProductCategory[]>("/customer/categories");
  }

  /**
   * 🛍️ READ: Query full product listings with dynamic matrix metrics
   * 🚀 SYSTEM UPGRADE: We completely wipe out manual URLSearchParams strings!
   * We pass the clean 'params' object straight into Axios, which builds the query safely under the hood.
   */
  public async getCustomerProducts(
    params?: GetCustomerProductsParams,
  ): Promise<CustomerProduct[]> {
    return this.client.get<CustomerProduct[]>("/customer/products", {
      params: params, // Axios handles the serialization natively!
    });
  }

  /**
   * 🛍️ READ: Retrieve comprehensive information for specific Product Detail Pages
   */
  public async getCustomerProductDetails(
    productId: string,
  ): Promise<CustomerProductDetailsResponse> {
    return this.client.get<CustomerProductDetailsResponse>(
      `/customer/products/${productId}`,
    );
  }
}
