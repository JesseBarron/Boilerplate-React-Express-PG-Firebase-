import React, { Component } from 'react'
import NavBar from './navbar.jsx'

const App = (props) => {
  const { children } = props
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

export default App
