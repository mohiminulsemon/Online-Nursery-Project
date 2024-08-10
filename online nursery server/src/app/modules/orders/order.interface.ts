export type TOrder = {
  productItem: {
    _id: string;
    quantity: number;
    title: string;
    category: string;
    imageUrl: string;
  }[];
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
  TotalPrice: number;
  CashOnDelivery: boolean;
  StripePayment: boolean;
};
