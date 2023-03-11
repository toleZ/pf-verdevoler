import { useDispatch } from 'react-redux';
import { SearchIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import {
  searchEntities,
  filterEntitiesByMaterial,
} from '../redux/actions/entitiesActions';

const SearchBar = ({ entities, setPage, setInput, setSearch, search }) => {
  let dispatch = useDispatch();

  const { colorMode } = useColorMode();
  const toast = useToast();

  const handleClick = (e) => {
    const newFilters = entities.filter((ent) =>
      ent.name.toUpperCase().includes(e.target.value.toUpperCase())
    );
    if (newFilters.length === 0)
      return toast({
        title: 'Error',
        description: 'No se encontró ningún punto de reciclaje con ese nombre',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

    dispatch(filterEntitiesByMaterial(newFilters));
    setInput(1);
    setPage(1);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(searchEntities(e.target.value));
  };

  const handleKeyDown = (e) => e.keyCode === 13 && handleClick(e);

  return (
    <InputGroup>
      <Input
        borderRadius="1rem"
        placeholder="Punto de reciclaje"
        width={'50%'}
        mx="auto"
        type="text"
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        borderWidth="0.2rem"
        borderColor="gray.300"
        mt={'1rem'}
        bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
      />
      <IconButton
        colorScheme={'green'}
        icon={<SearchIcon />}
        onClick={() => handleClick({ target: { value: search } })}
        mt={'1rem'}
        position={'absolute'}
        left={'77%'}
        transform={'translateX(-50%)'}
      />
    </InputGroup>
  );
};

export default SearchBar;
