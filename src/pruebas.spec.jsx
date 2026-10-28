import { render, screen, fireEvent } from '@testing-library/react';
import MembresiaCard from './components/MembresiaCard';
import Registro from './components/Registro';
import { validarMembresia } from './validaciones/validarMembresia';

// ---------- Validador de membresía ----------
describe('validarMembresia', () => {
  it('acepta una membresía válida', () => {
    const resultado = validarMembresia({
      nombre: 'Plus',
      precio: 29990,
      duracionMeses: 3,
      beneficios: ['Camarines'],
    });
    expect(resultado.valido).toBeTrue();
    expect(resultado.errores).toEqual([]);
  });

  it('rechaza una membresía inválida y entrega los errores', () => {
    const resultado = validarMembresia({
      nombre: '',
      precio: -5,
      duracionMeses: 0,
      beneficios: [],
    });
    expect(resultado.valido).toBeFalse();
    expect(resultado.errores.length).toBe(4);
  });
});

// ---------- Tarjeta de membresía ----------
describe('MembresiaCard', () => {
  const plan = {
    id: 2,
    nombre: 'Plus',
    precio: 29990,
    duracionMeses: 3,
    beneficios: ['Sala de musculación', 'Camarines'],
  };

  it('muestra nombre, duración y beneficios recibidos por props', () => {
    render(<MembresiaCard membresia={plan} />);
    expect(screen.getByText('Plus')).toBeTruthy();
    expect(screen.getByText(/3 meses/)).toBeTruthy();
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });

  it('llama a onElegir con la membresía al presionar el botón', () => {
    const onElegir = jasmine.createSpy('onElegir');
    render(<MembresiaCard membresia={plan} onElegir={onElegir} />);
    fireEvent.click(screen.getByRole('button', { name: /elegir plan/i }));
    expect(onElegir).toHaveBeenCalledWith(plan);
  });
});

// ---------- Formulario de registro ----------
describe('Registro', () => {
  const membresias = [
    { id: 1, nombre: 'Básico', precio: 19990, duracionMeses: 1, beneficios: ['Camarines'] },
  ];

  const respuestaOk = (datos) =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(datos) });

  beforeEach(() => {
    // Mock: simula la API sin necesitar json-server
    spyOn(window, 'fetch').and.callFake((url, opciones) =>
      respuestaOk(opciones && opciones.method === 'POST' ? {} : membresias)
    );
  });

  it('muestra errores si se envía el formulario vacío', async () => {
    render(<Registro />);
    await screen.findByText(/Básico/);
    fireEvent.click(screen.getByRole('button', { name: /registrarme/i }));
    expect(screen.getByText('El nombre debe tener al menos 3 caracteres')).toBeTruthy();
    expect(screen.getByText('Ingresa un correo válido')).toBeTruthy();
    expect(screen.getByText('Debes elegir una membresía')).toBeTruthy();
  });

  it('envía el registro (POST) y avisa al padre cuando los datos son válidos', async () => {
    const onRegistrado = jasmine.createSpy('onRegistrado');
    render(<Registro onRegistrado={onRegistrado} />);
    await screen.findByText(/Básico/);

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Pérez' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'ana@correo.cl' } });
    fireEvent.change(screen.getByLabelText('Membresía'), { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: /registrarme/i }));

    await screen.findByText('¡Registro exitoso!');
    expect(onRegistrado).toHaveBeenCalled();

    const llamadaPost = window.fetch.calls
      .allArgs()
      .find(([, opciones]) => opciones && opciones.method === 'POST');
    expect(llamadaPost[0]).toBe('http://localhost:4000/alumnos');
    expect(JSON.parse(llamadaPost[1].body).membresiaId).toBe(1);
  });
});