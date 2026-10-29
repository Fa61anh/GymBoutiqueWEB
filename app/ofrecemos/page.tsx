export default function OfrecemosPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          Nuestros Servicios y Clases
        </h2>

        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-lg text-zinc-700 dark:text-zinc-300">
            <span className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full"></span>
            Entrenamiento funcional y musculación avanzada
          </li>

          <li className="flex items-center gap-3 text-lg text-zinc-700 dark:text-zinc-300">
            <span className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full"></span>
            Clases personalizadas y rutinas de alta intensidad
          </li>

          <li className="flex items-center gap-3 text-lg text-zinc-700 dark:text-zinc-300">
            <span className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full"></span>
            Seguimiento mediante fichas médicas y control de progreso digital
          </li>

          <li className="flex items-center gap-3 text-lg text-zinc-700 dark:text-zinc-300">
            <span className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full"></span>
            Acceso a múltiples sucursales con infraestructura conectada
          </li>
        </ul>
      </div>
    </main>
  );
}
