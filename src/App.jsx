import { useState } from 'react';
import Membresias from './components/Membresias';
import Registro from './components/Registro';
import ListaAlumnos from './components/ListaAlumnos';

function App() {
  const [plan, setPlan] = useState(null);
  const [version, setVersion] = useState(0);

  return (
    <div className="container py-4">
      <h1 className="mb-4">IronStrong Fitness</h1>
      <Membresias onElegirPlan={setPlan} />
      <Registro
        key={plan ? plan.id : 'sin-plan'}
        planElegido={plan}
        onRegistrado={() => setVersion((v) => v + 1)}
      />
      <ListaAlumnos version={version} />
    </div>
  );
}

export default App;