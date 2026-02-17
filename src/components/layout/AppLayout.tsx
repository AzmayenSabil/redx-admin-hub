/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Menu, Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { clearAuth } from '@/redux/slices/AuthSlice';
import { navigationItems } from '@/config/navigation';

const { Header, Content } = Layout;
const { Text } = Typography;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: #d32029;

  .ant-menu {
    background: transparent;
    border-bottom: none;
    flex: 1;
  }

  .ant-menu-item {
    color: rgba(255, 255, 255, 0.85) !important;
  }

  .ant-menu-item-selected,
  .ant-menu-item:hover {
    color: #fff !important;
  }

  .ant-menu-horizontal > .ant-menu-item-selected::after,
  .ant-menu-horizontal > .ant-menu-item:hover::after {
    border-bottom-color: #fff !important;
  }
`;

const contentStyle = css`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: #f0f2f5;
`;

const logoStyle = css`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin-right: 24px;
  white-space: nowrap;
`;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  const menuItems = navigationItems.map((item) => ({
    key: item.path,
    label: item.label,
  }));

  return (
    <Layout>
      <Header css={headerStyle}>
        <Text css={logoStyle}>RedX Admin</Text>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
        <Button
          type="text"
          icon={<LogoutOutlined />}
          data-testid="logout-button"
          onClick={handleLogout}
          style={{ color: '#fff' }}
        >
          Logout
        </Button>
      </Header>
      <Content css={contentStyle}>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
