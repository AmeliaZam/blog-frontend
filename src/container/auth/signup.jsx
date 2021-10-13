import { Box, Card, Paper, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Form, LoadingModal } from 'components'
import { signupFields, signupFieldsInitialValues } from 'utils/constants/signup'
import { validateLogin } from 'utils/validations'
import { register } from 'api/auth'

import './styles.scss'

const Signup = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)

  const handleSignup = async (values) => {
    setloading(true)
    try {
      await register(values)
      navigate('/articles')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setloading(false)
    }
  }

  return (
    <Box className='container-fluid container login-container'>
      <LoadingModal show={loading} />
      <Box>
        <Paper className='mat-paper login-paper'>
          <Card className='mat-card'>
            <Typography className='heading' variant='h3'>
              Sign Up
            </Typography>
            <Form
              fieldsInitialValues={signupFieldsInitialValues}
              handleSubmition={handleSignup}
              action='Sign Up'
              navigate='Login'
              handleAction={() => navigate('/login')}
              validate={validateLogin}
              fields={signupFields}
            />
          </Card>
        </Paper>
      </Box>
    </Box>
  )
}

export default Signup
