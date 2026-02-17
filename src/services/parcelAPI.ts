import {
  Parcel,
  ParcelStatus,
  FetchParcelsParams,
  FetchParcelsResponse,
} from '@/types/parcel';

const statuses: ParcelStatus[] = ['Pending', 'Delivered', 'Returned'];
const merchants = [
  'ShopEasy', 'MegaMart', 'QuickBuy', 'FreshGoods',
  'TechZone', 'StyleHub', 'HomeNest', 'GreenLeaf',
];

const allParcels: Parcel[] = Array.from({ length: 50 }, (_, i) => ({
  trackingId: `RDX${String(100000 + i).padStart(7, '0')}`,
  merchant: merchants[i % merchants.length],
  status: statuses[i % 3],
  createdAt: new Date(2025, 0, 1 + i).toISOString(),
  recipientName: `Customer ${i + 1}`,
  recipientPhone: `+8801${String(700000000 + i)}`,
  address: `${i + 1} Main St, Dhaka`,
  amount: 500 + i * 50,
}));

export const fetchParcels = async (
  params: FetchParcelsParams,
): Promise<FetchParcelsResponse> => {
  await new Promise((r) => setTimeout(r, 400));

  let filtered = [...allParcels];

  if (params.trackingId) {
    const q = params.trackingId.toLowerCase();
    filtered = filtered.filter((p) =>
      p.trackingId.toLowerCase().includes(q),
    );
  }
  if (params.status) {
    filtered = filtered.filter((p) => p.status === params.status);
  }

  const results = filtered.slice(
    params.offset,
    params.offset + params.limit,
  );

  return { results, count: filtered.length };
};
