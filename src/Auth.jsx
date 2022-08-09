import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = ({ cmp }) => {
  const Com = cmp
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      navigate('/login')
    }
  }, [])
  
  return (
    <>
      <Com />
    </>
  )
}

export default Auth