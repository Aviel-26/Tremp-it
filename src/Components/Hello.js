import React from 'react'

export default function Hello(props) {
  return (
    <div id='continer'>
        <h2> Hello {props.name}</h2>
        <button type='submit' className='LogOut'>LogOut</button>
    </div>
  )
}
