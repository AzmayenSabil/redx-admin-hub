import { Role } from '@/types/auth';

export const getLocalUserRoles = (): Role[] => {
  return [{ name: 'RedX Super Admin' }];
};
