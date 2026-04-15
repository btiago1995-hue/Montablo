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
  {
    slug: 'prix-menu-digital',
    title: 'Combien coute un menu digital ? Guide des prix 2026',
    description:
      'Tour d\'horizon des solutions de menu digital et de leurs tarifs. Comparatif des prix, des fonctionnalites incluses et du rapport qualite-prix.',
    date: '2026-05-02',
    readTime: '6 min',
    category: 'Guide',
    keywords: ['prix menu digital', 'menu digital cout', 'menu digital restaurant prix', 'tarif menu qr code'],
    content: [
      {
        heading: 'Pourquoi les prix varient autant d\'une solution a l\'autre',
        paragraphs: [
          'Le marche du menu digital est encore jeune, et les modeles de tarification sont tres heterogenes. Certaines solutions sont gratuites, d\'autres coutent plus de 100 euros par mois. Derriere ces ecarts de prix se cachent des differences majeures en termes de fonctionnalites, de qualite de service et de perennite.',
          'Avant de comparer les prix, il est essentiel de comprendre ce que vous achetez reellement. Un outil gratuit et un abonnement professionnel ne repondent pas aux memes besoins. Le prix le plus bas n\'est pas toujours le meilleur choix — et le plus cher n\'est pas forcement le plus adapte a votre restaurant.',
        ],
      },
      {
        heading: 'Les solutions gratuites : seduisantes mais limitees',
        paragraphs: [
          'Plusieurs outils proposent de creer un menu digital gratuitement. C\'est tentant, surtout quand on demarre. Mais ces solutions presentent des limites importantes : publicites affichees sur votre menu, personnalisation quasi inexistante, nombre de plats limite, et surtout aucun support technique en cas de probleme.',
          'Le risque principal est la perennite. Beaucoup de services gratuits ferment ou passent en payant sans preavis. Si votre QR code pointe vers un service qui n\'existe plus, vos clients tombent sur une page d\'erreur en plein service. Pour un usage ponctuel ou un test, le gratuit peut convenir. Pour un usage professionnel au quotidien, c\'est un pari risque.',
          'De plus, un menu avec des publicites pour d\'autres entreprises donne une image peu professionnelle de votre etablissement. Vos clients viennent decouvrir votre carte, pas voir des bannieres pour des applications tierces.',
        ],
      },
      {
        heading: 'Le milieu de gamme : les solutions SaaS entre 15 et 50 euros par mois',
        paragraphs: [
          'C\'est dans cette fourchette que se situe la majorite des solutions professionnelles, dont MonTablo. A ce niveau de prix, vous beneficiez generalement d\'un menu entierement personnalisable, sans publicite, avec un QR code permanent, des mises a jour illimitees et un support client reactif.',
          'Les tarifs varient selon les fonctionnalites incluses : gestion multilingue, photos de plats, menu du jour, allergenes, nombre de categories, etc. Chez MonTablo, l\'abonnement se situe entre 26,99 et 29,99 euros par mois, tout inclus, sans frais caches ni limites sur le nombre de plats ou de modifications. C\'est un tarif previsible qui se rentabilise des le premier mois par rapport au cout d\'impression de cartes papier.',
          'A ce niveau de prix, le rapport qualite-prix est generalement excellent. Vous disposez d\'un outil professionnel, fiable, qui evolue regulierement avec de nouvelles fonctionnalites.',
        ],
      },
      {
        heading: 'Les solutions haut de gamme et enterprise : au-dela de 80 euros par mois',
        paragraphs: [
          'Certaines plateformes ciblent les chaines de restaurants ou les groupes de restauration avec des tarifs superieurs a 80 euros par mois, voire plusieurs centaines d\'euros. Ces solutions incluent generalement la gestion multi-etablissements, des integrations avec les systemes de caisse, des analyses avancees et un accompagnement dedie.',
          'Pour un restaurant independant ou un petit groupe de 2-3 etablissements, ces solutions sont surdimensionnees et trop couteuses. Elles sont concues pour des besoins specifiques de grandes structures avec des equipes dediees a la gestion du digital. Si vous gerez un ou deux restaurants, vous n\'avez pas besoin de ce niveau de complexite.',
        ],
      },
      {
        heading: 'Les couts caches a surveiller',
        paragraphs: [
          'Au-dela du prix affiche, certaines solutions ajoutent des frais supplementaires qui peuvent alourdir la facture. Les plus courants : frais de mise en service (parfois 100 a 300 euros), cout par table ou par QR code genere, facturation au nombre de scans, et supplements pour les fonctionnalites multilingues.',
          'D\'autres plateformes pratiquent un tarif d\'appel bas mais facturent les mises a jour au-dela d\'un certain nombre par mois, ou ajoutent des frais pour l\'ajout de photos. Lisez attentivement les conditions generales et posez la question explicitement avant de vous engager : "Y a-t-il des frais en dehors de l\'abonnement mensuel ?"',
          'Chez MonTablo, la philosophie est simple : un tarif mensuel fixe, tout inclus. Pas de frais de mise en service, pas de limite de modifications, pas de cout par table. Vous savez exactement ce que vous payez chaque mois.',
        ],
      },
      {
        heading: 'Le calcul du retour sur investissement',
        paragraphs: [
          'Pour evaluer si un menu digital est rentable, comparez son cout annuel a vos depenses actuelles en cartes papier. Un restaurant de 25 tables qui reimprime ses cartes 4 fois par an depense entre 400 et 1 200 euros en impression. Ajoutez le temps passe a coordonner avec l\'imprimeur, verifier les epreuves et distribuer les nouvelles cartes : c\'est du temps que vous ou votre equipe pourriez consacrer au service.',
          'Avec un abonnement MonTablo a environ 27 euros par mois, soit 324 euros par an, l\'economie est concrete et immediate. Mais le gain ne se limite pas au financier : la reactivite (modifier un prix en 30 secondes), l\'image professionnelle et la praticite au quotidien sont des avantages difficiles a chiffrer mais bien reels.',
          'En resume, pour la majorite des restaurants, un menu digital milieu de gamme se rentabilise en 2 a 4 mois. C\'est un investissement modeste pour un gain de temps et de qualite significatif.',
        ],
      },
      {
        heading: 'Notre recommandation : privilegiez le rapport qualite-prix',
        paragraphs: [
          'Ne choisissez pas uniquement sur le prix. Un outil gratuit qui vous fait perdre du temps ou qui donne une image degradee de votre restaurant vous coute plus cher qu\'un abonnement professionnel. A l\'inverse, une solution a 150 euros par mois n\'est justifiee que si vous avez des besoins tres specifiques.',
          'Pour un restaurant independant, une brasserie ou un bistrot, la meilleure option se situe dans la fourchette 20-35 euros par mois. Assurez-vous que l\'abonnement inclut toutes les fonctionnalites dont vous avez besoin — mises a jour illimitees, QR code permanent, support client, et absence de publicite — et testez l\'outil avec un essai gratuit avant de vous engager.',
        ],
      },
    ],
  },
  {
    slug: 'menu-bilingue-restaurant',
    title: 'Menu bilingue : comment accueillir les touristes dans votre restaurant',
    description:
      'Guide pratique pour proposer un menu en plusieurs langues. Pourquoi le bilinguisme est essentiel en zone touristique et comment le mettre en place.',
    date: '2026-05-05',
    readTime: '5 min',
    category: 'Guide',
    keywords: ['menu bilingue restaurant', 'menu restaurant anglais', 'carte restaurant touristes', 'menu multilingue'],
    content: [
      {
        heading: 'Le tourisme en France : des chiffres qui parlent',
        paragraphs: [
          'La France reste la premiere destination touristique mondiale avec plus de 100 millions de visiteurs etrangers chaque annee. Paris, la Cote d\'Azur, la Provence, le Val de Loire, l\'Alsace, la Bretagne : les touristes sont partout, et ils ont faim. Pourtant, une grande majorite de restaurants ne propose sa carte qu\'en francais.',
          'Pour un touriste anglophone, germanophone ou hispanophone, dechiffrer une carte en francais est une epreuve. Les noms de plats traditionnels — blanquette de veau, tarte tatin, croque-monsieur — ne se traduisent pas intuitivement. Le resultat : le client commande au hasard, hesite longuement, ou pire, quitte votre restaurant pour un concurrent qui affiche une carte en anglais.',
          'Proposer un menu bilingue ou multilingue n\'est pas un luxe. En zone touristique, c\'est une necessite commerciale qui peut significativement augmenter votre chiffre d\'affaires.',
        ],
      },
      {
        heading: 'Le casse-tete du menu papier multilingue',
        paragraphs: [
          'Avec une carte papier, proposer plusieurs langues est un veritable defi logistique. Premiere option : imprimer des cartes separees pour chaque langue. Cela multiplie les couts d\'impression par deux ou trois, complique la gestion des stocks de cartes, et impose de mettre a jour chaque version a chaque modification du menu.',
          'Deuxieme option : integrer toutes les langues sur une meme carte. Le resultat est souvent une carte surchargee, difficile a lire, avec des textes minuscules. Ni le client francais ni le touriste n\'y trouvent leur compte. C\'est un compromis qui ne satisfait personne.',
          'Dans les deux cas, chaque changement de plat ou de prix doit etre repercute sur toutes les versions linguistiques, ce qui multiplie les risques d\'erreur et les delais de mise a jour.',
        ],
      },
      {
        heading: 'Le menu digital : la solution naturelle au multilinguisme',
        paragraphs: [
          'Le menu digital resout elegamment le probleme du multilinguisme. Le client choisit sa langue directement sur son telephone, et la carte s\'affiche integralement dans la langue selectionnee. Pas de carte surchargee, pas de version separee a gerer, pas de surcout d\'impression.',
          'Quand vous modifiez un plat ou un prix, la modification s\'applique a toutes les langues simultanement. Vous n\'avez qu\'une seule source de verite a maintenir, ce qui elimine les incoherences entre les versions.',
          'Pour le client, l\'experience est fluide : il scanne le QR code, choisit sa langue, et consulte une carte claire et lisible dans sa langue maternelle. C\'est un geste d\'accueil qui fait toute la difference dans la perception de votre etablissement.',
        ],
      },
      {
        heading: 'Quelles langues prioriser selon votre localisation',
        paragraphs: [
          'Le choix des langues depend de votre clientele. En regle generale, l\'anglais est incontournable partout en France : c\'est la langue commune de la majorite des touristes, quelle que soit leur nationalite. Si vous ne devez ajouter qu\'une seule langue, choisissez l\'anglais.',
          'Ensuite, adaptez-vous a votre zone geographique. A Paris, l\'espagnol et le chinois sont tres demandes. Sur la Cote d\'Azur, pensez a l\'italien et au russe. En Alsace et dans l\'Est, l\'allemand est prioritaire. Dans les stations de ski, le neerlandais et les langues scandinaves peuvent etre pertinents. Observez votre clientele sur quelques semaines et identifiez les nationalites les plus frequentes.',
          'Inutile de proposer dix langues : deux ou trois langues bien choisies couvrent generalement plus de 90 % de votre clientele internationale.',
        ],
      },
      {
        heading: 'Les bonnes pratiques pour des traductions de qualite',
        paragraphs: [
          'La qualite de la traduction reflete l\'image de votre restaurant. Evitez absolument les traductions automatiques brutes type Google Translate sans relecture. Des erreurs de traduction sur un menu peuvent provoquer des malentendus, voire des situations embarrassantes — les exemples de traductions absurdes de menus de restaurants sont legion sur internet.',
          'Pour les noms de plats typiquement francais, gardez le nom original et ajoutez une courte description dans la langue cible. Par exemple : "Blanquette de veau — Creamy veal stew with carrots and mushrooms". Le client comprend ce qu\'il commande tout en decouvrant le nom authentique du plat.',
          'Si votre budget le permet, faites relire vos traductions par un natif. Sinon, les outils de traduction modernes combines a une relecture attentive donnent des resultats tout a fait acceptables. L\'essentiel est que le client comprenne clairement ce qu\'il va manger.',
        ],
      },
      {
        heading: 'Conseils pratiques pour les zones touristiques',
        paragraphs: [
          'Si votre restaurant est situe dans une zone a forte frequentation touristique, le menu bilingue n\'est qu\'un element de votre strategie d\'accueil. Pensez egalement a afficher le QR code en vitrine avec une mention visible dans les langues cibles : "Menu available in English", "Carta disponible en espanol", etc. C\'est un signal fort qui attire les touristes hesitants.',
          'Formez vos serveurs a quelques phrases d\'accueil basiques dans les langues principales de votre clientele. Meme un simple "Welcome" ou "Bienvenido" change la premiere impression. Combine avec un menu dans la langue du client, cela cree une experience chaleureuse et professionnelle.',
          'Enfin, pensez a la saisonnalite. Les langues les plus utiles peuvent varier selon la periode : plus d\'anglophones en ete, plus de neerlandais pendant les vacances scolaires des Pays-Bas, etc. Avec un menu digital, ajouter ou retirer une langue se fait en quelques clics, ce qui vous permet de vous adapter en temps reel.',
        ],
      },
    ],
  },
  {
    slug: 'erreurs-menu-digital',
    title: '5 erreurs a eviter quand on passe au menu digital',
    description:
      'Les pieges les plus courants lors de la transition vers un menu digital, et comment les eviter pour reussir votre passage au numerique.',
    date: '2026-05-08',
    readTime: '4 min',
    category: 'Conseils',
    keywords: ['erreurs menu digital', 'menu digital conseils', 'transition menu digital restaurant'],
    content: [
      {
        heading: 'Erreur n°1 : choisir un outil gratuit pour economiser',
        paragraphs: [
          'C\'est l\'erreur la plus frequente. Face a la multitude d\'outils gratuits disponibles en ligne, beaucoup de restaurateurs optent pour la solution qui ne coute rien. Le probleme : ces outils affichent souvent des publicites sur votre menu, offrent une personnalisation minimale, et surtout peuvent disparaitre du jour au lendemain. Imaginez vos clients qui scannent le QR code et tombent sur une page d\'erreur un samedi soir.',
          'La solution : investir dans un outil professionnel avec un abonnement modeste mais fiable. Pour 25 a 30 euros par mois, vous avez un menu sans publicite, un support technique, et la garantie que votre carte sera toujours en ligne. C\'est un investissement derisoire compare au risque d\'une mauvaise experience client.',
        ],
      },
      {
        heading: 'Erreur n°2 : creer le menu et ne plus jamais y toucher',
        paragraphs: [
          'Beaucoup de restaurateurs creent leur menu digital avec enthousiasme, puis l\'oublient completement. Les prix n\'ont pas ete mis a jour depuis six mois, des plats qui ne sont plus a la carte apparaissent encore, et le plat du jour date de la semaine derniere. Un menu obsolete est pire qu\'un menu papier : le client a l\'impression que le restaurant est mal gere.',
          'La solution : integrez la mise a jour du menu digital dans votre routine quotidienne. Chaque matin, verifiez que les plats du jour sont a jour et que les produits en rupture sont retires. Chaque fois que vous changez un prix ou ajoutez un plat, mettez a jour le digital en meme temps que le reste. Cela prend 2 minutes et fait toute la difference.',
        ],
      },
      {
        heading: 'Erreur n°3 : mal placer le QR code',
        paragraphs: [
          'Un QR code colle dans un coin sombre de la table, imprime trop petit, ou place sous un vase de fleurs ne sera jamais scanne. Le placement est crucial : si le client ne voit pas le QR code ou ne peut pas le scanner facilement, il demandera une carte papier ou appellera le serveur, et vous perdez tout le benefice du digital.',
          'La solution : placez le QR code au centre de la table ou a un endroit clairement visible, avec une taille minimum de 3 x 3 cm. Testez le scan dans les conditions reelles de votre restaurant — eclairage tamise inclus. Si vous avez une terrasse, assurez-vous que le support resiste aux intemperies. Un chevalet de table ou un autocollant de qualite sont des investissements de quelques euros qui garantissent une bonne lisibilite.',
        ],
      },
      {
        heading: 'Erreur n°4 : ne pas informer les clients de l\'existence du QR code',
        paragraphs: [
          'Poser un QR code sur la table ne suffit pas. Si vos serveurs ne le mentionnent pas et qu\'il n\'y a aucune indication visuelle claire, beaucoup de clients ne le remarqueront meme pas — ou ne comprendront pas a quoi il sert. C\'est particulierement vrai pour les clients qui ne sont pas familiers avec les QR codes.',
          'La solution : formez votre equipe a accueillir les clients en mentionnant le menu digital. Une phrase simple suffit : "Notre carte est accessible en scannant le QR code sur la table. N\'hesitez pas a me demander si vous preferez une carte papier." Ajoutez aussi un texte d\'accompagnement a cote du QR code : "Scannez pour decouvrir notre carte" est clair et efficace. Vous pouvez aussi afficher un petit panneau a l\'entree.',
        ],
      },
      {
        heading: 'Erreur n°5 : negliger le design et l\'identite visuelle',
        paragraphs: [
          'Votre menu digital est une extension de votre restaurant. Si les couleurs ne correspondent pas a votre identite, si la mise en page est confuse, ou si les descriptions sont bacles, le menu digital donne une image negative de votre etablissement. Certains restaurateurs copient-collent simplement la liste de leurs plats sans aucun effort de presentation.',
          'La solution : prenez le temps de personnaliser votre menu. Choisissez des couleurs coherentes avec votre identite visuelle, redigez des descriptions de plats appetissantes et soignees, et ajoutez des photos pour vos plats phares. Un menu digital bien presente est un veritable outil marketing qui donne envie de commander. C\'est votre vitrine numerique : soignez-la comme vous soignez la devanture de votre restaurant.',
        ],
      },
    ],
  },
  {
    slug: 'menu-du-jour-digital',
    title: 'Le menu du jour digital : gagnez du temps chaque matin',
    description:
      'Comment gerer votre menu du jour avec un outil digital. Fini les ardoises illisibles et les impressions quotidiennes.',
    date: '2026-05-12',
    readTime: '4 min',
    category: 'Guide',
    keywords: ['menu du jour digital', 'menu du jour restaurant', 'ardoise digitale restaurant'],
    content: [
      {
        heading: 'La corvee quotidienne du menu du jour',
        paragraphs: [
          'Chaque matin, c\'est le meme rituel pour des milliers de restaurateurs en France : ecrire le menu du jour sur l\'ardoise, imprimer une feuille a inserer dans la carte, ou preparer un panneau pour la terrasse. Ce geste quotidien, qui parait anodin, prend en realite 20 a 30 minutes chaque jour. Multiplie par 300 jours d\'ouverture, cela represente plus de 100 heures par an consacrees uniquement a la communication du menu du jour.',
          'Sans compter les problemes recurrents : l\'ardoise est illisible pour les clients en terrasse, la craie s\'efface avec la pluie, l\'ecriture manuscrite est parfois difficile a dechiffrer, et les feuilles volantes inserees dans la carte papier donnent un aspect peu soigne. Le menu du jour merite mieux.',
        ],
      },
      {
        heading: 'Comment fonctionne le menu du jour digital',
        paragraphs: [
          'Le principe est simple : depuis votre telephone ou votre ordinateur, vous ajoutez vos plats du jour en quelques clics chaque matin. L\'entree, le plat, le dessert, le prix de la formule — tout se saisit en moins de 5 minutes. Le menu du jour apparait automatiquement sur votre carte digitale, visible par tous les clients qui scannent le QR code.',
          'Le soir, vous retirez les plats du jour en un clic, ou ils peuvent etre configures pour disparaitre automatiquement. Le lendemain matin, vous recommencez avec les nouvelles suggestions du chef. C\'est un geste rapide, propre et efficace qui remplace avantageusement l\'ardoise et les feuilles volantes.',
          'Avec MonTablo, le menu du jour est integre directement a votre carte principale. Le client voit d\'abord les suggestions du jour mises en avant, puis peut parcourir le reste de la carte. C\'est une mise en page naturelle qui reproduit l\'experience de l\'ardoise, mais en mieux.',
        ],
      },
      {
        heading: '5 minutes au lieu de 30 : le gain de temps concret',
        paragraphs: [
          'La difference de temps est spectaculaire. Ecrire une ardoise proprement prend 15 a 20 minutes minimum. Preparer et imprimer une feuille pour la carte papier prend 10 a 15 minutes, sans compter le temps d\'impression et d\'insertion dans chaque carte. Avec un menu digital, la saisie prend 3 a 5 minutes, telephone en main, depuis la cuisine ou le bureau.',
          'Ce gain de temps est particulierement precieux le matin, quand chaque minute compte pour la preparation du service. Les 15 a 25 minutes economisees chaque jour peuvent etre consacrees a ce qui compte vraiment : la cuisine, la mise en place, l\'accueil des premiers clients. Sur une annee, c\'est l\'equivalent de plus de deux semaines de travail recuperees.',
        ],
      },
      {
        heading: 'Une meilleure visibilite pour vos suggestions',
        paragraphs: [
          'L\'ardoise a un defaut majeur : elle n\'est visible que depuis certains emplacements du restaurant. Les clients installes loin de l\'entree ou en salle ne la voient pas toujours. Et les passants qui consultent votre menu en ligne avant de se deplacer n\'ont aucune idee de votre menu du jour.',
          'Le menu du jour digital est visible par tous les clients, ou qu\'ils soient assis, des qu\'ils scannent le QR code. Mieux encore : il est accessible en ligne a toute personne qui consulte votre carte depuis son telephone, meme avant de venir au restaurant. Un client qui hesite entre deux restaurants pour le dejeuner peut consulter votre menu du jour en ligne et se decider en votre faveur.',
          'C\'est un avantage concurrentiel reel que l\'ardoise physique ne peut tout simplement pas offrir.',
        ],
      },
      {
        heading: 'L\'archivage : un bonus inattendu',
        paragraphs: [
          'Avec une ardoise ou des feuilles imprimees, votre menu du jour disparait chaque soir sans laisser de trace. Impossible de retrouver ce que vous avez propose il y a trois semaines, de verifier si un plat a bien marche, ou de reutiliser une formule qui avait ete populaire.',
          'Le menu digital conserve un historique de vos menus du jour. Vous pouvez facilement consulter vos anciennes suggestions, identifier les plats qui reviennent le plus souvent, et meme reutiliser un menu du jour precedent en quelques clics au lieu de tout ressaisir. C\'est un outil de gestion autant qu\'un outil de communication.',
        ],
      },
      {
        heading: 'Integration avec votre carte principale',
        paragraphs: [
          'Le menu du jour digital ne vit pas en vase clos. Il s\'integre naturellement a votre carte principale, ce qui offre une experience coherente au client. En scannant le QR code, le client decouvre d\'abord les suggestions du jour, puis peut explorer l\'ensemble de votre carte. C\'est exactement comme quand un serveur commence par presenter les plats du jour avant de tendre la carte.',
          'Cette integration est aussi un atout pour le service : le client consulte tout depuis son telephone, sans avoir besoin de l\'ardoise et de la carte. Il peut prendre son temps, comparer les prix, lire les descriptions, et faire son choix tranquillement. Vos serveurs passent moins de temps a expliquer le menu du jour table par table et peuvent se concentrer sur la prise de commande et le service.',
          'En combinant carte permanente et menu du jour dans un seul outil, vous simplifiez votre gestion quotidienne tout en offrant une experience client fluide et professionnelle.',
        ],
      },
    ],
  },
  {
    slug: 'importer-menu-ia',
    title: 'Importer votre carte existante grace a l\'IA',
    description:
      'Decouvrez comment l\'import par IA de MonTablo extrait automatiquement vos plats, descriptions et prix a partir d\'une simple photo de votre carte.',
    date: '2026-05-15',
    readTime: '4 min',
    category: 'Fonctionnalite',
    keywords: ['import menu ia', 'numeriser carte restaurant', 'photo menu restaurant ia'],
    content: [
      {
        heading: 'Pourquoi numeriser votre carte manuellement est une perte de temps',
        paragraphs: [
          'Saisir chaque plat un par un, avec sa description et son prix, est la premiere raison pour laquelle beaucoup de restaurateurs repoussent le passage au digital. Quand votre carte comporte 40, 60 ou meme 80 references, la perspective de tout retaper a la main est decourageante.',
          'C\'est exactement pour resoudre ce probleme que MonTablo a developpe l\'import par intelligence artificielle. L\'idee est simple : vous prenez une photo de votre carte existante, et l\'IA se charge d\'extraire toutes les informations pour vous.',
        ],
      },
      {
        heading: 'Comment fonctionne l\'import par IA',
        paragraphs: [
          'Le processus se deroule en trois etapes. Premierement, vous photographiez votre carte papier depuis votre telephone. Deuxiemement, l\'IA analyse l\'image, identifie les noms de plats, les descriptions et les prix, puis les organise par categorie. Troisiemement, vous relisez le resultat, corrigez les eventuelles erreurs et publiez votre menu digital.',
          'L\'ensemble du processus prend generalement entre 2 et 5 minutes, contre plusieurs heures de saisie manuelle. C\'est un gain de temps considerable, surtout si vous avez une carte fournie.',
        ],
      },
      {
        heading: 'La precision de l\'extraction',
        paragraphs: [
          'L\'IA est entrainee pour reconnaitre la structure typique d\'une carte de restaurant : categories, noms de plats, descriptions et prix. Elle gere les differents formats de mise en page, les polices variees et meme les cartes manuscrites lisibles.',
          'Le taux de precision est eleve, mais il n\'est pas parfait a 100 %. C\'est pourquoi MonTablo vous propose toujours une etape de verification avant la publication. Vous pouvez corriger un prix mal lu, ajuster une description tronquee ou reorganiser les categories selon vos preferences.',
        ],
      },
      {
        heading: 'Conseils pour obtenir les meilleurs resultats',
        paragraphs: [
          'Pour maximiser la precision de l\'import, quelques gestes simples font la difference. Posez votre carte a plat sur une surface claire et bien eclairee. Evitez les ombres et les reflets. Assurez-vous que le texte est entierement visible dans le cadre de la photo.',
          'Si votre carte est plastifiee, inclinez legerement l\'appareil pour eviter les reflets. Pour les cartes de plusieurs pages, prenez une photo par page. L\'IA traitera chaque image separement et regroupera les resultats.',
          'Enfin, les cartes imprimees en typographie classique donnent de meilleurs resultats que les cartes en ecriture manuscrite fantaisie. Si votre carte est tres stylisee, vous devrez peut-etre corriger quelques elements apres l\'extraction.',
        ],
      },
      {
        heading: 'Un premier pas vers le digital sans effort',
        paragraphs: [
          'L\'import par IA elimine le principal frein a l\'adoption du menu digital : le temps de mise en place. En quelques minutes, votre carte papier devient un menu digital complet, pret a etre publie et partage via QR code.',
          'C\'est la fonctionnalite ideale pour les restaurateurs qui veulent tester le menu digital sans y consacrer une soiree entiere. Photographiez, verifiez, publiez : votre menu est en ligne.',
        ],
      },
    ],
  },
  {
    slug: 'tendances-restauration-2026',
    title: 'Les tendances de la restauration en 2026',
    description:
      'Technologies, habitudes clients et innovations qui transforment la restauration cette annee. Ce que les restaurateurs doivent savoir.',
    date: '2026-05-19',
    readTime: '6 min',
    category: 'Tendances',
    keywords: ['tendances restauration 2026', 'innovation restaurant', 'technologie restauration'],
    content: [
      {
        heading: 'Le QR code et le menu digital deviennent la norme',
        paragraphs: [
          'Ce qui etait une solution de crise pendant la pandemie s\'est transforme en standard du secteur. En 2026, la majorite des restaurants proposent un QR code sur table. Les clients, toutes generations confondues, ont adopte le reflexe de scanner pour consulter la carte.',
          'Les etablissements qui ne proposent pas de menu digital commencent a paraitre en retard. Ce n\'est plus un gadget technologique, mais un element de base de l\'experience client, au meme titre que le Wi-Fi gratuit il y a quelques annees.',
        ],
      },
      {
        heading: 'La durabilite au coeur des choix',
        paragraphs: [
          'Les consommateurs sont de plus en plus sensibles a l\'impact environnemental de leur alimentation. Les restaurants qui communiquent sur leurs engagements — reduction du gaspillage, emballages compostables, circuit court — gagnent en attractivite.',
          'Cette tendance se reflete aussi dans les menus : les clients veulent savoir d\'ou viennent les produits. Afficher la provenance des ingredients sur un menu digital est un moyen simple et efficace de repondre a cette attente.',
        ],
      },
      {
        heading: 'L\'approvisionnement local comme argument commercial',
        paragraphs: [
          'Le "manger local" n\'est plus un simple slogan. En 2026, c\'est un critere de choix majeur pour les clients. Les restaurants qui travaillent avec des producteurs locaux le mettent en avant sur leur carte, leur site et leurs reseaux sociaux.',
          'Le menu digital facilite cette communication : vous pouvez ajouter des mentions du type "Tomates de la ferme Dupont, a 15 km" directement dans la description de vos plats. C\'est un argument de vente puissant qui renforce la confiance et la fidelite.',
        ],
      },
      {
        heading: 'L\'experience sans contact se generalise',
        paragraphs: [
          'Au-dela du menu, c\'est toute l\'experience restaurant qui evolue vers le sans contact. Paiement par telephone, reservation en ligne, pourboire digital : les interactions physiques entre le client et le personnel se reduisent aux moments essentiels — l\'accueil, le service, le conseil.',
          'Cette evolution ne signifie pas la fin du contact humain. Au contraire, elle libere les serveurs des taches repetitives (distribuer les cartes, expliquer le menu du jour) pour qu\'ils se concentrent sur ce qui fait la difference : la relation client et le conseil personnalise.',
        ],
      },
      {
        heading: 'L\'influence des reseaux sociaux sur les menus',
        paragraphs: [
          'Instagram et TikTok continuent de faconner les attentes des clients. Un plat photogenique se partage, attire de nouveaux clients et genere du bouche-a-oreille gratuit. Les restaurateurs l\'ont compris : le dressage, la vaisselle et la presentation sont penses pour le partage sur les reseaux.',
          'Le menu digital joue un role dans cette dynamique. Des photos appetissantes de vos plats sur votre carte digitale donnent envie avant meme la commande. Et quand le plat arrive conforme a la photo, la satisfaction client — et la probabilite de partage — augmentent.',
        ],
      },
      {
        heading: 'La personnalisation de l\'experience client',
        paragraphs: [
          'Les clients s\'attendent de plus en plus a une experience adaptee a leurs preferences. Filtrer les plats par allergenes, afficher les options vegetariennes en premier, ou proposer des recommandations basees sur les plats populaires : la personnalisation transforme la maniere dont les clients interagissent avec la carte.',
          'Les menus digitaux rendent cette personnalisation possible a moindre cout. Alors qu\'un menu papier est identique pour tous, un menu digital peut s\'adapter au profil du client. C\'est une evolution majeure qui ne fait que commencer et qui redefinira l\'experience de commande dans les annees a venir.',
        ],
      },
    ],
  },
  {
    slug: 'augmenter-panier-moyen-menu-digital',
    title: 'Comment augmenter le panier moyen avec un menu digital',
    description:
      'Strategies concretes pour utiliser votre menu digital comme levier de ventes additionnelles et augmenter le ticket moyen de votre restaurant.',
    date: '2026-05-22',
    readTime: '5 min',
    category: 'Conseils',
    keywords: ['augmenter panier moyen restaurant', 'ventes additionnelles menu digital', 'ticket moyen restaurant'],
    content: [
      {
        heading: 'Le pouvoir des photos sur les ventes',
        paragraphs: [
          'C\'est un fait etabli dans la restauration : un plat accompagne d\'une photo appetissante se vend significativement plus qu\'un plat sans visuel. Les etudes montrent une augmentation des commandes de 25 a 30 % pour les plats illustres.',
          'Le menu digital rend l\'ajout de photos simple et gratuit, contrairement au papier ou chaque image augmente le cout d\'impression. Photographiez vos plats phares, vos desserts gourmands et vos cocktails signatures. Ce sont ces visuels qui declenchent l\'envie et poussent le client a commander un extra.',
        ],
      },
      {
        heading: 'L\'ordre des categories compte',
        paragraphs: [
          'La maniere dont vous organisez votre menu influence directement les choix de vos clients. Placez les categories a forte marge en debut de carte, quand l\'attention du client est maximale. Les entrees et les boissons, souvent les plus rentables, gagnent a etre visibles en premier.',
          'Avec un menu digital, vous pouvez reorganiser vos categories en quelques secondes et tester differents ordonnancements. Placez les desserts juste apres les plats principaux plutot qu\'en fin de carte oubliee. Mettez vos formules et menus en evidence des le debut pour orienter le client vers une commande plus complete.',
        ],
      },
      {
        heading: 'Mettre en avant les plats a forte marge',
        paragraphs: [
          'Tous les plats de votre carte ne generent pas la meme marge. Le menu digital vous permet de mettre subtilement en avant ceux qui sont les plus rentables. Ajoutez une photo, une description plus detaillee, ou un badge "Coup de coeur du chef" pour attirer l\'attention.',
          'Identifiez vos 5 a 10 plats les plus rentables et assurez-vous qu\'ils beneficient du meilleur traitement visuel sur votre carte. C\'est une strategie de merchandising simple mais redoutablement efficace.',
        ],
      },
      {
        heading: 'Les suggestions du jour comme levier de vente',
        paragraphs: [
          'Le plat du jour n\'est pas seulement une tradition : c\'est un outil de vente puissant. Un plat du jour bien presente sur votre menu digital cree un sentiment d\'urgence ("seulement aujourd\'hui") et de rarete qui pousse a la commande.',
          'Proposez un menu du jour complet — entree + plat ou plat + dessert — a un prix attractif. Cette formule augmente mecaniquement le panier moyen par rapport a un client qui n\'aurait commande qu\'un plat unique. Le menu digital permet de mettre cette offre en avant des l\'ouverture de la carte.',
        ],
      },
      {
        heading: 'Ne negligez pas les desserts et les boissons',
        paragraphs: [
          'Les desserts et les boissons sont les parents pauvres de nombreuses cartes : relegues en fin de menu, sans photos, avec des descriptions minimales. C\'est une erreur car ces categories representent souvent les marges les plus elevees.',
          'Sur votre menu digital, donnez aux desserts et boissons un traitement a la hauteur de leur potentiel. Photos gourmandes, descriptions evocatrices, mise en avant des cocktails signatures. Un client qui hesite a prendre un dessert sera bien plus tente s\'il voit une photo appetissante que s\'il lit simplement "Moelleux au chocolat — 9 euros".',
        ],
      },
      {
        heading: 'Les promotions et formules combinees',
        paragraphs: [
          'Les formules du type "Entree + Plat + Dessert a 25 euros" ou "2 cocktails achetes = le 3eme offert" sont des classiques du secteur parce qu\'elles fonctionnent. Le client a l\'impression de faire une bonne affaire, et vous augmentez le ticket moyen.',
          'Le menu digital vous permet de creer des sections dediees a ces promotions, facilement visibles et modifiables. Vous pouvez les activer uniquement le midi, le soir, ou le week-end selon votre strategie. Testez differentes formules et observez lesquelles generent le meilleur panier moyen. Cette flexibilite est impossible avec le papier.',
        ],
      },
    ],
  },
  {
    slug: 'allergenes-menu-digital',
    title: 'Les allergenes sur votre menu digital : le guide legal',
    description:
      'Obligations legales, bonnes pratiques et avantages du menu digital pour la gestion des allergenes dans votre restaurant.',
    date: '2026-05-26',
    readTime: '5 min',
    category: 'Guide',
    keywords: ['allergenes menu restaurant', 'obligation allergenes restaurant', 'menu digital allergenes'],
    content: [
      {
        heading: 'Ce que dit la loi : le reglement INCO',
        paragraphs: [
          'Depuis le 13 decembre 2014, le reglement europeen INCO (n° 1169/2011) impose a tous les etablissements de restauration d\'informer leurs clients sur la presence d\'allergenes dans les plats qu\'ils proposent. Cette obligation s\'applique a tous les restaurants, qu\'ils soient traditionnels, rapides, ou de livraison.',
          'En France, cette obligation est renforcee par le decret n° 2015-447. Concretement, vous devez etre en mesure d\'informer le client sur les allergenes presents dans chaque plat, soit directement sur la carte, soit par un systeme d\'information accessible (affiche, classeur, ou carte complementaire).',
          'Le non-respect de cette obligation peut entrainer des sanctions, allant de l\'avertissement a l\'amende. Mais au-dela de l\'aspect legal, c\'est surtout une question de responsabilite : une reaction allergique grave peut mettre en danger la vie d\'un client.',
        ],
      },
      {
        heading: 'Les 14 allergenes majeurs a connaitre',
        paragraphs: [
          'La reglementation identifie 14 allergenes a declaration obligatoire : gluten, crustaces, oeufs, poissons, arachides, soja, lait, fruits a coque, celeri, moutarde, sesame, sulfites, lupin et mollusques. Chacun doit etre signale des qu\'il est present dans un plat, meme en quantite infime.',
          'La gestion de ces 14 allergenes est un defi au quotidien, surtout quand les recettes changent ou que les fournisseurs modifient leurs produits. Il faut une rigueur constante pour maintenir les informations a jour.',
        ],
      },
      {
        heading: 'Le casse-tete de la carte papier',
        paragraphs: [
          'Sur une carte papier, afficher les allergenes de chaque plat est un exercice d\'equilibre difficile. Ajouter les pictogrammes ou les mentions textuelles alourdit la mise en page, rend la carte plus dense et moins lisible. Beaucoup de restaurants choisissent donc de renvoyer vers un classeur separe "disponible sur demande" — une solution legale mais peu pratique.',
          'Le probleme est que ce classeur est rarement consulte. Les clients n\'osent pas toujours le demander, et les serveurs oublient parfois de le mentionner. Resultat : l\'information existe mais n\'atteint pas le client, ce qui va a l\'encontre de l\'esprit de la loi.',
          'De plus, a chaque modification de recette, il faut mettre a jour a la fois la carte et le classeur d\'allergenes — une double maintenance que peu de restaurants gerent rigoureusement.',
        ],
      },
      {
        heading: 'Comment le menu digital simplifie la gestion des allergenes',
        paragraphs: [
          'Le menu digital offre une solution elegante au probleme des allergenes. Les informations peuvent etre integrees directement dans la fiche de chaque plat, accessibles en un clic sans surcharger la vue principale du menu.',
          'Le client peut consulter les allergenes de chaque plat individuellement, ou filtrer l\'ensemble de la carte pour masquer les plats contenant un allergene specifique. Un client intolerant au gluten, par exemple, peut afficher uniquement les plats sans gluten en une seconde.',
          'Cote restaurateur, la mise a jour est centralisee. Quand vous modifiez la composition d\'un plat, vous mettez a jour les allergenes au meme endroit. Pas de classeur separe a maintenir, pas de decalage entre la carte et les informations allergenes.',
        ],
      },
      {
        heading: 'Bonnes pratiques pour l\'affichage des allergenes',
        paragraphs: [
          'Meme avec un menu digital, certaines bonnes pratiques s\'imposent. Utilisez les pictogrammes officiels des 14 allergenes pour une identification visuelle rapide. Ajoutez une mention en bas de votre menu invitant les clients a signaler toute allergie au personnel.',
          'Formez vos equipes pour qu\'elles sachent repondre aux questions sur les allergenes, meme si l\'information est disponible sur le menu digital. Tous les clients ne consulteront pas les details en ligne, et certains prefereront poser la question au serveur.',
          'Enfin, revoyez regulierement vos fiches allergenes, en particulier lorsque vous changez de fournisseur ou modifiez une recette. La rigueur dans la mise a jour est ce qui garantit la securite de vos clients et votre conformite legale.',
        ],
      },
      {
        heading: 'Un avantage concurrentiel et un gage de confiance',
        paragraphs: [
          'Bien gerer les allergenes sur votre menu digital n\'est pas seulement une obligation legale : c\'est un avantage concurrentiel. Les personnes allergiques ou intolerantes choisissent en priorite les restaurants ou elles se sentent en securite. Un menu digital clair et complet sur les allergenes vous positionne comme un etablissement serieux et attentif.',
          'Le bouche-a-oreille dans les communautes de personnes allergiques est puissant. Un restaurant bien note pour sa gestion des allergenes attire une clientele fidele et reconnaissante, qui n\'hesite pas a recommander l\'etablissement a son entourage. C\'est un cercle vertueux qui commence par une information claire et accessible sur votre menu.',
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
