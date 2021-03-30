import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout, Avatar, Dropdown, Menu} from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import SiderComponent  from '../../sider/SiderComponent'
import { logout } from '../../../redux/actions/auth.action'

const { Header, Content, Footer } = Layout;

const AdminEntry = (props) => {
    console.log('props',props)
    const { logout, auth: { isAuthenticated, user } } = props;
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
                <Layout style={{marginLeft: 200}}>
                    <Header 
                        style={{
                            marginLeft: 10,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            textAlign: 'center',
                            background: "#fff",
                        }}
                    >   
                    {
                        isAuthenticated 
                        && 
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a href="#!" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
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
                    </Header>
                    <Content style={{minHeight: '90vh', padding: 10, backgroundColor: '#fff', margin: 10}}>
                        {React.Children.map(props.children, child => child)}
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

AdminEntry.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {logout})(AdminEntry)
