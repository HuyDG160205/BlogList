import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Togglable from './Togglable'
import CreateNew from './CreateNew'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Blogs = () => {
  const blogs = useSelector((state) => state.blog)

  const user = useSelector((state) => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!blogs || !user) {
    return <Navigate to='/' />
  }

  return (
    <div>
      <Togglable buttonLabel='add blog'>
        <CreateNew />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`} key={blog.id}>
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs
