import { useEffect, useState } from 'react';
import { validarRegistro } from '../validaciones/validarRegistro';

function Registro({ planElegido = null, onRegistrado = () => {} }) {
  const [membresias, setMembresias] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    membresiaId: planElegido ? String(planElegido.id) : '',
  });
  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/membresias')
      .then((res) => res.json())
      .then(setMembresias)
      .catch(() => setAviso({ tipo: 'danger', texto: 'No se pudieron cargar las membresías' }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valido, errores: erroresNuevos } = validarRegistro(form);
    setErrores(erroresNuevos);
    setAviso(null);
    if (!valido) return;

    try {
      const res = await fetch('http://localhost:4000/alumnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          correo: form.correo.trim(),
          membresiaId: Number(form.membresiaId),
        }),
      });
      if (!res.ok) throw new Error('Error al registrar');
      setAviso({ tipo: 'success', texto: '¡Registro exitoso!' });
      onRegistrado();
      setForm({ nombre: '', correo: '', membresiaId: '' });
    } catch {
      setAviso({ tipo: 'danger', texto: 'No se pudo completar el registro' });
    }
  };

  return (
    <section className="mt-5">
      <h2 className="mb-3">Registro</h2>
      <form onSubmit={handleSubmit} noValidate className="col-12 col-md-8 col-lg-6">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            value={form.nombre}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errores.nombre}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            id="correo"
            name="correo"
            type="email"
            className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
            value={form.correo}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errores.correo}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="membresiaId" className="form-label">Membresía</label>
          <select
            id="membresiaId"
            name="membresiaId"
            className={`form-select ${errores.membresiaId ? 'is-invalid' : ''}`}
            value={form.membresiaId}
            onChange={handleChange}
          >
            <option value="">Selecciona un plan</option>
            {membresias.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre} - ${m.precio.toLocaleString('es-CL')}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errores.membresiaId}</div>
        </div>

        <button type="submit" className="btn btn-dark">Registrarme</button>

        {aviso && <div className={`alert alert-${aviso.tipo} mt-3`}>{aviso.texto}</div>}
      </form>
    </section>
  );
}

export default Registro;