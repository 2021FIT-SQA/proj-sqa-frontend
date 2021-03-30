import React from 'react'
import './style.scss';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import SiderComponent  from '../../sider/SiderComponent'
import Header from '../header';
import { logout } from '../../../redux/actions/auth.action';

const { Content, Footer } = Layout;

const AdminEntry = (props) => {
    console.log('props',props)
    const { logout, auth: { isAuthenticated, user } } = props;

    return (
        <div className="home-main">
            <Layout>
                <SiderComponent />
                <Layout className="home-layout">
                    <Header 
                        isAuthenticated={isAuthenticated}
                        logout={logout}
                        user={user}
                        style={{
                            marginLeft: 10,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            textAlign: 'center',
                            background: "#fff",
                            minHeight: '5vh'
                        }}
                    />

                    <Content id="container">
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
