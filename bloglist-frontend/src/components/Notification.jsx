import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return <div>{notification && <Alert severity='info'>{notification}</Alert>}</div>
}

export default Notification
