export type SortOrder = 'asc' | 'desc';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type CreateUserData = Omit<User, 'id'>;
export type UpdateUserData = Partial<CreateUserData>;

export interface Customer {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

export type CreateCustomerData = Omit<Customer, 'id'>;
export type UpdateCustomerData = Partial<CreateCustomerData>;

export interface findAllCustomerParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: SortOrder;
}

export type InvoiceStatus = 'PENDENTE' | 'PAGO';

export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
  data: Date;
  status: InvoiceStatus;
};

export type CreateInvoiceData = Omit<Invoice, 'id'>;
export type UpdateInvoiceData = Partial<CreateInvoiceData>;

export interface Revenue {
  month: string;
  revenue: number;
};

export interface ApiResponse<T> {
  data: T;
  message?: string;
};

export interface ApiError {
  error: string;
  details?: unknown;
}