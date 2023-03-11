import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  updateVdV,
  deleteVdV,
  addMaterial,
  deleteMaterial,
  updatePassword,
} from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Avatar,
  Stack,
  HStack,
  VStack,
  Divider,
  Flex,
  Image,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import {
  AtSignIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  TriangleDownIcon,
} from '@chakra-ui/icons';
import { BiUser, BiUserX } from 'react-icons/bi';
import UploadImage from '../../Components/Cloudinary';
import {
  getEntityDonation,
  getEntityFeedbacks,
} from '../../redux/actions/entitiesActions';
import RankingStars from '../../Components/RankingStars';

const materialsArray = [
  'Plástico',
  'Vidrio',
  'Metal',
  'Vidrio',
  'Tapitas',
  'Cartón',
  'Aceite',
  'Aluminio',
  'Madera',
  'Textiles',
  'Baterias',
  'Papel',
];

function EntityProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState({ lat: -39, lng: -64 });
  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setZoom] = useState(5);
  const { colorMode } = useColorMode();
  const toast = useToast();

  const { acount } = useSelector((state) => state.acountReducer);
  const { donations, feedbacks } = useSelector(
    (state) => state.entitiesReducer
  );

  const [showCBU, setShowCBU] = useState(false);
  const [input, setInput] = useState({});
  const [inputPassword, setInputPassword] = useState({
    password: '',
  });
  const [CBU, setCBU] = useState(acount.cbu);
  const [errorCBU, setErrorCBU] = useState('');

  useEffect(() => {
    axios.get(`/vdv/${acount?.id}`).then((res) => {
      setInput({
        ...res.data,
      });
    });
    dispatch(getEntityDonation(acount?.id));
    dispatch(getEntityFeedbacks(acount?.id));
  }, [acount]);

  const handleCBU = (e) => {
    const { value } = e.target;
    value.length < 23 && setCBU(value);
    value.length < 22 ? setErrorCBU('Faltan caracteres') : setErrorCBU('');
  };

  // CBU repetido no me genera una nueva solicitud -> bien / Pero me manda los dos alert Mal
  // CBU  no repetido -> hace post de soliciutd y cambio en el check del dashboard

  const handleButtonCBU = (e) => {
    const res = axios
      .post('/cbuRequest', {
        cbu: CBU,
        idVdV: acount?.id,
      })
      .then((res) =>
        toast({
          title: 'Success',
          description: 'Solicitud enviada. Recibirás un email de confirmación.',
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      )
      .catch((res) =>
        toast({
          title: 'Error',
          description:
            'El CBU ya se encuentra asociado a un punto de reciclaje',
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      );
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e) => {
    setInputPassword({ [e.target.name]: e.target.value });
  };

  const handleSavePassword = async () => {
    const res = await updatePassword(acount?.id, inputPassword);
    if (res !== 200) {
      return toast({
        title: 'Error',
        description:
          'Ha ocurrido un error en el proceso de actualización de contraseña',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    } else {
      return toast({
        title: 'Contraseña actualizada correctamente',
        description: 'Contraseña actualizada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUploadImage = (url) => {
    setInput({ ...input, img: url });
  };

  const handleShowCBU = () => setShowCBU(!showCBU);

  const handleSaveChanges = () => {
    const responseHandle = async () => {
      const res = await updateVdV(acount?.id, input);
      if (res !== 200) {
        return toast({
          title: 'Error',
          description:
            'Ha ocurrido un error en el proceso de actualización de datos',
          status: 'error',
          duration: 1500,
          isClosable: true,
        });
      } else {
        return toast({
          title: 'Datos actualizados',
          description: 'Datos actualizados correctamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    responseHandle();
  };

  const handleCancelChanges = () => {
    setInput(acount);
    setCBU(acount.cbu);
  };
  const handleDeleteEntity = () => {
    const deleteHandle = async () => {
      const res = await deleteVdV(acount?.id, navigate);
      if (res !== 200) {
        return toast({
          title: 'Error',
          description:
            'Ha ocurrido un error en el proceso de eliminacion de entidad',
          status: 'error',
          duration: 1500,
          isClosable: true,
        });
      } else {
        return toast({
          title: 'Entidad eliminada',
          description: 'La entidad se ha eliminado exitosamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    deleteHandle();
  };

  const handlePlaceSelected = (e) => {
    const latitude = e.geometry.location.lat();
    const longitude = e.geometry.location.lng();
    setMapCenter({
      lat: latitude,
      lng: longitude,
    });
    setZoom(13);
    setActiveMarker(e);
    setInput((prevForm) => {
      return {
        ...prevForm,
        address: e.formatted_address,
        lat: latitude,
        lng: longitude,
      };
    });
  };

  const lightModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225348/LightMode_o28kqz.png';

  const darkModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225682/DarkMode_ilx6zv.png';

  return (
    <Box bgImage={colorMode === 'light' ? lightModeBG : darkModeBG}>
      <Box mr="5%" ml="5%" pt={'5%'} paddingBottom="5rem" paddingTop="15vh">
        <Box
          borderRadius="3rem"
          boxShadow="dark-lg"
          p="6"
          minH="92vh"
          backgroundColor={colorMode === 'light' ? '#f5f2ebe9' : '#2d3748ed'}
        >
          <Flex
            width="100%"
            minH="31vh"
            justifyContent="center"
            alignItems="center"
            marginTop="-13vh"
            marginBottom="10vh"
            flexDirection="column"
          >
            <Box
              bg="#F5F2EB"
              borderRadius="full"
              height="22vh"
              width="22vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="dark-lg"
              mb="2vh"
              transition="2s"
              _hover={{ height: '24vh', width: '24vh' }}
            >
              <Image
                src={input.img}
                name={`${input.name}${input.last_name}`}
                borderRadius="full"
                height="20vh"
                width="20vh"
                transition="2s"
                _hover={{ height: '22vh', width: '22vh' }}
              />
            </Box>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Heading fontSize={'3rem'}>{input.name}</Heading>
            </Box>
          </Flex>
          <Grid templateColumns={'repeat(2, 1fr)'} gap="2rem">
            <GridItem>
              <Flex
                flexDirection="column"
                justifyContent="center"
                width="100%"
                boxShadow="2xl"
                padding="2rem"
                borderRadius="2rem"
                minHeight="80rem"
              >
                <Heading ml={'3rem'} mb={'2rem'} align="center">
                  Información del Punto de Reciclaje
                </Heading>
                <Box my="1rem">
                  <Text>Nombre</Text>
                  <InputGroup>
                    <InputLeftElement children={<BiUser />} />
                    <Input
                      name="name"
                      type="text"
                      value={input.name}
                      onChange={handleChange}
                      boxShadow="2xl"
                      border=".2px solid"
                    />
                  </InputGroup>
                </Box>
                <Box my="1rem">
                  <Text>Mail</Text>
                  <InputGroup>
                    <InputLeftElement children={<AtSignIcon />} />
                    <Input
                      name="mail"
                      type="email"
                      value={input.mail}
                      onChange={handleChange}
                      boxShadow="2xl"
                      border=".2px solid"
                    />
                  </InputGroup>
                </Box>
                <Box>
                  <Text>Direccion</Text>
                  <InputGroup marginBottom="1rem">
                    <InputLeftElement children={<TriangleDownIcon />} />
                    <Input
                      name="address"
                      type="text"
                      value={input.address}
                      onChange={handleChange}
                      boxShadow="2xl"
                      border=".2px solid"
                    />
                  </InputGroup>
                </Box>
                <UploadImage onUpload={handleUploadImage} value={input.img} />
                <Box my="1rem" mb={'3rem'}>
                  <Text>Solicitar el cambio del CBU</Text>
                  <InputGroup>
                    <InputLeftElement children={<LockIcon />} />
                    <Input
                      name="cbu"
                      type={showCBU ? 'text' : 'password'}
                      value={CBU}
                      onChange={handleCBU}
                      boxShadow="2xl"
                      border=".2px solid"
                    />
                    <InputRightElement>
                      <IconButton
                        mr="1vh"
                        width="3vh"
                        height="3vh"
                        name="cbu"
                        icon={showCBU ? <ViewIcon /> : <ViewOffIcon />}
                        onClick={handleShowCBU}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errorCBU ? (
                    <Text color={'red'} fontFamily="unset">
                      {errorCBU}{' '}
                    </Text>
                  ) : (
                    <Button
                      // variant={'outline'}
                      colorScheme={'green'}
                      mt="0.3rem"
                      display={'flex'}
                      onClick={handleButtonCBU}
                    >
                      Enviar
                    </Button>
                  )}
                </Box>
                <Box my="1rem">
                  <Text>Cambiar contraseña</Text>
                  <InputGroup>
                    <InputLeftElement children={<LockIcon />} />
                    <Input
                      name="password"
                      type="text"
                      value={inputPassword.password}
                      onChange={handleChangePassword}
                      boxShadow="2xl"
                      border=".2px solid"
                    />
                  </InputGroup>
                  <Button
                    colorScheme={'green'}
                    w="40%"
                    onClick={handleSavePassword}
                    mt={'1rem'}
                  >
                    Actualizar
                  </Button>
                </Box>

                <GridItem mb={'2rem'}>
                  <Box my="1rem">
                    <Text>Materiales</Text>
                    {input.Materials?.map((mat, i) => {
                      return (
                        <Button
                          key={i}
                          mb={'1rem'}
                          ml={'0.2rem'}
                          onClick={() =>
                            deleteMaterial(mat.name, input.Materials, setInput)
                          }
                        >
                          {mat.name}
                        </Button>
                      );
                    })}
                    <Select
                      boxShadow="2xl"
                      border=".2px solid"
                      placeholder="Agregar material"
                      w="13vw"
                      onChange={
                        (e) => addMaterial(e, input.Materials, setInput) //
                      }
                    >
                      {materialsArray.map((mat, i) => {
                        return (
                          <option key={i} value={mat}>
                            {mat}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                </GridItem>

                <GridItem>
                  <ButtonGroup
                    mb={'7rem'}
                    // variant={'outline'}
                    w="full"
                    justifyContent={'center'}
                    mt="1rem"
                  >
                    <Button
                      colorScheme={'green'}
                      w="30%"
                      onClick={handleSaveChanges}
                    >
                      Guardar
                    </Button>
                    <Button
                      colorScheme={'blue'}
                      w="30%"
                      onClick={handleCancelChanges}
                    >
                      Cancelar
                    </Button>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          colorScheme={'red'}
                          w="40%"
                          leftIcon={<BiUserX />}
                        >
                          Eliminar Punto de reciclaje
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverHeader fontWeight="bold" pr={'2rem'}>
                          Estas seguro de que deseas eliminar tu perfl de forma
                          definitiva?
                        </PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          ⚠️ Una vez que elimines tu Perfil todos tus datos
                          seran eliminados de nuestra base de datos sin
                          posibildad de ser recuperados
                        </PopoverBody>
                        <Button
                          colorScheme={'red'}
                          onClick={handleDeleteEntity}
                        >
                          Confirmar
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </ButtonGroup>
                </GridItem>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex
                justifyContent="center"
                alignItems="center"
                width="100%"
                boxShadow="2xl"
                padding="2rem"
                borderRadius="2rem"
                minHeight="80rem"
                flexDirection="column"
              >
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  width="100%"
                >
                  <Box width="100%">
                    <Heading ml={'3rem'} mb={'2rem'} align="center">
                      Cambie su direccion
                    </Heading>

                    <Box width="100%" align="center">
                      <Autocomplete
                        align="center"
                        onPlaceSelected={(e) => handlePlaceSelected(e)}
                        style={autocompleteStyle}
                        options={{
                          types: ['address'],
                          componentRestrictions: { country: 'ar' },
                        }}
                      />
                    </Box>

                    <Box width="100%">
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={mapCenter}
                        zoom={zoom}
                      >
                        {activeMarker && (
                          <Marker
                            position={{
                              lat: activeMarker.geometry.location.lat(),
                              lng: activeMarker.geometry.location.lng(),
                            }}
                          />
                        )}
                      </GoogleMap>
                    </Box>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  width="100%"
                >
                  <Stack>
                    <Heading mt="1rem">Donaciones</Heading>

                    <VStack
                      mb={'2rem'}
                      alignItems="flex-start"
                      maxH="25vh"
                      overflowY={'scroll'}
                    >
                      {donations.length !== 0 ? (
                        donations.map(({ amount, date, User }, index) => (
                          <Box
                            key={index}
                            w={'95%'}
                            h={'3rem'}
                            border={'solid 2px #233142'}
                            borderRadius={'10px'}
                          >
                            <HStack spacing="1rem" mt={'6px'}>
                              <Avatar
                                alignItems={'center'}
                                ml="1rem"
                                src={User.image}
                                size="sm"
                              />

                              <Flex width="95%" justifyContent="space-around">
                                <Text>{User.name}</Text>
                                <Text>${amount}</Text>
                                <Text>{date}</Text>
                              </Flex>
                            </HStack>
                          </Box>
                        ))
                      ) : (
                        <Box display="flex" h="20vh" alignItems="center">
                          <Text fontSize="lg" as="b" ml="1rem">
                            {' '}
                            No se encontraron donaciones realizadas a este Punto
                            de reciclaje{' '}
                          </Text>
                        </Box>
                      )}
                    </VStack>

                    <Heading>Reseñas</Heading>

                    <VStack
                      alignItems="flex-start"
                      maxH="25vh"
                      overflowY={'scroll'}
                    >
                      {feedbacks.length !== 0 ? (
                        feedbacks.map(
                          ({ comment, rating, date, User }, index) => (
                            <Box
                              key={index}
                              w={'95%'}
                              // h={'5rem'}
                              border={'solid 2px #233142'}
                              borderRadius={'10px'}
                            >
                              <HStack spacing="1rem" mt={'10px'}>
                                <Avatar ml="1rem" src={User.image} size="sm" />
                                <Flex direction={'column'} w="90%">
                                  <Flex
                                    justifyContent="space-around"
                                    // border="solid 2px green"
                                  >
                                    <Text>{User.name}</Text>
                                    <RankingStars stars={rating}></RankingStars>
                                    <Text>{date}</Text>
                                  </Flex>
                                  <Divider></Divider>
                                  <Text mt="0.3rem" pb={'1rem'} mr="1rem">
                                    {comment}
                                  </Text>
                                </Flex>
                              </HStack>
                            </Box>
                          )
                        )
                      ) : (
                        <Box display="flex" h="20vh" alignItems="center">
                          <Text fontSize="lg" as="b" ml="1rem">
                            {' '}
                            No se encontraron reseñas realizadas a este Punto de
                            reciclaje{' '}
                          </Text>
                        </Box>
                      )}
                    </VStack>
                  </Stack>
                  <Box height={'8rem'}></Box>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default EntityProfile;

const autocompleteStyle = {
  backgroundColor: '#ffffff44',
  width: '100%',
  height: '40px',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
};

const containerStyle = {
  borderRadius: '10px',
  marginTop: '1rem',
  maxWidth: '40vw',
  height: '50vh',
};
