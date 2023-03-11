import { Card, Heading, Image } from '@chakra-ui/react';

const IgPost = ({ user, url }) => {
  return (
    <Card padding={'1rem'}>
      <Heading size="sm" mb="1rem">
        @{user}
      </Heading>
      <Image src={url} borderRadius="0.5rem" />
    </Card>
  );
};

export default IgPost;
