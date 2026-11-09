import { useCharacters } from './hooks/useCharacters';
import { CharacterCard } from './components/CharacterCard';

export default function App() {
  const { characters, info, page, setPage, loading, error } = useCharacters(1);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <header className="max-w-7xl mx-auto text-center my-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
          Rick and Morty Directory
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Consumiendo la API oficial con <code className="text-emerald-400 font-mono">fetch</code> nativo en Vite
        </p>
      </header>

      {/* Manejo de Estados: Error */}
      {error && (
        <div className="max-w-md mx-auto p-4 bg-rose-950/40 border border-rose-800 text-rose-300 rounded-lg text-center my-6">
          <p className="font-semibold">Ocurrió un problema</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Manejo de Estados: Loading Skeleton */}
      {loading ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 bg-slate-900 rounded-xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : (
        /* Grid de Personajes */
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      )}

      {/* Controles de Paginación */}
      {info && (
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!info.prev || loading}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-colors border border-slate-700"
          >
            Anterior
          </button>
          
          <span className="text-sm font-medium text-slate-400">
            Página <strong className="text-white">{page}</strong> de {info.pages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!info.next || loading}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-colors text-white"
          >
            Siguiente
          </button>
        </div>
      )}
    </main>
  );
}