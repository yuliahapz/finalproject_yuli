import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import {
  UploadOutlined,
  UserOutlined,
  SearchOutlined,
  CompassOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
  width: 200, // default width
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // To push the logout button to the bottom
};

const items = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: <Link to="/home">Home</Link>,
  },
  {
    key: '2',
    icon: <SearchOutlined />,
    label: <Link to="/search">Search</Link>,
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: <Link to="/createpost">Post</Link>,
  },
  {
    key: '4',
    icon: <CompassOutlined />,
    label: <Link to="/explore">Explore</Link>,
  },
  {
    key: '5',
    icon: <UserOutlined />,
    label: <Link to="/profile">Profile</Link>,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token or any auth data
    navigate('/login'); // Redirect to login page
  };

  return (
    <Layout.Sider
      className={`ant-layout-sider xs:w-48 sm:w-64 md:w-80 lg:w-120 xl:w-160`}
      style={siderStyle}
    >
      <div>
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="size-20 mt-10"
          >
            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
            <path
              fillRule="evenodd"
              d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </div>

      <div className="p-4"> {/* Tambahkan padding untuk tampilan lebih baik */}
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          block // Membuat button full width
          className='bg-blue-500 hover:bg-red-600 '
        >
          Logout
        </Button>
      </div>
    </Layout.Sider>
  );
};

export default Sidebar;
