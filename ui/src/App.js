import React from 'react'
import { Layout } from './components'
import { Switch, Route, Redirect } from 'react-router-dom'
import { NotFound } from './pages'
import routes from './routes'

import './App.css'
import { UserDetail, UserList, Login } from './pages/admin-dashboard'
import useAuth from './common/hooks/useAuth'

function PrivateRoute({ children, ...rest }) {
  let [auth] = useAuth()
  return (
    <Route
      {...rest}
      render={() => {
        return auth.sub !== 'anonymous' ? children : <Redirect to='/login' />
      }}
    />
  )
}

const App = () => {
  return (
    <Layout>
      <Switch>
        {routes.map(({ path, component }, key) => (
          <Route exact path={path} key={key} component={component} />
        ))}
        <PrivateRoute exact path='/admin'>
          <UserList />
        </PrivateRoute>
        <PrivateRoute exact path='/admin/:id' component={UserDetail}>
          <UserDetail />
        </PrivateRoute>
        <Route exact path='/login' component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  )
}

export default App
