import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { GET } from '../../utils/fetch'

import ElectiveStaff from './ElectiveStaff'
import ElectiveStudent from './ElectiveStudent'
import Navbar from '../../components/Navbar'
import Button from '@mui/material/Button'

const ElectivePage = () => {
  let user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  return (
    <>
      <Navbar>
          <div className = "flex h-full justify-between items-center py-5 px-10">
            <h1>Welcome {user?.first_name && `${user?.first_name}`} {user?.last_name && `${user?.last_name}`}!</h1>
            <Button
              variant = "contained"
              className = "bg-primary"
              onClick = {() => {
                localStorage.removeItem('user')
                localStorage.removeItem('access_token')
                navigate('/')
              }}
              >Logout</Button>
          </div>
        </Navbar>
      {user?.isStaff ? <ElectiveStaff/> : <ElectiveStudent/>}
    </>
  )
}

export default ElectivePage