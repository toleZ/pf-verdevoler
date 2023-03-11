import axios from 'axios';
import { logoutAcount } from '../../redux/actions/acountActions';

const deleteMaterial = (mat, materials, setInput) => {
  const newMaterials = materials.filter((eachMat) => eachMat.name !== mat);
  setInput((prevObj) => {
    return { ...prevObj, Materials: newMaterials };
  });
};

const addMaterial = (e, materials, setInput) => {
  let newMaterials = [...materials];
  const materialAdd = newMaterials.every(
    (objeto) => objeto.name !== e.target.value
  );
  materialAdd ? newMaterials.push({ name: e.target.value }) : null;
  const uniqueMaterials = [...new Set([...newMaterials])];
  setInput((prevObj) => {
    return { ...prevObj, Materials: uniqueMaterials };
  });
};

const updateVdV = async (id, input) => {
  try {
    const res = await axios.get(`http://localhost:3001/material`);
    let numArray = [];

    res.data.forEach((mat) => {
      input.Materials.forEach((mat2) => {
        if (mat.name == mat2.name) numArray.push(mat.id);
      });
    });
    input.materials = numArray;

    const resput = await axios.put(`http://localhost:3001/vdv/${id}`, input);

    return resput.status;
  } catch (error) {
    return '400';
  }
};

const updatePassword = async (id, password) => {
  try {
    const res = await axios.put(`/vdv/password/${id}`, password);
    return res.data.id, res.status;
  } catch (error) {
    return 'No se ha actualizado la contraseña';
  }
};

const deleteVdV = async (id, navigate) => {
  const res = await axios.delete(`http://localhost:3001/vdv/${id}`);
  navigate('/home');
  return res.status;
};

export { deleteMaterial, addMaterial, updateVdV, deleteVdV, updatePassword };
