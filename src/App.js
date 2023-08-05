import React from 'react'
import Child from './Child'

const App = () => {
    const bookings = [];
  return (
    <div>
        <Child bookings={bookings}></Child>
    </div>
  )
}

export default App
