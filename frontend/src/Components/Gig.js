import React from 'react'
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
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'



const Gig = (props) => {
    const [input, setinput] = useState({
        title: "",
        description: "",
        ttitle: "",
        tdescription: "",
        tlink: "",
        amount: ""
    });
    const handleChange = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    };
    const noNumbers = (event) => {
        if ((/[0-9~!@#$%\^&*()+=\-\[\]\\;,'"./{}|\\:<>\?]/g).test(event.key)) event.preventDefault();
    }
    const [gigz, setGigz] = useState(null)



    const onCreate = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/user/create-gig`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: input.title,
                description: input.description,
                ttitle: input.ttitle,
                tdescription: input.tdescription,
                tlink: input.tlink,
                amount: input.amount
            }),
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            // redirect
            props.showAlert('Gig created successfully', 'success')
            setTask(true)
            getGigs();
        }
        else {
            props.showAlert(`Some error occured, please try again later!`, 'error');

        }
    };
    const [ttask, setTask] = useState(false);  
    const [Gigx, setGigx] = useState('');  
    const newTask = (e) => {
        e.preventDefault()
        setinput({ ...input, ttitle: "", tdescription: "", tlink: "" })
        setTask(false)
    }
    const getGigs = async () => {
        const response = await fetch(`http://localhost:5000/user/fetch-gigs`, {
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
        const giig = json
        setGigz(giig)

    }
    const delGig = async (giga) => {
        const response = await fetch(`http://localhost:5000/user/del-gig`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                authtoken: localStorage.getItem('token'),
                gig:giga
            })

        },
        )
        const json = await response.json();
        if(json.success){
            props.showAlert('Gig deleted successfully!','success')
            getGigs()
        }
        else{
            props.showAlert('Some error occured, please try again later!','error')

        }

    }

    useEffect(() => {
        getGigs();

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
                    p={10}>
                    <Box >
                        <FormControl id="title" >
                            <FormLabel>Gig Title</FormLabel>
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
                            <FormLabel>Gig Description</FormLabel>
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
                        <FormControl id="amount" >
                            <FormLabel>Amount per person</FormLabel>
                            <Input
                                type="number"
                                name="amount"
                                value={input.amount}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="ttitle" >
                            <FormLabel>Task Title</FormLabel>
                            <Input
                                type="text"
                                name="ttitle"
                                value={input.ttitle}
                                onChange={handleChange}
                                onKeyDown={noNumbers}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="tdescription" >
                            <FormLabel>Task Description</FormLabel>
                            <Input
                                type="text"
                                name="tdescription"
                                value={input.tdescription}
                                onChange={handleChange}
                                onKeyDown={noNumbers}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="tlink" >
                            <FormLabel>Link</FormLabel>
                            <Input
                                type="text"
                                name="tlink"
                                value={input.tlink}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box align={'center'}>
                        <Button onClick={onCreate}>Create</Button>
                        <Button onClick={newTask} display={ttask === true ? '' : 'none'}>Add another task</Button>
                    </Box>
                </Stack>
            </Flex>

            <Box p={10} py={12} px={6} align='center'>
                <Heading>Your Gigs</Heading>        </Box>

            <Flex align={'center'}
                justify={'center'}>
                    <HStack spacing={5}>
                
                {gigz.length===0
                ?
                <>
                <Text align='center'>
                    No gigs to show.....
                 </Text>
                    </>
                :''}

                {gigz && gigz.map((gig) => (
                    <>
                    
                        <Stack spacing={8} bg="white.700"
                            boxShadow={"lg"}
                            border={'2px solid grey'}
                            borderRadius={'10%'}
                        >

                            <Box p={10} py={12} px={6}>
                                <Stack p={5}>

                                    <Box
                                        fontWeight='semibold'
                                        align='center'
                                        fontSize={'3xl'}
                                    >
                                        <Text isTruncated 
                                        noOfLines={1}
                                        >
                                         {gig.title}
                                            </Text>

                                    </Box >
                                    <Box >
                                        <Text fontSize={'2xl'} color={'grey'}>
                                            {gig.description}
                                        </Text>

                                    </Box >
                                    <Box >
                                        <Text align='center'>
                                           Amount per User: {gig.amount}
                                        </Text>
                                    </Box >
                                    <Box >
                                        {gig.task.map((tassk) =>
                                            <>
                                                <Accordion allowToggle>
                                                    <AccordionItem>
                                                        <h2>
                                                            <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                                                                <Box flex='1' textAlign='left'>
                                                                {tassk.ttitle}
                                                              </Box>
                                                                <AccordionIcon />
                                                            </AccordionButton>
                                                        </h2>
                                                        <AccordionPanel >
                                                            <Text noOfLines={2}>
                                                           {tassk.tdescription}
                                                           </Text>
                                                        </AccordionPanel>
                                                        <AccordionPanel>
                                                           {tassk.tlink}
                                                        </AccordionPanel>
                                                    </AccordionItem>
                                                </Accordion>


                                                
                                            </>
                                        )}
                                        <Box py={5} align='center'>
                                            <Button onClick={()=>delGig(gig.title)}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                            </Button>
                                        </Box>
                                    </Box >
                                </Stack>
                            </Box>
                        </Stack>
                    </>
                ))
                }

</HStack>
            </Flex>






        </div>
    )
}

export default Gig
