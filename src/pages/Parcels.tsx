/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useCallback } from 'react';
import {
  Input,
  Select,
  Button,
  Tag,
  Space,
  Modal,
  Typography,
  message,
} from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Authorize from '@/components/authorize/Authorize';
import AppLayout from '@/components/layout/AppLayout';
import TableRenderer from '@/components/table/TableRenderer';
import { useTable } from '@/hooks/useTable';
import { fetchParcels } from '@/services/parcelAPI';
import { Parcel, FetchParcelsParams } from '@/types/parcel';

const { Title, Text } = Typography;

const searchBarStyle = css`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const pageStyle = css`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
`;

const statusColors: Record<string, string> = {
  Pending: 'orange',
  Delivered: 'green',
  Returned: 'red',
};

const Parcels = () => {
  const [trackingSearch, setTrackingSearch] = useState('');
  const [statusSearch, setStatusSearch] = useState<
    string | undefined
  >(undefined);
  const [viewParcel, setViewParcel] = useState<Parcel | null>(null);

  const fetchFn = useCallback(
    (params: FetchParcelsParams) => fetchParcels(params),
    [],
  );

  const {
    data,
    total,
    loading,
    params,
    onPaginationChange,
    onSearch,
    onReset,
    updateRow,
  } = useTable<Parcel, FetchParcelsParams>({
    initialParams: { limit: 10, offset: 0 },
    fetchFn,
  });

  const handleSearch = () => {
    onSearch({
      trackingId: trackingSearch || undefined,
      status: statusSearch,
    } as Partial<FetchParcelsParams>);
  };

  const handleReset = () => {
    setTrackingSearch('');
    setStatusSearch(undefined);
    onReset();
  };

  const handleResolve = (trackingId: string) => {
    updateRow(
      (p) => p.trackingId === trackingId,
      (p) => ({ ...p, status: 'Delivered' as const }),
    );
    message.success(`Parcel ${trackingId} resolved`);
  };

  const columns: ColumnsType<Parcel> = [
    {
      title: 'Tracking ID',
      dataIndex: 'trackingId',
      key: 'trackingId',
    },
    {
      title: 'Merchant',
      dataIndex: 'merchant',
      key: 'merchant',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status] || 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: string) =>
        new Date(val).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Parcel) => (
        <Space>
          <Button
            size="small"
            data-testid={`view-button-${record.trackingId}`}
            onClick={() => setViewParcel(record)}
          >
            View
          </Button>
          <Button
            size="small"
            type="primary"
            data-testid={`resolve-button-${record.trackingId}`}
            onClick={() => handleResolve(record.trackingId)}
            style={{
              background: '#d32029',
              borderColor: '#d32029',
            }}
          >
            Resolve
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Authorize
      menuRoles={['RedX Super Admin', 'RedX Finance Team']}
    >
      <AppLayout>
        <div css={pageStyle}>
          <Title level={4} style={{ marginBottom: 20 }}>
            Parcels
          </Title>

          <div css={searchBarStyle}>
            <Input
              data-testid="search-tracking-input"
              placeholder="Tracking ID"
              value={trackingSearch}
              onChange={(e) => setTrackingSearch(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              data-testid="search-status-select"
              placeholder="Status"
              value={statusSearch}
              onChange={setStatusSearch}
              allowClear
              style={{ width: 160 }}
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'Delivered', label: 'Delivered' },
                { value: 'Returned', label: 'Returned' },
              ]}
            />
            <Button
              type="primary"
              data-testid="search-button"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              style={{
                background: '#d32029',
                borderColor: '#d32029',
              }}
            >
              Search
            </Button>
            <Button
              data-testid="reset-button"
              icon={<ReloadOutlined />}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>

          <TableRenderer<Parcel>
            columns={columns}
            dataSource={data}
            loading={loading}
            total={total}
            pageSize={params.limit}
            current={params.offset / params.limit + 1}
            onPaginationChange={onPaginationChange}
            rowKey="trackingId"
          />
        </div>

        <Modal
          title="Parcel Details"
          open={!!viewParcel}
          onCancel={() => setViewParcel(null)}
          footer={null}
        >
          {viewParcel && (
            <div>
              <p><Text strong>Tracking ID:</Text> {viewParcel.trackingId}</p>
              <p><Text strong>Merchant:</Text> {viewParcel.merchant}</p>
              <p><Text strong>Status:</Text>{' '}
                <Tag color={statusColors[viewParcel.status]}>
                  {viewParcel.status}
                </Tag>
              </p>
              <p><Text strong>Recipient:</Text> {viewParcel.recipientName}</p>
              <p><Text strong>Phone:</Text> {viewParcel.recipientPhone}</p>
              <p><Text strong>Address:</Text> {viewParcel.address}</p>
              <p><Text strong>Amount:</Text> ৳{viewParcel.amount}</p>
              <p><Text strong>Created:</Text>{' '}
                {new Date(viewParcel.createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </Modal>
      </AppLayout>
    </Authorize>
  );
};

export default Parcels;
