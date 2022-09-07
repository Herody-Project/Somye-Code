import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputRightAddon, PinInput, PinInputField, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const UpdatePass = (props) => {
    const history = useHistory();
    const [showw, setShow] = useState(false)
    const [reveal, setReveal] = useState(false)

    const [pass, setpass] = useState('')
    const [number, setnumber] = useState('')
    const [user, setUser] = useState({
        npass:''
    })

    const handleeChange = (e) => {
        setpass(e)

    }
    const handleChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value
        })

    }
    useEffect(() => {
        onView();

    }, []);

    const onView = async () => {
        const response = await fetch(`http://localhost:5000/user/fetch-user`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },
        }
        )
        const json = await response.json();
        setnumber(json.phoneNumber);


    }
    const Verify = async () => {
        const response = await fetch(`http://localhost:5000/user/send-verification`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({
                phoneNumber:number
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
        const response = await fetch(`http://localhost:5000/user/verify-OTP`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({ phoneNumber:  number, otp: pass })

        })
        const json = await response.json();
        console.log(json)
        if (json.valid) {
            props.showAlert('Phone number successfully verified!', 'success');
            setReveal(true)

        }
        else {
            props.showAlert('Wrong otp entered, please try again!', 'error');

        }

    }

    const changepass = async() => {
        const response = await fetch(`http://localhost:5000/user/update-pass`, {
            method: "PATCH", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({npass:user.npass })

        })
        const json = await response.json();
        if(json.success===true){
            props.showAlert("Password successfully updated!",'success');
            setTimeout(() => {
                history.push('/view-profile');

            }, 3000);
        }
        else{
            props.showAlert('Password change failed, please try again later!','error');
        }

    }


    return (
        <div>
            <Stack >
            <Flex
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
                 >
                <Stack spacing={4}
                    w={'full'}
                    display={reveal?'none':''}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    align='center'
                    p={6}
                    my={12}>
                    <Heading align='center'>
                        Verify Yourself
                    </Heading>
                    <Text>
                        To proceed further, we need to make sure that's you.
                    </Text>
                    <Box align='center'>

                        <Button variant='solid' bgColor={'green.400'} _hover={{ bgColor: 'green.300' }}
                            onClick={Verify}
                            display={showw === false ? '' : 'none'}
                        >
                            Send OTP to +{number}
                        </Button>

                    </Box>
                     <Box align='center'>
                    <HStack >
                       
                        <PinInput otp id='otp' name='otp'
                            value={user.otp} onChange={handleeChange} 
                        >
                            <PinInputField display={showw === true ? '' : 'none'} />
                            <PinInputField display={showw === true ? '' : 'none'} />
                            <PinInputField display={showw === true ? '' : 'none'} />
                            <PinInputField display={showw === true ? '' : 'none'} />
                            <PinInputField display={showw === true ? '' : 'none'} />
                            <PinInputField display={showw === true ? '' : 'none'} />
                        </PinInput>
                        
                    </HStack></Box>
                    <Box align='center'>
                    <Button variant='solid' bgColor={'green.400'} _hover={{ bgColor: 'green.300' }}
                        onClick={VerifyOtp} display={showw === true ? '' : 'none'} 
                    >
                        Verify OTP
                    </Button>
                    </Box>
                </Stack>
                </Flex>
                <Flex
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
                
               >
                <Stack spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    align='center'
                    display={reveal?'':'none'}
                    p={6}
                    my={12}>
                <Box>
                <FormControl id="npass" >
                            <FormLabel>New Password</FormLabel>
                            <Input
                                placeholder=""
                                name="npass"
                                type="pass"
                                value={user.npass}
                                onChange={handleChange}

                            />
                        </FormControl>
                </Box>
                <Box align='center'>
                    <Button onClick={changepass}>
                        Change Password
                    </Button>
                </Box>

                </Stack>
            

            </Flex>
            </Stack>


          
        </div>
    )
}

export default UpdatePass
