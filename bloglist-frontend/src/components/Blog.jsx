import { useDispatch } from 'react-redux'
import { commentBlog, removeThisBlog, updateLikes } from '../reducers/blogReducer'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import { showNotification } from '../reducers/notificationReducer'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return <Navigate to='/' />
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const Comments = () => {
    return (
      <div>
        <h2>comments</h2>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    )
  }

  const CommentForm = () => {
    const [comment, setComment] = useState('')

    const handleSubmit = (event) => {
      event.preventDefault()
      dispatch(commentBlog(blog.id, comment))
      setComment('')
    }

    return (
      <div>
        <h2>add comment</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' value={comment} onChange={(event) => setComment(event.target.value)} />
          <button type='submit'>add comment</button>
        </form>
      </div>
    )
  }

  const likeBlog = async () => {
    dispatch(updateLikes(blog.id, blog))
  }

  const removeBlog = async () => {
    if (window.confirm('are you sure?')) {
      dispatch(removeThisBlog(blog.id))
      dispatch(showNotification(`blog ${blog.title} removed`, 5))
      return <Navigate to='/' />
    }
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant='h5' component='div' gutterBottom>
          {blog.title}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          {blog.url}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant='body1' sx={{ mr: 1 }}>
            {blog.likes} likes
          </Typography>
          <Button variant='outlined' size='small' onClick={likeBlog}>
            Like
          </Button>
        </Box>

        <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
          Added by {blog.user.name}
        </Typography>

        {user.username === blog.user.username && (
          <Button variant='contained' color='error' size='small' onClick={removeBlog} sx={{ mt: 1 }}>
            Remove
          </Button>
        )}
      </CardContent>

      <CardActions>
        <CommentForm />
        <Comments />
      </CardActions>
    </Card>
  )
}

export default Blog
