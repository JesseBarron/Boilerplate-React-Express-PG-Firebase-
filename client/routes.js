import './index.sass'
import React, { Component } from 'react'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import history from './history'

import {
  LandingPage,
  PageNotFound,
  DragAndDrop
} from './screens'

import {
  App
} from './components'

const Routes = () => {
  return (
    <Router history={ history }>
      <App>
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route path="/DragAndDrop" component={ DragAndDrop } />
          <Route path="*" component={ PageNotFound } />
        </Switch>
      </App>
    </Router>
  )
}

export default Routes
