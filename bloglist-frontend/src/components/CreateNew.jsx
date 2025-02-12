import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'

const CreateNew = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const addBlog = (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url
    }

    if (!user) {
      return null
    }

    // blog.user = user

    dispatch(createBlog(blog))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Card sx={{ maxWidth: 500, margin: '20px auto', padding: 2, boxShadow: 4, borderRadius: 3 }}>
      <CardContent>
        <Typography variant='h6' align='center' gutterBottom>
          Create New Blog
        </Typography>
        <Box component='form' onSubmit={addBlog} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            id='title'
            label='Title'
            variant='outlined'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='Enter blog title'
            fullWidth
          />
          <TextField
            id='author'
            label='Author'
            variant='outlined'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Enter author's name"
            fullWidth
          />
          <TextField
            id='url'
            label='URL'
            variant='outlined'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='Enter blog URL'
            fullWidth
          />
          <Button id='create-button' type='submit' variant='contained' color='primary' sx={{ mt: 1 }}>
            Create
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CreateNew
