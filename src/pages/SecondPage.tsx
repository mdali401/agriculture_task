import { useEffect } from 'react'
import {Posts, Departments} from '../components'
import Box from '@mui/material/Box/Box'
import { getUserInfo } from '../LocalStorageService/StorageService'
import { useNavigate } from 'react-router-dom'

const SecondPage = () => {
  const navigate = useNavigate();

  type FormValuesType = {
    name: string,
    phone: string,
    email: string
  }

  let userExistingInfo: FormValuesType = JSON.parse(getUserInfo() || "{}");

  useEffect(() => {
    if(!userExistingInfo?.name)
    {
      navigate("/", { state: {errorMessage: "Please enter all details"} })
    }
  }, [])
   
  return (
    <>
      {userExistingInfo?.name && <Box sx={{display: "flex", flexDirection:"column", padding: "1em", gap: "1em"}}>
          <Posts />
          <Departments />
      </Box>}
    </>
  )
}

export default SecondPage