import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link as ReachLink } from 'react-router-dom';
import { logoutAcount } from '../redux/actions/acountActions';
import { fetchEntities } from '../redux/actions/entitiesActions';
import { fetchUsers } from '../redux/actions/usersActions';

const Profile = () => {
  const { acount } = useSelector((state) => state.acountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEntities());
  }, [dispatch]);

  if (!Object.entries(acount).length)
    return (
      <Button
        bg={colorMode === 'light' ? '#F5F2EB' : '#68D391'}
        onClick={() => navigate('/login')}
        fontSize="120%"
        fontFamily={'Tilt Prism'}
        color={colorMode === 'light' ? '#2c786c' : '#68D391'}
        fontWeight={'normal'}
      >
        Iniciar Sesión
      </Button>
    );

  return (
    <Menu>
      {acount.RoleId !== 4 ? (
        <MenuButton>
          <Avatar
            name={`${acount.name} ${acount.last_name}`}
            src={acount.image}
          />
        </MenuButton>
      ) : (
        <MenuButton>
          <Avatar name={`${acount.name}`} src={acount.img} />
        </MenuButton>
      )}
      <MenuList>
        {acount.RoleId !== 4 ? (
          <MenuItem
            as={ReachLink}
            to={`/userprofile`}
            color={colorMode === 'light' ? '#235B53' : '#68D391'}
            fontSize="100%"
            fontFamily={'Tilt Prism'}
          >
            Mi perfil
          </MenuItem>
        ) : (
          <MenuItem
            as={ReachLink}
            to={`/entityprofile`}
            color={colorMode === 'light' ? '#235B53' : '#68D391'}
            fontSize="100%"
            fontFamily={'Tilt Prism'}
          >
            Mi perfil
          </MenuItem>
        )}
        {(acount?.RoleId === 2 || acount?.RoleId === 3) && (
          <MenuItem
            as={ReachLink}
            to={`/dashboard`}
            color={colorMode === 'light' ? '#235B53' : '#68D391'}
            fontSize="100%"
            fontFamily={'Tilt Prism'}
          >
            Dashboard
          </MenuItem>
        )}

        <MenuItem
          as={ReachLink}
          to="/home"
          fontSize="100%"
          color={colorMode === 'light' ? '#235B53' : '#68D391'}
          onClick={() => dispatch(logoutAcount())}
          fontFamily={'Tilt Prism'}
        >
          Cerrar Sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
