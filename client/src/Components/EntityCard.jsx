import { useState } from 'react';
import axios from 'axios';
import { Link as ReachLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  VStack,
  Link,
  Badge,
  HStack,
  Box,
  useToast,
  useColorMode,
} from '@chakra-ui/react';

import RankingStars from './RankingStars';
import { useNavigate } from 'react-router-dom';

const EntityCard = ({ entity, acount }) => {
  const [inputMonto, setInputMonto] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleInputs = (event) => {
    setInputMonto(event.target.value);
  };

  const handleButton = () => {
    const { id } = acount;
    if (!id) {
      navigate('/login');
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para poder donar',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    if (inputMonto) {
      try {
        axios
          .post(`/donation`, {
            VdVId: entity.id.toString(),
            amount: inputMonto,
            UserId: id,
          })
          .then((res) => (window.location.href = res.data.body.init_point));
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      toast({
        title: 'Warning',
        description: 'Debes ingresar un monto',
        status: 'warning',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <Card
      display="flex"
      justifyContent="center"
      pos={'relative'}
      py="1.5rem"
      bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
      boxShadow="dark-lg"
      _hover={{
        transform: 'scale(1.02)',
        transition: 'transform 0.3s ease-in-out',
      }}
      borderRadius="1rem"
    >
      <Box pos="absolute" top="0" right="0" m="1rem">
        <RankingStars stars={entity?.rating} />
      </Box>
      <CardBody display="flex" flexDir="row" gap="1.5rem" width="80vw">
        <Image
          src={entity.img}
          maxHeight="30vh"
          maxWidth="40vw"
          borderRadius={'1rem'}
        />

        <VStack alignItems="flex-start">
          <Link as={ReachLink} to={`/entitie/${entity.id}`}>
            <Heading>{entity.name}</Heading>
          </Link>
          <HStack>
            {entity.Materials?.map(({ name }, i) => (
              <Badge key={i} variant="solid" colorScheme="green">
                {name}
              </Badge>
            ))}
          </HStack>
          <Text fontSize="xl">{entity.description}</Text>
        </VStack>
      </CardBody>

      {/* <CardFooter justifyContent="right">
        <InputGroup size="md" w={'40%'}>
          <InputLeftAddon
            children="$"
            borderWidth="0.2rem"
            borderColor="gray.300"
          />
          <Input
            borderWidth="0.2rem"
            borderColor="gray.300"
            pr="4.5rem"
            type="number"
            placeholder="Monto"
            name="amount"
            onChange={handleInputs}
          />
          <InputRightElement width="4.5rem">
            <Button
              onClick={handleButton}
              h="1.75rem"
              m="0.5rem"
              size="sm"
              colorScheme={'green'}
            >
              Donar
            </Button>
          </InputRightElement>
        </InputGroup>
      </CardFooter> */}
    </Card>
  );
};

export default EntityCard;
