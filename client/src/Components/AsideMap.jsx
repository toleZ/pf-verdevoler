import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterEntitiesByMaterial,
  listOfMaterialsToFilter,
  fetchEntities,
} from '../redux/actions/entitiesActions.js';

const AsideMap = ({ filters }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const dispatch = useDispatch();

  const { materials, listOfMaterialsToFilterState } = useSelector(
    (state) => state.entitiesReducer
  );

  const addkMaterial = (e) => {
    if (e.target.value !== 'Material') {
      const newFilters = filters.filter((ent) => {
        return ent.Materials.some((mat) => mat.name === e.target.value);
      });
      if (newFilters.length == 0) return window.alert('No hubo coincidencias');
      listOfMaterialsToFilterState.push(e.target.value);
      dispatch(filterEntitiesByMaterial(newFilters));
      dispatch(listOfMaterialsToFilter(listOfMaterialsToFilterState));
    }
  };

  function resetFilters(e) {
    e.preventDefault();
    const sel = document.getElementById('list_materials');
    sel.value = 'Material';
    dispatch(fetchEntities());
    dispatch(listOfMaterialsToFilter([]));
  }

  return (
    <>
      <Button
          ref={btnRef}
          colorScheme="green"
          onClick={onOpen}
          m="1rem"
          icon={<IoMdOptions />}
      >
        Filtros
      </Button>
     

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtros:</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'}>
              <Select id="list_materials" onChange={(e) => addkMaterial(e)}>
                <option defaultValue="Material">Material</option>
                {materials?.map((m, i) => (
                  <option value={m.name} key={i}>
                    {m.name}
                  </option>
                ))}
              </Select>
              {listOfMaterialsToFilterState?.map((mat, i) => {
                return (
                  <Badge
                    key={i}
                    variant="solid"
                    colorScheme="green"
                    fontSize="2xl"
                    w="20vw"
                    align="center"
                    borderRadius="5px"
                  >
                    {mat}
                  </Badge>
                );
              })}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="red"
              variant={'outline'}
              mr={3}
              onClick={(e) => resetFilters(e)}
            >
              Cancelar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AsideMap;
