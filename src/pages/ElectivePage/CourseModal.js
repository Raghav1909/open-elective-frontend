import React, {useState, useEffect} from 'react'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {AiOutlinePlus} from 'react-icons/ai'
import MyModal from '../../components/MyModal'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import {GET, POST} from '../../utils/fetch'

const CourseModal = ({electiveName, fetchCourses}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [departments, setDepartments] = useState([])
  const [deptValue, setDeptValue] = useState('CSE - Computer Science and Engineering')

  const fetchData = async () => {
    let res = await GET('departments')
    res.data = res.data.map((department) => `${department[0]} - ${department[1]}`)
    setDepartments(res.data)
  }

  useEffect(() => {fetchData()}, [])

  const handleAdd = async () => {
    let courseCode = document.getElementById('course-code').value
    let offeredBy = document.getElementById('department').value
    let courseName = document.getElementById('course-name').value
    let capacity = document.getElementById('capacity').value

    console.log(courseCode, offeredBy, courseName, capacity, electiveName)

    let res = await POST('courses/', {
      course_code: courseCode,
      offered_by: offeredBy,
      course_name: courseName,
      capacity: parseInt(capacity),
      elective_name: electiveName
    })

    if (res.status !== 200){
      alert(`${res.status} ${res.statusText}`)
    }

    await fetchCourses()
    handleClose()
  }

  return (
    <>
      <IconButton
        className = "absolute bottom-10 right-10 border-rounded bg-primary text-background hover:bg-indigo-400"
        onClick = {handleOpen}>
        <AiOutlinePlus/>
      </IconButton>
      
      <MyModal
        open = {open}>
        <div className = "flex flex-col gap-10 text-center">
          <h1 className = "font-bold text-xl">Add Course</h1>
          <TextField
          required
          id="course-code"
          label="Course Code"
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
            <Autocomplete
              id = "department"
              value = {deptValue}
              onChange={(event, value) => setDeptValue(value)}
              options = {departments}
              renderInput = {(params) =>
                <TextField {...params}
                required
                label = "Offered By"
                id = "offered-by"
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
                />}/>
        <TextField
          required
          id="course-name"
          label="Course name"
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
          id="capacity"
          label="capacity"
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
          <div className = "flex justify-around">
            <Button 
              variant = "contained" 
              className = "bg-primary hover:bg-indigo-400 text-background"
              onClick = {handleAdd}>
              Add</Button>
            <Button 
              variant = "contained"
              className = "bg-rose-600 hover:bg-rose-700"
              onClick = {handleClose}>
              Close</Button>
          </div>
        </div>
      </MyModal>
      </>
  )
}

export default CourseModal