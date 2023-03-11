import React, { useState } from 'react';
import { Flex, Card, CardBody, Text, Button, Input } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

function InfoCardInput({ type, data, setInput, setSaveButton }) {
  const [textOrInput, setTextOrInput] = useState('text');
  let data2;
  let inputName;
  if (type === 'name') {
    data2 = data;
    inputName = 'name';
  }
  if (type === 'mail') {
    data2 = data;
    inputName = 'mail';
  }
  if (type === 'password') {
    data2 = data;
    inputName = 'password';
  }
  if (type === 'address') {
    data2 = data;
    inputName = 'address';
  }
  if (type === 'cbu') {
    data2 = data;
    inputName = 'cbu';
  }
  if (type === 'description') {
    data2 = data;
    inputName = 'description';
  }

  const onChange = (e) => {
    setInput((prevObj) => {
      return { ...prevObj, [e.target.name]: e.target.value };
    });
    setSaveButton(true);
  };

  const modifyText = () => {
    setTextOrInput('input');
  };
  return (
    <Flex direction="row" maxW="40vw" m="0px auto" mb="10vh" h="10vh">
      <Card w="20vw">
        <CardBody>
          {textOrInput === 'text' && <Text m="auto">{data}</Text>}
          {textOrInput === 'input' && (
            <Input
              mt="-10px"
              name={inputName}
              value={data2}
              onChange={(e) => onChange(e)}
            />
          )}
        </CardBody>
        <Button onClick={modifyText} mt="2vh">
          <EditIcon />
        </Button>
      </Card>
    </Flex>
  );
}

export default InfoCardInput;
