import React, {useState} from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';

import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)

    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    let response = await fetch(`${process.env.REACT_APP_BACKEND_API}/auth/`,{
      method: 'POST',
      body: new URLSearchParams(
          {
              'username': username,
              'password': password
          }
      )
    })

    let data = await response.json()

    if(response.status === 200){
      localStorage.setItem('access_token', JSON.stringify(data.access_token))

      if(username.slice(0, 5) === "01JST"){
        response = await fetch(`${process.env.REACT_APP_BACKEND_API}/students/${username}/`)
        data = await response.json()
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/student/')
      }
      else{
        response = await fetch(`${process.env.REACT_APP_BACKEND_API}/staffs/${username}/`)
        data = await response.json()
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/staff/')
      }
    }else{
      alert("Wrong username or password")
    }

    setLoading(false)
  }

  return (
    <div className = "h-screen flex justify-center items-center bg-background">
      <Card className = "w-[400px] text-center shadow-2xl">
        <CardContent className = "flex flex-col gap-3">
          <h1 className = "font-bold text-2xl">Login</h1>
          <Divider sx = {{backgroundColor: '#D2DAFF'}}/>
          <TextField
          required
          id="username"
          label="Username"
          sx = {
            {"& .MuiOutlinedInput-root": {
              '& fieldset': {
              borderColor: "#D2DAFF",
              },
              '&:hover fieldset': {
                borderColor: '#B1B2FF !important',
              },
              "&.Mui-focused fieldset": {
                borderColor: "#AAC4FF",
              }
            },
            "& .MuiInputLabel-root": {
              color: "#B1B2FF !important"
            },
          }}
        />
          <TextField
          required
          id="password"
          label="Password"
          type="password"
          sx = {
            {"& .MuiOutlinedInput-root": {
              '& fieldset': {
                borderColor: "#D2DAFF",
                },
              '&:hover fieldset': {
                borderColor: '#B1B2FF !important',
              },
              "&.Mui-focused fieldset": {
                borderColor: "#AAC4FF",
              }
            },
            "& .MuiInputLabel-root": {
              color: "#B1B2FF !important"
            },
          }}
        />
        <div className="text-center">
          <LoadingButton 
            variant="contained" 
            className = "bg-primary w-[100px]" 
            onClick = {handleSubmit}
            loading = {loading}
            sx = {
              {'.MuiLoadingButton-loadingIndicator': {
                color: '#fff',
                fontSize: [16, "!important"],
              }}
            }
            >Sign In</LoadingButton>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage