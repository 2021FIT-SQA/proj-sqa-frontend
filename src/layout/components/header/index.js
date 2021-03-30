import React from 'react'
import './style.scss'
import { Menu, Dropdown , Avatar} from 'antd';
import { UserOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';

const Header = ({ collapsed, setCollapsed, isAuthenticated, logout, user }) => {
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a onClick={logout} href='#!'>
                    <LogoutOutlined />
                    <span className='hide-sm'>Logout</span>
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="header">
            <div className="header__left">
                {collapsed ? (
                    <MenuUnfoldOutlined
                        onClick={setCollapsed}
                        style={{ cursor: 'pointer', fontSize: '20px' }}
                    />
                    ) : (
                    <MenuFoldOutlined
                        onClick={setCollapsed}
                        style={{ cursor: 'pointer', fontSize: '20px' }}
                    />
                )}
            </div>
            {
                isAuthenticated 
                && 
                <Dropdown overlay={menu} trigger={['click']}>
                    <Link to='/login' className="header__right" onClick={e => e.preventDefault()} style={{paddingTop: '.5rem'}}>
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                               
                            }}
                            icon={<UserOutlined />}
                        />
                        <span style={{marginRight: 16, marginLeft: 4, marginTop: '.3rem'}} >{`Hi, ${user.firstName}`}</span>
                    </Link>
                </Dropdown>
            }
        </div>
    )
}

export default Header
