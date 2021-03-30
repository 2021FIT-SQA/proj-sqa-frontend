import React from 'react'
import { Menu, Dropdown , Avatar} from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

const Header = ({ isAuthenticated, logout, user, style }) => {
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
        <div className="header" style={style}>
            {
                isAuthenticated 
                && 
                <Dropdown overlay={menu} trigger={['click']}>
                    <a href="#!" className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{paddingTop: '.5rem'}}>
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                               
                            }}
                            icon={<UserOutlined />}
                        />
                        <span style={{marginRight: 16, marginLeft: 4}} >{`Hi, ${user.firstName}`}</span>
                    </a>
                </Dropdown>
            }
        </div>
    )
}

export default Header
