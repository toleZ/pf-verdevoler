import { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react';
import ItemsCarousel from 'react-items-carousel';
import { InstagramEmbed } from 'react-social-media-embed';

import axios from 'axios';

const PostsCarousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 20;
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios.get(`/instagram`).then((res) => {
      setPosts(res.data);
    });
  }, []);
  return (
    <ItemsCarousel
      w="50%"
      requestToChangeActive={setActiveItemIndex}
      activeItemIndex={activeItemIndex}
      numberOfCards={1}
      gutter={20}
      leftChevron={
        <IconButton
          shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
          icon={<AiOutlineArrowLeft />}
        />
      }
      rightChevron={
        <IconButton
          shadow={'0 5px 7px rgba(0, 0, 0, 0.5)'}
          icon={<AiOutlineArrowRight />}
        />
      }
      outsideChevron
      chevronWidth={chevronWidth}
    >
      {posts?.map((pos) => (
        <InstagramEmbed
          url={pos.url}
          key={pos.id}
          style={{
            maxHeight: '49vh',
            maxWidth: '40vh',
            overflowY: 'scroll',
            overflowY: 'hidden',
            borderRadius: '1.5rem',
            boxShadow: '0 5px 7px rgba(0, 0, 0, 0.5)',
          }}
        />
      ))}
    </ItemsCarousel>
  );
};

export default PostsCarousel;
