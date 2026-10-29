const agregarAlCarrito = (carrito, producto) => {
  const existe = carrito.find((item) => item.id === producto.id);
  if (existe) {
    return carrito.map((item) =>
      item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
  }
  return [...carrito, { ...producto, cantidad: 1 }];
};

const eliminarDelCarrito = (carrito, productoId) => {
  return carrito.filter((item) => item.id !== productoId);
};

const calcularTotal = (carrito) => {
  return carrito.reduce((total, item) => total + item.price * item.cantidad, 0);
};

// Sintaxis estándar para Jasmine / Karma
describe("Pruebas Unitarias para el Carrito (useCarrito)", () => {

  it("Debe agregar un producto nuevo al carrito con cantidad 1", () => {
    const carritoInicial = [];
    const producto = { id: "1", name: "Proteína Whey", price: 32990 };

    const resultado = agregarAlCarrito(carritoInicial, producto);

    expect(resultado.length).toBe(1);
    expect(resultado[0].cantidad).toBe(1);
    expect(resultado[0].name).toBe("Proteína Whey");
  });

  it("Debe incrementar la cantidad si el producto ya existe en el carrito", () => {
    const carritoInicial = [{ id: "1", name: "Proteína Whey", price: 32990, cantidad: 1 }];
    const producto = { id: "1", name: "Proteína Whey", price: 32990 };

    const resultado = agregarAlCarrito(carritoInicial, producto);

    expect(resultado.length).toBe(1);
    expect(resultado[0].cantidad).toBe(2);
  });

  it("Debe eliminar un producto correctamente del carrito", () => {
    const carritoInicial = [
      { id: "1", name: "Proteína Whey", price: 32990, cantidad: 1 },
      { id: "2", name: "Botella Térmica", price: 27990, cantidad: 1 }
    ];

    const resultado = eliminarDelCarrito(carritoInicial, "1");

    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe("2");
  });

  it("Debe calcular correctamente el total a pagar", () => {
    const carrito = [
      { id: "1", name: "Proteína Whey", price: 32990, cantidad: 2 }, 
      { id: "2", name: "Botella Térmica", price: 27990, cantidad: 1 }  
    ];

    const total = calcularTotal(carrito);

    expect(total).toBe(93970);
  });

});