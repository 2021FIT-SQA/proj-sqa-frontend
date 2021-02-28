import React from 'react'
import { Route, useRouteMatch, Switch, Link, useParams} from 'react-router-dom'

import { Layout } from 'antd';
import { SiderComponent } from '../sider/SiderComponent' 
import { 
    AdminDashboardPage,
    AdminStudentPage,
    AdminTeacherPage,
    AdminDeparmentPage,
    AdminCoursePage
  } from 'admin';
import PrivateRoute from 'config/privateRoute.config'

const { Header, Content, Footer} = Layout;

const FullLayoutPage = () => {

    let { path, url } = useRouteMatch();

    return (
        <div>
            <Layout>
                <SiderComponent url={url} className="App__sidebar" />
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
                         {/* <Switch>

                            <PrivateRoute exact path={`${path}`}>admin route</PrivateRoute>

                            <PrivateRoute exact path={`${path}/dashboard`} component={AdminDashboardPage} />
                                
                            <PrivateRoute exact path={`${path}/students`} component={AdminStudentPage} />

                            <PrivateRoute exact path={`${path}/courses`} component={AdminCoursePage} />
                            
                            <PrivateRoute exact path={`${path}/teachers`} component={AdminTeacherPage} />
                            
                            <PrivateRoute exact path={`${path}/departments`} component={AdminDeparmentPage} />
                            
                        </Switch> */}
                        <ul>
                            <li>
                                <Link to={`${url}/rendering`}>Rendering with React</Link>
                            </li>
                            <li>
                                <Link to={`${url}/components`}>Components</Link>
                            </li>
                            <li>
                                <Link to={`${url}/props-v-state`}>Props v. State</Link>
                            </li>
                        </ul>
                        <Switch>
                            <Route exact path={path}>
                                <h3>Please select a topic.</h3>
                            </Route>
                            <Route path={`${path}/:topicId`}>
                                <Topic />
                            </Route>
                        </Switch>
                    </Content>
                    <Footer>
                        This is footer....
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

function Topic() {
    let { topicId } = useParams();
    console.log(topicId)
    return (
        <div>
            <h3>{topicId}</h3>
        </div>
    );
}


export default FullLayoutPage
