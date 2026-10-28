function MembresiaCard({ membresia, onElegir = () => {} }) {
  const { nombre, precio, duracionMeses, beneficios } = membresia;

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h3 className="card-title">{nombre}</h3>
        <p className="fs-4 fw-bold">${precio.toLocaleString('es-CL')}</p>
        <p className="text-muted">
          Duración: {duracionMeses} {duracionMeses === 1 ? 'mes' : 'meses'}
        </p>
        <ul className="list-unstyled flex-grow-1">
          {beneficios.map((b) => (
            <li key={b}>✔ {b}</li>
          ))}
        </ul>
        <button className="btn btn-dark mt-auto" onClick={() => onElegir(membresia)}>
          Elegir plan
        </button>
      </div>
    </div>
  );
}

export default MembresiaCard;