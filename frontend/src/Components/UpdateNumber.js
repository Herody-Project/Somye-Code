import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, InputGroup, InputRightAddon, PinInput, PinInputField, Stack, Textarea, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const UpdateNumber = (props) => {
    const history  = useHistory();
    const [user,setUser] = useState({
        number:'' })
    const [pass,setpass] = useState('')
    const [showw,setShow] = useState(false)

    const handleChange = (e) => {
        setUser({number:e.target.value})

    }
    const handleeChange = (e) => {
        setpass(e)

    }
    const NumUpdate = async () =>{
            const response = await fetch(`http://localhost:5000/user/send-verification`, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
              },
              body: JSON.stringify({
                phoneNumber:'91'+  user.number
              })
            }
            )
            const json = await response.json();
            if (json === 'success') {
                props.showAlert('Otp sent!', 'success');
                setShow(true)
            }
            else {
                props.showAlert('Some error occured, please try again!', 'error');
            }
        }
        const VerifyOtp = async () => {
            const response = await fetch(`http://localhost:5000/user/verify-otp`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem('token')
                },
                body: JSON.stringify({ phoneNumber:'91'+  user.number, otp: pass })
    
            })
            const json = await response.json();
            console.log(json)
            if (json.valid) {
                props.showAlert('phone number successfully changed!', 'success');
                setTimeout(() => {
                    history.push('/view-profile');
    
                }, 3000);
            }
            else {
                props.showAlert('Wrong otp entered, please try again!', 'error');
    
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
                        <FormControl id="number" >
                            <FormLabel>New Phone Number</FormLabel>
                            <InputGroup>
                            <InputRightAddon children='+91'/>
                            <Input
                                placeholder=""
                                name="number"
                                type="number"
                                value={user.number}
                                onChange={handleChange}

                            />
                            </InputGroup>
                        </FormControl>

                    </Box>
                   
                    <Box>
                        <Button  variant='solid' bgColor={'green.400'} _hover={{bgColor:'green.300'}} onClick={NumUpdate} display = {showw===false?'':'none'}>
                            Send OTP
                        </Button>

                    </Box>
                    <HStack>
                    <PinInput otp id='otp' name='otp' value={user.otp} onChange={handleeChange} >
                            <PinInputField display = {showw===true?'':'none'}  />
                            <PinInputField display = {showw===true?'':'none'}/>
                            <PinInputField display = {showw===true?'':'none'}/>
                            <PinInputField display = {showw===true?'':'none'}/>
                            <PinInputField display = {showw===true?'':'none'}/>
                            <PinInputField display = {showw===true?'':'none'}/>
                        </PinInput>
                        </HStack>
                        <Button  variant='solid' bgColor={'green.400'} _hover={{bgColor:'green.300'}} onClick={VerifyOtp} display = {showw===true?'':'none'}>
                            Verify OTP
                        </Button>
                </Stack>
            </Flex>
        </div>
    )
}

export default UpdateNumber
