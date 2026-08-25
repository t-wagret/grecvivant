import Link from "next/link";
import type { Metadata } from "next";
import { EditorialPage } from "@/components/site/EditorialPage";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_URL } from "@/lib/site-url";

const title = "Méthode active pour apprendre le grec ancien";
const description =
  "Comprendre la méthode active appliquée au grec ancien : input compréhensible, oral, lecture continue, grammaire en contexte, limites et exemple de séance.";
const url = `${SITE_URL}/methode-active-grec-ancien`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/methode-active-grec-ancien" },
  openGraph: {
    type: "article",
    locale: "fr_FR",
    siteName: "Le Grec Vivant",
    title,
    description,
    url,
    publishedTime: "2026-08-25",
    modifiedTime: "2026-08-25",
    authors: [`${SITE_URL}/thibault-wagret`],
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Le Grec Vivant — apprendre le grec ancien comme une langue vivante",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/twitter-image`],
  },
};

const faq = [
  {
    question: "La méthode active consiste-t-elle seulement à parler grec ?",
    answer:
      "Non. Elle articule écoute, interaction, lecture, écriture et observation explicite de la langue. L'oral sert à rendre les formes familières ; il ne remplace ni la grammaire ni l'étude attentive des textes.",
  },
  {
    question: "La traduction est-elle interdite ?",
    answer:
      "Non. L'objectif est de construire une compréhension directe avant de traduire. La traduction peut ensuite servir à vérifier une nuance, commenter un passage ou préparer un exercice universitaire.",
  },
  {
    question: "Peut-on commencer sans connaître l'alphabet grec ?",
    answer:
      "Oui. Les premiers énoncés s'appuient sur la voix, le geste, l'image et des situations transparentes. L'alphabet et la lecture sont introduits progressivement, sans exiger un bagage préalable.",
  },
  {
    question: "Cette approche dispense-t-elle d'apprendre la grammaire ?",
    answer:
      "Non. La grammaire reste indispensable pour nommer, organiser et vérifier ce que l'on rencontre. Elle intervient à partir d'exemples déjà compris, puis consolide la lecture et l'expression.",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${url}/#article`,
      headline: title,
      description,
      url,
      mainEntityOfPage: { "@id": `${url}/#webpage` },
      author: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
      datePublished: "2026-08-25",
      dateModified: "2026-08-25",
      inLanguage: "fr-FR",
      image: `${SITE_URL}/images/parthenon-colonnes.webp`,
      about: [
        "méthode active",
        "grec ancien",
        "input compréhensible",
        "didactique des langues anciennes",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${url}/#webpage`,
      url,
      name: title,
      description,
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/parthenon-colonnes.webp`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Méthode active", item: url },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${url}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function MethodeActivePage() {
  return (
    <>
      <StructuredData data={jsonLd} />
      <EditorialPage
        eyebrow="Guide pédagogique"
        breadcrumbLabel="Méthode active"
        title="Qu’est-ce que la méthode active pour le grec ancien ?"
        lead="Une démarche qui fait rencontrer le grec par le sens et l’usage, puis mobilise la grammaire pour éclairer ce qui a déjà été compris."
        published="25 août 2026"
        updated="25 août 2026"
      >
        <p className="answer-box">
          <strong>En bref :</strong> la méthode active traite le grec ancien comme
          une langue que l’on peut écouter, comprendre, lire et employer. Elle
          propose beaucoup d’énoncés accessibles, des interactions guidées et des
          textes gradués. La grammaire n’est pas supprimée : elle vient décrire,
          organiser et consolider des formes déjà rencontrées en contexte.
        </p>

        <h2>Les quatre piliers de la démarche</h2>

        <h3>1. Comprendre un message avant d’analyser sa forme</h3>
        <p>
          Le professeur parle lentement, montre, mime, dessine, reformule et
          réemploie un vocabulaire limité. L’élève n’a pas besoin de traduire
          chaque mot : la situation rend le message intelligible. Ce matériau
          accessible est souvent appelé <em>input compréhensible</em>.
        </p>

        <h3>2. Rencontrer souvent les mêmes formes</h3>
        <p>
          Une forme isolée dans un tableau reste abstraite. Dans un récit, une
          question ou une courte scène, elle revient avec un sens précis. Les
          répétitions ne sont pas mécaniques : elles changent de contexte tout en
          conservant un noyau lexical et grammatical familier.
        </p>

        <h3>3. Lire des textes continus et gradués</h3>
        <p>
          Le parcours commence par des textes écrits pour être compris avec peu
          d’aide, puis augmente progressivement la densité lexicale et syntaxique.
          L’objectif est de garder le fil d’une histoire ou d’un raisonnement,
          avant d’entrer dans des passages authentiques de Xénophon, Platon, du
          Nouveau Testament ou d’Homère.
        </p>

        <h3>4. Expliciter la grammaire au bon moment</h3>
        <p>
          Après plusieurs exemples compris, on compare les formes, on formule une
          régularité et on vérifie ses limites. Cette étape donne des mots précis
          pour parler de la langue. Elle est particulièrement importante pour les
          étudiants qui préparent une version, un commentaire ou un concours.
        </p>

        <h2>À quoi ressemble une séance ?</h2>
        <ol>
          <li>
            <strong>Mise en situation :</strong> quelques images, objets ou gestes
            installent le vocabulaire utile.
          </li>
          <li>
            <strong>Écoute guidée :</strong> un court récit est donné en grec, avec
            reformulations et vérifications de compréhension.
          </li>
          <li>
            <strong>Interaction :</strong> les élèves répondent, choisissent,
            décrivent ou transforment des phrases à leur niveau.
          </li>
          <li>
            <strong>Lecture :</strong> le même univers lexical apparaît dans un
            texte bref, puis dans un passage plus exigeant.
          </li>
          <li>
            <strong>Mise au clair :</strong> le groupe observe une construction et
            consigne la règle nécessaire, sans multiplier les exceptions hors
            contexte.
          </li>
        </ol>

        <h2>Méthode active et grammaire-traduction : une opposition à nuancer</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Point de départ</th>
                <th>Démarche active</th>
                <th>Grammaire-traduction</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Première tâche</td>
                <td>Comprendre un message contextualisé</td>
                <td>Identifier des formes et appliquer une règle</td>
              </tr>
              <tr>
                <td>Place du français</td>
                <td>Appui ponctuel, puis retrait progressif</td>
                <td>Langue principale de l’explication et de la traduction</td>
              </tr>
              <tr>
                <td>Grammaire</td>
                <td>Observée en contexte puis explicitée</td>
                <td>Présentée avant l’exercice d’application</td>
              </tr>
              <tr>
                <td>Lecture</td>
                <td>Continuité du sens et progression graduée</td>
                <td>Analyse détaillée de phrases ou de passages authentiques</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Ces démarches ne sont pas obligées de s’exclure. Une lecture directe
          peut préparer une analyse précise ; une traduction peut ensuite tester
          une interprétation. Le choix dépend du texte, du niveau et de l’objectif.
        </p>

        <h2>Ce que la méthode ne promet pas</h2>
        <ul>
          <li>Ce n’est pas un raccourci qui dispense d’une pratique régulière.</li>
          <li>Parler en classe n’équivaut pas à reconstituer sans débat tous les usages antiques.</li>
          <li>Une aisance de lecture se construit par paliers et varie selon le corpus visé.</li>
          <li>Les exigences universitaires de morphologie, syntaxe et traduction restent travaillées.</li>
        </ul>

        <h2>Pourquoi cette méthode est au cœur du Grec Vivant</h2>
        <p>
          Thibault Wagret consacre sa recherche doctorale à la comparaison des
          méthodes grammaticales et actives pour le grec ancien, en France et en
          Allemagne depuis 1871. Le cours met cette question à l’épreuve d’une
          pratique concrète : rendre le grec intelligible, observer ce qui aide la
          lecture, puis ajuster les supports et l’explicitation au groupe.
        </p>
        <p>
          <Link href="/thibault-wagret">Consulter son parcours et ses travaux</Link>
          {` `}ou <Link href="/#programme">voir le programme du cours</Link>.
        </p>

        <h2>Questions fréquentes</h2>
        {faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p className="mt-3">{item.answer}</p>
          </details>
        ))}

        <h2>Sources et repères</h2>
        <p>
          Ce guide est une synthèse éditoriale appliquée au Grec Vivant. Les
          travaux sur l’input compréhensible et les approches communicatives des
          langues anciennes restent discutés : ils décrivent des principes, des
          pratiques et des évaluations, sans garantir un résultat identique pour
          chaque apprenant.
        </p>
        <ul>
          <li>
            Robert Patrick,{` `}
            <a
              href="https://www.cambridge.org/core/journals/journal-of-classics-teaching/article/comprehensible-input-and-krashens-theory/2308987050E8D31E3986B530D4B02F6F"
              target="_blank"
              rel="noopener"
            >
              « Comprehensible Input and Krashen&apos;s theory »
            </a>
            , <em>Journal of Classics Teaching</em>, 2019.
          </li>
          <li>
            Emanuela Venditti,{` `}
            <a
              href="https://www.cambridge.org/core/journals/journal-of-classics-teaching/article/using-comprehensible-input-in-the-latin-classroom-to-enhance-language-proficiency/B81E48AFA425B69949F2EC1F48537B74"
              target="_blank"
              rel="noopener"
            >
              « Using Comprehensible Input in the Latin Classroom »
            </a>
            , <em>Journal of Classics Teaching</em>, 2021.
          </li>
          <li>
            Polyxeni Poupounaki-Lappa, Tzortzina Peristeri et David Coniam,{` `}
            <a
              href="https://www.cambridge.org/core/journals/journal-of-classics-teaching/article/towards-a-communicative-test-of-reading-and-language-use-for-classical-greek/771C3DF06527E9684941C8D2D6A8F6FD"
              target="_blank"
              rel="noopener"
            >
              « Towards a Communicative Test of Reading and Language Use for Classical Greek »
            </a>
            , <em>Journal of Classics Teaching</em>, 2021.
          </li>
          <li>
            <a
              href="https://www.hisoma.mom.fr/presentation/annuaire-du-personnel/wagret-thibault"
              target="_blank"
              rel="noopener"
            >
              Laboratoire HiSoMA — fiche officielle et sujet de thèse de Thibault Wagret
            </a>
            .
          </li>
          <li>
            <a
              href="https://www.hisoma.mom.fr/sites/hisoma.mom.fr/files/img/Recherche/Colloques/programme-Colloque-Faire-face-aux-textes-de-lantiquite.pdf"
              target="_blank"
              rel="noopener"
            >
              Colloque « Faire face aux textes de l’Antiquité » — programme HiSoMA, 2023
            </a>
            , notamment la lecture guidée et le message adapté.
          </li>
          <li>
            <a href="https://thibaultwagret.fr" target="_blank" rel="noopener">
              Parcours, enseignements et recherches de Thibault Wagret
            </a>
            .
          </li>
        </ul>

        <div className="card mt-12 p-7 text-center">
          <h2 className="!mt-0">Éprouver la méthode sur votre propre parcours</h2>
          <p className="mt-3">
            L’appel découverte sert à préciser votre niveau, les textes que vous
            souhaitez lire et le rythme réaliste pour y parvenir.
          </p>
          <Link href="/#reservation" className="btn btn-primary mt-6">
            Demander un appel découverte
          </Link>
        </div>
      </EditorialPage>
    </>
  );
}
