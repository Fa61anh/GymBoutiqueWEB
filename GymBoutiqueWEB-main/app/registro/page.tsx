"use client";

import { useState, FormEvent } from "react";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre: nombre,
      correo: correo
    };

    try {
      const response = await fetch("http://localhost:4000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoUsuario)
      });

      if (response.ok) {
        setMensaje("¡Usuario registrado con éxito!");
        setNombre("");
        setCorreo("");
      } else {
        setMensaje("Ocurrió un error al registrar el usuario.");
      }
    } catch (error) {
      setMensaje("No se pudo conectar con el servidor.");
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-xl">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-zinc-200 dark:border-zinc-800">
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-6 text-center">
          Registro de Usuarios
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Nombre Completo:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Juan Alberto"/>
          </div>

          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="JuanAlberto@gmail.com"/>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow text-sm">
            Completar Registro
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center text-sm font-medium text-blue-600 dark:text-blue-400">
            {mensaje}
          </p>
        )}
      </div>
    </main>
  );
};

export default Registro;