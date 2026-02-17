export type ParcelStatus = 'Pending' | 'Delivered' | 'Returned';

export interface Parcel {
  trackingId: string;
  merchant: string;
  status: ParcelStatus;
  createdAt: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  amount: number;
}

export interface FetchParcelsParams {
  limit: number;
  offset: number;
  trackingId?: string;
  status?: string;
}

export interface FetchParcelsResponse {
  results: Parcel[];
  count: number;
}
