import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 bg-zinc-50 dark:bg-black text-center">
      <div className="max-w-3xl w-full bg-white dark:bg-zinc-900 p-8 sm:p-12 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Bienvenido a tu nueva experiencia de entrenamiento
        </h2>

        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Un espacio exclusivo diseñado para potenciar tu rendimiento físico y bienestar integral con tecnología y equipamiento de alta gama.
        </p>
      </div>
    </main>
  );
}
