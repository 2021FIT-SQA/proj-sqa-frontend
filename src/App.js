import { Fragment, useEffect } from 'react'
import store from 'redux/store'
import { loggedUser } from 'redux/actions/auth.action'
import { Provider } from 'react-redux'

import './App.css'
import 'antd/dist/antd.css'
import RouterConfig from 'config/RouterConfig.routing'

function App() {
  useEffect(() => {
    store.dispatch(loggedUser())
  }, [])
  return(
    <div className="app">
      <Provider store={store}>
        <Fragment>
          <RouterConfig />
        </Fragment>
      </Provider>
    </div>
  )
}

export default App
