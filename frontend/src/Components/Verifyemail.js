import { Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Verifyemail = () => {

  return (
    <div>
      <Stack align='center'>
        <Text fontSize='2xl'>Your email has been successfully verified!</Text>
        <Link to='/login'>
        <Button bgColor={'green.400'}> Login </Button>
        </Link>
        </Stack>
        
      
    </div>
  )
}

export default Verifyemail
