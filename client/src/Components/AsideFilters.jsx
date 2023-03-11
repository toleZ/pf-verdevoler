import axios from 'axios';
import {
  VStack,
  Select,
  useToast,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterEntitiesByMaterial,
  listOfMaterialsToFilter,
} from '../redux/actions/entitiesActions.js';

const AsideFilters = ({ filters, setPage, setInput }) => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const { materials, listOfMaterialsToFilterState, entities } = useSelector(
    (state) => state.entitiesReducer
  );

  const handleClikMaterials = (e) => {
    const newFilters = filters.filter((ent) => {
      return ent.Materials.some((mat) => mat.name === e.target.value);
    });
    if (newFilters.length == 0)
      return toast({
        title: 'Error',
        description: 'No se encontraron coincidencias',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    listOfMaterialsToFilterState.push(e.target.value);
    dispatch(filterEntitiesByMaterial(newFilters));

    dispatch(listOfMaterialsToFilter(listOfMaterialsToFilterState));
    setPage(1);
    setInput(1);
  };

  const handleRanking = (e) => {
    if (e.target.value !== 'none') {
      axios
        .post('/feedback/rating', {
          order: e.target.value,
        })
        .then((res) => {
          let newFilters = [];
          res.data.forEach((ent2) => {
            filters.forEach((ent1) => {
              ent1.name === ent2.name && newFilters.push(ent1);
            });
          });
          filters.forEach((vdv) => {
            if (!vdv.rating) newFilters.push(vdv);
          });
          dispatch(filterEntitiesByMaterial(newFilters));
          setPage(1);
          setInput(1);
        });
    }
    document.getElementById('select_ranking').selectedIndex = 0;
  };

  const deleteMaterialFilter = (e) => {
    const otherFilters = listOfMaterialsToFilterState.filter(
      (mat) => mat !== e.target.value
    );
    const newFilters = entities.filter((ent) => {
      return otherFilters.every((mat) =>
        ent.Materials.some((ent2) => ent2.name === mat)
      );
    });
    dispatch(listOfMaterialsToFilter(otherFilters));
    dispatch(filterEntitiesByMaterial(newFilters));
  };

  return (
    <VStack zIndex="10" mt={'2rem'}>
      <Select
        borderRadius="1rem"
        id="select_materials"
        borderWidth="0.2rem"
        borderColor="gray.300"
        placeholder="Selecciona un material"
        bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
        //width="-moz-fit-content"
        width="14vw"
        onChange={(e) => handleClikMaterials(e)}
      >
        {materials.map((m, i) => (
          <option key={i} value={m.name}>
            {m.name}
          </option>
        ))}
      </Select>
      {listOfMaterialsToFilterState?.map((mat, i) => {
        return (
          // <Badge key={i} variant="solid" colorScheme="green">
          //   {mat}
          // </Badge>
          <Button
            key={i + 54618641635}
            value={mat}
            onClick={deleteMaterialFilter}
          >
            {mat}
          </Button>
        );
      })}
      <Select
        borderRadius="1rem"
        id="select_ranking"
        borderWidth="0.2rem"
        borderColor="gray.300"
        bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
        onClick={(e) => {
          handleRanking(e);
        }}
        //width="-moz-fit-content"
        width="14vw"
      >
        <option value="none">Puntuación</option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </Select>
    </VStack>
  );
};

export default AsideFilters;
