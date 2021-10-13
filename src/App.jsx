import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Articles from 'container/articles'
import Login from 'container/auth/login'
import Signup from 'container/auth/signup'
import { isUserLogin } from 'api/auth'

import 'react-toastify/dist/ReactToastify.css'
import {LoadingModal} from 'components'

const App = () => {
  const [loading, setloading] = useState(false)

  const navigate = useNavigate()

  const checkLogin = async () => {
    setloading(true)
    console.log('in Loingggg111')
    const isLogin = isUserLogin()
    if (isLogin) navigate('/articles')
    else navigate('/login')
    console.log('in Loingggg22', isLogin)
   setloading(false)
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return loading ? (
    <LoadingModal show={loading} />
  ) : (
    <>
      <ToastContainer />
      <Suspense fallback={<div />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='*' element={<Navigate replace to='/articles' />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
