import { Grid, GridItem, VStack, Box } from '@chakra-ui/react';
import SearchBar from '../Components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import EntityCard from '../Components/EntityCard';
import PropagateLoader from 'react-spinners/PropagateLoader';
import AsideFilters from '../Components/AsideFilters';
import { useEffect, useState } from 'react';
import {
  fetchEntities,
  getMaterials,
  listOfMaterialsToFilter,
} from '../redux/actions/entitiesActions';
import { Button, useColorMode } from '@chakra-ui/react';
import Paginated from '../Components/Paginated';

const Entities = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const [page, setPage] = useState(1);
  const [input, setInput] = useState(1);
  const [search, setSearch] = useState('');
  const byPage = 5;
  const { entities, isLoading, filteredEntities } = useSelector(
    (state) => state.entitiesReducer
  );
  const { acount } = useSelector((state) => state.acountReducer);

  function handleClick(e) {
    e.preventDefault();
    const sel = document.getElementById('select_materials');
    sel.value = '';
    dispatch(fetchEntities());
    dispatch(listOfMaterialsToFilter([]));
    setInput(1);
    setPage(1);
    setSearch('');
  }

  useEffect(() => {
    dispatch(fetchEntities());
    dispatch(getMaterials());
    filters = entities;
  }, []);

  let filters = filteredEntities;

  let numberEntitiesActives = 0;
  for (let i = 0; i < filters.length; i++)
    if (filters[i].status === 'Active') numberEntitiesActives++;

  const max = Math.ceil(numberEntitiesActives / byPage);

  const lightModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225348/LightMode_o28kqz.png';

  const darkModeBG =
    'https://res.cloudinary.com/verdevolver/image/upload/v1678225682/DarkMode_ilx6zv.png';

  return (
    <VStack
      bgImg={colorMode === 'light' ? lightModeBG : darkModeBG}
      // bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}
      pr={'3rem'}
    >
      <SearchBar
        entities={entities}
        setPage={setPage}
        setInput={setInput}
        search={search}
        setSearch={setSearch}
      />
      <Button
        p={'1.2rem'}
        colorScheme="green"
        size="sm"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar puntos de reciclaje
      </Button>
      <Grid templateColumns="1fr 4fr">
        <GridItem>
          <AsideFilters
            filters={filters}
            setPage={setPage}
            setInput={setInput}
          />
        </GridItem>
        <GridItem pt="2rem">
          <VStack spacing="10">
            {isLoading ? (
              <PropagateLoader color="#1c5738" />
            ) : (
              filters
                ?.slice((page - 1) * byPage, (page - 1) * byPage + byPage)
                .map((e) => {
                  if (e.status === 'Active') {
                    return <EntityCard key={e.id} entity={e} acount={acount} />;
                  }
                })
            )}
          </VStack>
          <Paginated
            page={page}
            setPage={setPage}
            max={max}
            input={input}
            setInput={setInput}
          />
        </GridItem>
        <Box h="10rem"></Box>
      </Grid>
    </VStack>
  );
};

export default Entities;
