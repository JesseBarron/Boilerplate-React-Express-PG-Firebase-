import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/_NavBar.sass'

const NavBar = (props) => {
  const { user, logout } = props
  return (
    <div id="navBarContainer">
      <ul id="navListContainer">
        <li id="home">Home</li>
        <li id="about">About</li>
        <li id="gallery">Gallery</li>
        <li id="contact">Contact</li>
        {
          !user.id ?
          <div>
            <Link to="/signup" ><li id="signup">Signup</li></Link>
            <Link to="/login"><li id="login">Login</li></Link>
          </div>
          : <button onClick={ logout }> Logout </button>
        }

      </ul>
    </div>
  )
}

export default NavBar
