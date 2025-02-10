import { showNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { login } from '../reducers/authReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))

      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 5))
    }

    navigate('/users')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
        </div>
        <div>
          password
          <input
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
