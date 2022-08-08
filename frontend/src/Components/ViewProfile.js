import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  Textarea,
  Select,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { InfoOutlineIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const ViewProfile = (props) => {
  const [user, setUser] = useState({
    company: "",
    manager: "",
    email: "",
    state: "",
    phoneNumber: "",
    emailVerified: true,
    phoneVerified: true,
    address: "",
    city: "",
    cin: "",
    pan: "",
    gstin: "",
    about: "",
    category: "",
    country: "India",
    pincode: "",
    country:"",
    pincode:"",
    about:"",
    logo:"",


  })

  useEffect(() => {
    onView();

  }, []);

  const history = useHistory();
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
    const { company, manager, email, city, state, phoneNumber, isVerified, isChecked,cin,pan,pincode,gstin,address,category,about,logo,country } = json;

    setUser({
      company: company,
      manager: manager,
      email: email,
      state: state,
      city: city,
      phoneNumber: phoneNumber,
      emailVerified: isVerified,
      phoneVerified: isChecked,
      country: country,
      cin:cin,
      pan:pan,
      pincode:pincode,
      gstin:gstin,
      category:category,
      about:about,
      logo:logo,
      address:address



    })

  }
  const states = ["Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"].sort();

    const noNumbers = (event) => {
      if ((/[0-9~!@#$%\^&*()+=\-\[\]\\;,'"./{}|\\:<>\?]/g).test(event.key)) event.preventDefault();
    }

    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
  
    };
    const update = async(e) =>{
      e.preventDefault()
      const response = await fetch(`http://localhost:5000/user/update-user`, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "authtoken": localStorage.getItem('token')
        },
        body: JSON.stringify({
          company:  user.company,
          manager:  user.manager,
          email:  user.email,
          state:  user.state,
          city:  user.city,
          phoneNumber:  user.phoneNumber,
          country:  user.country,
          cin: user.cin,
          pan: user.pan,
          pincode: user.pincode,
          gstin: user.gstin,
          category: user.category,
          about: user.about,
          logo: user.logo,
          address: user.address  

        }),
      }
      )
      const json = await response.json();
      if(json.success){
        props.showAlert("Profile updated successfully!","success");
        setTimeout(() => {
          history.push('/home')
          
        }, 3000);
      }
      else{
        props.showAlert('Some error occured','error');
      }
    
    }

  return (
    <>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} textAlign={'center'}>
          Employer Profile Edit
        </Heading>
        <FormControl id="logo">
          <FormLabel>Logo</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <HStack>
          <Box>
            <FormControl id="company" isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input
                placeholder="company"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={user.company}
                onKeyDown={noNumbers}
                onChange={handleChange}
                name="company"

              />
            </FormControl>
          </Box>

          <Box>
            <FormControl id="manager" isRequired>
              <FormLabel>Manager Name</FormLabel>
              <Input
                placeholder=""
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={user.manager}
                onKeyDown={noNumbers}
                onChange={handleChange}
                name="manager"

              />
            </FormControl>
          </Box>



        </HStack>
        <Stack>
          <Box>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder=''
                type="email"
                value={user.email}
                onChange={handleChange}
                name="email"
                disabled
                
              />
            </FormControl>
          </Box>
          <Box>
            <Button bg={'green.400'} display={user.emailVerified ? 'none' : ''} >Verify email</Button>
          </Box>
        </Stack>
        <HStack>
          <Box>
            <FormControl id="cin" >
              <FormLabel>CIN</FormLabel>
              <Input
                placeholder=""
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={user.cin}
                maxLength={21}
                onChange={handleChange}
                name="cin"

              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="pan" >
              <FormLabel>PAN</FormLabel>
              <Input
                placeholder=""
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={user.pan}
                maxLength={10}
                onChange={handleChange}
                name="pan"

              />
            </FormControl>
          </Box>
        </HStack>
        <HStack>
          <Box>
            <FormControl id="gstin" >
              <FormLabel>GSTIN</FormLabel>
              <Input
                placeholder=""
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={user.gstin}
                maxLength={15}
                onChange={handleChange}
                name="gstin"


              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="pincode" >
              <FormLabel>Pincode</FormLabel>
              <Input
                placeholder=""
                _placeholder={{ color: 'gray.500' }}
                type="number"
                value={user.pincode}
                maxLength = "6"
                max={6}
                onChange={handleChange}
                name="pincode"
              />
            </FormControl>
          </Box>
        </HStack>
        <FormControl id="address" >
          <FormLabel>Address</FormLabel>
          <Textarea
            placeholder=""
            _placeholder={{ color: 'gray.500' }}
            type=""
            value={user.address}
            onChange={handleChange}
            name="address"
          />
        </FormControl>
        <HStack>
          <Box>
            <FormControl id="city" >
              <FormLabel>City</FormLabel>
              <Input
                placeholder=""
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={user.city}
                onChange={handleChange}
                name="city"

              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="state" isRequired>
              <FormLabel>State</FormLabel>
              <Select placeholder='Select State' name="state" onChange={handleChange} value={user.state}>
                {states.map((state) => {
                  return (<option value={`${state}`}>{state}</option>)
                })}

              </Select>
            </FormControl>
          </Box>
        </HStack>
        <HStack spacing={14}>
          <Box>
            <FormControl id="country" >
              <FormLabel>Country</FormLabel>
              <Input
                placeholder=""
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value='India'
                disabled 
                w={32}
                onChange={handleChange}

              />
            </FormControl>

          </Box>
          <Box>
            <FormControl id="category" >
              <FormLabel>Category</FormLabel>
              <Select value={user.category} placeholder="Select category" onChange={handleChange} name="category">
                <option value='Information Technology'>Information Technology</option>
                <option value='Marketing'>Marketing</option>
                <option value='E-commerce'>E-commerce</option>
                <option value='FinTech'>FinTech</option>
                <option value='Hyperlocal'>Hyperlocal</option>
              </Select>
            </FormControl>

          </Box>
        </HStack>
        <HStack spacing={10}>
          <Box>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                placeholder=""
                _placeholder={{ color: 'gray.500' }}
                type="tel"
                value= {'+' + user.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                disabled
              />
            </FormControl>
          </Box>
          <Box pt={7}>
            <Link to='/verify-otp' >
              <Button bg={'green.400'} display={user.phoneVerified ? 'none' : ''} >Verify Number</Button>
            </Link>
          </Box>

        </HStack>

        <FormControl id="about" >
          <FormLabel>About</FormLabel>
          <Textarea
            placeholder="something about yourself"
            _placeholder={{ color: 'gray.500' }}
            value={user.about}
            onChange={handleChange}
            name="about"

          />
        </FormControl>

        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
              <Link to='/home'> Cancel</Link>
           
          </Button>
          
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            onClick={update}
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>

    </Flex >
    <Flex justify={'center'}>
    
    <HStack >
      <Box>
        <Link to='/update-mail'> 
        <Button bgColor={'chocolate'} _hover={{bgColor:'red.200'}}>Change E-mail</Button>
        </Link>
        
      </Box>
      <Box>
      <Link to='/update-number'>
      <Button bgColor={'chocolate'} _hover={{bgColor:'red.200'}}>Change Phone Number</Button>
      </Link>
      </Box>
      <Box>
      <Link to='/update-password'>
      <Button bgColor={'chocolate'} _hover={{bgColor:'red.200'}}>Change Password</Button>
      </Link>
      </Box>
      
    </HStack>
    </Flex>
    </>


  )

}

export default ViewProfile
