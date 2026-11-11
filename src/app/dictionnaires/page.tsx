import type { Metadata } from "next";
import Link from "next/link";
import meta from "../../../data/dictionnaires/meta.json";
import { DictionarySearch } from "@/components/dictionnaires/DictionarySearch";
import { SITE_URL } from "@/lib/site-url";

// Outil de consultation, distinct de la présentation des cours : pas d'en-tête
// commercial ni d'appel à réserver, seulement un lien discret vers l'accueil.

export const metadata: Metadata = {
  title: "Dictionnaires français-grec",
  description:
    "Recherche libre dans trois dictionnaires français-grec anciens (Courtaud-Diverneresse, Alexandre-Planche-Defauconpret, Feuillet) et dans le Bailly 2020 par mot français.",
  alternates: { canonical: "/dictionnaires" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Dictionnaires français-grec",
    description: "Courtaud-Diverneresse, Alexandre, Feuillet et Bailly inversé : chercher le grec à partir du français.",
    url: `${SITE_URL}/dictionnaires`,
  },
};

const COUNTS = { cd: 29852, al: 18864, fe: 17695, ba: 110624 };

export default function DictionnairesPage() {
  return (
    <main id="contenu" className="mx-auto max-w-4xl px-5 sm:px-6 pb-20">
      <header className="pt-8 pb-2">
        <Link href="/" className="eyebrow" style={{ textDecoration: "none" }}>
          Le Grec Vivant
        </Link>
        <h1 className="mt-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem,4vw,2.6rem)", color: "var(--color-ink)" }}>
          Dictionnaires français-grec
        </h1>
        <p className="mt-1" style={{ color: "var(--color-ink-soft)" }}>
          Trois dictionnaires du XIX<sup>e</sup> et du XX<sup>e</sup> siècle, numérisés puis océrisés, et le Bailly consulté à rebours. Recherche libre et
          gratuite.
        </p>
      </header>

      <DictionarySearch dicts={meta.dicts} vols={meta.vols as never} counts={COUNTS} />

      <footer className="mt-16 pt-6 text-sm space-y-2" style={{ borderTop: "1px solid var(--color-line)", color: "var(--color-ink-soft)" }}>
        <p>
          <strong>Sources.</strong> J.-J. Courtaud-Diverneresse, <em>Dictionnaire français-grec</em>, 2 tomes (Gallica,{" "}
          <a href="https://gallica.bnf.fr/ark:/12148/bpt6k6512716k" target="_blank" rel="noopener noreferrer">t. 1</a>,{" "}
          <a href="https://gallica.bnf.fr/ark:/12148/bpt6k65103407" target="_blank" rel="noopener noreferrer">t. 2</a>) ; C. Alexandre, J. Planche,
          A. Defauconpret, <em>Dictionnaire français-grec</em>, Hachette, 1865 (
          <a href="https://gallica.bnf.fr/ark:/12148/bpt6k6514341w" target="_blank" rel="noopener noreferrer">Gallica</a>) ; L. Feuillet,{" "}
          <em>Lexique français-grec à l&apos;usage des classes</em>, 1939 (
          <a href="https://archive.org/details/lexique-francais-grec_202201" target="_blank" rel="noopener noreferrer">Internet Archive</a>, domaine
          public selon cette bibliothèque). Source des images : gallica.bnf.fr / Bibliothèque nationale de France, et Internet Archive.
        </p>
        <p>
          <strong>Bailly 2020.</strong> G. Gréco, A. Charbonnet, M. de Wilde, B. Maréchal, d&apos;après A. Bailly, <em>Dictionnaire grec-français</em>{" "}
          (1935), édition numérique 2020 (<a href="http://gerardgreco.free.fr/" target="_blank" rel="noopener noreferrer">gerardgreco.free.fr</a>),
          licence{" "}
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr" target="_blank" rel="noopener noreferrer">CC BY-NC-ND 4.0</a> ; articles
          cités tels quels, en consultation libre et non commerciale.
        </p>
        <p>
          <strong>Texte.</strong> Le texte des dictionnaires français-grec vient d&apos;une reconnaissance optique (Tesseract), corrigée automatiquement à
          l&apos;aide des formes attestées du grec ; des erreurs subsistent, d&apos;où le bouton « image » qui montre la page imprimée.
        </p>
      </footer>
    </main>
  );
}
