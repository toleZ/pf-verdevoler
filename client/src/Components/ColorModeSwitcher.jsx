import { IconButton, useColorMode } from '@chakra-ui/react';
import { BiSun, BiMoon } from 'react-icons/bi';

const ColorModeSwitcher = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      bg={colorMode === 'light' ? '#F5F2EB' : '#68D391'}
      icon={colorMode === 'light' ? <BiMoon /> : <BiSun />}
      onClick={toggleColorMode}
      pos="fixed"
      bottom="5rem"
      right="1rem"
      m="1rem"
    />
  );
};

export default ColorModeSwitcher;
