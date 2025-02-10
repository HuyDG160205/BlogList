import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import userService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAllUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Users from './components/Users'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'
import User from './components/User'
import { initializeUser } from './reducers/authReducer'

const App = () => {
  const blogs = useSelector((state) => state.blog)
  const users = useSelector((state) => state.users)
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeAllUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h1>blogs</h1>
      <Notification />

      {/* {user && (
        <div>
          <p>{user.name} logged in</p>

          <Togglable buttonLabel='new blog' ref={noteFormRef}>
            <CreateNew />
          </Togglable>

          <button onClick={handleLogout}>logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={userToFind} />
          ))}
        </div>
      )} */}

      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
