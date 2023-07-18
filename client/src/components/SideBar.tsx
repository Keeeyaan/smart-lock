import { Link, useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';

import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import TuneIcon from '@mui/icons-material/Tune';
import TerminalIcon from '@mui/icons-material/Terminal';

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <div className="p-5">
        <div className="flex items-center gap-2 mt-7 mb-12">
          <img src="./smartlock.ico" placeholder="logo" />
          <h1 className="text-blue-500 font-normal text-[24px]">Smart Lock</h1>
        </div>
        <Menu
          menuItemStyles={{
            button: ({ active }) => {
              return {
                color: active ? '#454545' : '',
                fontWeight: active ? '600' : '',
                borderRadius: '2px',
              };
            },
          }}
          rootStyles={{
            [`.${menuClasses.icon}`]: {
              color: '#3B82F6',
            },
            [`.${menuClasses.menuItemRoot}`]: {
              color: '#526D82',
              fontSize: '14px',
            },
          }}
        >
          <p className="text-[#526d82e8] font-medium text-sm">Main</p>
          <MenuItem
            active={pathname === '/' ? true : false}
            icon={<TuneIcon />}
            component={<Link to="" />}
          >
            Control
          </MenuItem>
          <MenuItem
            active={pathname === '/logs' ? true : false}
            icon={<TerminalIcon />}
            component={<Link to="logs" />}
          >
            Logs
          </MenuItem>
          <MenuItem
            active={pathname === '/members' ? true : false}
            icon={<PeopleIcon />}
            component={<Link to="members" />}
          >
            Members
          </MenuItem>
          <MenuItem
            active={pathname === '/register' ? true : false}
            icon={<PersonAddAlt1Icon />}
            component={<Link to="register" />}
          >
            Register
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
};

export default SideBar;
