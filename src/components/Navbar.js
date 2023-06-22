import React from 'react'

const Navbar = ({children}) => {
  return (
    <nav className = "bg-secondary h-[64px]">
      {children}
    </nav>
  )
}

export default Navbar