import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeThisBlog, updateLikes } from '../reducers/blogReducer'
const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = async () => {
    dispatch(updateLikes(blog.id, blog))
  }

  const removeBlog = async () => {
    if (window.confirm('are you sure?')) {
      dispatch(removeThisBlog(blog.id))
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <button onClick={toggleVisibility}>View</button>
      {!visible && (
        <div>
          {blog.title} {blog.author}
        </div>
      )}

      {visible && (
        <div>
          <div>
            {blog.title} {blog.author}
          </div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button onClick={likeBlog}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && <button onClick={removeBlog}>Remove</button>}
        </div>
      )}
    </div>
  )
}
export default Blog
