import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl, FormErrorMessage, FormHelperText, FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  Select,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Signup(props) {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [input, setinput] = useState({
    manager: "",
    company: "",
    email: "",
    password: "",
    cpassword: "",
    phoneNumber: ""
  });
  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });

  };
  const [onceClicked,setOnceClicked] = useState(false);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setOnceClicked(true);
    
  
    const response = await fetch(`http://localhost:5000/user/signup`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        manager: input.manager,
        company: input.company,
        email: input.email,
        password: input.password,
        cpassword: input.cpassword,
        phoneNumber: '+91' + `${input.phoneNumber}`
      }),
    });
    const json = await response.json();
    console.log(json)
    if (json.email) {
      // redirect
      console.log('email sent successfully!')
      props.showAlert('Verification email sent successfully, please check your mails!','success')
    }
    else if (!json.email) {
      console.log("email not sent!");
      props.showAlert('Email is already in use!','error');
      setTimeout(() => {
        setOnceClicked(false);  
       }, 10000);
    }
    else {
      props.showAlert(`Internal server error, please try again later!`, 'error');
      console.log("Internal server error, please try again later!");

    }
  };

 
  const isErrorr = ({
    req: input.email === '',
    ast: input.email.includes('@') && input.email.length > 1,
    com: input.email.includes('.com') && input.email.length > 1
  });
  const isError = ({
    pass: input.password === '',
    len: input.password.length < 8 && input.password.length > 0,
    num: input.password.match("[0-9].*[0-9]")

  });
  const isUnequal = input.password === input.cpassword;
  const noNumbers = (event) => {
    if ((/[0-9~!@#$%\^&*()+=\-\[\]\\;,'"./{}|\\:<>\?]/g).test(event.key)) event.preventDefault();
  }

  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      // bgImage='https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg'
      // bgRepeat={'no-repeat'}
      // bgSize='cover'
      // bgPosition={'center'}
      >
        <Stack spacing={5} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={2}>
              <HStack>
                <Box>
                  <FormControl id="company" isRequired>
                    <FormLabel>Company Name</FormLabel>
                    <Input
                      type="text"
                      name="company"
                      value={input.company}
                      onChange={handleChange}
                      autoFocus
                      onKeyDown={noNumbers}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="manager" isRequired>
                    <FormLabel>Manager Name</FormLabel>
                    <Input
                      type="text"
                      name="manager"
                      value={input.manager}
                      onChange={handleChange}
                      onKeyDown={noNumbers}
                    />
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  
                </Box>
                <Box>
              
                </Box>

              </HStack>
              <HStack>
                <Box>
      

                </Box>
                <Box>


                  <FormControl id='phoneNumber' isRequired>
                  <FormLabel>Phone Number</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children='+91' />
                      <Input
                        type="number"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={handleChange} />
                    </InputGroup>

                  </FormControl>
                </Box>

              </HStack>
             

              <FormControl id="email" isRequired isInvalid={isErrorr.req || !isErrorr.ast || !isErrorr.com}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  focusBorderColor={!isErrorr.req && isErrorr.ast && isErrorr.com ? 'green.500' : 'red.400'}
                  borderColor={!isErrorr.req && isErrorr.ast && isErrorr.com ? 'green.500' : 'red.400'}
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
              <FormControl id="password" isRequired isInvalid={isError.pass || isError.len || isError.num == null}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    placeholder='Password must be of atleast 8 characters'
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    focusBorderColor={!isError.pass && !isError.len && isError.num !== null ? 'green.500' : 'red.400'}
                    borderColor={!isError.pass && !isError.len && isError.num !== null ? 'green.500' : 'red.400'}
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
              <FormControl id="cpassword" isRequired _invalid={isUnequal}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showcpassword ? "text" : "password"}
                    name="cpassword"
                    value={input.cpassword}
                    onChange={handleChange}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    focusBorderColor={isUnequal ? 'green.500' : 'red.400'}
                    borderColor={isUnequal ? 'green.500' : 'red.400'}

                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowcpassword((showcpassword) => !showcpassword)
                      }
                    >
                      {showcpassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {isUnequal ? (
                  <FormHelperText color={"green.400"}>Looks Good! </FormHelperText>

                ) : (
                  <FormErrorMessage>Password does not match!</FormErrorMessage>

                )}
              </FormControl>
              <Stack spacing={4} pt={2}>
                <Button
                  onClick={onSubmit}
                  type="submit"
                  loadingText="Submitting"
                  size="md"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  disabled={
                    input.company === '' ||
                    input.manager === '' ||
                    input.email === '' ||
                    input.password === '' ||
                    input.cpassword === '' ||
                    isError.pass || isError.len || isError.num == null ||
                    !isUnequal ||
                    !isErrorr.ast || !isErrorr.com ||
                    input.phoneNumber === '' ||
                    onceClicked===true


                  }
                >
                  Sign up
                </Button>
                <Button
                  size="md"
                  bg={"cyan.400"}
                  color={"white"}
                  _hover={{
                    bg: "cyan.600",
                  }}
                >
                  Sign up with
                  <i style={{ margin: "5px" }} className="fa-brands fa-google"></i>
                </Button>
              </Stack>
              <Stack pt={1}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}

export default Signup;
