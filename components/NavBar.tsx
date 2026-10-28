"use client";

import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";

export default function Navbar() {
  const { carrito } = useCarrito();

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <header className="bg-zinc-900 text-white p-4 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
          IronStrong Fitness
        </Link>
        
        <ul className="flex gap-6 items-center text-sm font-medium">
          <li><Link href="/" className="hover:text-blue-400 transition-colors">Inicio</Link></li>
          <li><Link href="/nosotros" className="hover:text-blue-400 transition-colors">Nosotros</Link></li>
          <li><Link href="/ofrecemos" className="hover:text-blue-400 transition-colors">Qué ofrecemos</Link></li>
          <li><Link href="/productos" className="hover:text-blue-400 transition-colors">Productos</Link></li>
          <li><Link href="/membresias" className="hover:text-blue-400 transition-colors">Membresías</Link></li>
          
          <li>
            <Link 
              href="/carrito" 
              className="relative bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-2">
              <span>Carrito</span>
              {totalItems > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link 
              href="/registro" 
              className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
              Registro
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}