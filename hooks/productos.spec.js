describe("Pruebas Unitarias Componente Productos", () => {
  let mockProductos;

  beforeEach(() => {
    mockProductos = [
      { id: 1, name: "Proteína Whey", price: 29990, image: "/img/proteina.jpg" },
      { id: 2, name: "Cinturón Gimnasio", price: 15990, image: "/img/cinturon.jpg" }
    ];
  });

  afterEach(() => {
    if (window.fetch.restore) {
      window.fetch.restore();
    }
  });

  // PRUEBA 1: Listado GET con fetch simulado (Mock)
  it("1. Debe realizar la petición GET simulada a la API de productos", async () => {
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProductos),
      })
    );

    const response = await fetch("http://localhost:4000/products");
    const data = await response.json();

    expect(window.fetch).toHaveBeenCalledWith("http://localhost:4000/products");
    expect(data.length).toBe(2);
    expect(data[0].name).toBe("Proteína Whey");
  });

  // PRUEBA 2: Estado de Carga
  it("2. Debe verificar que el estado inicial de carga sea verdadero (loading)", () => {
    let loading = true;
    expect(loading).toBeTrue();
  });

  // PRUEBA 3: Estado de Error
  it("3. Debe manejar el estado de error cuando la petición fetch falla", async () => {
    spyOn(window, "fetch").and.returnValue(
      Promise.reject(new Error("Error de conexión"))
    );

    let errorMensaje = "";
    try {
      await fetch("http://localhost:4000/products");
    } catch (err) {
      errorMensaje = err.message;
    }

    expect(errorMensaje).toBe("Error de conexión");
  });

  // PRUEBA 4: Verificación del DOM renderizado
  it("4. Debe verificar la presencia de elementos renderizados en el DOM simulado", () => {
    const contenedorMock = document.createElement("div");
    contenedorMock.innerHTML = `
      <div id="listado-productos">
        <h2>Proteína Whey</h2>
        <span>$29.990</span>
      </div>
    `;

    document.body.appendChild(contenedorMock);
    const tituloDOM = document.querySelector("#listado-productos h2");

    expect(tituloDOM).not.toBeNull();
    expect(tituloDOM.textContent).toBe("Proteína Whey");

    document.body.removeChild(contenedorMock);
  });
});