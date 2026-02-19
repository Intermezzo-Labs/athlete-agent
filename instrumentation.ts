import { registerOTel } from "@vercel/otel"

// ── Node.js 25+ Web Storage compatibility fix ──
// Node.js 25 ships a built-in localStorage backed by SQLite (--localstorage-file).
// When that flag is missing or points to an invalid path the Storage instance exists
// but its methods are non-functional, so any call to localStorage.getItem() throws
// "is not a function" during SSR / Turbopack worker initialisation.
// We detect the broken state and replace the global with a safe in-memory stub.
if (
  typeof globalThis.localStorage !== "undefined" &&
  typeof globalThis.localStorage.getItem !== "function"
) {
  const store = new Map<string, string>()
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    writable: true,
    value: {
      getItem:    (key: string) => store.get(key) ?? null,
      setItem:    (key: string, value: string) => { store.set(key, String(value)) },
      removeItem: (key: string) => { store.delete(key) },
      clear:      () => { store.clear() },
      key:        (n: number) => [...store.keys()][n] ?? null,
      get length() { return store.size },
    },
  })
}

export function register() {
  registerOTel("next-app")
}
