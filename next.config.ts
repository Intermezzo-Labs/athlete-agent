import withBundleAnalyzer from "@next/bundle-analyzer"
import { type NextConfig } from "next"

import { env } from "./env.mjs"

// ── Node.js 25+ Web Storage compatibility fix ──
// Node.js 25 exposes a SQLite-backed `localStorage` globally. When the required
// `--localstorage-file` flag is absent or points to an invalid path the Storage
// object exists but its methods are not functions, crashing Turbopack SSR workers.
// Patching here ensures every process that loads this config gets the safe stub.
if (
  typeof globalThis.localStorage !== "undefined" &&
  typeof (globalThis.localStorage as Storage).getItem !== "function"
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

const config: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
}

export default env.ANALYZE ? withBundleAnalyzer({ enabled: env.ANALYZE })(config) : config

