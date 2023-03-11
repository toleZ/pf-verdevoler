import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  InputGroup,
  Select,
  Stack,
  Box,
  InputLeftElement,
  HStack,
  Flex,
  Grid,
  useToast,
  Text,
  useColorMode,
  Image,
} from '@chakra-ui/react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import PostsCarousel from '../Components/PostsCarousel';
import axios from 'axios';

const Home = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { entities } = useSelector((state) => state.entitiesReducer);
  const { acount } = useSelector((state) => state.acountReducer);
  const [donation, setDonation] = useState({ amount: '', entity: '' });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setDonation({ ...donation, [name]: value });
  };

  const handleDonate = () => {
    const { id } = acount;
    const { amount, entity } = donation;

    if (!id) {
      navigate('/login');
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para poder donar',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
      throw error('Debes iniciar sesión para poder donar');
    }

    if (amount && entity) {
      try {
        axios
          .post(`/donation`, {
            VdVId: entity,
            amount: amount,
            UserId: id,
          })
          .then((res) => (window.location.href = res.data.body.init_point));
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      toast({
        title: 'Warning',
        description: 'Debes seleccionar una entidad e ingresar un monto',
        status: 'warning',
        duration: 1500,
        isClosable: true,
      });
    }
  };
  const { colorMode } = useColorMode();

  const lightModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225348/LightMode_o28kqz.png';

  const darkModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225682/DarkMode_ilx6zv.png';

  return (
    <Box
      bgImg={colorMode === 'light' ? lightModeBG : darkModeBG}
      padding="3rem"
    >
      <Box w={'94vw'} justifyContent="center" alignSelf={'center'}>
        <Stack>
          <HStack spacing={'2.5rem'} justifyContent="center">
            <Box
              align="center"
              mb="0.8rem"
              pt={'16rem'}
              //p="0.7rem"
              w={'28vw'}
              bg={colorMode === 'light' ? '#f5f2ebe9' : '#2d3748ed'}
              h="50rem"
              borderRadius="1rem"
              boxShadow="dark-lg"
              _hover={{
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <Box mb={'10rem'}>
                <Image
                  src="https://res.cloudinary.com/verdevolver/image/upload/v1678234115/My_project-1_1_dmqtx2.png"
                  w="8rem"
                  style={{ transform: 'scale(2.1)' }}
                />
                <Text
                  //top="0"
                  as="em"
                  fontSize={'5xl'}
                  fontWeight={'bold'}
                  fontFamily={'Tilt Prism'}
                  textColor={colorMode === 'light' ? '#2c786c' : '#b4c4ac'}
                >
                  VerdeVolver
                </Text>
                <Text
                  fontSize={'lg'}
                  // fontWeight={'bold'}
                  pt={'0.6rem'}
                  pr="10%"
                  pl="10%"
                  textAlign={'justify'}
                >
                  {' '}
                  ¡Bienvenido/a a nuestro sitio web! Nuestra aplicación está
                  diseñada para el territorio argentino y te ayudará a encontrar
                  soluciones prácticas para la gestión de residuos. Podrás
                  encontrar información sobre los distintos lugares dedicados al
                  reciclaje en toda Argentina, incluyendo los más cercanos a tu
                  ubicación actual. ¡Gracias por cuidar el planeta junto a
                  nosotros!
                </Text>
              </Box>
            </Box>

            <Box
              align="center"
              w={'28vw'}
              mb="0.8rem"
              p="0.7rem"
              pt={'16rem'}
              bg={colorMode === 'light' ? '#f5f2ebe9' : '#2d3748ed'}
              h="50rem"
              borderRadius="1rem"
              boxShadow="dark-lg"
              _hover={{
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <Stack p={'8'} borderRadius="2rem">
                <HStack flexDir={'column'} gap="4">
                  <Text
                    fontSize={'4xl'}
                    fontWeight={'bold'}
                    fontFamily={'Tilt Prism'}
                    // fontSize={'4xl'}
                    // // fontWeight={'bold harine'}
                    // fontFamily={'Tilt Prism'}
                    textColor={colorMode === 'light' ? '#2c786c' : '#b4c4ac'}
                  >
                    Colaborá con tu punto de reciclaje favorito!
                  </Text>
                  <Flex
                    // gap={'40%'}
                    // mt={'50rem'}
                    direction={'column'}
                    align="center"
                    // border={'2px solid red'}
                    w="35rem"
                    // justifyContent={'center'}
                  >
                    {/* <InputGroup
                    justifyContent={'center'}
                    // pl="30%"
                    // pr="30%"
                  > */}
                    <Select
                      shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
                      placeholder="Puntos de reciclaje"
                      onChange={handleInputs}
                      name="entity"
                      // borderWidth="0.2rem"
                      w={'50%'}
                      // mr="10rem"

                      // borderColor="gray.300"
                    >
                      {entities?.map(({ id, name }) => (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      ))}
                    </Select>
                    <InputGroup justifyContent="center" mt={'1rem'}>
                      <InputLeftElement
                        ml={'40%'}
                        children={<MdOutlineAttachMoney />}
                      />
                      <Input
                        shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
                        textAlign={'center'}
                        // borderWidth="0.2rem"
                        // borderColor="gray.300"
                        name="amount"
                        placeholder="Monto"
                        type="number"
                        onChange={handleInputs}
                        w={'50%'}
                      />
                    </InputGroup>
                    {/* </InputGroup> */}
                  </Flex>
                </HStack>
                <Grid placeItems="center">
                  <Button
                    //bg={colorMode === 'light' ? '#2c835b' : '#212933'}
                    color="vdv.main"
                    colorScheme="green"
                    width="30%"
                    onClick={handleDonate}
                    mt="0.3rem"
                    shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
                    _hover={{
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  >
                    Donar
                  </Button>
                </Grid>
              </Stack>
            </Box>
            {/* <Box
              align="center"
              w={'28vw'}
              mb="0.8rem"
              p="0.7rem"
              pt={'16rem'}
              bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
              h="50rem"
              borderRadius="1rem"
              boxShadow="dark-lg"
              _hover={{
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <Stack p={'8'}>
                <HStack flexDir={'column'} gap="4">
                  <Text
                    fontSize={'3xl'}
                    fontWeight={'bold'}
                    fontFamily={'Tilt Prism'}
                    textColor={colorMode === 'light' ? '#b4c4ac' : '#b4c4ac'}
                  >
                    Colaborá con tu punto favorito!
                  </Text>
                  <Select
                    placeholder="Puntos de reciclaje"
                    onChange={handleInputs}
                    name="entity"
                    w={'17vw'}
                    borderWidth="0.2rem"
                    borderColor="gray.300"
                  >
                    {entities?.map(({ id, name }) => (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                  <InputGroup justifyContent={'center'} pl="12%" pr="12%">
                    <InputLeftElement
                      ml={'30%'}
                      children={<MdOutlineAttachMoney />}
                    />
                    <Input
                      textAlign={'center'}
                      borderWidth="0.2rem"
                      borderColor="gray.300"
                      name="amount"
                      placeholder="Monto"
                      type="number"
                      onChange={handleInputs}
                    />
                  </InputGroup>
                </HStack>
                <Grid placeItems="center">
                  <Button
                    //bg={colorMode === 'light' ? '#2c835b' : '#212933'}
                    color="vdv.main"
                    colorScheme="green"
                    width="25%"
                    onClick={handleDonate}
                    mt="0.3rem"
                  >
                    Donar
                  </Button>
                </Grid>
              </Stack>
            </Box> */}

            <Box
              align="center"
              alignContent={'center'}
              w={'28vw'}
              mb="0.8rem"
              pt={'9rem'}
              //p="0.7rem"
              bg={colorMode === 'light' ? '#f5f2ebe9' : '#2d3748ed'}
              h="50rem"
              borderRadius="1rem"
              boxShadow="dark-lg"
              _hover={{
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <PostsCarousel />
            </Box>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
