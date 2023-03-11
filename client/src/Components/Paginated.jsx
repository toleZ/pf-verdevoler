import React, { useState } from 'react';
import { Box, Input, Button, Image, Text } from '@chakra-ui/react';
import previous from '../../images/previous.png';
import forward from '../../images/forward.png';

const Paginated = ({ page, setPage, max, input, setInput }) => {
  const previusPage = () => {
    setInput(input - 1);
    setPage(page - 1);
  };

  const nextPage = () => {
    setInput(input + 1);
    setPage(page + 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > max ||
        isNaN(parseInt(e.target.value))
      ) {
        setInput(1);
        setPage(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <Box m={10} display="flex" alignItems="center" justifyContent="center">
      <Button
        isDisabled={page === 1 || page < 1 ? true : false}
        onClick={previusPage}
        colorScheme={'green'}
        borderRadius="full"
      >
        <Image
          borderRadius="full"
          boxSize="1vw"
          src={previous}
          alt="previous"
        />
      </Button>
      <Input
        onChange={(e) => onChange(e)}
        value={input}
        name="pages"
        onKeyDown={(e) => onKeyDown(e)}
        htmlSize={4}
        width="auto"
        marginRight={5}
        marginLeft={5}
      />
      <Text marginRight={5}>de {max}</Text>
      <Button
        isDisabled={page === max || page >= max ? true : false}
        onClick={nextPage}
        colorScheme={'green'}
        borderRadius="full"
      >
        <Image borderRadius="full" boxSize="1vw" src={forward} alt="forward" />
      </Button>
    </Box>
  );
};

export default Paginated;
