export type TProducts = {
  _id: string;
  title: string;
  description: string;
  rating: number;
  isStock: boolean;
  imageUrl: string;
  quantity: number;
  price: number;
  category: string;
};

export type TCategories = {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
};

export type TOrders = {
  _id: string;
  title: string;
  imageUrl: string;
  quantity: number;
  category: string;
  name: string;
  email: string;
  userImage: string;
  TotalPrice: number;
  phoneNumber: number;
  address: string;
  company: string;
  postCode: number;
  city: string;
  country: string;
  StripePayment: boolean;
  CashOnDelivery: boolean;
}