import { HStack, Button } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const CreateRating = ({ stars, setStars }) => {
  const numberOfStars = (value) => {
    if (value + 1 !== stars) setStars(value + 1);
  };

  return (
    <HStack justifyContent="space-evenly">
      {[...Array(5)].map((n, i) => (
        <Button key={i} onClick={() => numberOfStars(i)} variant="unstyled">
          {i <= stars - 1 ? <AiFillStar /> : <AiOutlineStar />}
        </Button>
      ))}
    </HStack>
  );
};

export default CreateRating;
