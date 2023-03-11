import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  VStack,
  useColorMode,
  HStack,
} from '@chakra-ui/react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import MarkerInfo from '../Components/MarkerInfo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEntities, getMaterials } from '../redux/actions/entitiesActions';
import Autocomplete from 'react-google-autocomplete';
import AsideMap from '../Components/AsideMap';
import axios from 'axios';

const containerStyle = {
  width: '85vw',
  height: '75vh',
};

const Map = () => {
  const dispatch = useDispatch();

  const [activeMarker, setActiveMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -39, lng: -64 });
  const [zoom, setZoom] = useState(5);
  const { entities, filteredEntities } = useSelector(
    (state) => state.entitiesReducer
  );

  const { colorMode } = useColorMode();
  useEffect(() => {
    dispatch(fetchEntities());
    dispatch(getMaterials());

    filters = entities;
  }, []);

  let filters = filteredEntities;

  const handleMarkerMouseOver = (marker) => {
    setActiveMarker({ ...marker });
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  const userUbication = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setZoom(13);
      });
    }
  };

  const lightModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225348/LightMode_o28kqz.png';

  const darkModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225682/DarkMode_ilx6zv.png';

  return (
    <Box
      pos="relative"
      p={'2rem'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      bgImg={colorMode === 'light' ? lightModeBG : darkModeBG}
    >
      <Box
        w={'90vw'}
        h={'88vh'}
        bg={colorMode === 'light' ? '#f5f2ebe9' : '#2d3748ed'}
        boxShadow={'dark-lg'}
        borderRadius="1rem"
      >
        <Stack>
          <VStack spacing={'0.9rem'} pt={'1rem'}>
            <HStack spacing={'1rem'}>
              <Autocomplete
                onPlaceSelected={(e) => {
                  setMapCenter({
                    lat: e.geometry.location.lat(),
                    lng: e.geometry.location.lng(),
                  });
                  setZoom(13);
                }}
                style={autocompleteStyle}
                options={{
                  types: ['address'],
                  componentRestrictions: { country: 'ar' },
                }}
              />
              <AsideMap filters={filters} />
              <Button
                onClick={() => userUbication()}
                colorScheme={'green'}
                pb="0.2rem"
                h="2.4rem"
                w="10rem"
              >
                Mi ubicación
              </Button>
            </HStack>

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={zoom}
            >
              {filters?.map((marker) => {
                if (marker.status === 'Active') {
                  return (
                    <Marker
                      key={marker.id}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      onMouseOver={() => handleMarkerMouseOver(marker)}
                    />
                  );
                }
              })}

              {activeMarker && (
                <InfoWindow
                  position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
                  onCloseClick={handleInfoWindowClose}
                >
                  <MarkerInfo data={activeMarker} />
                </InfoWindow>
              )}
            </GoogleMap>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Map;

const autocompleteStyle = {
  width: '80%',
  height: '40px',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
  fontSize: '20px',
};
