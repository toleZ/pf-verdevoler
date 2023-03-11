import React from 'react';
import { Box, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';

const UploadImage = ({ onUpload }) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const upImages = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'skkkp5tl');
    setLoading(true);
    try {
      const res = await fetch(
        //'https://api.cloudinary.com/v1_1/verdevolver/image/upload?upload_preset=skkkp5tl',
        'https://api.cloudinary.com/v1_1/verdevolver/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      const file = await res.json();

      setImage(file.secure_url);
      onUpload(file.secure_url);
      setLoading(false);
    } catch (error) {}
  };

  return (
    <Box>
      <Input
        type="file"
        name="file"
        variant="unstyled"
        _placeholder="Sube tu imagen aqui"
        onChange={upImages}
      />
      {loading ? (
        <h3>Cargando imagen...</h3>
      ) : (
        <Image src={image} p={'3%'} borderRadius={'1rem'} maxHeight={'12rem'} />
      )}
    </Box>
  );
};

export default UploadImage;
