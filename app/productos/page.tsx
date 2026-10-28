"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Producto {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  brand?: string;
}

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:4000/products", {
          cache: "no-store",
        });
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Productos</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Encuentra el equipamiento ideal para tu entrenamiento
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-zinc-400">
            Cargando productos...
          </div>
        ) : productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosFiltrados.map((producto) => {
              const rutaImagen =
                producto.image || `/images/${producto.id}.jpg`;

              return (
                <Link
                  key={producto.id}
                  href={`/productos/${producto.id}`}
                  className="group bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all shadow-lg flex flex-col"
                >
                  <div className="relative w-full aspect-square bg-zinc-800/50 overflow-hidden">
                    <Image
                      src={rutaImagen}
                      alt={producto.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1 bg-zinc-900">
                    <div>
                      <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                        {producto.brand || "IRONSTRONG"}
                      </span>
                      <h2 className="text-base font-semibold text-white mt-1 group-hover:text-blue-400 transition-colors">
                        {producto.name}
                      </h2>
                    </div>

                    <div className="mt-4 pt-2 border-t border-zinc-800/50 flex justify-between items-center">
                      <span className="text-lg font-bold text-white">
                    ${Number(producto.price).toLocaleString("es-CL", { maximumFractionDigits: 0 })}                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-500">
            No se encontraron productos que coincidan con "{busqueda}".
          </div>
        )}

      </div>
    </main>
  );
}