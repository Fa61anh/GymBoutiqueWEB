export function validarRegistro({ nombre = '', correo = '', membresiaId = '' }) {
  const errores = {};

  if (nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
    errores.correo = 'Ingresa un correo válido';
  }
  if (membresiaId === '') {
    errores.membresiaId = 'Debes elegir una membresía';
  }

  return { valido: Object.keys(errores).length === 0, errores };
}