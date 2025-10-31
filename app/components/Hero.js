"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-x-hidden">
      {/* Complex background with radial gradients */}
      <div
        className="absolute inset-0 -z-20 overflow-hidden"
        style={{
          backgroundColor: "#1e2229",
        }}
      ></div>

      {/* Resplandor intenso superior derecha - múltiples capas */}
      <div
        className="absolute -z-10 overflow-hidden"
        style={{
          content: '""',
          backgroundColor: "transparent",
          backgroundImage: `
            radial-gradient(50% 70% at 80% 5%, rgba(10, 233, 138, 0.8) 0%, rgba(10, 233, 138, 0.7) 10%, rgba(5, 117, 69, 0.6) 20%, rgba(5, 117, 69, 0.5) 35%, rgba(5, 117, 69, 0.4) 50%, rgba(5, 117, 69, 0.25) 70%, transparent 100%),
            radial-gradient(45% 60% at 78% 8%, rgba(10, 233, 138, 0.7) 0%, rgba(10, 233, 138, 0.5) 20%, rgba(5, 117, 69, 0.4) 40%, rgba(5, 117, 69, 0.25) 65%, transparent 95%),
            radial-gradient(40% 55% at 75% 10%, rgba(10, 233, 138, 0.6) 0%, rgba(5, 117, 69, 0.4) 30%, rgba(5, 117, 69, 0.25) 60%, transparent 100%),
            radial-gradient(35% 50% at 73% 12%, rgba(10, 233, 138, 0.5) 0%, rgba(5, 117, 69, 0.3) 40%, rgba(5, 117, 69, 0.15) 75%, transparent 100%),
            radial-gradient(60% 80% at 85% 0%, rgba(5, 117, 69, 0.35) 0%, rgba(5, 117, 69, 0.2) 50%, rgba(5, 117, 69, 0.1) 75%, transparent 100%)
          `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "140%, 130%, 120%, 110%, 150%",
          backgroundPosition:
            "right top, 85% 3%, 80% 8%, 78% 10%, right -5% top",
          height: "110vh",
          width: "140%",
          filter: "blur(100px)",
          top: "-150px",
          right: "-150px",
          left: "auto",
        }}
      ></div>

      <div className="max-w-6xl w-full">
        {/* Main heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight px-4">
            La escuela de tecnología
            <br />
            <span className="text-primary">de Latinoamérica</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-12 sm:mb-16 px-4 max-w-3xl mx-auto">
            Más de 6 millones de estudiantes y más
            <br className="hidden sm:block" />
            de 4,000 empresas aprenden en Platzi
          </p>
        </div>
      </div>
    </section>
  );
}

