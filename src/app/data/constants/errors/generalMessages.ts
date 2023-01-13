export const generalMessageErrors = {

  field: {
    required: 'Campo requerido',
    invalid: 'Campo inválido',
    minLength: 'Debe tener al menos ',
    maxLength: 'Debe tener máximo',
    range: 'Debe tener entre '
  },
  
  rfc: { exists: 'RFC existente', type: 'RFC invalido' },
  date: { date: 'El campo debe ser una fecha' },
  email: { type: 'Correo invalido' },
  url: { url: 'El campo debe ser una URL' },

  number: {
    number: 'El campo debe ser un número',
    min: 'Debe ser mayor a',
    max: 'Debe ser menor a',
  },

  password: {
    password: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
    passwordConfirm: 'Las contraseñas no coinciden',
  },

}