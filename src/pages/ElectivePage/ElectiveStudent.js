import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import { GET } from '../../utils/fetch'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "white",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#D2DAFF",
  },
}));


const items = [
  'First Preference',
  'Second Preference',
  'Third Preference',
  'Fourth Preference',
  'Fifth Preference',
  'Sixth Preference',
  'Seventh Preference',
  'Eighth Preference',
  'Ninth Preference',
  'Tenth Preference',
  'Eleventh Preference',

]


const ElectiveStudent = () => {
  const { electiveName } = useParams()
  const [courses, setCourses] = useState([])
  const [elective, setElective] = useState('')

  const fetchCourses = async () => {
    let res = await GET(`electives/${electiveName}/courses`)
    if(res.status === 200){
      setCourses(res.data)
      console.log(res.data)
    }else{
      alert('Error fetching courses')
    }
  }

  const fetchElective = async () => {
    let res = await GET(`electives/${electiveName}`)
    if(res.status === 200){
      setElective(res.data)
    }else{
      alert('Error fetching elective')
    }
  }

  useEffect(() => {
    fetchCourses()
    fetchElective()
  }, [])

  return (
    <div>
      <div className = "w-4/5 mx-auto py-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx = {{backgroundColor: '#B1B2FF'}}>
                <TableCell align="center">Course Code</TableCell>
                <TableCell align="center">Course Name</TableCell>
                <TableCell align="center">Offered By</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Preference</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course, index) => (
                <StyledTableRow
                  key={course.course_code}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{course.course_code}</TableCell>
                  <TableCell align="center">{course.course_name}</TableCell>
                  <TableCell align="center">{course.offered_by}</TableCell>
                  <TableCell align="center">{course.capacity}</TableCell>
                  <TableCell align="center">
                    <TextField 
                      id = {index}
                      variant = "standard"
                      />
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default ElectiveStudent