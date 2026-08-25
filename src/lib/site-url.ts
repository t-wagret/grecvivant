export const SITE_URL = "https://grecvivant.fr";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
