import React from 'react'

const MyCard = ({children}) => {
  return (
    <div className = {`block w-[300px] h-[200px] p-6 rounded-lg shadow-lg bg-white text-center`}>
      {children}
    </div>
  )
}

export default MyCard