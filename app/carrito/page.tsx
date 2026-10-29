"use client";

import { useCarrito } from "@/context/CarritoContext";
import Link from "next/link";
import Image from "next/image";

export default function PaginaCarrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, total } = useCarrito();

  if (carrito.length === 0) {
    return (
      <main className="container mx-auto px-4 py-12 text-center max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
          Tu carrito está vacío
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          ¿Aún no te has decidido? Explora nuestro catálogo de productos fitness.
        </p>
        <Link
          href="/productos"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow text-sm font-medium">
          Ver Productos
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-8">
        Carrito de Compras
      </h1>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        {carrito.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image || "/img/proteina.jpg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"/>
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Cantidad: {item.cantidad}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-bold text-blue-600 dark:text-blue-400">
                ${item.price}
              </span>
              <button
                onClick={() => eliminarDelCarrito(item.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium">
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4">
          <button
            onClick={vaciarCarrito}
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 underline">
            Vaciar carrito
          </button>

          <div className="text-right">
            <span className="text-lg font-semibold text-zinc-900 dark:text-white mr-4">
              Total: ${total.toLocaleString("es-CL")}
            </span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow font-medium text-sm">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}