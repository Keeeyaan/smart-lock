// import { ReactElement } from 'react'
import SideBar from './SideBar';
import Header from './Header';

const Layout = ({ children }: any) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-full">
        <Header />
        <div className="m-10">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
