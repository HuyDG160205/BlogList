import { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAllUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Users from './components/Users'
import { Routes, Route, useMatch, Navigate, Link, useNavigate } from 'react-router-dom'
import User from './components/User'
import { initializeUser, logout } from './reducers/authReducer'
import Blogs from './components/Blogs'
import { AppBar, Container, TableContainer, Toolbar, Typography, Link as MuiLink, Button, Box } from '@mui/material'

const App = () => {
  const blogs = useSelector((state) => state.blog)
  const users = useSelector((state) => state.users)
  const user = useSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeAllUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    if (!user) {
      navigate('/blogs')
    }
  }, [navigate, user])

  const match = useMatch('/users/:id')
  const userToFind = match ? users.find((u) => u.id === match.params.id) : null
  const blogMatch = useMatch('/blogs/:id')
  const blogToFind = blogMatch ? blogs.find((b) => b.id === blogMatch.params.id) : null

  return (
    <Container maxWidth='md'>
      <Typography variant='h3' align='center' gutterBottom>
        Blogs
      </Typography>

      <Notification />

      {user ? (
        <AppBar position='static' color='primary'>
          <Toolbar>
            <MuiLink component={Link} to='/users' color='inherit' underline='none' sx={{ mr: 2 }}>
              Users
            </MuiLink>
            <MuiLink component={Link} to='/blogs' color='inherit' underline='none' sx={{ mr: 2 }}>
              Blogs
            </MuiLink>

            <Box sx={{ flexGrow: 1 }} />

            <Typography variant='body1' sx={{ mr: 2 }}>
              {user.name} logged in
            </Typography>

            <Button variant='contained' color='secondary' onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <LoginForm />
      )}

      <Box sx={{ mt: 4 }}>
        <Routes>
          <Route path='/' element={<Navigate to='/blogs' replace />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={userToFind ? <User user={userToFind} /> : <Navigate to='/users' />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route
            path='/blogs/:id'
            element={blogToFind ? <Blog blog={blogToFind} user={user} /> : <Navigate to='/blogs' />}
          />
        </Routes>
      </Box>
    </Container>
  )
}

export default App
