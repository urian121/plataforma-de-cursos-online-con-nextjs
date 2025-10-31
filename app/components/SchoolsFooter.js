export default function SchoolsFooter() {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1e2229] -z-10"></div>
      
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-relaxed">
          Todas las rutas de aprendizaje que necesitas
          <br />
          <span className="text-gray-300">en 17 escuelas</span>
        </h2>
      </div>
    </section>
  );
}

