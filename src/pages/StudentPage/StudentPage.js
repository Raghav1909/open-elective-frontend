import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button'
import Navbar from '../../components/Navbar'
import ElectiveCard from '../ElectivePage/ElectiveCard'

import {GET} from '../../utils/fetch'

const StudentPage = () => {
  let user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const [electives, setElectives] = useState([])
  const fetchElective = async () => {
    const res = await GET('electives/')
    setElectives(res.data)
  }

  useEffect(() => fetchElective, [])

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
      <div className = "flex justify-start items-center flex-wrap p-8 gap-8">
        {electives.length !== 0 && 
          electives.map((elective, index) => (
            <ElectiveCard electiveName = {elective.elective_name} key = {index}/>
          ))}
      </div>
    </>
  )
}

export default StudentPage