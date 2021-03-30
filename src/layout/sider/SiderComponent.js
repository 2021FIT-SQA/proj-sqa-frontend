import React, {useState, useEffect} from 'react';
import { Layout, Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import './style.scss';

import { ADMIN_SIDER_MENU_LIST } from '../../constants'
const { Sider } = Layout;

const SiderComponent = ({ location, collapsed }) => {
  const [selectedKeys, setSelectedKeys] = useState('')
  const [openKeys, setOpenKeys] = useState([])

  const handleOpenChange = (openKeys) => {
    setOpenKeys(openKeys)
  }


  useEffect(() => {
    const pathname = location.pathname
    const fragment = pathname.split('/').slice(0, 3)
    const prefixPath = fragment.join('/')
    if (fragment.length === 3) {
      for (let i = 0; i < ADMIN_SIDER_MENU_LIST.length; i++) {
        const menu = ADMIN_SIDER_MENU_LIST[i]
        if (Array.isArray(menu.children)) {
          const findIdx = menu.children.findIndex(menu => pathname === menu.path)
          if (findIdx !== -1) {
            setSelectedKeys(menu.children[findIdx].path)
            setOpenKeys([menu.name])
            break
          }
        }
        if (menu.path.indexOf(prefixPath) !== -1) {
          setSelectedKeys(menu.path)
          break
        }
      }
    }
  }, [location.pathname])
  
  return (
    <Sider 
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={190}
      className="sidebar"
    > 
      <div className="sider-menu-logo">
        {collapsed ? (
          'HANU'
        ) : 'Hanu EMS'}
      </div>
      <Menu
        selectedKeys={[selectedKeys]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        mode="inline"
        theme="dark"
      >
        {ADMIN_SIDER_MENU_LIST.map(menu => {
          return (
            <Menu.Item key={menu.path}>
              <Link to={menu.path.toString()}>
                {menu.icon}
                <span>{menu.name}</span>
              </Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  )
}
export default withRouter(SiderComponent)