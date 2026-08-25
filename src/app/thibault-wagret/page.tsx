import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EditorialPage } from "@/components/site/EditorialPage";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_URL } from "@/lib/site-url";

const title = "Thibault Wagret, enseignant de grec ancien et doctorant";
const description =
  "Parcours de Thibault Wagret : agrégé de Lettres classiques, normalien, doctorant à HiSoMA, enseignant du grec et du latin vivants et auteur scientifique.";
const url = `${SITE_URL}/thibault-wagret`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/thibault-wagret" },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    siteName: "Le Grec Vivant",
    title,
    description,
    url,
    images: [
      {
        url: `${SITE_URL}/images/thibault.webp`,
        width: 640,
        height: 640,
        alt: "Portrait de Thibault Wagret",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [`${SITE_URL}/images/thibault.webp`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${url}/#profilepage`,
      url,
      name: title,
      description,
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      dateCreated: "2026-08-25",
      dateModified: "2026-08-25",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Thibault Wagret", item: url },
      ],
    },
  ],
};

export default function ThibaultWagretPage() {
  return (
    <>
      <StructuredData data={jsonLd} />
      <EditorialPage
        eyebrow="Enseignant et chercheur"
        breadcrumbLabel="Thibault Wagret"
        title="Thibault Wagret"
        lead="Agrégé de Lettres classiques, normalien et doctorant au laboratoire HiSoMA, il travaille sur l’histoire et la pratique des méthodes grammaticales et actives pour le grec ancien."
        published="25 août 2026"
        updated="25 août 2026"
      >
        <div className="grid gap-8 sm:grid-cols-[180px_1fr] sm:items-start">
          <Image
            src="/images/thibault.webp"
            alt="Portrait de Thibault Wagret"
            width={360}
            height={360}
            sizes="(min-width: 640px) 180px, 220px"
            className="rounded-full"
            style={{ border: "2px solid var(--color-gold)" }}
          />
          <p className="answer-box !mt-0">
            <strong>En bref :</strong> Thibault Wagret enseigne le grec ancien et
            le latin par des démarches actives. Sa thèse, commencée en 2023 au
            laboratoire HiSoMA, compare les méthodes grammaticales et actives en
            France et en Allemagne, de 1871 à nos jours. Le Grec Vivant prolonge
            ce travail dans un cadre pédagogique en ligne.
          </p>
        </div>

        <h2>Formation et recherche</h2>
        <dl className="grid gap-6 sm:grid-cols-[10rem_1fr]">
          <dt className="font-semibold" style={{ color: "var(--color-ink)" }}>
            Depuis 2023
          </dt>
          <dd>
            Doctorat en Lettres classiques au laboratoire HiSoMA. Sujet :
            « Le grec ancien, langue ancienne ou langue seconde ? Méthodes
            grammaticales et méthodes actives en France et en Allemagne, de 1871
            à nos jours », sous la direction de Christophe Cusset et Charles
            Delattre.
          </dd>
          <dt className="font-semibold" style={{ color: "var(--color-ink)" }}>
            2022
          </dt>
          <dd>Agrégation de Lettres classiques, après une formation à l’ENS de Lyon.</dd>
          <dt className="font-semibold" style={{ color: "var(--color-ink)" }}>
            2018–2019
          </dt>
          <dd>
            Année de formation intensive au grec et au latin vivants à
            l’Accademia Vivarium Novum, en Italie.
          </dd>
        </dl>

        <h2>Une recherche mise à l’épreuve de l’enseignement</h2>
        <p>
          Le travail doctoral étudie l’histoire des pratiques de classe, leurs
          objectifs et la manière dont elles organisent le rapport au texte. Dans
          Le Grec Vivant, cette réflexion devient une progression concrète :
          compréhension guidée, interaction, lecture continue, puis explicitation
          grammaticale et retour aux auteurs.
        </p>
        <p>
          Thibault a enseigné le grec vivant à des groupes débutants et confirmés,
          notamment à l’ENS de Lyon et au sein de l’Association Guillaume Budé. Il
          a également travaillé en immersion à l’Accademia Vivarium Novum et animé
          une lecture du <em>Criton</em> de Platon lors d’une Septimana Latina.
        </p>
        <p>
          <Link href="/methode-active-grec-ancien">
            Lire son guide de la méthode active pour le grec ancien
          </Link>
          .
        </p>

        <h2>Langues anciennes et humanités numériques</h2>
        <p>
          Ses recherches rencontrent aussi le traitement automatique des langues
          anciennes. En 2026, il cosigne avec Luc Pommeret et Jules Deret
          <em> THIVLVC: Retrieval Augmented Dependency Parsing for Latin</em>,
          publié dans les actes du workshop LT4HALA à LREC 2026.
        </p>
        <ul>
          <li>
            <a
              href="https://aclanthology.org/2026.lt4hala-1.20/"
              target="_blank"
              rel="noopener"
            >
              Lire la notice et l’article dans l’ACL Anthology
            </a>
          </li>
          <li>
            Coauteurs :{` `}
            <a href="https://lucpommeret.com" target="_blank" rel="noopener">
              Luc Pommeret
            </a>
            {` `}et{` `}
            <a href="https://julesderet.fr" target="_blank" rel="noopener">
              Jules Deret
            </a>
          </li>
        </ul>

        <h2>Profils et sources institutionnelles</h2>
        <ul>
          <li>
            <a
              href="https://www.hisoma.mom.fr/presentation/annuaire-du-personnel/wagret-thibault"
              target="_blank"
              rel="noopener"
            >
              Fiche officielle au laboratoire HiSoMA
            </a>
          </li>
          <li>
            <a href="https://thibaultwagret.fr" target="_blank" rel="noopener">
              Site universitaire et portfolio de Thibault Wagret
            </a>
          </li>
          <li>
            <a
              href="https://aclanthology.org/2026.lt4hala-1.20/"
              target="_blank"
              rel="noopener"
            >
              Publication THIVLVC, ACL Anthology, 2026
            </a>
          </li>
        </ul>

        <div className="card mt-12 p-7 text-center">
          <h2 className="!mt-0">Parler de votre projet de lecture</h2>
          <p className="mt-3">
            Débutant, étudiant ou lecteur déjà avancé : l’appel découverte permet
            de définir un point de départ et un parcours réaliste.
          </p>
          <Link href="/#reservation" className="btn btn-primary mt-6">
            Demander un appel découverte
          </Link>
        </div>
      </EditorialPage>
    </>
  );
}
