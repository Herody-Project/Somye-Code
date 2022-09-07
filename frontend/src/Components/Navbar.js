import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar, Box, Button, Flex, HStack,
  IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useColorModeValue, useDisclosure
} from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";


const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.400", "gray.700"),
    }}
    to={children.toLowerCase()}
  >
    {children}
  </Link>
);



export default function Simple(props) {
  const history = useHistory();
  const location = useLocation();
  const btnRef = useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const logout = () => {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'))
    history.push('/login');
    props.showAlert('Logged out successfully!', 'success')
  }
  const Links = ['Home', 'Login', 'Signup'];
  const [user, setUser] = useState({
    logo: ''
  })


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
    console.log(localStorage.getItem('token'))
    setUser({
      logo: json.logo
    })

  }
  useEffect(() => {
    onView();

  }, []);





  return (
    <>
      <Box bg={useColorModeValue("cyan.700", "gray.900")} px={4} bgColor='cyan.700'>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} bgColor='cyan.700'>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon bgColor={'cyan.700'}
            /> : <HamburgerIcon bgColor={'cyan.700'}
            />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            bgColor={'cyan.700'}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box >
              <img
                src="https://www.pngall.com/wp-content/uploads/2016/04/Deviantart-Logo-PNG-Image.png"
                width={150}
                alt=""
              />
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            <HStack spacing={8} alignItems={"center"} p={"12"} >
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <Link to='/home' display={localStorage.getItem('token') ? '' : 'none'} active={location.pathname === '/home'}
                >
                  <Button
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0} color={"blackAlpha.800"} _hover={{
                      textDecoration: "none", color: 'red.400'
                    }}
                  >Home</Button>
                </Link>
                <Link to='/view-profile' active={location.pathname === '/view_profile'}
                >
                  <Button
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0} color={"blackAlpha.800"} _hover={{
                      textDecoration: "none", color: 'red.400'
                    }}
                    display={localStorage.getItem('token') ? '' : 'none'}
                  >View Profile</Button>
                </Link>
                <Link to='/login'
                >
                  <Button
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0} color={"blackAlpha.800"} _hover={{
                      textDecoration: "none", color: 'red.400'
                    }}
                    display={!localStorage.getItem('token') ? '' : 'none'}
                  >Login</Button>
                </Link>
                <Link to='/signup' >
                  <Button
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0} color={"blackAlpha.800"} _hover={{
                      textDecoration: "none", color: 'red.400'
                    }}
                    display={!localStorage.getItem('token') ? '' : 'none'}
                  >Signup</Button>
                </Link>
              </HStack>
            </HStack>
            <Menu >
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                display={localStorage.getItem('token') ? '' : 'none'}
              >
                <Avatar
                  size={"sm"}
                  src={user.logo}
                />
              </MenuButton>
              <MenuList>
                <MenuItem w={"60"}>
                  <img
                    src={user.logo}
                    alt=""
                    style={{ borderRadius: "50%" }}
                    
                  />
                </MenuItem>
                <MenuItem ref={btnRef} onClick={onOpen} >
                  Change Avatar</MenuItem>
                <MenuItem>
                <Link to='/view-profile'>View Profile</Link>
                </MenuItem>
                <MenuItem>
                <Link to='/create-gig'>Create Gig</Link>
                </MenuItem>
                <MenuItem>
                <Link to='/create-internship'>Post a Internship</Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  bgColor={"blue.500"}
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("blue.300", "gray.700"),
                  }}
                  onClick={logout}
                >Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>    

    </>
  );
}
