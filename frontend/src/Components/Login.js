import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';

export default function SimpleCard(props) {
  const history = useHistory();
  const [input, setinput] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false);

  // const isError = input.password === ''|| input.password.length<8;
  const isErrorr = ({
    req: input.email === '',
    ast: input.email.includes('@') && input.email.length > 1,
    com: input.email.includes('.com') && input.email.length > 1
  })

  const isError = ({
    pass: input.password === '',
    len: input.password.length < 8 && input.password.length > 0,
    num: input.password.match("[0-9].*[0-9]")

  }

  )

  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/user/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password
        }),
      });
      const json = await response.json();
      console.log(json.authtoken)
      if (json.success) {
        // redirect
        console.log(json.autht)
        localStorage.removeItem('token');
        localStorage.setItem('token', json.autht);
        console.log(json.authtoken)
        props.showAlert('Logged in successfully!','success')
        history.push("/home");
      } 
      else {
        props.showAlert('Invalid username or password!','error')
      }
    }
    catch (error) {
      console.log('error:', error)
    }


  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading textAlign={"center"} fontSize={"4xl"}>Log in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={isErrorr.req || !isErrorr.ast || !isErrorr.com}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' value={input.email} onChange={handleChange} autoFocus
                focusBorderColor={!isErrorr.req && isErrorr.ast && isErrorr.com ? 'green.500' : ''}
                borderColor={!isErrorr.req && isErrorr.ast && isErrorr.com ? 'green.500' : ''}
              />

              {!isErrorr.req && isErrorr.com && isErrorr.ast ? (
                <FormHelperText color={'green.500'}>
                  Looks Good!
                </FormHelperText>

              ) : (
                ''
              )}

              {!isErrorr.req ? (
                isErrorr.ast ? (
                  isErrorr.com ? (
                    <FormHelperText>
                    </FormHelperText>) : (
                    <FormErrorMessage>Missing '.com'</FormErrorMessage>)

                ) : (
                  <FormErrorMessage>Missing '@'</FormErrorMessage>)
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>)
              }

            </FormControl>
            <FormControl id="password" isInvalid={isError.pass || isError.len || isError.num == null}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} name='password' value={input.password} onChange={handleChange}
                  onCopy={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  focusBorderColor={!isError.pass && !isError.len && isError.num !== null ? 'green.500' : ''}
                  borderColor={!isError.pass && !isError.len && isError.num !== null ? 'green.500' : ''}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!isError.pass ? (!isError.len ? (isError.num !== null ? (<FormHelperText> </FormHelperText>) : (<FormErrorMessage>Password must contain at least 2 numbers.</FormErrorMessage>)) : (<FormErrorMessage>Password must be of atleast 8 characters.</FormErrorMessage>)) : (<FormErrorMessage>Password is required.</FormErrorMessage>)}

              {!isError.pass && !isError.len && isError.num !== null ? (
                <FormHelperText color={"green.400"}>Looks Good! </FormHelperText>) : ''
              }

            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember Me</Checkbox>
                <Link textAlign={"center"} color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
                type="submit"
                disabled={isError.len || isError.num == null || isError.pass || !isErrorr.ast || !isErrorr.com || isErrorr.req}
                onClick={onSubmit}
              >
                Log in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack >
    </Flex >
  );
}
