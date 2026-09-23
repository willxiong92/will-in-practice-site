/** Join site base URL with a path. Handles GitHub project pages base. */
export function withBase(path = '') {
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  if (!path || path === '/') return base.replace(/\/$/, '') || '/';
  return `${base}${path.replace(/^\//, '')}`;
}
