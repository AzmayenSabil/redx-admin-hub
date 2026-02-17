import { useState, useEffect, useCallback } from 'react';

interface UseTableParams {
  limit: number;
  offset: number;
}

interface UseTableOptions<T, P extends UseTableParams> {
  initialParams: P;
  fetchFn: (params: P) => Promise<{ results: T[]; count: number }>;
}

export const useTable = <T, P extends UseTableParams>({
  initialParams,
  fetchFn,
}: UseTableOptions<T, P>) => {
  const [params, setParams] = useState<P>(initialParams);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchFn(params);
      setData(res.results);
      setTotal(res.count);
    } finally {
      setLoading(false);
    }
  }, [params, fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onPaginationChange = (page: number, pageSize: number) => {
    setParams((prev) => ({
      ...prev,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    }));
  };

  const onSearch = (searchParams: Partial<P>) => {
    setParams((prev) => ({
      ...prev,
      ...searchParams,
      offset: 0,
    }));
  };

  const onReset = () => {
    setParams(initialParams);
  };

  const updateRow = (
    predicate: (item: T) => boolean,
    updater: (item: T) => T,
  ) => {
    setData((prev) =>
      prev.map((item) => (predicate(item) ? updater(item) : item)),
    );
  };

  return {
    data,
    total,
    loading,
    params,
    onPaginationChange,
    onSearch,
    onReset,
    updateRow,
  };
};
