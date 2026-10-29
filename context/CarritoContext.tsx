"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface ProductoCarrito {
  id: string;
  name: string;
  price: string | number;
  image?: string;
  cantidad: number;
}

interface CarritoContextType {
  carrito: ProductoCarrito[];
  agregarAlCarrito: (producto: Omit<ProductoCarrito, "cantidad">) => void;
  eliminarDelCarrito: (id: string) => void;
  vaciarCarrito: () => void;
  total: number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  const agregarAlCarrito = (productoNuevo: Omit<ProductoCarrito, "cantidad">) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === productoNuevo.id);

      if (existe) {
        return carritoActual.map((item) =>
          item.id === productoNuevo.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...carritoActual, { ...productoNuevo, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id: string) => {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce((acumulado, item) => {
    const precioNumerico = typeof item.price === "string" 
      ? parseFloat(item.price.replace(".", "").replace("$", "")) 
      : item.price;
    return acumulado + precioNumerico * item.cantidad;
  }, 0);

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, total }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
};