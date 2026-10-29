export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        
        <header className="border-b border-zinc-800 pb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Sobre Nosotros
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Conoce la historia y los valores detrás de IronStrong Fitness
          </p>
        </header>

        <section className="bg-zinc-900/50 p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            Nuestra Historia
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed">
            IronStrong Fitness fue fundado en 2025 con la misión de proporcionar una experiencia de entrenamiento de alta calidad en un entorno moderno y acogedor. Nuestro equipo de entrenadores está compuesto por profesionales certificados que se dedican a ayudarte a alcanzar tus objetivos de fitness.
          </p>
        </section>

        <section className="bg-zinc-900/50 p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            Nuestra Filosofía
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed">
            Creemos que el fitness es una parte integral de una vida saludable y equilibrada. En IronStrong Fitness, nos esforzamos por crear un ambiente donde cada miembro se sienta bienvenido y motivado a mejorar continuamente.
          </p>
        </section>

        <section className="bg-zinc-900/50 p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed">
            Contamos con un equipo de entrenadores altamente calificados y apasionados por ayudar a nuestros miembros a lograr sus metas. Cada uno de ellos trae años de experiencia y una profunda comprensión de los principios del entrenamiento efectivo.
          </p>
        </section>

        <section className="pt-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            Conoce Más de Nosotros
          </h2>
          
          <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 aspect-video">
            <video
              controls
              className="w-full h-full object-cover"
            >
              <source src="/video/video-presentacion.mp4" type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </section>

      </div>
    </main>
  );
}