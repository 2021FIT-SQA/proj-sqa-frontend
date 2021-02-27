import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink, withRouter } from 'react-router-dom';
import './SiderComponent.styles.scss';

const { Sider } = Layout;

export const SiderComponent = withRouter(props => {
  const [collapsed, setCollapsed] = useState(false);
  const { location } = props;
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
        <Menu mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/admin/dashboard" icon={<UserOutlined/>}>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/students" icon={<UserOutlined/>}>
            <NavLink to="/admin/students">Student</NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/teachers" icon={<UserOutlined/>}>
            <NavLink to="/admin/teachers">Teacher</NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/courses" icon={<UserOutlined/>}>
            <NavLink to="/admin/courses">Course</NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/departments" icon={<UserOutlined/>}>
            <NavLink to="/admin/departments">Department</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    </aside>
  )
})