import React from 'react'
import { Layout } from 'antd';
import { SiderComponent } from '../sider/SiderComponent' 
import { Switch } from 'react-router-dom';
const { Header, Content } = Layout;
const FullLayoutPage = (routes) => {
    return (
        <div>
            <Layout>
                <SiderComponent className="App__sidebar" />
                <Layout className="App__wrapper">
                    <Header className="App__wrapper__header" style={{padding: 0, background: "#fff"}}>
                    This is header
                    </Header>
                    <Content
                    className="App__wrapper__content"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                    }}
                    >
                    <Switch>
                        {
                            routes.map((route, index) => (
                                <route.type key={index} path={route.path} component={route.component} />
                            ))
                        }
                    </Switch>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default FullLayoutPage
