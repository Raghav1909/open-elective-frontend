import React, {useState} from 'react'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {AiOutlinePlus} from 'react-icons/ai'
import MyModal from '../../components/MyModal'
import TextField from '@mui/material/TextField'

import {POST} from '../../utils/fetch'

const ElectiveModal = ({fetchElective}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleAdd = async () => {
    let electiveName = document.getElementById('elective-name').value

    await POST('electives/', {
      elective_name: electiveName
    })

    await fetchElective()
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
          <h1 className = "font-bold text-xl">Add elective</h1>
          <TextField
          required
          id="elective-name"
          label="Elective Name"
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

export default ElectiveModal