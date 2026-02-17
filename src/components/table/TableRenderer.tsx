/** @jsxImportSource @emotion/react */
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

interface TableRendererProps<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  loading: boolean;
  total: number;
  pageSize: number;
  current: number;
  onPaginationChange: (page: number, pageSize: number) => void;
  rowKey: string | ((record: T) => string);
}

const TableRenderer = <T extends object>({
  columns,
  dataSource,
  loading,
  total,
  pageSize,
  current,
  onPaginationChange,
  rowKey,
}: TableRendererProps<T>) => {
  const pagination: TablePaginationConfig = {
    total,
    pageSize,
    current,
    showSizeChanger: true,
    showTotal: (t) => `Total ${t} items`,
    onChange: onPaginationChange,
  };

  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
      scroll={{ x: 800 }}
    />
  );
};

export default TableRenderer;
