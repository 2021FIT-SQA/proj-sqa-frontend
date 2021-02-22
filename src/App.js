import './App.css';
import 'antd/dist/antd.css';
import { SiderComponent } from './layout/index';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { RouterConfig } from './config/routers.config';
function App() {
  return(
    <div className="App">
      <Router>
        <SiderComponent />
        <Switch>
          <RouterConfig />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
