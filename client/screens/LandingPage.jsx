import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../store'


const Home = (props) => {
  return (
    <div>
      <img src="assets/tree.jpg" />
      <h1>This is the home page</h1>
    </div>
  )
}

const mapState = ({ User }) => ({
    User
})

const mapDispatch = (dispatch) => ({
  getUser(name){
    dispatch(getUser(name))
  },
})

export default connect(mapState, mapDispatch)(Home)
