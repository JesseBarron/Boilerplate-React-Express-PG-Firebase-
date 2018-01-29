import React, { Component } from 'react'


import '../styles/_NavBar.sass'

const NavBar = () => {
  return (
    <div id="navBarContainer">
      <ul id="navListContainer">
        <li id="home">Home</li>
        <li id="about">About</li>
        <li id="gallery">Gallery</li>
        <li id="contact">Contact</li>
      </ul>
    </div>
  )
}

export default NavBar
