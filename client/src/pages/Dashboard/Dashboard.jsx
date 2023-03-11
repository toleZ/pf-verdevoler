import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Select,
  Box,
  Button,
  Input,
  Text,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import TabListPosts from '../../Components/TabListPosts';
import OverflowScroll from '../../Components/OverFlowScroll/OverflowScroll';
import DashboardRequest from '../../Components/DashboardRequest';
import {
  setDataToRender,
  userSearchFeedback,
  vdvSearchFeedback,
  userSearchDonation,
  vdvSearchDonation,
  optionsSelectArray,
} from './DashboardFunctions';
// import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [feedbackId, setFeedbackId] = useState(['all', 'all']);
  const [feedbackVdVFilters, setFeedbackVdVFilters] = useState();
  const [feedbackUsersFilters, setFeedbackUsersFilters] = useState();
  const [donationType, setDonationType] = useState('donation');
  const [donationId, setDonationId] = useState(['all', 'all']);
  const [donationVdVFilters, setDonationVdVFilters] = useState();
  const [donationUsersFilters, setDonationUsersFilters] = useState();
  const [pendingOrDelivered, setPendingOrDelivered] = useState('Pending');
  const [emailUser, setEmailUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [roleSelect, setRoleSelect] = useState();

  const toast = useToast();
  const { colorMode } = useColorMode();

  useEffect(() => {
    setDataToRender(
      setDonationUsersFilters,
      setDonationVdVFilters,
      setFeedbackUsersFilters,
      setFeedbackVdVFilters
    );
    // /role
    axios.get('/role').then((res) => setRoles(res.data));
  }, []);

  const renderOverFlowFeedback = () => {
    return (
      <Box p="2rem" shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}>
        <OverflowScroll type={feedbackType} id={feedbackId} />
      </Box>
    );
  };

  const renderOverFlowDonation = () => {
    return (
      <Box p="2rem" shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}>
        <OverflowScroll
          type={donationType}
          id={donationId}
          pendingOrDelivered={pendingOrDelivered}
        />
      </Box>
    );
  };

  const viewStatusDonation = (status) => {
    setPendingOrDelivered(status);
  };

  const handleInput = (e) => {
    setEmailUser(e.target.value);
  };

  const handleSelectRole = (e) => {
    setRoleSelect(e.target.value);
  };

  const getUser = async () => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(emailUser)) {
      const result = await axios.get(`/user/getByEmail/${emailUser}`);
      const userEnv = result.data[0];
      console.log(roleSelect);
      userEnv
        ? await axios
            .put(`/user/toowner/${userEnv.id}?roleId=${roleSelect}`)
            .then(
              toast({
                title: 'Success',
                description: `${userEnv.name} ${userEnv.last_name} tiene el rol ${roleSelect}`,
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
            )
        : toast({
            title: 'Error',
            description: 'No se encontro ningun usuario con ese mail',
            status: 'error',
            duration: 1500,
            isClosable: true,
          });
    } else {
      toast({
        title: 'Error',
        description: 'Debes ingresar un email valido',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const lightModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225348/LightMode_o28kqz.png';

  const darkModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225682/DarkMode_ilx6zv.png';

  return (
    <Flex
      pt="2rem"
      pb="2rem"
      direction="row"
      justify="space-evenly"
      bgImg={colorMode === 'light' ? lightModeBG : darkModeBG}
    >
      <Flex
        backgroundColor={colorMode === 'light' ? '#f5f2ebe9' : '#2d3748ed'}
        align={'center'}
        px="2rem"
        pos={'relative'}
        py="1.5rem"
        boxShadow="dark-lg"
        direction="column"
        borderRadius={'1rem'}
      >
        <Heading align="center" m="3vh">
          Reseñas
        </Heading>
        <Flex shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'} borderRadius="3 rem">
          {renderOverFlowFeedback()}
        </Flex>
        <Flex mb={'2rem'} mt={'2rem'} justifyContent="space-around">
          <Select
            shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
            w="10rem"
            onClick={(event) =>
              vdvSearchFeedback(event, setFeedbackType, setFeedbackId)
            }
          >
            <option value="none">Entidades</option>
            {optionsSelectArray(feedbackVdVFilters, 'vdv')}
          </Select>
          <Select
            w="10rem"
            ml="1rem"
            shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
            onClick={(event) =>
              userSearchFeedback(event, setFeedbackType, setFeedbackId)
            }
          >
            <option value="none">Usuarios</option>
            {optionsSelectArray(feedbackUsersFilters)}
          </Select>
        </Flex>

        <Heading align="center" m="3vh">
          Solicitudes
        </Heading>
        <DashboardRequest />
      </Flex>
      <Flex
        pos={'relative'}
        py="1.5rem"
        px="2rem"
        backgroundColor={colorMode === 'light' ? '#f5f2ebe9' : '#2d3748ed'}
        boxShadow="0 2px 5px rgba(0, 0, 0, 0.5)"
        direction="column"
        borderRadius={'1rem'}
        align={'center'}
      >
        <Heading align="center" m="3vh">
          Donaciones
        </Heading>
        {renderOverFlowDonation()}
        <Flex justifyContent={'center'} mt="1rem" ml="10rem">
          <Flex direction={'column'} mt={'1rem'} align="center" w={'120%'}>
            <Select
              w="10rem"
              shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
              onClick={(event) =>
                vdvSearchDonation(event, setDonationType, setDonationId)
              }
            >
              <option value="none">Entidades</option>
              {optionsSelectArray(donationVdVFilters, 'vdv')}
            </Select>
            <Select
              w="10rem"
              mt={'1rem'}
              shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
              onClick={(event) =>
                userSearchDonation(event, setDonationType, setDonationId)
              }
            >
              <option value="none">Usuarios</option>
              {optionsSelectArray(donationUsersFilters)}
            </Select>
          </Flex>
          <Flex
            direction={'column'}
            mr={'10rem'}
            ml="2rem"
            mt="1rem"
            w={'100%'}
            h={'140%'}
          >
            <Button
              bg={'greyLight'}
              shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
              w="10rem"
              mb="1rem"
              onClick={() => viewStatusDonation('Pending')}
            >
              Pendientes
            </Button>
            <Button
              shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
              bg={'greyLight'}
              w="10rem"
              onClick={() => viewStatusDonation('Delivered')}
            >
              Entregadas
            </Button>
          </Flex>
        </Flex>

        <Flex
          boxShadow="0 2px 5px rgba(0, 0, 0, 0.5)"
          p="2rem"
          borderRadius={'2rem'}
          direction={'column'}
          mt={'10rem'}
          // mb={'5rem'}
          align="center"
        >
          <Heading fontWeight="bold" align="center" mb="1rem">
            Creacion de administradores
          </Heading>
          <Text
            fontWeight="bold"
            boxShadow="0 2px 5px rgba(0, 0, 0, 0.5)"
            p="1rem"
            borderRadius={'2rem'}
            w={'30rem'}
            align="center"
            fontSize="15px"
            mb={'2rem'}
          >
            Ingrese email del usuario a modificar rol
          </Text>
          <Flex>
            <Input
              border={'grey solid 2px'}
              bg={'greyYellow'}
              mr={'1rem'}
              onChange={handleInput}
              align={'center'}
              w={'20rem'}
              placeholder="Ingrese mail..."
            />
            <Select
              boxShadow="0 2px 5px rgba(0, 0, 0, 0.5)"
              w={'6rem'}
              onClick={handleSelectRole}
            >
              <option value="none">Roles</option>
              {roles.map((role) => (
                <option value={role} key={`${role}roles`}>
                  {role}
                </option>
              ))}
            </Select>
          </Flex>
          <Button
            boxShadow="0 2px 5px rgba(0, 0, 0, 0.5)"
            bg={'transparente'}
            mt={'2rem'}
            onClick={getUser}
          >
            Enviar
          </Button>
        </Flex>
        <Flex
          // m="2rem"
          mt={'6rem'}
          shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
          borderRadius="1rem"
        >
          <Heading align="center" m="3vh">
            Posts
          </Heading>
          <TabListPosts />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
