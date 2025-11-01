export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[2px]" aria-live="polite" aria-busy="true" role="status">
      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 shadow-md border border-white/40">
        <span
          className="h-5 w-5 animate-spin rounded-full border-[2.5px] border-slate-200 border-t-purple-500"
          aria-hidden="true"
        />
        <span className="text-slate-700 text-sm font-medium tracking-wide">Cargando...</span>
      </div>
    </div>
  );
}