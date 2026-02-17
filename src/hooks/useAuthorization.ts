import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface UseAuthorizationProps {
  roles: string[];
}

export const useAuthorization = ({
  roles,
}: UseAuthorizationProps): {
  isAuthorized: boolean;
  isAuthenticated: boolean;
} => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.isAuthenticated || !auth.user) {
    return { isAuthorized: false, isAuthenticated: false };
  }

  const userRoleNames = auth.user.roles.map((r) => r.name);
  const isAuthorized = roles.some((role) =>
    userRoleNames.includes(role),
  );

  return { isAuthorized, isAuthenticated: true };
};
