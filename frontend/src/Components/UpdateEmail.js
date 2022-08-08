import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, Textarea, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'

const UpdateEmail = (props) => {
    const [user,setUser] = useState({
        email:''
    })
    const handleChange = (e) => {
        e.preventDefault();
        setUser({email:e.target.value})

    }
    const mailUpdate = async () =>{
            const response = await fetch(`http://localhost:5000/user/mail-update`, {
              method: "PATCH", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
              },
              body: JSON.stringify({
                email: user.email
              })
            }
            )
            const json = await response.json();
            if(json.success===true){
                props.showAlert('Verification mail sent successfully, check your inbox!','success');

            }
            else if(json.success==='in use'){
                props.showAlert('Email is already in use!','error')
            }
            else{
                props.showAlert('some error occured, please try again later!','error')
            }
        }
    return (
        <div>
            <Flex 
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')} >
                <Stack spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Box>
                        <FormControl id="email" >
                            <FormLabel>New Email</FormLabel>
                            <Input
                                placeholder=""
                                // value={user.about}
                                // onChange={handleChange}
                                name="email"
                                type="text"
                                value={user.email}
                                onChange={handleChange}

                            />
                        </FormControl>

                    </Box>
                    <Box>
                        <Button  variant='solid' bgColor={'green.400'} _hover={{bgColor:'green.300'}} onClick={mailUpdate}>
                            Send confirmation mail
                        </Button>

                    </Box>
                </Stack>
            </Flex>
        </div>
    )
}

export default UpdateEmail
