import React, {useState, useEffect} from 'react'
import CourseModal from './CourseModal'
import {useParams} from 'react-router-dom'

import {GET, POST, DELETE} from '../../utils/fetch'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton'
import {MdDelete} from 'react-icons/md'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "white",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#D2DAFF",
  },
}));


const ElectiveStaff = () => {
  let {electiveName} = useParams()

  const [courses, setCourses] = useState([])
  const [elective, setElective] = useState('')

  const fetchCourses = async () => {
    let res = await GET(`electives/${electiveName}/courses`)
    if(res.status === 200){
      setCourses(res.data)
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
    <div className = "p-5">
      <h1 className = "text-center font-bold text-4xl color-primary">{`${elective.elective_name}`}</h1>
      <CourseModal electiveName={elective.elective_name} fetchCourses={fetchCourses}/>
      <div className = "w-4/5 mx-auto py-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx = {{backgroundColor: '#B1B2FF'}}>
                <TableCell align="center">Course Code</TableCell>
                <TableCell align="center">Course Name</TableCell>
                <TableCell align="center">Offered By</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <StyledTableRow
                  key={course.course_code}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{course.course_code}</TableCell>
                  <TableCell align="center">{course.course_name}</TableCell>
                  <TableCell align="center">{course.offered_by}</TableCell>
                  <TableCell align="center">{course.capacity}</TableCell>
                  <TableCell align="center">
                  <IconButton
                    className = "text-rose-600 hover:text-rose-700"
                    onClick = {async () => {
                      let res = await DELETE(`courses/${course.course_code}`, {
                        course_code: course.course_code
                      })
                      if(res.status !== 204){
                        alert('Error deleting course')
                      }
                      await fetchCourses()
                    }}
                    >
                    <MdDelete/>
                  </IconButton>
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

export default ElectiveStaff