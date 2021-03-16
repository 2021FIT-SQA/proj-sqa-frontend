import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './SiderComponent.styles.css';
import { CameraTwoTone } from '@ant-design/icons'

const { Sider } = Layout;

export const SiderComponent = () => {

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (e) => {
      setCollapsed(previous => !previous)
  }

  return (
    <aside className="SiderComponent">
      <Sider 
        collapsible 
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          minHeight: '100vh',
          position: 'fixed',
          left: 0,
        }}
      > 
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<CameraTwoTone />}>
              <span>Dashboard</span>
              <Link to='/admin' />
            </Menu.Item>
            <Menu.Item key="2" icon={<CameraTwoTone />}>
              <span>Student</span>
              <Link to='/admin/students' />
            </Menu.Item>
            <Menu.Item key="3" icon={<CameraTwoTone />}>
              <span>Teacher</span>
              <Link to='/admin/teachers' />
            </Menu.Item>
            <Menu.Item key="4" icon={<CameraTwoTone />}>
              <span>Course</span>
              <Link to='/admin/courses' />
            </Menu.Item>
            <Menu.Item key="5" icon={<CameraTwoTone />}>
              <span>Department</span>
              <Link to='/admin/departments' />
            </Menu.Item>
            <Menu.Item key="6" icon={<CameraTwoTone />}>
              <span>Enrollment</span>
              <Link to='/admin/enrollments' />
            </Menu.Item>
          </Menu>
      </Sider>
    </aside>
  )
}