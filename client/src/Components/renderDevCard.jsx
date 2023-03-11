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
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';

function RenderDevCard({ dev }) {
  const { colorMode } = useColorMode();
  const { name, img, linkedin, github, mail } = dev;
  return (
    <Card
      borderRadius={'1rem'}
      bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
      boxShadow="dark-lg"
      fontFamily="lato"
      w="20%"
      m="1vh"
      h="45vh"
      p="0.5rem"
      _hover={{
        transform: 'scale(1.02)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <Image
        src={img}
        alt="Dev Photo"
        borderRadius="full"
        boxSize="120px"
        m="auto"
      />
      <CardHeader m="1px" p="1px" align="center">
        <Heading size="md">{name}</Heading>
      </CardHeader>

      <CardBody mt="1px">
        <Stack divider={<StackDivider />} spacing="1">
          <Link
            href={github}
            isExternal
            m="auto"
            fontSize="130%"
            fontFamily={'Tilt Prism'}
          >
            Github <ExternalLinkIcon mx="2px" />
          </Link>
          <Link
            href={linkedin}
            isExternal
            m="auto"
            fontSize="130%"
            fontFamily={'Tilt Prism'}
          >
            LinkedIn <ExternalLinkIcon mx="2px" />
          </Link>
          <Text pt="2" m="auto" fontSize="130%" fontFamily={'Tilt Prism'}>
            {mail}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default RenderDevCard;
