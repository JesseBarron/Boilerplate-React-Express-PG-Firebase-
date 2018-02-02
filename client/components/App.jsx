import React, { Component } from 'react'
import NavBar from './navbar.jsx'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { me, logout } from '../store'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    this.props.getInitialData()
  }
  render() {
    const { children, user, logout } = this.props
    return (
      <div>
        <NavBar user={ user } logout= { logout } />
        { children }
      </div>
    )
  }
}

const mapState = ({ user }) => ({
  user
})

const mapDispatch = (dispatch, ownProps) => ({
  getInitialData() {
    dispatch(me())
  },
  logout() {
    const { history } = ownProps
    dispatch(logout(history))
  }
})
export default withRouter(connect(mapState, mapDispatch)(App))
