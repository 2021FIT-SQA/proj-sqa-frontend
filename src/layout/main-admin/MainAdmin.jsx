import React from 'react'
import { Layout } from 'antd'
import { SiderComponent } from '../sider/SiderComponent'
const { Header, Content, Footer } = Layout;

const MainAdmin = ({children}) => {
    console.log('MainAdmin rendered...')
    return (
        <div>
            <Layout>
                <SiderComponent />
                <Layout>
                    <Header 
                        style={{
                            padding: 0,
                            paddingLeft: 16,
                            background: "#fff",
                            textAlign: 'center'
                        }}
                    >
                        HEADER
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

export default MainAdmin
