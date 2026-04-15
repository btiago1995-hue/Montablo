export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  keywords: string[]
  content: BlogSection[]
}

export interface BlogSection {
  heading: string
  paragraphs: string[]
}

const posts: BlogPost[] = [
  {
    slug: 'creer-menu-digital-restaurant',
    title: 'Comment creer un menu digital pour votre restaurant en 5 minutes',
    description:
      'Guide pratique pour creer votre premier menu digital. De l\'inscription a la generation du QR code, tout ce qu\'il faut savoir pour digitaliser votre carte.',
    date: '2026-04-21',
    readTime: '5 min',
    category: 'Guide',
    keywords: ['creer menu digital', 'menu digital restaurant', 'comment creer menu qr code'],
    content: [
      {
        heading: 'Pourquoi passer au menu digital ?',
        paragraphs: [
          'Le menu digital n\'est plus une tendance passagere. C\'est devenu un standard dans la restauration moderne. Vos clients s\'attendent a pouvoir scanner un QR code et consulter votre carte sur leur telephone.',
          'Au-dela du confort client, le menu digital vous fait gagner du temps et de l\'argent : plus de reimpressions a chaque changement de prix, plus de cartes abimees a remplacer, et une mise a jour instantanee de vos plats.',
        ],
      },
      {
        heading: 'Etape 1 : Creez votre compte',
        paragraphs: [
          'L\'inscription sur MonTablo prend moins de 30 secondes. Vous n\'avez besoin que d\'une adresse email et du nom de votre restaurant. Aucune carte bancaire n\'est requise pour l\'essai gratuit de 14 jours.',
        ],
      },
      {
        heading: 'Etape 2 : Ajoutez vos plats',
        paragraphs: [
          'Depuis votre tableau de bord, ajoutez vos categories (entrees, plats, desserts, boissons...) puis vos plats avec leur nom, description et prix. Vous pouvez aussi ajouter des photos pour les plats phares.',
          'Astuce : si vous avez deja une carte papier, utilisez notre fonctionnalite d\'import par IA. Photographiez simplement votre carte, et l\'IA extrait automatiquement tous vos plats.',
        ],
      },
      {
        heading: 'Etape 3 : Personnalisez votre menu',
        paragraphs: [
          'Choisissez la couleur primaire de votre menu pour qu\'elle corresponde a l\'identite visuelle de votre restaurant. Le design est automatiquement soigne et professionnel.',
        ],
      },
      {
        heading: 'Etape 4 : Generez et imprimez votre QR code',
        paragraphs: [
          'Votre QR code est genere automatiquement. Telechargez-le en haute resolution, puis imprimez-le. Vous pouvez le placer sur vos tables, a l\'entree, ou sur vos supports marketing.',
          'Et voila ! Votre menu digital est pret. Vos clients n\'ont plus qu\'a scanner pour decouvrir votre carte.',
        ],
      },
    ],
  },
  {
    slug: 'menu-papier-vs-menu-digital',
    title: 'Menu papier vs menu digital : le comparatif complet',
    description:
      'Cout, praticite, hygiene, mise a jour... Comparaison detaillee entre la carte papier traditionnelle et le menu digital pour votre restaurant.',
    date: '2026-04-23',
    readTime: '6 min',
    category: 'Comparatif',
    keywords: ['menu papier vs digital', 'menu digital avantages', 'remplacer carte papier restaurant'],
    content: [
      {
        heading: 'Le cout : impression repetee vs abonnement fixe',
        paragraphs: [
          'Une carte papier de qualite coute entre 3 et 8 euros l\'unite a l\'impression, selon le format et le type de papier. Pour un restaurant de 30 tables, cela represente un investissement initial de 90 a 240 euros. Et ce n\'est que le debut : chaque modification de prix, chaque nouveau plat, chaque changement de saison impose une nouvelle impression.',
          'En moyenne, un restaurateur reimprime ses cartes 4 a 6 fois par an. Sur une annee, le budget impression peut facilement atteindre 500 a 1 500 euros, sans compter le temps passe a coordonner avec l\'imprimeur, verifier les epreuves et distribuer les nouvelles cartes.',
          'Un menu digital comme MonTablo fonctionne sur abonnement mensuel fixe, generalement bien inferieur au cout annuel d\'impression. Les modifications sont illimitees et instantanees, ce qui elimine completement les frais recurrents d\'imprimerie.',
        ],
      },
      {
        heading: 'La rapidite de mise a jour',
        paragraphs: [
          'Avec une carte papier, modifier un seul prix prend en moyenne 3 a 5 jours : il faut contacter l\'imprimeur, valider le fichier, attendre l\'impression et la livraison. Pendant ce temps, soit vous vendez a l\'ancien prix, soit vous raturez la carte au stylo — ce qui donne une image peu professionnelle.',
          'Le menu digital permet une mise a jour en quelques secondes depuis un telephone ou un ordinateur. Vous pouvez changer un prix, ajouter un plat du jour ou retirer un produit en rupture de stock immediatement. Vos clients voient toujours la version la plus recente de votre carte.',
          'Cette reactivite est particulierement precieuse pour les restaurants qui proposent des plats du jour, des suggestions du chef, ou qui ajustent leurs prix en fonction du cout des matieres premieres.',
        ],
      },
      {
        heading: 'L\'hygiene : un enjeu post-pandemie',
        paragraphs: [
          'Depuis la crise sanitaire, les clients sont devenus plus attentifs a l\'hygiene dans les restaurants. Une carte papier passe de main en main, accumule les bacteries et les taches. Meme les cartes plastifiees, plus faciles a nettoyer, necessitent un entretien regulier que peu d\'etablissements respectent scrupuleusement.',
          'Le menu digital supprime ce point de contact. Chaque client consulte la carte sur son propre telephone, un appareil qu\'il manipule deja en permanence. Il n\'y a aucun objet partage entre les tables, ce qui rassure les clients soucieux de l\'hygiene.',
          'Certains restaurateurs ont egalement constate que les clients apprecient le cote moderne et respectueux de cette approche, ce qui contribue positivement a l\'image de l\'etablissement.',
        ],
      },
      {
        heading: 'L\'experience client',
        paragraphs: [
          'La carte papier a un charme indeniable : le toucher du papier, la mise en page soignee, la typographie choisie. Pour certains restaurants gastronomiques, la carte fait partie integrante de l\'experience. C\'est un argument qu\'il ne faut pas negliger.',
          'Cela dit, le menu digital offre des avantages que le papier ne peut pas egaler. Les photos de plats, les descriptions detaillees, la traduction automatique pour les touristes etrangers, et la possibilite de filtrer par allergenes sont autant de fonctionnalites qui enrichissent l\'experience de commande.',
          'Le choix ideal depend donc du positionnement de votre restaurant. Un bistrot, une brasserie ou un restaurant de quartier gagnera enormement en praticite avec un menu digital. Un etablissement etoile pourra combiner les deux : une carte physique pour l\'experience et un QR code pour les informations complementaires.',
        ],
      },
      {
        heading: 'L\'impact environnemental',
        paragraphs: [
          'L\'argument ecologique penche clairement en faveur du digital. Chaque reimpression de cartes consomme du papier, de l\'encre et genere du transport. Multiplie par le nombre de restaurants en France, l\'impact est significatif.',
          'Un menu digital ne consomme que quelques kilooctets de donnees a chaque consultation. L\'empreinte carbone est negligeable comparee a celle du cycle impression-livraison-remplacement des cartes papier. Pour les restaurateurs engages dans une demarche eco-responsable, c\'est un argument coherent avec leurs valeurs.',
        ],
      },
      {
        heading: 'La gestion multilingue',
        paragraphs: [
          'Si votre restaurant accueille une clientele internationale, la carte papier devient un casse-tete. Imprimer des cartes en deux ou trois langues multiplie les couts et l\'encombrement sur la table. Sans parler de la maintenance : chaque modification doit etre reportee sur toutes les versions.',
          'Le menu digital permet d\'afficher la carte dans plusieurs langues sans effort supplementaire. Le client choisit sa langue directement sur son telephone. C\'est un avantage decisif dans les zones touristiques ou les grandes villes.',
        ],
      },
      {
        heading: 'Notre verdict : le digital s\'impose pour la majorite des restaurants',
        paragraphs: [
          'Au terme de ce comparatif, le menu digital l\'emporte sur la quasi-totalite des criteres objectifs : cout, praticite, hygiene, rapidite de mise a jour, impact environnemental et gestion multilingue. Le seul avantage du papier reste l\'aspect sensoriel et traditionnel, qui a sa place dans certains etablissements haut de gamme.',
          'Pour la grande majorite des restaurants — brasseries, bistrots, pizzerias, restaurants de quartier, snacks — le passage au digital est une decision logique qui se rentabilise en quelques semaines. La simplicite de mise en place avec des solutions comme MonTablo rend la transition accessible meme aux restaurateurs les moins a l\'aise avec la technologie.',
          'Si vous hesitez encore, commencez par un essai gratuit. Vous pourrez juger par vous-meme de la difference au quotidien, sans engagement.',
        ],
      },
    ],
  },
  {
    slug: 'raisons-adopter-menu-digital',
    title: '7 raisons d\'adopter un menu digital dans votre restaurant',
    description:
      'Decouvrez pourquoi de plus en plus de restaurateurs passent au menu digital : economies, rapidite, experience client et bien plus.',
    date: '2026-04-25',
    readTime: '5 min',
    category: 'Guide',
    keywords: ['avantages menu digital', 'pourquoi menu digital restaurant', 'raisons menu digital'],
    content: [
      {
        heading: '1. Des economies reelles et mesurables',
        paragraphs: [
          'Le poste "impression de cartes" est souvent sous-estime dans le budget d\'un restaurant. Entre les reimpressions saisonnieres, les changements de prix lies a l\'inflation et les cartes abimees a remplacer, la facture grimpe vite. Un restaurant moyen depense entre 500 et 1 500 euros par an uniquement pour ses cartes papier.',
          'Avec un menu digital, ce cout est remplace par un abonnement mensuel fixe et previsible. Chez MonTablo par exemple, l\'abonnement revient a une fraction du cout annuel d\'impression. Et surtout, les modifications sont illimitees : vous pouvez ajuster votre carte autant de fois que necessaire sans depenser un centime de plus.',
        ],
      },
      {
        heading: '2. Des mises a jour instantanees',
        paragraphs: [
          'Votre fournisseur vous livre un produit exceptionnel ce matin ? Vous pouvez l\'ajouter a votre carte en deux minutes, avant meme le service de midi. Un plat est en rupture ? Retirez-le en un clic pour eviter de decevoir vos clients.',
          'Cette reactivite est impossible avec le papier. Fini les cartes raturees au stylo, les post-it colles a la hate ou les serveurs qui doivent annoncer oralement les changements. Votre carte est toujours a jour, propre et professionnelle.',
        ],
      },
      {
        heading: '3. Une hygiene irreprochable',
        paragraphs: [
          'Les cartes papier sont des nids a bacteries. Elles passent de main en main, sont posees sur des tables, manipulees par des clients qui viennent de toucher poignees de porte et monnaie. Meme en les nettoyant regulierement, elles restent un point de contact partage peu hygienique.',
          'Le menu digital elimine ce probleme. Chaque client consulte la carte sur son propre telephone. C\'est plus propre, plus rassurant, et cela envoie un signal positif sur le serieux de votre etablissement en matiere d\'hygiene.',
        ],
      },
      {
        heading: '4. Un menu bilingue sans effort',
        paragraphs: [
          'Si vous etes situe dans une zone touristique ou une grande ville, vous accueillez regulierement des clients etrangers. Leur proposer la carte dans leur langue ameliore considerablement leur experience et facilite la commande pour vos serveurs.',
          'Avec un menu digital, gerer plusieurs langues est simple : le client choisit sa langue depuis son telephone. Pas besoin d\'imprimer des cartes separees, pas de risque de donner la mauvaise version. C\'est un avantage competitif reel que beaucoup de restaurants negligent encore.',
        ],
      },
      {
        heading: '5. Le plat du jour en un clic',
        paragraphs: [
          'La gestion du plat du jour est l\'un des cas d\'usage les plus apprecies du menu digital. Chaque matin, ajoutez votre suggestion en quelques secondes depuis votre telephone. Le soir, retirez-la aussi facilement.',
          'Plus besoin d\'ardoise a craie (souvent illisible), de feuilles volantes inserees dans la carte, ou de dependance au serveur pour l\'annonce orale. Le plat du jour apparait directement sur le menu digital, avec sa description et son prix, visible par tous les clients des qu\'ils scannent le QR code.',
        ],
      },
      {
        heading: '6. Mettez en avant vos promotions',
        paragraphs: [
          'Happy hour, menu du midi, formule du week-end, offre speciale Saint-Valentin : les promotions sont un levier important pour attirer et fideliser la clientele. Mais les communiquer efficacement sur une carte papier est complique.',
          'Le menu digital permet de creer des sections dediees aux promotions, visibles immediatement par le client. Vous pouvez les activer et les desactiver selon les jours et les heures, sans rien reimprimer. C\'est un outil marketing integre directement dans votre carte.',
        ],
      },
      {
        heading: '7. Une image moderne et professionnelle',
        paragraphs: [
          'La premiere impression compte enormement en restauration. Une carte papier abimee, avec des prix barres ou des fautes d\'orthographe, donne immediatement une image negative. A l\'inverse, un menu digital soigne, avec de belles photos et une mise en page propre, renforce la perception de qualite de votre etablissement.',
          'Les jeunes generations, en particulier, s\'attendent a trouver un QR code sur la table. Ne pas en proposer peut paraitre demode. Adopter le menu digital, c\'est montrer que votre restaurant evolue avec son temps, tout en conservant son identite et son authenticite.',
        ],
      },
    ],
  },
  {
    slug: 'qr-code-restaurant-guide',
    title: 'Comment utiliser un QR code dans votre restaurant : guide complet',
    description:
      'Tout ce que vous devez savoir sur le QR code en restauration : creation, placement, design et bonnes pratiques pour une adoption reussie.',
    date: '2026-04-28',
    readTime: '7 min',
    category: 'Guide',
    keywords: ['qr code restaurant', 'qr code menu restaurant', 'comment utiliser qr code restaurant'],
    content: [
      {
        heading: 'Qu\'est-ce qu\'un QR code et comment ca marche ?',
        paragraphs: [
          'Un QR code (Quick Response code) est un code-barres en deux dimensions que n\'importe quel smartphone peut scanner avec son appareil photo. Une fois scanne, il redirige automatiquement vers une page web — dans notre cas, votre menu digital.',
          'Contrairement aux codes-barres classiques, le QR code peut stocker beaucoup plus d\'informations et se lit instantanement. Tous les smartphones modernes, qu\'ils soient sous iOS ou Android, integrent un lecteur de QR code directement dans l\'application appareil photo. Aucune application supplementaire n\'est necessaire.',
          'Pour un restaurant, le QR code sert de pont entre le monde physique (la table, le comptoir) et le monde numerique (votre menu en ligne). Le client scanne, le menu s\'affiche : c\'est aussi simple que ca.',
        ],
      },
      {
        heading: 'Comment creer un QR code pour votre menu',
        paragraphs: [
          'La methode la plus fiable est de passer par une plateforme de menu digital comme MonTablo, qui genere automatiquement un QR code lie a votre carte. L\'avantage : le QR code pointe vers une URL fixe, et vous pouvez modifier votre menu autant de fois que vous voulez sans jamais avoir a reimprimer le QR code.',
          'Evitez les generateurs de QR code gratuits en ligne pour un usage professionnel. Beaucoup inserent des redirections publicitaires, ont des limites de scan, ou cessent de fonctionner apres quelques mois. Pour un restaurant, un QR code qui ne marche plus est une catastrophe en plein service.',
          'Assurez-vous egalement que votre QR code redirige vers une page optimisee pour le mobile. Votre menu doit se charger rapidement (moins de 2 secondes) et etre lisible sans zoomer. C\'est la base d\'une bonne experience client.',
        ],
      },
      {
        heading: 'Ou placer vos QR codes dans le restaurant',
        paragraphs: [
          'L\'emplacement le plus evident est sur chaque table. Vous pouvez utiliser des chevalets en acrylique, des autocollants directement sur la table, ou des sous-verres imprimes. L\'important est que le QR code soit visible sans que le client ait a le chercher. Placez-le de preference au centre de la table ou pres du bord cote client.',
          'Au-dela des tables, pensez a placer un QR code a l\'entree de votre restaurant et en vitrine. Les passants curieux pourront consulter votre carte avant meme d\'entrer. C\'est un outil d\'acquisition client souvent sous-estime. Un QR code en vitrine avec la mention "Decouvrez notre carte" peut transformer un passant hesitant en client.',
          'Enfin, integrez votre QR code sur vos supports marketing : flyers, cartes de visite, sacs de livraison, reseaux sociaux. Chaque point de contact est une opportunite de diriger quelqu\'un vers votre menu.',
        ],
      },
      {
        heading: 'Le design de votre QR code et de son support',
        paragraphs: [
          'Un QR code n\'a pas besoin d\'etre un carre noir et blanc sans ame. Vous pouvez le personnaliser avec les couleurs de votre restaurant, y ajouter votre logo au centre, et l\'integrer dans un design de support attractif. Attention toutefois a maintenir un contraste suffisant pour que le scan fonctionne : evitez les couleurs trop claires.',
          'La taille compte aussi. Un QR code trop petit sera difficile a scanner, surtout dans un eclairage tamise. Prevoyez au minimum 3 x 3 cm pour un usage sur table, et 5 x 5 cm pour un affichage en vitrine. Testez systematiquement le scan avec differents telephones avant de valider l\'impression.',
          'Le support doit etre adapte a votre environnement. En terrasse, privilegiez des materiaux resistants aux intemperies. En interieur, un chevalet elegant ou un autocollant discret peuvent s\'integrer harmonieusement a votre decoration.',
        ],
      },
      {
        heading: 'Les erreurs courantes a eviter',
        paragraphs: [
          'La premiere erreur est de generer un QR code qui pointe vers un PDF ou une image de votre carte. Le client doit telecharger le fichier, zoomer, faire defiler... L\'experience est desastreuse. Le QR code doit pointer vers une page web responsive, optimisee pour le mobile.',
          'La deuxieme erreur est de ne pas tester le QR code en conditions reelles. Scannez-le dans l\'eclairage de votre restaurant, a la distance a laquelle le client sera assis. Un QR code qui marche parfaitement en plein jour peut devenir illisible dans une ambiance tamisee.',
          'Enfin, ne negligez pas la signalisation. Un QR code seul sur une table, sans aucune indication, sera ignore par beaucoup de clients. Ajoutez une courte phrase d\'accompagnement : "Scannez pour voir notre carte" ou "Notre menu est ici". C\'est un detail simple qui fait toute la difference.',
        ],
      },
      {
        heading: 'Comment encourager vos clients a scanner',
        paragraphs: [
          'Meme si le QR code est devenu courant, certains clients — notamment les plus ages — peuvent etre reticents. La cle est d\'accompagner la transition en douceur. Formez vos serveurs a proposer le scan naturellement : "Notre carte est accessible en scannant le QR code sur la table. Souhaitez-vous que je vous montre ?"',
          'Gardez quelques cartes papier en reserve pour les clients qui le demandent. L\'objectif n\'est pas d\'imposer le digital, mais de le rendre si pratique que la majorite des clients l\'adopte spontanement. En general, apres 2 a 3 semaines, plus de 80 % des clients utilisent le QR code sans meme y penser.',
          'Vous pouvez aussi ajouter un petit incitatif : "Scannez notre QR code et decouvrez notre plat du jour" ou "Menu et suggestions du chef disponibles en un scan". Donnez au client une raison supplementaire de sortir son telephone.',
        ],
      },
      {
        heading: 'QR code et referencement local : un bonus inattendu',
        paragraphs: [
          'Un avantage souvent meconnu du QR code lie a un menu digital est son impact sur votre presence en ligne. Chaque scan genere du trafic vers votre site, ce qui envoie des signaux positifs aux moteurs de recherche. Plus votre page menu est consultee, mieux elle se positionne dans les resultats locaux.',
          'Vous pouvez aussi integrer le lien de votre menu digital dans votre fiche Google Business. Les clients qui cherchent votre restaurant sur Google pourront consulter votre carte avant meme de se deplacer, ce qui augmente vos chances de les convertir en visiteurs reels.',
          'C\'est un cercle vertueux : le QR code physique genere du trafic en ligne, qui ameliore votre visibilite sur Google, qui attire de nouveaux clients dans votre restaurant. Un investissement minimal pour un retour potentiellement significatif.',
        ],
      },
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug)
}
