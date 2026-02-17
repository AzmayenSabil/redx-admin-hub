const pagePermissions: Record<string, string[]> = {
  '/parcels': ['RedX Super Admin', 'RedX Finance Team'],
};

export const getPagePermissions = (path: string): string[] => {
  return pagePermissions[path] || [];
};
