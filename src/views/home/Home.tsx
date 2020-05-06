import React from 'react'
import Svg from '../../components/Svg'

import './home.scss'

export default function Home() {
  const test = {
    something: 'value'
  }
  return (
    <div className="home">
      <h1>Home</h1>
      <div className="home__body">
        This is my homepage with stuff and things
        {test?.something ?? 'Yes'}
        <Svg name="twitter" />
      </div>
    </div>
  )
}
