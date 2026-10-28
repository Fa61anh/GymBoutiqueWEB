import { useEffect, useState } from 'react';
import MembresiaCard from './MembresiaCard';
import { validarMembresia } from '../validaciones/validarMembresia';

function Membresias({ onElegirPlan = () => {} }) {
  const [membresias, setMembresias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/membresias')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar');
        return res.json();
      })
      .then((datos) => {
        // Solo se muestran las membresías que pasan la validación
        setMembresias(datos.filter((m) => validarMembresia(m).valido));
      })
      .catch(() => setError('No se pudieron cargar las membresías'))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando membresías...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <section>
      <h2 className="mb-3">Planes de Membresía</h2>
      <div className="row g-3">
        {membresias.map((m) => (
          <div className="col-12 col-md-6 col-lg-4" key={m.id}>
            <MembresiaCard
              membresia={m}
              onElegir={(plan) => {
                setSeleccionada(plan);
                onElegirPlan(plan);
              }}
            />
          </div>
        ))}
      </div>
      {seleccionada && (
        <div className="alert alert-success mt-3">
          Elegiste el plan <strong>{seleccionada.nombre}</strong>
        </div>
      )}
    </section>
  );
}

export default Membresias;