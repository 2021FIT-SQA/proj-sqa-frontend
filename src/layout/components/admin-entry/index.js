import React, { useState } from 'react'
import './style.scss';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import SiderComponent  from '../../sider/SiderComponent'
import Header from '../header';
import FooterComponent from '../footer';
import { logout } from '../../../redux/actions/auth.action';

const { Content, Footer } = Layout;


const AdminEntry = (props) => {
    const { logout, auth: { isAuthenticated, user } } = props;
    const [collapsed, setCollapsed] = useState(true)

    function handleToggleCollapsed() {
      setCollapsed(!collapsed)
    }
    return (
        <div className="home-main">
            <Layout>
                <SiderComponent {...{ collapsed }}/>
                <Layout className="home-layout">
                    <Header 
                        collapsed={collapsed}
                        setCollapsed={handleToggleCollapsed}
                        isAuthenticated={isAuthenticated}
                        logout={logout}
                        user={user}
                    />

                    <Content id="container">
                        {React.Children.map(props.children, child => child)}
                    </Content>
                    <Footer 
                        style={{ textAlign: "center" }}
                    >
                        <FooterComponent />
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
