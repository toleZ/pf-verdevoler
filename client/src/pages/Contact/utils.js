export default function validate(form, name) {
  let isErrorObj = {
    isError: false,
    errorMsg: '',
  };
  if (form[name].length === 0) {
    isErrorObj = {
      isError: true,
      errorMsg: 'Requerido',
    };
    return isErrorObj;
  }
  if (name === 'mail') {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    isErrorObj = {
      isError: !regex.test(form.mail),
      errorMsg: 'Por favor ingresa un email válido.',
    };
  }
  if (name === 'description') {
    isErrorObj = {
      isError: form.description.length < 20,
      errorMsg: 'La descripción debe contener como mínimo 20 caracteres.',
    };
  }
  return isErrorObj;
}
