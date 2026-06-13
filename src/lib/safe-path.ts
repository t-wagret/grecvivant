/**
 * N'autorise qu'un chemin interne pour les redirections après connexion
 * (empêche les « open redirects » du type //attaquant.com).
 */
export function safeSuite(value: string | string[] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value;
  if (typeof v === "string" && v.startsWith("/") && !v.startsWith("//")) {
    return v;
  }
  return "/communaute";
}
