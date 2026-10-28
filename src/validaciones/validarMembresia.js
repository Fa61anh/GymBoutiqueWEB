
export function validarMembresia(m) {
  const errores = [];

  if (!m || typeof m !== 'object' || Array.isArray(m)) {
    return { valido: false, errores: ['La membresía debe ser un objeto'] };
  }

  if (typeof m.nombre !== 'string' || m.nombre.trim() === '') {
    errores.push('El nombre es obligatorio');
  }
  if (typeof m.precio !== 'number' || !(m.precio > 0)) {
    errores.push('El precio debe ser un número mayor a 0');
  }
  if (!Number.isInteger(m.duracionMeses) || m.duracionMeses < 1) {
    errores.push('La duración debe ser un número entero de meses (mínimo 1)');
  }
  if (!Array.isArray(m.beneficios) || m.beneficios.length === 0) {
    errores.push('Debe tener al menos un beneficio');
  } else if (m.beneficios.some((b) => typeof b !== 'string' || b.trim() === '')) {
    errores.push('Todos los beneficios deben ser texto no vacío');
  }

  return { valido: errores.length === 0, errores };
}


export function validarListaMembresias(lista) {
  if (!Array.isArray(lista)) {
    return { valido: false, errores: ['El JSON debe ser una lista de membresías'] };
  }

  const errores = [];
  const ids = new Set();

  lista.forEach((m, i) => {
    const resultado = validarMembresia(m);
    resultado.errores.forEach((e) => errores.push(`Membresía #${i + 1}: ${e}`));

    if (m && ids.has(m.id)) {
      errores.push(`Membresía #${i + 1}: el id ${m.id} está repetido`);
    }
    if (m) ids.add(m.id);
  });

  return { valido: errores.length === 0, errores };
}