"use client";

import { useCarrito } from "@/context/CarritoContext";

export default function BotonAgregar({ producto }: { producto: any }) {
  const { agregarAlCarrito } = useCarrito();

  return (
    <button
      type="button"
      onClick={() => agregarAlCarrito(producto)}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow text-sm cursor-pointer">
      Agregar al Carrito
    </button>
  );
}

