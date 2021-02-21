import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './SiderComponent.styles.scss';

const { Header, Sider, Content } = Layout;
export const SiderComponent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = (e) => {
        return setCollapsed(previous => !previous)
    }
    return (
        <Layout>
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                style={{
                  overflow: 'auto',
                  height: '100vh',
                }}
            >
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  Student
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                  Teacher
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                  Enrollment
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />}>
                  Course
                </Menu.Item>
                <Menu.Item key="5" icon={<UserOutlined />}>
                  Department
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: toggle,
                })}

              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                Content
              </Content>
            </Layout>
          </Layout>
      );
}
