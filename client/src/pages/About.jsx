import React from 'react';
import {
  Text,
  Flex,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Link,
  Image,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import RenderDevCard from '../Components/renderDevCard';

const About = () => {
  const { colorMode } = useColorMode();
  const devList = [
    {
      name: 'Solana Rocio Gomez',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1678293311/1667237905925_odq127.jpg',
      linkedin: 'https://www.linkedin.com/in/solana-g%C3%B3mez-2b2204220/',
      github: 'https://github.com/SolanaG',
      mail: 'gomez.solanarocio@gmail.com',
    },
    {
      name: 'Milton Amelino',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677875983/images/bcdspw6rvhwxnxszvduc.jpg',
      linkedin: 'https://www.linkedin.com/in/milton-amelino-6987a1192/',
      github: 'https://github.com/Tateuer',
      mail: 'tateuer@gmail.com',
    },
    {
      name: 'Diana Atobe',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730798/dini_vcji6w.png',
      linkedin: 'https://www.linkedin.com/in/diana-atobe/',
      github: 'https://github.com/diniat',
      mail: 'dianatobe@gmail.com',
    },
    {
      name: 'Juan Cruz Toloy',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1678292856/85139223_bvarjx.jpg',
      linkedin: 'https://www.linkedin.com/in/juan-cruz-toloy-85610223b/',
      github: 'https://github.com/toleZ',
      mail: 'toloyjc@gmail.com',
    },
    {
      name: 'Cristian Mauricio Ortiz',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730219/cris_zwqoxn.jpg',
      linkedin:
        'https://www.linkedin.com/in/cristian-mauricio-ortiz-cano-3115a2211/',
      github: 'https://github.com/MauricioOrtizCano',
      mail: 'cmoc1493@gmail.com',
    },
    {
      name: 'Rodrigo Jorge Figari',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730168/rodri_qg9lw6.jpg',
      linkedin: 'https://www.linkedin.com/in/rodrigo-figari-809736244/',
      github: 'https://github.com/Rodrigofigari',
      mail: 'rodrigojfigari@gmail.com',
    },
    {
      name: 'Natalia  Iglesias Gonzalez',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1678292018/13cd2dfa-7145-47a0-a574-52213905e487_rh7itj.jpg',
      linkedin: 'https://www.linkedin.com/in/natalia-iglesias-94a3bb231/',
      github: 'https://github.com/natalia-iglesias',
      mail: 'iglesiasn63@gmail.com',
    },
    {
      name: 'Damián García Abreu',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1678310667/4c07630d-020f-4979-9de7-ea1b44998fbc_zi363t.jpg',
      linkedin: 'https://www.linkedin.com/in/damian-garcia-381236255/',
      github: 'https://github.com/DamGarA',
      mail: 'damiangarciaabreu@gmail.com',
    },
  ];

  const lightModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225348/LightMode_o28kqz.png';

  const darkModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225682/DarkMode_ilx6zv.png';

  return (
    <Flex
      flexDirection="column"
      align="center"
      bgImg={colorMode === 'light' ? lightModeBG : darkModeBG}
      pb="1rem"
      pt={'2rem'}
    >
      <Box
        bg={colorMode === 'light' ? '#f5f2ebe9' : '#2d3748ed'}
        // bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
        boxShadow={'dark-lg'}
        borderRadius="lg"
        w={'90vw'}
        p={'2rem'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box borderRadius="lg" mb="2rem" p="0.7rem" boxShadow={'lg'}>
          <Heading align="center" fontFamily={'Tilt Prism'} mb="0.8rem">
            Proyecto final Henry
          </Heading>
          <Text
            align="center"
            width="80vw"
            m="0.7rem"
            fontSize="150%"
            fontFamily={'Tilt Prism'}
          >
            VerDeVolver es un sitio web sin fines de lucro, que busca promover e
            informar sobre el reciclaje y gestión de residuos a nivel nacional
            en Argentina, a través de una interfaz de usuario intuitiva y
            amigable. Ofrecemos una guía simple sobre los materiales reciclables
            (qué son, qué hacer con ellos, cuánto dañan el medio ambiente) y un
            mapa georreferenciado que muestra los lugares (entidades VdV)
            cercanos donde puedes entregar tus residuos. Las entidades VdV son
            organizaciones, cooperativas, emprendimientos, empresas o
            particulares que reciben, reciclan y/o reutilizan determinados
            residuos. VerDeVolver no está involucrada ni participa directamente
            con ninguno de los puntos de reciclaje en el mapa.
          </Text>
        </Box>

        <Flex
          flexWrap="wrap"
          align={'center'}
          gap={'3rem'}
          justifyContent="center"
        >
          {devList.map((dev, indx) => (
            <RenderDevCard key={`${dev.name}+${indx}`} dev={dev} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default About;
