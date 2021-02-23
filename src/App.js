import './App.scss';
import 'antd/dist/antd.css';
import { SiderComponent } from './layout/index';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { RouterConfig } from './config/routers.config';
import { Layout } from 'antd'

const { Header, Content } = Layout;

function App() {
  return(
    <div className="App">
      <Router>
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
                <RouterConfig />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  )
}

export default App;
