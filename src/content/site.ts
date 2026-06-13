// ============================================================================
//  Contenu éditorial du site « Le Grec Vivant » (français).
//  Centralisé ici pour être facile à relire et à modifier par Thibault.
// ============================================================================

export type Bullet = { title: string; text: string };
export type Step = { title: string; text: string };
export type Quote = { text: string; author: string; role?: string };

export const site = {
  title: "Le Grec Vivant — Thibault Wagret",
  shortTitle: "Le Grec Vivant",
  monogram: "ΓΖ", // Grec Zôn — Grec Vivant
  tagline:
    "Le grec ancien comme une langue vivante : on l'écoute, on le parle, on le lit.",
  metaDescription:
    "Apprenez le grec ancien (et le latin) comme une langue vivante. Méthode active et input compréhensible pour lire Homère et Platon sans traduire. Appel offert.",
  ogTitle:
    "Le Grec Vivant — Lire Homère et Platon dans le texte, par la méthode active",
  footerBlurb:
    "Le Grec Vivant est un programme d'apprentissage du grec ancien et du latin par la méthode active et l'input compréhensible, conçu par Thibault Wagret, agrégé de Lettres classiques et doctorant à l'ENS de Lyon. On y réapprend à habiter la langue : écouter, parler, lire et penser directement en grec, jusqu'à entrer dans les textes sans le détour laborieux de la traduction.",
  legal: "© Thibault Wagret — Le Grec Vivant, 2026. Tous droits réservés.",
  email: "thibault.wagret@ens-lyon.fr",
  // Lien de réservation : à remplacer par votre vrai lien (Cal.com / Calendly /
  // Google Agenda « prise de rendez-vous »). Voir README.
  bookingUrl: "",
};

export const nav = [
  { label: "La méthode", href: "#methode" },
  { label: "Le programme", href: "#programme" },
  { label: "Le professeur", href: "#professeur" },
  { label: "Ressources", href: "ressources" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  id: "accueil",
  eyebrow: "Le Grec Vivant — méthode active",
  heading:
    "Apprenez le grec ancien comme une langue vivante, et lisez Homère dans le texte.",
  subheading:
    "Écouter, parler, lire et penser directement en grec : c'est ainsi qu'on accède à Platon, aux tragiques et au Nouveau Testament sans passer par la traduction laborieuse. Une langue se vit avant de s'analyser.",
  ctaPrimary: "Réserver un appel découverte",
  ctaSecondary: "Découvrir la méthode",
  greek: "Ἀρχὴ ἥμισυ παντός",
  greekGloss: "Commencer, c'est déjà la moitié du chemin.",
};

export const promesses = {
  id: "promesses",
  eyebrow: "Ce que vous gagnez",
  heading: "Trois promesses concrètes, tenues pas à pas",
  subheading:
    "Pas de magie, pas de raccourci : une progression claire, où chaque étape se mesure à ce que vous savez faire dans la langue.",
  bullets: [
    {
      title: "Vos premières phrases de grec dès les premières semaines",
      text: "Dès le premier niveau, vous comprenez et formez des phrases simples en grec ancien : saluer, demander, décrire, raconter. Non pas réciter des paradigmes, mais habiter la langue par l'écoute et la parole, jusqu'à ce que les premières structures vous deviennent familières et naturelles.",
    },
    {
      title: "Des bases solides en une année d'apprentissage régulier",
      text: "Au fil d'une année de pratique guidée, vous installez l'essentiel de la grammaire et un lexique vivant, non par tableaux à mémoriser mais par usage répété. Le grec cesse d'être un code à déchiffrer : il devient une langue que vous reconnaissez, comprenez et manipulez avec une aisance grandissante.",
    },
    {
      title: "Lire les auteurs sans traduction laborieuse",
      text: "Le but n'est pas la version mécanique, mot après mot, mais la lecture directe. Vous apprenez à suivre Homère, Platon, les tragiques ou le Nouveau Testament dans le mouvement même de la phrase grecque, en pensant dans la langue plutôt qu'en la convertissant péniblement en français.",
    },
  ] as Bullet[],
  greek: "χαλεπὰ τὰ καλά",
  greekGloss:
    "les belles choses sont exigeantes ; elles n'en sont pas moins accessibles.",
};

export const probleme = {
  id: "constat",
  eyebrow: "Le constat",
  heading: "Vous avez appris le grec, mais vous ne lisez toujours pas Homère",
  body: [
    "Des années de déclinaisons récitées, de tableaux recopiés, de versions corrigées à l'encre rouge — et pourtant, devant une page de Platon, le réflexe reste le même : chercher le verbe, repérer le sujet, ouvrir le dictionnaire, reconstruire la phrase morceau par morceau. On ne lit pas le grec, on le décode. Et décoder épuise. La méthode grammaire-traduction traite la langue comme une énigme à résoudre plutôt que comme une parole à comprendre ; elle demande de tout analyser avant d'avoir rien saisi. C'est un travail d'archéologue, méticuleux et lent, mené sur une langue qui fut pourtant vivante, parlée, chantée.",
    "Le problème n'est pas votre rigueur ni votre intelligence : c'est l'outil. On apprend des règles sur la langue sans jamais baigner dans la langue elle-même. Or aucune phrase ne se grave par la seule mémorisation d'un paradigme — elle se grave par la rencontre répétée, en contexte, jusqu'à ce qu'elle devienne familière. Faute de cet ancrage, on oublie l'aoriste sitôt l'examen passé, on rouvre le manuel à chaque retour aux textes, et l'on finit, découragé, par ranger le grec parmi les belles choses qu'on aura « faites » sans jamais les habiter.",
  ],
  bullets: [
    {
      title: "Le déchiffrage sans fin",
      text: "Chaque phrase devient une équation : on cherche le verbe, on identifie les cas, on consulte le dictionnaire trois fois par ligne. Le sens n'arrive qu'après l'effort, jamais pendant — et le plaisir de lire ne vient pas.",
    },
    {
      title: "L'oubli programmé",
      text: "Les tableaux de déclinaisons appris par cœur s'effacent dès qu'on cesse de les réciter. Sans contact régulier et vivant avec la langue, rien ne tient : il faut tout réapprendre à chaque retour aux textes.",
    },
    {
      title: "Le thème et la version mécaniques",
      text: "On passe son temps à transposer en français au lieu de penser en grec. La traduction devient un écran permanent entre vous et l'auteur : vous lisez votre version, jamais vraiment la sienne.",
    },
    {
      title: "L'épuisement, puis l'abandon",
      text: "Tant d'heures pour si peu de fluidité : le découragement s'installe. Beaucoup, parmi les plus motivés, finissent par renoncer, convaincus à tort que le grec n'était « pas pour eux ».",
    },
  ] as Bullet[],
};

export const solution = {
  id: "methode",
  eyebrow: "La méthode active",
  heading: "Et si le grec ancien était, lui aussi, une langue vivante ?",
  subheading:
    "On apprend le grec comme on apprend toute langue : en l'écoutant, en le parlant, en le lisant beaucoup — jusqu'à le comprendre directement, sans passer par le français.",
  greek: "ἡ γλῶττα ζῇ",
  greekGloss: "la langue est vivante",
  body: [
    "La langue d'Homère et de Platon n'est morte que parce qu'on a cessé de la faire vivre. Pourtant, rien dans le grec ne résiste à la manière dont l'esprit humain apprend une langue : par l'oreille avant l'œil, par le sens avant la règle, par une exposition régulière à des énoncés qu'on comprend. C'est le principe de l'input compréhensible — on progresse en recevant beaucoup de grec un peu plus simple que ce que l'on saurait produire, et le sens finit par s'imposer de lui-même. Vous n'apprenez plus des listes : vous reconnaissez, vous anticipez, vous lisez.",
    "Concrètement, on écoute du grec parlé, on répond en grec, on lit des textes gradués puis les auteurs eux-mêmes, et l'on pense progressivement dans la langue. La grammaire n'est pas écartée — elle change de place : au lieu d'être l'obstacle qu'on franchit avant de lire, elle devient l'outil qui éclaire ce que vous comprenez déjà. C'est exactement l'objet de mes recherches : non pas suivre une mode, mais éprouver méthodiquement ce qui permet vraiment d'accéder aux textes.",
  ],
  bullets: [
    {
      title: "Comprendre directement",
      text: "Plus de décodage mot à mot : par l'écoute et la lecture abondante, le sens vient en grec, sans détour par le français.",
    },
    {
      title: "Lire beaucoup, vraiment",
      text: "Des textes adaptés à votre niveau, puis Homère, les tragiques, le Nouveau Testament — la lecture continue plutôt que le déchiffrage ponctuel.",
    },
    {
      title: "La grammaire au service du sens",
      text: "Les règles ne précèdent plus la lecture : elles l'accompagnent et la clarifient, une fois que la phrase vous parle déjà.",
    },
  ] as Bullet[],
};

export const methode = {
  id: "demarche",
  eyebrow: "La démarche, en quatre temps",
  heading: "Apprendre le grec comme on apprend une langue : par l'usage",
  // (Corrigé : la sortie brute de l'agent avait fusionné par erreur le sous-titre
  //  et la citation grecque ; séparés ici proprement.)
  subheading:
    "On n'attend pas de tout savoir pour commencer à comprendre. Dès la première heure, vous écoutez, vous saisissez du sens, vous répondez. La grammaire vient ensuite éclairer ce que vous avez déjà éprouvé — et non l'inverse. C'est précisément cette démarche que Thibault étudie dans sa thèse à l'ENS de Lyon : le grec ancien envisagé comme une langue seconde, qui s'acquiert, et non seulement une langue à déchiffrer.",
  greek: "χαλεπὰ τὰ καλά",
  greekGloss:
    "« les belles choses sont exigeantes ». L'exigence, oui ; la peine inutile, non.",
  steps: [
    {
      title: "Comprendre avant de traduire : l'input compréhensible",
      text: "Vous êtes plongé dans une langue tenue juste au-dessus de votre niveau : récits illustrés, images, gestes, paraphrases en grec. Tout est calibré pour que vous compreniez sans passer par le français. Le sens se construit directement, et la langue cesse d'être un code à décrypter pour devenir un médium où circule la pensée.",
    },
    {
      title: "Lire en continu : des textes adaptés aux auteurs",
      text: "On lit beaucoup, et de plus en plus haut. D'abord des textes gradués, écrits pour être lus de bout en bout sans dictionnaire ; puis, par paliers, les auteurs eux-mêmes — Lucien, l'Évangile, Xénophon, Platon, Homère. Le passage à l'authentique n'est pas une rupture : c'est la suite naturelle d'une lecture devenue fluide.",
    },
    {
      title: "Parler et écrire : la pratique active",
      text: "On ne se contente pas de recevoir la langue, on la produit. En direct, vous répondez en grec, vous racontez, vous reformulez, vous écrivez de courts textes. Cette activité ancre durablement le vocabulaire et les tournures : ce que l'on a su dire, on le reconnaît immédiatement à la lecture.",
    },
    {
      title: "La grammaire en contexte, par la découverte",
      text: "Les règles ne sont pas le point de départ mais le moment où l'on met des mots sur une régularité déjà rencontrée. On observe, on dégage la structure, on la systématise. La grammaire garde toute sa rigueur — elle devient simplement la servante de la lecture, et non son péage.",
    },
  ] as Step[],
};

export const programme = {
  id: "programme",
  eyebrow: "Le parcours",
  heading: "Un chemin par paliers, jusqu'aux auteurs",
  subheading:
    "Trois niveaux, une même promesse : avancer pas à pas, de vos premiers mots de grec jusqu'à la lecture directe d'Homère, de Platon et des tragiques. Pas de saut dans le vide, pas de plafond non plus.",
  greek: "κατὰ μικρόν",
  greekGloss: "pas à pas, sans précipitation",
  levels: [
    {
      numeral: "I",
      title: "Premiers pas",
      text: "On entre dans la langue par l'oreille et par la voix. Vous comprenez de courtes phrases, vous répondez, vous nommez le monde autour de vous en grec. Tout passe par des situations claires et concrètes : aucun prérequis, et déjà le plaisir de comprendre sans traduire.",
    },
    {
      numeral: "II",
      title: "Lecteur autonome",
      text: "Le vocabulaire s'épaissit, les tournures se font naturelles. Vous lisez des récits gradués, des dialogues, des textes adaptés, et la grammaire se révèle de l'intérieur, comme une logique vivante plutôt qu'une liste à réciter. Vous tenez une conversation simple et suivez un cours mené en grec.",
    },
    {
      numeral: "III",
      title: "Lecture des auteurs",
      text: "Le but de tout le parcours : ouvrir Homère, Platon, les tragiques ou le Nouveau Testament et entendre la phrase grecque pour elle-même. On lit en continu, on commente dans la langue, on goûte le texte au lieu de le déchiffrer.",
    },
  ],
  format: [
    {
      title: "Un cours en direct chaque semaine",
      text: "Une séance hebdomadaire en visio, en petit groupe, menée dans la langue. C'est le cœur du parcours : on écoute, on parle, on lit ensemble, avec une attention réelle portée à chacun.",
    },
    {
      title: "Des capsules et des exercices dans la semaine",
      text: "Entre deux séances, de courtes capsules vidéo et des exercices ciblés entretiennent l'élan. Quelques minutes par jour suffisent à ancrer ce qui a été vu et à préparer la séance suivante.",
    },
    {
      title: "Un suivi régulier et une communauté",
      text: "Vous n'avancez pas seul : retours réguliers, corrections, et un groupe d'apprenants avec qui pratiquer. La langue se travaille à plusieurs, comme elle s'est toujours apprise.",
    },
  ] as Step[],
  note: "Le grec ancien est au centre du programme. Le latin est proposé dans le même esprit et selon la même méthode active, pour qui veut lire Cicéron et Virgile comme on lit une langue vivante.",
};

export const inclus = {
  id: "inclus",
  eyebrow: "Ce qui est inclus",
  heading: "Tout ce dont vous avez besoin pour faire vivre la langue",
  subheading:
    "Un dispositif complet, pensé pour qu'une langue ancienne devienne, semaine après semaine, une langue qui se parle, s'écoute et se lit avec plaisir.",
  bullets: [
    {
      title: "Cours en direct en visio, en petit groupe",
      text: "Des séances hebdomadaires où l'on parle réellement la langue. Le petit effectif garantit que chacun prend la parole, pose ses questions et progresse à son rythme, dans un grec ou un latin parlé du début à la fin.",
    },
    {
      title: "Capsules vidéo hebdomadaires",
      text: "Chaque semaine, de courtes vidéos d'input compréhensible : récits, dialogues et explications conçus pour être entièrement saisis dans la langue, à réécouter autant de fois qu'il le faut, à votre convenance.",
    },
    {
      title: "Exercices interactifs",
      text: "Des activités ciblées pour ancrer le vocabulaire et les tournures par l'usage plutôt que par le par-cœur. On manipule la langue, on l'entend, on la réemploie — jamais de thème ni de version mécaniques.",
    },
    {
      title: "Suivi et corrections réguliers",
      text: "Un accompagnement personnel tout au long du parcours : retours sur vos productions orales et écrites, ajustements et conseils, pour que chaque étape consolide la précédente sans jamais vous laisser seul face à la difficulté.",
    },
    {
      title: "Une communauté d'apprenants",
      text: "L'accès à un groupe vivant où l'on échange, où l'on s'entraîne à converser entre les cours et où l'émulation entretient la motivation. Apprendre une langue est plus naturel — et plus joyeux — à plusieurs.",
    },
    {
      title: "Ressources et textes gradués",
      text: "Une bibliothèque de lectures classées par difficulté, qui vous mène pas à pas des premières phrases jusqu'aux auteurs : Homère, Platon, les tragiques, le Nouveau Testament, Cicéron, Virgile, lus dans le texte et compris directement.",
    },
  ] as Bullet[],
  greek: "πάντα ῥεῖ",
  greekGloss: "tout coule, tout vit : la langue aussi.",
};

export const benefices = {
  id: "benefices",
  eyebrow: "Ce que vous y gagnez",
  heading: "Le jour où la langue cesse de résister",
  subheading:
    "La méthode active ne vous donne pas seulement des connaissances : elle change votre rapport à la langue. Voici ce qui se transforme, mois après mois, à mesure que le grec devient une langue que vous habitez plutôt qu'un code à déchiffrer.",
  greek: "ἡ γλῶττα ζῶσα",
  greekGloss: "la langue vivante",
  bullets: [
    {
      title: "Lire les auteurs dans le texte",
      text: "Vous ouvrez l'Évangile de Jean, un dialogue de Platon ou un chant d'Homère et vous suivez le fil de la pensée directement, en grec, sans le détour de la traduction. Le texte vous parle ; vous n'êtes plus penché sur un dictionnaire, vous êtes à l'intérieur de la phrase.",
    },
    {
      title: "Comprendre sans traduire",
      text: "À force d'écouter et de parler, le grec finit par se passer du français. Vous saisissez le sens à mesure que les mots arrivent, dans leur ordre, comme on comprend une langue qu'on connaît — et c'est cette compréhension immédiate qui rend la lecture fluide et le plaisir possible.",
    },
    {
      title: "Retrouver le plaisir de lire",
      text: "La grammaire et la version mécaniques ont souvent transformé les chefs-d'œuvre en exercices. Ici, on rend la langue à ce pour quoi elle existe : être lue, entendue, goûtée. Les textes redeviennent ce qu'ils sont — vivants, drôles, bouleversants — et la lecture, un rendez-vous attendu.",
    },
    {
      title: "Une maîtrise qui dure",
      text: "Ce qui s'apprend par l'usage ne s'oublie pas comme une leçon récitée. En manipulant la langue vous-même, vous installez des réflexes durables plutôt que des règles fragiles. Le grec s'ancre, se consolide, et reste disponible bien au-delà des premières semaines.",
    },
    {
      title: "Un atout réel et reconnu",
      text: "Cette aisance se prolonge partout où le grec compte : épreuves de CPGE, préparation de l'agrégation, travail de recherche, mais aussi simple culture qui éclaire la philosophie, la littérature et nos langues modernes. Vous ne cochez pas une case : vous acquérez un savoir qui vous accompagne.",
    },
  ] as Bullet[],
};

export const apropos = {
  id: "professeur",
  eyebrow: "Le professeur",
  heading: "Thibault Wagret, ou le grec comme on vit une langue",
  subheading:
    "Agrégé, normalien, doctorant : un chercheur dont la thèse porte précisément sur la manière d'enseigner le grec ancien en langue vivante.",
  body: [
    "Thibault Wagret est agrégé de Lettres classiques (2022) et ancien élève de l'École normale supérieure de Lyon. Son parcours est passé par un master d'Histoire de la philosophie, par les classes préparatoires littéraires de Paris, et surtout par une année de formation intensive en « Grec et Latin vivants » en Italie, dans la tradition du Vivarium Novum : c'est là qu'il a fait l'expérience, en l'éprouvant sur lui-même, de ce que change une langue ancienne quand on cesse de la déchiffrer pour commencer à la parler.",
    "Ce qui fonde sa crédibilité n'est pas une mode pédagogique adoptée au hasard : c'est l'objet même de sa recherche. Doctorant à l'ENS de Lyon au sein du laboratoire HiSoMA, il consacre sa thèse à une question simple et décisive — le grec ancien est-il une langue morte que l'on traduit, ou une langue seconde que l'on acquiert ? Il y confronte méthodes grammaticales et méthodes actives, et théorise précisément la démarche qu'il vous propose ici.",
    "De ce double ancrage naît sa manière d'enseigner : l'exigence d'un helléniste de métier, et la conviction tranquille que l'on apprend mieux le grec en l'écoutant, en le parlant et en y pensant qu'en le découpant en exercices de version. Son ambition pour vous est concrète : lire Homère, Platon, les tragiques ou le Nouveau Testament dans le texte, avec aisance et avec plaisir.",
  ],
  greek: "ζῶσα φωνή",
  greekGloss: "la voix vivante",
  bullets: [
    {
      title: "Agrégé de Lettres classiques",
      text: "Reçu à l'agrégation en 2022, le concours le plus exigeant pour l'enseignement des langues anciennes en France.",
    },
    {
      title: "Normalien, ENS de Lyon",
      text: "Ancien élève de l'École normale supérieure de Lyon, après un master d'Histoire de la philosophie et des classes préparatoires littéraires.",
    },
    {
      title: "Doctorant au laboratoire HiSoMA",
      text: "Thèse en cours (2023–2026) sur les méthodes grammaticales et les méthodes actives : sa recherche porte exactement sur cette pédagogie.",
    },
    {
      title: "Formé au grec et au latin vivants",
      text: "Année de formation intensive en Italie, dans la tradition du Vivarium Novum, où la langue se pratique à l'oral comme une langue vivante.",
    },
  ] as Bullet[],
};

export const publicCible = {
  id: "public",
  eyebrow: "Pour qui",
  heading: "À qui s'adresse Le Grec Vivant",
  subheading:
    "Un même chemin, des points de départ différents : du grand débutant curieux au futur agrégé, chacun avance à partir de là où il se trouve.",
  greek: "Πᾶς ἀνὴρ φιλόλογος",
  greekGloss: "« Quiconque aime les mots », quel que soit son niveau.",
  bullets: [
    {
      title: "Lycéens et étudiants en langues anciennes",
      text: "Vous suivez le grec ou le latin dans vos études et vous voulez enfin lire les textes au lieu de les déchiffrer. La méthode active vous donne l'aisance qui manque aux cours classiques : vous comprenez la langue de l'intérieur, et vos résultats suivent naturellement.",
    },
    {
      title: "Étudiants de CPGE et candidats à l'agrégation",
      text: "Version, thème, explication de texte : vous avez besoin de rapidité et de sûreté. En pensant directement en grec, vous lisez plus vite, vous saisissez la syntaxe d'un coup d'œil et vous abordez les épreuves avec une langue devenue familière, non plus un code à forcer.",
    },
    {
      title: "Chercheurs, philosophes et théologiens",
      text: "Platon, le Nouveau Testament, les Pères de l'Église, les sources de votre discipline : vous voulez y accéder sans l'écran de la traduction. Retrouvez le contact direct avec le texte, ses nuances et ce que seule la langue d'origine laisse entendre.",
    },
    {
      title: "Adultes passionnés",
      text: "Vous avez aimé le grec ou le latin autrefois, ou vous en rêvez depuis longtemps. Sans contrainte d'examen, à votre rythme, vous renouez avec Homère, les tragiques ou Virgile pour le plaisir vivant de la lecture.",
    },
    {
      title: "Grands débutants curieux",
      text: "Vous partez de zéro et c'est une excellente nouvelle : la méthode active a été pensée pour cela. On commence par écouter et comprendre des phrases simples, exactement comme une langue vivante, et l'on progresse pas à pas, sans tableaux de déclinaisons à apprendre par cœur d'emblée.",
    },
  ] as Bullet[],
  note: "Un doute sur votre niveau ou sur la formule qui vous convient ? L'appel découverte sert précisément à en parler.",
};

export const temoignages = {
  id: "temoignages",
  eyebrow: "Ils en parlent",
  heading: "Ce que change une langue qu'on habite",
  // Vide tant qu'il n'y a pas de VRAIS avis : la section ne s'affiche pas du tout.
  // Pour l'activer plus tard, réinjecter ici des objets { text, author, role }.
  quotes: [] as Quote[],
};

export const latin = {
  id: "latin",
  eyebrow: "Et le latin ?",
  heading: "Le latin, dans le même souffle vivant",
  subheading:
    "Pour celles et ceux qui veulent les deux langues — ou qui préfèrent commencer par Rome.",
  greek: "Vivit lingua Latina",
  greekGloss: "« La langue latine est vivante »",
  body: [
    "Le grec n'est pas seul à respirer. Le latin s'apprend ici selon le même esprit : on l'écoute, on le parle, on le lit, jusqu'à penser directement dans la langue. La grammaire devient une servante discrète, non plus un mur. On y avance pour lire vraiment Cicéron et la limpidité de sa prose, la densité de Sénèque, les vers de Virgile — et au-delà, toute la longue littérature néo-latine qui a fait vivre cette langue bien après Rome. Que vous souhaitiez mener les deux langues de front ou faire du latin votre première porte d'entrée vers les humanités, vous y retrouverez la même exigence et la même méthode active.",
  ],
  note: "Le programme de latin suit les mêmes niveaux et le même rythme que celui de grec. Parlons-en lors de l'appel découverte : nous choisirons ensemble par où commencer.",
};

export const faq = {
  id: "faq",
  eyebrow: "Questions fréquentes",
  heading: "Questions fréquentes",
  items: [
    {
      title: "Faut-il déjà connaître le grec pour commencer ?",
      text: "Non. Le programme accueille les vrais débutants comme ceux qui ont étudié le grec au lycée ou à l'université et l'ont oublié. Vous démarrez au niveau qui est le vôtre : on part de phrases simples, on construit la langue pas à pas, sans présupposer aucune grammaire acquise. La seule chose requise est l'envie d'entendre et de dire du grec dès la première séance.",
    },
    {
      title: "Combien de temps faut-il y consacrer chaque semaine ?",
      text: "Comptez environ trois à quatre heures : un cours en direct en visio, le visionnage de quelques capsules vidéo et un peu de lecture ou d'écoute quotidienne. L'essentiel n'est pas la quantité mais la régularité. Quinze minutes d'exposition par jour valent mieux qu'une longue séance hebdomadaire : c'est ainsi qu'une langue s'installe durablement.",
    },
    {
      title: "La méthode active permet-elle de préparer l'agrégation ou le bac ?",
      text: "Oui, et elle y prépare mieux qu'on ne le croit. Lire vite et juste, sentir une construction, reconnaître une tournure d'auteur : ce sont précisément les réflexes qu'exigent les épreuves. La méthode active ne remplace pas le travail sur les textes au programme, elle lui donne le socle qui manque souvent. C'est aussi le cœur de ma recherche doctorale, consacrée à l'articulation entre méthodes grammaticales et méthodes actives.",
    },
    {
      title: "L'enseignement en ligne est-il vraiment efficace ?",
      text: "Pour une langue vivante, la visio est un atout : on se voit, on s'entend, on échange en grec en temps réel, et chaque séance reste accessible en différé. Les capsules vidéo, les exercices et le suivi régulier prolongent le cours entre deux rendez-vous. Beaucoup d'élèves progressent davantage ainsi qu'en présentiel, parce que l'exposition à la langue est plus fréquente et mieux répartie dans la semaine.",
    },
    {
      title: "Et le latin ?",
      text: "Le latin est enseigné selon la même méthode active, héritée de la tradition du Vivarium Novum où je me suis formé. Vous pouvez suivre le grec seul, le latin seul, ou les deux : les deux langues se renforcent l'une l'autre, et la démarche reste identique. On parle, on écoute, on lit Cicéron et Virgile dans le texte, sans passer par la version mécanique.",
    },
    {
      title: "Et si la méthode ne me convient pas ?",
      text: "Vous n'êtes jamais engagé sur la durée. Le parcours s'ouvre par une séance d'essai, pensée pour que vous éprouviez concrètement l'input compréhensible avant de vous décider : vous écoutez, vous comprenez, vous répondez en grec dès la première heure. Si cette manière d'apprendre ne vous parle pas, vous n'allez pas plus loin, simplement — et même après quelques semaines, vous restez libre de vous retirer. On apprend une langue par envie, pas par contrainte.",
    },
    {
      title: "Comment se déroule l'appel découverte ?",
      text: "C'est un entretien d'une trentaine de minutes en visio, gratuit et sans engagement. Nous faisons le point sur votre parcours, vos objectifs et le temps dont vous disposez ; je vous explique concrètement comment fonctionne le programme et je réponds à vos questions. À l'issue de l'appel, vous saurez précisément à quoi ressemble la méthode et si elle vous convient avant de vous décider.",
    },
  ] as Bullet[],
};

export const reservation = {
  id: "reservation",
  eyebrow: "Premier pas",
  heading: "Commençons par une conversation",
  subheading:
    "Avant d'apprendre une langue vivante, on se parle. Réservez un appel découverte gratuit, en visio : nous prenons le temps d'écouter où vous en êtes, ce que vous voulez lire, et comment y parvenir.",
  greek: "Ἀρχὴ ἥμισυ παντός",
  greekGloss: "Commencer, c'est déjà la moitié du chemin.",
  steps: [
    {
      title: "Vous choisissez un créneau",
      text: "Quelques clics suffisent : vous sélectionnez le moment qui vous convient, et nous nous retrouvons en visio pour une trentaine de minutes, sans formalité.",
    },
    {
      title: "Nous faisons le point ensemble",
      text: "Votre niveau réel, vos lectures rêvées, le temps dont vous disposez : je vous écoute et je réponds franchement à vos questions sur la méthode active.",
    },
    {
      title: "Nous traçons votre parcours",
      text: "À l'issue de l'échange, je vous propose le chemin le mieux adapté pour entrer dans la langue. Vous repartez avec une vision claire — et vous décidez ensuite, en toute liberté.",
    },
  ] as Step[],
  ctaPrimary: "Réserver mon appel découverte",
  note: "Gratuit et sans engagement. Cet appel sert d'abord à savoir si la méthode vous convient — pas à vous convaincre.",
  // Réassurance affichée près du formulaire.
  reassurance:
    "Vous commencez par une séance d'essai, sans rien régler : si la méthode ne vous convient pas, vous repartez librement, et il vous reste les premiers mots de grec.",
};

// Sur-titres grecs bilingues (petits « titres » en grec ancien, avec glose).
export const greekTitles = {
  professeur: { greek: "τίς εἰμι;", gloss: "qui suis-je ?" },
  methode: { greek: "πῶς μανθάνομεν;", gloss: "comment apprend-on ?" },
  programme: { greek: "ἡ ὁδός", gloss: "le chemin" },
  resultats: { greek: "οἱ καρποί", gloss: "les fruits" },
  tarif: { greek: "πόσου;", gloss: "à quel prix ?" },
  ressources: { greek: "τὰ ἐφόδια", gloss: "les provisions de route" },
  reservation: { greek: "δεῦρο, ἄρχου", gloss: "viens, commence" },
} as const;

// Section RÉSULTATS : fusion des anciennes « promesses » + « bénéfices ».
export const resultats = {
  id: "resultats",
  eyebrow: "Ce que vous gagnez",
  heading: "Le jour où la langue cesse de résister",
  lead: "Pas de magie ni de raccourci, mais une progression claire qui se mesure à ce que vous savez faire dans la langue. Voici ce qui se transforme, mois après mois, à mesure que le grec devient une langue que vous habitez.",
  greek: "χαλεπὰ τὰ καλά",
  greekGloss: "les belles choses sont exigeantes — elles n'en sont pas moins accessibles.",
  items: [
    {
      title: "Vos premières phrases dès les premières semaines",
      text: "Dès le premier niveau, vous comprenez et formez des phrases simples en grec ancien : saluer, demander, décrire, raconter. Non pas réciter des paradigmes, mais habiter la langue par l'écoute et la parole, jusqu'à ce que les premières structures vous deviennent naturelles.",
    },
    {
      title: "Des bases solides en une année de pratique",
      text: "Au fil d'une année guidée, vous installez l'essentiel de la grammaire et un lexique vivant — non par tableaux à mémoriser mais par usage répété. Le grec devient une langue que vous reconnaissez, comprenez et manipulez avec une aisance grandissante.",
    },
    {
      title: "Lire les auteurs dans le texte",
      text: "Vous ouvrez l'Évangile de Jean, un dialogue de Platon ou un chant d'Homère et vous suivez le fil de la pensée directement, en grec. Le texte vous parle ; vous n'êtes plus penché sur un dictionnaire, vous êtes à l'intérieur de la phrase.",
    },
    {
      title: "Comprendre sans traduire",
      text: "À force d'écouter et de parler, le grec finit par se passer du français. Vous saisissez le sens à mesure que les mots arrivent, dans leur ordre — et c'est cette compréhension immédiate qui rend la lecture fluide et le plaisir possible.",
    },
    {
      title: "Retrouver le plaisir de lire",
      text: "On rend la langue à ce pour quoi elle existe : être lue, entendue, goûtée. Les textes redeviennent ce qu'ils sont — vivants, drôles, bouleversants — et la lecture, un rendez-vous attendu plutôt qu'un exercice.",
    },
    {
      title: "Une maîtrise durable et reconnue",
      text: "Ce qui s'apprend par l'usage ne s'oublie pas comme une leçon récitée : des réflexes durables plutôt que des règles fragiles. Une aisance qui sert partout où le grec compte — CPGE, agrégation, recherche — comme dans la simple culture qui éclaire la philosophie et nos langues modernes.",
    },
  ] as Bullet[],
};

// Logistique scannable (badges). Valeurs à confirmer par Thibault.
export const logistique = [
  { label: "Effectif", value: "6 participants max" },
  { label: "Durée d'une séance", value: "1 h" },
  { label: "Fréquence", value: "1 séance / semaine" },
  { label: "Prochaine session", value: "Septembre 2026" },
  { label: "Places", value: "8 disponibles" },
];

// Échantillon média (input compréhensible) dans la section méthode.
export const media = {
  eyebrow: "Un échantillon, en grec",
  greek: greekTitles.methode.greek,
  greekGloss: greekTitles.methode.gloss,
  heading: "Écoutez l'input compréhensible",
  caption:
    "Une minute de grec parlé, tenu juste au-dessus de votre niveau : des images, des gestes, une voix claire. Vous ne traduisez pas — vous comprenez. C'est exactement ainsi que se déroule une séance.",
  // Laisser vide tant que le média n'est pas prêt (affiche un encart d'attente).
  // Pour activer : URL YouTube/Vimeo (intégration) ou chemin .mp4 dans /public.
  url: "",
  placeholder:
    "L'extrait arrive bientôt. Le principe : on n'explique pas le grec en français, on le rend immédiatement compréhensible en grec. Le sens d'abord ; la règle, ensuite.",
};

// TARIF — discret, en fin de tunnel. Prix réel : 395 € pour 8 semaines.
export const tarif = {
  id: "tarif",
  eyebrow: "Le tarif",
  price: "395 €",
  period: "pour un cycle de 8 semaines",
  includes: [
    "Un cours en direct chaque semaine, en visio et en petit groupe",
    "Les capsules vidéo et les exercices, à votre rythme",
    "Les textes gradués, des premières phrases jusqu'aux auteurs",
    "Le suivi régulier et l'accès à la communauté",
  ],
  note: "Sans engagement au-delà du cycle. Les groupes étant à petit effectif, les places se réservent à l'avance — nous précisons ensemble la formule (grec, latin ou les deux) lors de l'appel découverte.",
};

// PAGE RESSOURCES (documents partageables, surtout pour les enseignants).
export const ressources = {
  metaTitle: "Ressources de grec ancien — Le Grec Vivant",
  metaDescription:
    "Textes gradués, fiches de grammaire en contexte, audio de prononciation et séquences de classe pour enseigner le grec ancien par la méthode active.",
  heroEyebrow: "Ressources partagées",
  greek: "τὰ ἐφόδια",
  greekGloss: "les provisions de route",
  heroHeading: "Des outils pour faire vivre le grec ancien",
  heroIntro:
    "Une bibliothèque de documents conçus pour la méthode active : textes gradués à lire sans dictionnaire, fiches de grammaire en contexte, fichiers audio de prononciation et séquences clés en main. Pensés d'abord pour les enseignants de grec ancien, libres à partager avec vos élèves comme avec vos collègues.",
  categories: [
    {
      title: "Textes gradués à lire en continu",
      description:
        "Des récits écrits pour être lus de bout en bout, sans le détour du dictionnaire — calibrés juste au-dessus du niveau visé.",
      items: [
        { title: "Μῦθοι ῥᾴδιοι — dix fables d'Ésope adaptées", kind: "PDF", note: "Fables reformulées en grec simple, avec illustrations et lexique réduit. Dès les premières semaines." },
        { title: "Les travaux d'Héraclès — récit en six épisodes", kind: "PDF", note: "Un feuilleton mythologique à difficulté croissante, pour une lecture continue sur un trimestre." },
        { title: "Premiers pas chez Xénophon — extraits de l'Anabase", kind: "PDF", note: "Passages authentiques légèrement allégés, marche-pied vers l'auteur véritable." },
      ],
    },
    {
      title: "Fiches de grammaire en contexte",
      description:
        "La règle n'arrive pas avant la lecture mais après : on observe une régularité déjà rencontrée, puis on la nomme.",
      items: [
        { title: "L'aoriste, par l'usage", kind: "PDF", note: "Un court récit où l'aoriste revient sans cesse, puis la mise au jour de la régularité." },
        { title: "Les cas en situation — six tableaux", kind: "PDF", note: "Chaque emploi part d'une phrase concrète tirée des textes gradués, avant toute systématisation." },
        { title: "Le génitif absolu sans peur", kind: "PDF", note: "Reconnaître la construction d'un coup d'œil en lecture. Exemples chez Lucien et Platon." },
      ],
    },
    {
      title: "Audio de prononciation et écoute",
      description:
        "Une langue s'apprend d'abord par l'oreille : entendre le grec dit à voix haute et habituer l'oreille au rythme de la phrase.",
      items: [
        { title: "L'alphabet et les diphtongues", kind: "Audio", note: "Chaque lettre et diphtongue dites lentement puis en mots. Idéal pour les premières séances." },
        { title: "Cent phrases de la vie quotidienne", kind: "Audio", note: "Énoncés brefs dits à débit naturel, avec une pause pour la reprise." },
        { title: "Le prologue de l'Évangile de Jean, lu à voix haute", kind: "Audio", note: "Un texte connu, lu posément, pour entendre le mouvement de la phrase grecque." },
      ],
    },
    {
      title: "Séquences et capsules pour la classe",
      description:
        "Des dispositifs prêts à mener, du déroulé d'une séance menée en grec aux courtes vidéos d'input compréhensible.",
      items: [
        { title: "Première heure de grec — déroulé minute par minute", kind: "PDF", note: "Une séance d'ouverture entièrement menée dans la langue, gestes et images à l'appui." },
        { title: "Capsule vidéo : une journée à Athènes", kind: "Vidéo", note: "Court récit illustré et narré en grec simple, à projeter ou à donner en amont." },
        { title: "Atelier de conversation guidée", kind: "Lien", note: "Cartes-questions et situations pour faire parler la classe en grec, du débutant au lecteur autonome." },
      ],
    },
  ],
  ctaHeading: "Une ressource à partager, une demande particulière ?",
  ctaText:
    "Cette bibliothèque s'enrichit au fil des rencontres entre enseignants. Si vous avez créé un texte gradué, une fiche ou une séquence à partager, ou si vous cherchez un document précis pour votre classe, écrivez à Thibault. Les contributions sont les bienvenues et créditées.",
};
