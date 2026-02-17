/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { useAuthorization } from '@/hooks/useAuthorization';

interface AuthorizeProps {
  menuRoles: string[];
  children: ReactNode;
}

const Authorize = ({ menuRoles, children }: AuthorizeProps) => {
  const { isAuthenticated, isAuthorized } = useAuthorization({
    roles: menuRoles,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Not Authorized"
        extra={
          <Button
            type="primary"
            data-testid="go-home-button"
            onClick={() => window.location.replace('/')}
          >
            Go Home
          </Button>
        }
      />
    );
  }

  return <>{children}</>;
};

export default Authorize;
