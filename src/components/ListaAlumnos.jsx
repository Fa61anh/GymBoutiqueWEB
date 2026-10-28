import { useEffect, useState } from 'react';

function ListaAlumnos({ version = 0 }) {
  const [alumnos, setAlumnos] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setCargando(true);
    Promise.all([
      fetch('http://localhost:4000/alumnos').then((r) => r.json()),
      fetch('http://localhost:4000/membresias').then((r) => r.json()),
    ])
      .then(([listaAlumnos, listaMembresias]) => {
        setAlumnos(listaAlumnos);
        setMembresias(listaMembresias);
        setError('');
      })
      .catch(() => setError('No se pudo cargar la lista de alumnos'))
      .finally(() => setCargando(false));
  }, [version]);

  const nombreMembresia = (id) => {
    const m = membresias.find((x) => x.id === id);
    return m ? m.nombre : 'Sin plan';
  };

  if (cargando) return <p className="mt-5">Cargando alumnos...</p>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <section className="mt-5">
      <h2 className="mb-3">Alumnos registrados</h2>
      {alumnos.length === 0 ? (
        <p className="text-muted">Aún no hay alumnos registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Membresía</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.nombre}</td>
                  <td>{a.correo}</td>
                  <td>{nombreMembresia(a.membresiaId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ListaAlumnos;