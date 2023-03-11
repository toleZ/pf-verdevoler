import React, { useEffect } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  useColorMode,
  HStack,
  Box,
  Link,
  Image,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Profile from './Profile';

const Navbar = () => {
  const { colorMode } = useColorMode();

  useEffect;

  return (
    <HStack
      bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
      boxShadow="0 5px 7px rgba(0, 0, 0, 0.5)"
      justifyContent="space-between"
      alignItems="center"
      pr="1rem"
      zIndex="999"
    >
      <Link as={ReachLink} to="/home">
        <Image
          src="https://res.cloudinary.com/verdevolver/image/upload/v1678234115/My_project-1_1_dmqtx2.png"
          w="8rem"
          style={{ transform: 'scale(2.1)' }}
        />
      </Link>
      <Box>
        <List display="flex" flexDir="row" gap="1rem" ml="3rem">
          <ListItem
            as={ReachLink}
            to="/map"
            color={colorMode === 'light' ? '#2c786c' : '#68D391'}
            // fontWeight="semibold"
            fontSize="150%"
            fontFamily={'Tilt Prism'}
          >
            Mapa
          </ListItem>

          <ListItem color={colorMode === 'light' ? '#2c786c' : '#68D391'}>
            <Menu>
              <MenuButton
                // fontWeight="semibold"
                fontSize="150%"
                fontFamily={'Tilt Prism'}
              >
                Puntos de reciclaje
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={ReachLink}
                  to="/entities"
                  color={colorMode === 'light' ? '#2c786c' : '#68D391'}
                  // fontWeight="semibold"
                  fontSize="150%"
                  fontFamily={'Tilt Prism'}
                >
                  Ver todos
                </MenuItem>
                <MenuItem
                  as={ReachLink}
                  to="/beVdV"
                  color={colorMode === 'light' ? '#2c786c' : '#68D391'}
                  // fontWeight="semibold"
                  fontSize="150%"
                  fontFamily={'Tilt Prism'}
                >
                  Publica tu punto de reciclaje
                </MenuItem>
              </MenuList>
            </Menu>
          </ListItem>

          <ListItem>
            <Menu>
              <MenuButton
                color={colorMode === 'light' ? '#2c786c' : '#68D391'}
                // fontWeight="semibold"
                fontSize="150%"
                fontFamily={'Tilt Prism'}
              >
                Contactanos
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={ReachLink}
                  to="/about"
                  color={colorMode === 'light' ? '#2c786c' : '#68D391'}
                  // fontWeight="semibold"
                  fontSize="150%"
                  fontFamily={'Tilt Prism'}
                >
                  Quienes somos
                </MenuItem>
                <MenuItem
                  as={ReachLink}
                  to="/contact"
                  color={colorMode === 'light' ? '#2c786c' : '#68D391'}
                  // fontWeight="semibold"
                  fontSize="150%"
                  fontFamily={'Tilt Prism'}
                >
                  Contacto
                </MenuItem>
              </MenuList>
            </Menu>
          </ListItem>
        </List>
      </Box>
      <Profile />
    </HStack>
  );
};

export default Navbar;
