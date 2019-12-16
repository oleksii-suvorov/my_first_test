import React from 'react';
import App from '../App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import User from './User'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/users' component={App} exact/>
      <Route path='/users/:id' component={User} exact/>
    </Switch>
  </BrowserRouter>
)
export default Router;
