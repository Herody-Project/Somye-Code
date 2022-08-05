import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, keyframes } from '@chakra-ui/react';
import React, { useState } from 'react';

const Alertt = (props) => {
    const spin = keyframes`
  0% {top:-50px}
  10% {top:0px}
  75%{top: 0px}
  90%{top: 0px}
  100%{top:-50px}
`;
    const spinAnimation = `${spin} normal 3s ease`;
    const { type, message } = props.alert;


    // bgColor={type === 'error' ? 'red.400' : 'green.500'} border={'2px solid red'}
    return (
        <div>
            <Box h={10}>
                {props.alert &&
                    <Alert status={`${type}`} variant={'solid'} position='relative' top={'-50px'} zIndex='-99' h={10} animation={spinAnimation}>
                        <AlertIcon  />
                        <AlertTitle>{message}</AlertTitle>
                        <AlertDescription></AlertDescription>
                    </Alert>}
            </Box>

        </div>
    )
}

export default Alertt
