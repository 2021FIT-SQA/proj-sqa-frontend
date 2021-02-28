import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './SiderComponent.styles.scss';
import { 
  MenuFoldOutlined, MenuUnfoldOutlined, CameraTwoTone
} from '@ant-design/icons'
const { Sider } = Layout;

export const SiderComponent = ({url}) => {
  
  console.log('url', url)

  const [collapsed, setCollapsed] = useState(false);
  const toggle = (e) => {
      e.preventDefault();
      return setCollapsed(previous => !previous)
  }
  return (
    <aside className="SiderComponent">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
        }}
      > 
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
            style: {
              color: '#fff'
            }
        })}
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<CameraTwoTone />}>
            <span>Dashboard</span>
            <Link to={`${url}/dashboard`} />
          </Menu.Item>
          <Menu.Item key="2" icon={<CameraTwoTone />}>
            <span>Students</span>
            <Link to={`${url}/students`} />
          </Menu.Item>
          <Menu.Item key="3" icon={<CameraTwoTone />}>
            <span>Teacher</span>
            <Link to={`${url}/teachers`} />
          </Menu.Item>
          <Menu.Item key="4" icon={<CameraTwoTone />}>
            <span>Course</span>
            <Link to={`${url}/courses`} />
          </Menu.Item>
          <Menu.Item key="5" icon={<CameraTwoTone />}>
            <span>Department</span>
            <Link to={`${url}/department`} />
          </Menu.Item>
        </Menu>
      </Sider>
    </aside>
  )
}