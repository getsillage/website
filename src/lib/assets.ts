/** Public asset URL under the Vite base (works for root and subpath hosting). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const normalized = path.replace(/^\/+/, '')
  return `${base}${normalized}`
}
