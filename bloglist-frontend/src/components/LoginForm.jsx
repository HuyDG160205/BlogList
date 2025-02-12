import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { login } from '../reducers/authReducer'
import { TextField } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login(username, password))

    setUsername('')
    setPassword('')

    navigate('/')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label='Username'
            data-testid='username'
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
        </div>
        <div>
          <TextField
            label='Password'
            data-testid='password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
