import React from 'react'
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl, FormErrorMessage, FormHelperText, FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Link,
    Select,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { faCoins } from '@fortawesome/free-solid-svg-icons'



const Internship = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [input, setinput] = useState({
        title: "",
        description: "",
        positions: "",
        sdate:'',
        adate:'',
        duration:'',
        category:'',
        workplace:'',
        abenefits:'',
        skills:'',
        stipend:''

    });
    const handleChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    };
    const noNumbers = (event) => {
        if ((/[0-9~!@#$%\^&*()+=\-\[\]\\;,'"./{}|\\:<>\?]/g).test(event.key)) event.preventDefault();
    }
    const [shipz, setShipz] = useState(null)
    const categories = [
        'SALES & BUSINESS DEVELOPMENT',
        'PRODUCTION',
        'MAINTENANCE',
        'ACCOUNTING AND FINANCE',
        'ADMIN & HUMAN RESOURCES(HR) MANAGEMENT',
        'PROCUREMENT & PLANNING',
        'TESTING & QUALITY',
        'RESEARCH & DEVELOPMENT (R&D)',
        'DESIGN',
        'MARKETING',
        'TRAINING & DEVELOPMENT',
        'PURCHASING',
        'SUPPLY CHAIN MANAGEMENT',
        'INVENTORY & STORE',
        'IT & ITES',
        'ENVIRONMENTAL HEALTH & SAFETY',
        'CORPORATE SUPPORT',
        'ENGINEERING',
        'ELECTRICAL',
        'MECHANINCAL',
        'FACULTY MANAGEMENT',
        'CUSTOMER SERVICR SUPPORT',
        'CONSULTANT',
        'EXPERT',
        'CONTRACTOR',
        'OTHER'

    ]
    const [qfields,setfields] = useState([])



    const onCreate = async (e) => {
        e.preventDefault();
        console.log(input)

        const response = await fetch(`http://localhost:5000/user/create-internship`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: input.title,
                description: input.description,
                positions: input.positions,
                adate: input.adate,
                sdate: input.sdate,
                category: input.category,
                duration: input.duration,
                workplace: input.workplace,
                abenefits: input.abenefits,
                skills: input.skills,
                stipend: input.stipend,
            }),
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            // redirect
            props.showAlert('Internship created successfully', 'success')
            setTask(true)
        }
        else {
            props.showAlert(`Some error occured, please try again later!`, 'error');

        }
    };
    const [ttask, setTask] = useState(false);
    const [chek, setchek] = useState(false);
    const [Gigx, setGigx] = useState('');
    const newTask = (e) => {
        e.preventDefault()
        setinput({ ...input, ttitle: "", tdescription: "", tlink: "" })
        setTask(false)
    }
    const getShips = async () => {
        const response = await fetch(`http://localhost:5000/user/fetch-ships`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                authtoken: localStorage.getItem('token')
            })

        },
        )
        const json = await response.json();
        console.log(json)
        setShipz(json)


    }
    // const delGig = async (giga) => {
    //     const response = await fetch(`http://localhost:5000/user/del-gig`, {
    //         method: "POST", // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             "Content-Type": "application/json"

    //         },
    //         body: JSON.stringify({
    //             authtoken: localStorage.getItem('token'),
    //             gig: giga
    //         })

    //     },
    //     )
    //     const json = await response.json();
    //     if (json.success) {
    //         props.showAlert('Gig deleted successfully!', 'success')
    //         getGigs()
    //     }
    //     else {
    //         props.showAlert('Some error occured, please try again later!', 'error')

    //     }

    // }

    useEffect(() => {
        getShips();

    }, []);


    return (
        <div>
            <Flex
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} py={12} px={6} w={'full'} maxW={'md'} bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    >
                    <Box >
                        <FormControl id="title" >
                            <FormLabel>Internship Title</FormLabel>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={handleChange}
                                onKeyDown={noNumbers}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="description" >
                            <FormLabel>Internship Description</FormLabel>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={handleChange}
                                onKeyDown={noNumbers}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="sdate" >
                            <FormLabel>Project Start Date</FormLabel>
                            <Input
                                type="date"
                                name="sdate"
                                value={input.sdate}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="adate" >
                            <FormLabel>Apply before Date</FormLabel>
                            <Input
                                type="date"
                                name="adate"
                                value={input.adate}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="duration" >
                            <FormLabel>Project Duration</FormLabel>
                            <Input
                                type="text"
                                name="duration"
                                value={input.duration}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="category" >
                            <FormLabel>Category</FormLabel>
                            <Select
                                type="text"
                                name="category"
                                value={input.category}
                                onChange={handleChange}
                                placeholder='Select a Category'
                            >
                                {categories.map((category) => (
                                    <option value={`${category}`}>{category}</option>

                                ))}

                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="positions" >
                            <FormLabel>No. of Positions</FormLabel>
                            <Input
                                type="text"
                                name="positions"
                                value={input.positions}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="workplace" >
                            <FormLabel>Select Workplace</FormLabel>
                            <Select
                                name="workplace"
                                value={input.workplace}
                                onChange={handleChange}
                                placeholder='Select Workplace'
                            >
                                <option value='Work From Home'>Work From Home</option>
                                <option value='In-Office'>In-Office</option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>

                        <FormLabel>Additional Benefits</FormLabel>
                        <Textarea
                            name="abenefits"
                            value={input.abenefits}
                            onChange={handleChange}

                        />
                    </Box>
                    <Box>

                        <FormLabel>Skills required</FormLabel>
                        <Textarea
                            name="skills"
                            value={input.skills}
                            onChange={handleChange}

                        />
                    </Box>
                    <Box>
                        <FormControl id="stipend" >
                            <FormLabel>Stipend</FormLabel>
                            <Input
                                type="text"
                                name="stipend"
                                value={input.stipend}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    {/* <Box>
                        <FormControl id="stipend" >
                            <FormLabel>Proofs</FormLabel>
                            <HStack>
                            <Checkbox colorScheme='red'  isChecked={chek} value={input.proof}
                                onChange={handleChange}
                                onClick={()=>setchek(true)}>
                                File
                            </Checkbox> */}
                            {/* <Checkbox colorScheme='red'  isChecked={'Image'} defaultValue={''}
                                onChange={handleChange}>
                                Image
                            </Checkbox>
                            <Checkbox colorScheme='red'  isChecked={'Link'} defaultValue={''}
                                onChange={handleChange}>
                                Link
                            </Checkbox> */}
                            {/* </HStack>
                        </FormControl>
                    </Box> */}
                    {/* <Box>
                        <FormControl id="questions" >
                            <FormLabel>Questions</FormLabel>
                            {qfields.length>=0 && qfields.map((field)=>{
                                 <Input
                                 type="text"
                                 name="questions"
                                 value={input.questions}
                                 onChange={()=>setfields(...qfields,[qfields.concat(input.questions)])}
                             />

                            })} */}
                           
                        {/* </FormControl>
                    </Box> */}
                    
                    <Box align={'center'}>
                        <Button onClick={onCreate}>Create</Button>
                    </Box>
                </Stack>
            </Flex>

            <Box p={10} py={12} px={6} align='center'>
                <Heading>Your Internships</Heading>        </Box>

            <Flex align={'center'}
                justify={'center'}>
                <HStack spacing={5}>

                    {shipz && shipz.length === 0
                        ?
                        <>
                            <Text align='center'>
                                No Internships to show.....
                            </Text>
                        </>
                        : ''}

                    {shipz && shipz.map((ship) => (
                        <>

                            <Stack spacing={8} bg="white.700"
                                boxShadow={"lg"}
                                borderRadius={'10%'}
                            >

                                <Box  >
                                    <Stack p={5}>
                                        <Box boxSize={'350px'}>
                                        <Image
                                        src='https://herody.in/assets/employer/profile_images/Employer_Rajdeep%20Sinha_Herody.png'
                                        objectFit={'fit'}
                                        />
                                        </Box>

                                        <Box
                                            fontWeight='semibold'
                                            align='center'
                                            fontSize={'3xl'}
                                        >
                                            <Text isTruncated
                                                noOfLines={1}
                                                align='left'
                                                color='grey.400'
                                                fontWeight={'light'}
                                            >
                                                {ship.title}
                                            </Text>
                                            <Text color='pink.600' fontSize={'md'} align='left'>
                                                Herody

                                            </Text>
                                            <Text align='left' fontSize={'md'}>
                                            <FontAwesomeIcon icon={faHourglassStart}/> {ship.duration} MONTH
                                        
                                            </Text>
                                            <Text align='left' fontSize={'md'}>
                                            <FontAwesomeIcon icon={faPeopleGroup}/> {ship.positions} POSITIONS
                                        
                                            </Text>
                                            <Box align='right'>
                                            <Button size={'sm'} bgColor={'pink.400'} _hover={{bgColor:'pink.300'}}
                                            onClick={onOpen}
                                            
                                            >
                                            <FontAwesomeIcon icon={faCoins}/>  Rs.{ship.stipend} Incentives
                                            </Button>
                                            </Box>
                                        </Box >
                                    </Stack>
                                </Box>
                            </Stack>


      {/* <Button mt={3} onClick={onOpen}>
        Trigger modal
      </Button> */}

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={'inside'}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align='center'>Internship Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing='10'>
                <Box>
                    <Heading fontSize={'lg'} color='pink.400'> 
                        About Project
                    </Heading>
                    <Text color='grey.200' textAlign={'justify'} fontWeight='bold'>
                        {ship.description}
                    </Text>
                </Box>
                <Box>
                    <Heading fontSize={'lg'} color='pink.400'> 
                        About Company
                    </Heading>
                    <Text color='grey.300' textAlign={'justify'}>
                    Herody is one stop destination for Internships/Gigs/Projects in India. Earn attractive stipend and Certificate by working with brands directly.we will help you to get your first life changing Internship.
                    </Text>
                </Box>
                <Box>
                    <Heading fontSize={'lg'} color='pink.400'> 
                        Project Start Date
                    </Heading>
                    <Text color='grey.300' textAlign={'justify'}>
                    {ship.sdate}
                    </Text>
                </Box>
                <Box>
                    <Heading fontSize={'lg'} color='pink.400'> 
                        Project Benefits
                    </Heading>
                    <Text color='grey.300' textAlign={'justify'}>
                    {ship.abenefits}
                    </Text>
                </Box>
                <Box> 
                    <Heading fontSize={'lg'} color='pink.400'> 
                        Skills Required
                    </Heading>
                    <Text color='grey.300' textAlign={'justify'}>
                    {ship.skills}
                    </Text>
                </Box>

            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
                    ))
                    }

                </HStack>
            </Flex>






        </div>
    )
}

export default Internship
