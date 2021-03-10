import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


import { Layout, Avatar, Dropdown, Menu} from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { SiderComponent } from '../sider/SiderComponent'
import { logout } from 'redux/actions/auth.action'

const { Header, Content, Footer } = Layout;


const MainAdmin = ({children, logout, auth:{isAuthenticated, user,}}) => {
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
        <div>
            <Layout>
                <SiderComponent />
                <Layout>
                    <Header 
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            padding: 0,
                            paddingLeft: 16,
                            textAlign: 'center',
                            background: "#fff",
                        }}
                    >   
                    {
                        isAuthenticated 
                        && 
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <Avatar
                                    style={{
                                        backgroundColor: '#87d068',
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <span style={{marginRight: 16, marginLeft: 4}} >{`Hi, ${user.firstName}`}</span>
                            </a>
                            {/* <span>{user.firstName}</span> */}
                        </Dropdown>
                    }
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            background: "#fff",
                            minHeight: 280
                        }}
                    >
                       {children}
                    </Content>
                    <Footer 
                        style={{ textAlign: "center" }}
                    >
                        FOOTER
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

MainAdmin.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, {logout})(MainAdmin)
