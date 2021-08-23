import React from 'react'
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import hotdog from './hotdog.svg'

const Logo = () => {
  return (
    <div
      className="ma4 mt0"
      style={{ display: 'flex', justifyContent: 'flex-start' }}
    >
      <Tilt
        className="Tilt br2 shadow-2"
        glarePosition="all"
        glareEnable="true"
        glareColor="yellow"
        style={{ backgroundColor: 'green', height: '150px', width: '150px' }}
      >
        <div className="pa3">
          <img src={hotdog} alt="logo"></img>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo
