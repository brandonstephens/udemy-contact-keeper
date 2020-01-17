import React from 'react'
import Contacts from '../contacts/Contacts'

const Home = props => {
  return (
    <div className="grid-2">
      <div>// form</div>
      <div>
        // filter
        <Contacts />
      </div>
    </div>
  )
}

export default Home
