import React from 'react'
import { useNavigate } from 'react-router-dom'

import MyCard from '../../components/MyCard'
import { Button } from '@mui/material'

const ElectiveCard = ({electiveName}) => {
  let user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  return (
    <MyCard>
      <div className = "flex flex-col justify-between h-full">
        <h1>{electiveName}</h1>
        <Button 
          className = "bg-primary hover:bg-indigo-400"
          variant = "contained"
          onClick = {() => navigate(`/elective/${electiveName.toLowerCase().replace(/\s/g, '-')}`)}
          >{user?.isStaff ? 'View' : 'Apply'}</Button>
      </div>
    </MyCard>
  )
}

export default ElectiveCard