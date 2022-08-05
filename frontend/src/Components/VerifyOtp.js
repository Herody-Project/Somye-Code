import {
    HStack, PinInput, PinInputField, Button, Stack, Box, FormHelperText, Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const VerifyOtp = (props) => {

    const [pass, setpass] = useState('');
    const handleChange = (e) => {
        setpass(e)
    }
    const [user, setUser] = useState({
        phoneNumber: '',
        numberVerified: true
    })
    const [butt, setButt] = useState(false);


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
        const { phoneNumber, isChecked } = json;
        setUser({
            phoneNumber: phoneNumber,
            numberVerified: isChecked

        })
    }

    useEffect(() => {
        onView();

    }, []);
    const history = useHistory();
    const Verify = async () => {
        const response = await fetch(`http://localhost:5000/user/send-verification`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({ phoneNumber: user.phoneNumber })

        })
        const json = await response.json();
        console.log(json)
        setButt(true);
        setTimeout(() => {
            setButt(false);

        }, 60000);
        if (json === 'success') {
            props.showAlert('Otp sent!', 'success');
        }
        else {
            props.showAlert('Some error occured, please try again!', 'error');
        }

    }
    const Checkk = async () => {
        const response = await fetch(`http://localhost:5000/user/verify-otp`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({ phoneNumber: user.phoneNumber, otp: pass })

        })
        const json = await response.json();
        console.log(json)
        if (json.valid) {
            props.showAlert('phone number successfully verified!', 'success');
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
            <Stack align='center' spacing={8} pt={6}>
                <HStack spacing={10}>
                    <Box>
                        <PinInput otp id='otp' name='otp' value={pass} onChange={handleChange} autoFocus>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </Box>
                    <Box spacing={4}>
                        <Button me={5} bgColor={'red.500'} _hover={{ bgColor: 'red.300' }} disabled={!butt} onClick={Checkk}>Verify</Button>
                    </Box>
                </HStack>
                <Box spacing={4} pt={2} >
                    <Button onClick={Verify} bgColor={'blackAlpha.600'} _hover={{ bgColor: 'blackAlpha.400' }} disabled={butt}>Send Otp to {user.phoneNumber}</Button>
                    <Text fontSize={'sm'} color={'red.300'} display={butt ? '' : 'none'}>Please wait for 1 min before trying again.</Text>
                </Box>


            </Stack>


        </div>
    )
}

export default VerifyOtp
