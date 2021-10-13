import { Box, Card as MuiCard, CardActions, CardContent, Typography, Button } from '@mui/material'
import * as React from 'react'

const Card = ({ author, title, status, description, date, handleAction, isAuthorized }) => {
  return (
    <MuiCard sx={{ width: '25rem' }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
          By {author}
        </Typography>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' sx={{ mt: 1, mb: 1.5 }}>
          {description}
        </Typography>
        <Typography variant='body2' sx={{ mb: 1 }} color='text.secondary'>
          Status: {status}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Date: {new Date(date).toISOString().split('T')[0]}
        </Typography>
      </CardContent>
      {isAuthorized && (
        <CardActions>
          <Box sx={{ margin: '1rem 1rem 1rem 0rem' }}>
            <Button
              onClick={() => handleAction('update')}
              variant='contained'
              color='primary'
              className='edit-button'
            >
              Edit
            </Button>
            <Button
              onClick={() => handleAction('delete')}
              variant='contained'
              color='error'
              className='edit-button'
            >
              Delete
            </Button>
          </Box>
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
