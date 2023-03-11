import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineMessage, AiOutlineSend } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

const qa = [
  {
    q: '¿De que se trata este proyecto?',
    a: 'VerDeVolver es un sitio web que fomenta el reciclaje y la gestión de residuos en Argentina. Proporcionan una guía para materiales reciclables y un mapa de lugares cercanos para entregar los residuos. VerDeVolver no está involucrada directamente con los puntos de reciclaje en el mapa.',
  },
  {
    q: '¿Quien desarrolló este proyecto?',
    a: 'Este proyecto fue desarrollado por alumnos del bootcamp "Soy Henry" para hacer parte de la entrega final del mismo',
  },
  {
    q: '¿Como puedo aportar?',
    a: 'Puedes aportar donando a entidades desde nuestro home o yendo al detalle de la entidad a la que quieras donar',
  },
  {
    q: '¿Cómo sé si algo se puede reciclar?',
    a: 'Tenemos una lista de materiales que reciclamos, puedes verla yendo a la lista de entidades',
  },
  {
    q: '¿Qué hago si no puedo reciclar algo?',
    a: 'Intenta reducir tu uso de ese objeto en primer lugar. Si no es posible, trata de reutilizarlo o donarlo. Si todo lo demás falla, deséchalo adecuadamente en un vertedero o centro de tratamiento de residuos.',
  },
  {
    q: '¿Por qué es importante reciclar?',
    a: 'El reciclaje ayuda a reducir la cantidad de residuos que terminan en vertederos y reduce la necesidad de nuevos recursos naturales. También puede ayudar a reducir la contaminación del aire y del agua.',
  },
  {
    q: '¿Qué pasa con los materiales reciclados?',
    a: 'Los materiales reciclados pueden ser reutilizados para crear nuevos productos, como papel reciclado, botellas de plástico reciclado y más.',
  },
  {
    q: '¿Como puedo contactarme con las entidades?',
    a: 'Puedes ir a nuestra sección de contacto y completar el formulario para poder enviar cualquier consulta.',
  },
];

const iaResponse = (message) => {
  const res = qa.find(({ q }) => q.toLowerCase() === message.toLowerCase())?.a;

  if (res) return res;
  return `No encontré un respuesta a tu pregunta en mi base de datos, puedes ir a la sección de contacto y completar el formulario para enviar tu consulta y que un administrador pueda responderte!`;
};

const generateOptions = () => {
  const res = [];

  for (let i = 0; i < 3; i++) {
    const opt = Math.floor(Math.random() * qa.length);
    res.push(qa[opt]);
  }

  return res;
};

const ChatBox = () => {
  const { acount } = useSelector((state) => state.acountReducer);

  const [messages, setMessages] = useState([
    {
      from: 'I A',
      message:
        'Hola, estoy aquí para responder tus preguntas ¿Qué te gustaría saber?',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const { colorMode } = useColorMode();

  const handleSendMessage = (answer) => {
    if (newMessage || answer) {
      const iaRes = iaResponse(answer ?? newMessage);
      setMessages([
        ...messages,
        {
          from: acount.name ?? 'Default',
          message: answer ?? newMessage,
        },
        {
          from: 'I A',
          message: iaRes,
        },
      ]);
      setNewMessage('');
    }
  };

  const handleClear = () =>
    setMessages([
      {
        from: 'I A',
        message:
          'Hola, estoy aquí para responder tus preguntas ¿Qué te gustaría saber?',
      },
    ]);

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          bg={colorMode === 'light' ? '#F5F2EB' : '#68D391'}
          icon={<AiOutlineMessage />}
          pos="fixed"
          left="1rem"
          m="1rem"
          bottom="5rem"
        />
      </PopoverTrigger>

      <PopoverContent m="1rem" w="50vw" h={'60vh'}>
        <PopoverHeader>Chat VDV</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody h={'50vh'} overflowY="scroll">
          <VStack spacing={4}>
            {messages.map(({ from, message }) => (
              <Flex
                alignItems="flex-start"
                gap="0.5rem"
                w="full"
                key={`${from} says: ${message}`}
              >
                <Avatar name={from} size="xs" />
                <VStack>
                  <Text>{message}</Text>
                  {from === 'I A' &&
                    generateOptions().map(({ q }, index) => (
                      <Button
                        onClick={() => handleSendMessage(q)}
                        w="full"
                        key={q + index}
                      >
                        {q}
                      </Button>
                    ))}
                </VStack>
              </Flex>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBox;
