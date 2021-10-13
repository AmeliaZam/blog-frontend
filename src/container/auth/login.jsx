import { Box, Card, Paper, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Form, LoadingModal } from 'components'
import { loginFields, loginFieldsInitialValues } from 'utils/constants/login'
import { validateLogin } from 'utils/validations'
import { login } from 'api/auth'

import './styles.scss'

const Login = () => {
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (values) => {
    try {
      setloading(true)
      await login(values)
      navigate('/articles')
    } catch (error) {
      toast.error('Email or Password is incorrect')
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
              Login
            </Typography>
            <Form
              fieldsInitialValues={loginFieldsInitialValues}
              handleSubmition={handleLogin}
              action='Login'
              navigate='Sign Up'
              handleAction={() => navigate('/signup')}
              validate={validateLogin}
              fields={loginFields}
            />
          </Card>
        </Paper>
      </Box>
    </Box>
  )
}

export default Login
