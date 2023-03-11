import React from 'react';
import { Flex, Text, Badge, useColorMode, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function MarkerInfo({ data }) {
  const [showCard, setShowCard] = useState(false);

  const handleClick = () => {
    setShowCard(true);
  };

  const { colorMode } = useColorMode();

  return (
    <Box color={colorMode === 'light' ? 'black' : 'black'}>
      {!showCard ? (
        <Text as="b" color="green" fontSize="normal" onClick={handleClick}>
          {data.name}
        </Text>
      ) : (
        <Box color={colorMode === 'light' ? 'black' : 'black'}>
          <Text as="b" fontSize="2x1">
            {data.name}
          </Text>
          <p>{data.description}</p>
          <img src={data.img} alt={data.name} width="85vw" height="85vh" />
          <Flex>
            {data.Materials.map((mat, i) => (
              <Badge
                key={i}
                variant="solid"
                colorScheme="green"
                w="5vw"
                align="center"
                borderRadius="2px"
                m="1vw"
              >
                {mat.name}
              </Badge>
            ))}
          </Flex>
          <Link to={`/entitie/${data.id}`}>Detalles de la entidad</Link>
        </Box>
      )}
    </Box>
  );
}

export default MarkerInfo;
