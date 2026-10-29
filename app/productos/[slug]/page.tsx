import Link from "next/link";
import Image from "next/image";
import BotonAgregar from "@/components/BotonAgregar";

export const instant = false;

export default async function ProductoConId({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await fetch("http://localhost:4000/products/" + slug, {
    cache: "no-store",
  });

  if (!response.ok) {
    return (
      <main className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <Link href="/productos" className="text-blue-600 underline">
          Volver a productos
        </Link>
      </main>
    );
  }

  const product = await response.json();

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="relative w-full h-80 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden flex items-center justify-center">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name || "Producto"}
              width={400}
              height={400}
              className="object-contain w-full h-full"
            />
          )}
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
            {product.name}
          </h2>

          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
             ${Number(product.price).toLocaleString("de-DE", { maximumFractionDigits: 0 })}
          </p>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
            <strong>Descripción completa: </strong>
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <BotonAgregar producto={product} />

            <Link
              href="/productos"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow text-sm"
            >
              Volver a productos
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}