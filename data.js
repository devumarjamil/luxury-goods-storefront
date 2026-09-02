/* ==========================================================================
   UMAR — data.js
   Catalog, categories, reviews, testimonials, demo orders
   ========================================================================== */

export const BRAND = {
  name: 'UMAR',
  tagline: 'Maison of Modern Luxury',
  founded: 2014,
  currency: 'USD',
  symbol: '$',
  email: 'umarjamil.nwl.pk@gmail.com',
  phone: '03257800500',
};

export const CATEGORIES = [
  {
    id: 'timepieces',
    name: 'Timepieces',
    img: 'img/cat-timepieces.webp',
    desc: 'Swiss-made mechanical movements finished by hand in our Geneva atelier.',
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    img: 'img/cat-fragrance.webp',
    desc: 'Grasse-composed extraits built on rare oud, amber and white musk.',
  },
  {
    id: 'leather',
    name: 'Leather Goods',
    img: 'img/cat-leather.webp',
    desc: 'Full-grain calfskin, saddle-stitched and edge-painted in Florence.',
  },
  {
    id: 'eyewear',
    name: 'Eyewear',
    img: 'img/cat-eyewear.webp',
    desc: 'Japanese titanium and Mazzucchelli acetate with polarised lenses.',
  },
  {
    id: 'jewelry',
    name: 'Fine Jewelry',
    img: 'img/cat-jewelry.webp',
    desc: '18k solid gold, black onyx and conflict-free brilliant-cut stones.',
  },
  {
    id: 'home',
    name: 'Home & Objects',
    img: 'img/cat-home.webp',
    desc: 'Crystal, cashmere and marble objects for the considered interior.',
  },
];

const P = (o) => ({
  currency: 'USD',
  images: [o.img, `img/cat-${o.cat}.webp`, 'img/packaging.webp'],
  ...o,
});

export const PRODUCTS = [
  /* ---------------- Timepieces ---------------- */
  P({
    id: 'p01',
    name: 'Meridian Chronograph 41',
    cat: 'timepieces',
    price: 4850,
    was: 5600,
    img: 'img/p01.webp',
    rating: 4.8,
    reviews: 214,
    stock: 7,
    new: true,
    blurb: 'A tri-compax chronograph with sunburst charcoal dial and gold-plated indices.',
    desc:
      'The Meridian Chronograph 41 distils fifty years of racing-instrument design into a 41 mm case that wears far slimmer than its specification suggests. The sunburst charcoal dial is galvanically finished in six passes, then fitted with applied gold-plated indices and a hand-lacquered tachymeter. Inside, a column-wheel chronograph movement is regulated across five positions before it leaves Geneva.',
    specs: {
      Movement: 'UM-704 automatic column-wheel chronograph, 68 h reserve',
      Case: '41 mm surgical-grade 316L steel, sapphire crystal both sides',
      Dial: 'Sunburst charcoal with applied gold-plated indices',
      Strap: 'Full-grain alligator, gold-tone deployant clasp',
      'Water resistance': '100 m / 10 ATM',
      Warranty: '5-year international',
    },
  }),
  P({
    id: 'p02',
    name: 'Solstice Automatic Gold',
    cat: 'timepieces',
    price: 7200,
    img: 'img/p02.webp',
    rating: 4.9,
    reviews: 138,
    stock: 4,
    blurb: 'Solid 18k case, guilloché dial, micro-rotor movement only 3.9 mm thick.',
    desc:
      'Solstice is our dress watch in its purest expression: a solid 18k yellow-gold case, a hand-guilloché dial turned on a century-old rose engine, and a micro-rotor calibre that keeps overall thickness to 8.2 mm. It is designed to disappear under a cuff and reappear as a quiet statement.',
    specs: {
      Movement: 'UM-512 micro-rotor automatic, 3.9 mm, 72 h reserve',
      Case: '39 mm solid 18k yellow gold',
      Dial: 'Hand-guilloché champagne, applied gold numerals',
      Strap: 'Hand-stitched black alligator',
      'Water resistance': '50 m / 5 ATM',
      Warranty: '5-year international',
    },
  }),
  P({
    id: 'p03',
    name: 'Onyx Diver 300M',
    cat: 'timepieces',
    price: 3980,
    was: 4400,
    img: 'img/p03.webp',
    rating: 4.7,
    reviews: 309,
    stock: 12,
    blurb: 'DLC-coated professional diver with ceramic bezel and lumed depth scale.',
    desc:
      'Built to ISO 6425 and pressure-tested individually, the Onyx Diver 300M pairs a black DLC-coated case with a matte ceramic bezel insert. The bracelet carries a ratcheting extension so it adapts over a wetsuit in a single motion.',
    specs: {
      Movement: 'UM-330 automatic, 60 h reserve, COSC-grade regulation',
      Case: '42 mm DLC-coated steel, ceramic bezel insert',
      Dial: 'Matte black, Grade-A luminous markers',
      Bracelet: 'DLC steel with ratcheting dive extension',
      'Water resistance': '300 m / 30 ATM',
      Warranty: '5-year international',
    },
  }),
  P({
    id: 'p04',
    name: 'Aurum Skeleton Tourbillon',
    cat: 'timepieces',
    price: 18500,
    img: 'img/p04.webp',
    rating: 5,
    reviews: 41,
    stock: 2,
    limited: true,
    blurb: 'Flying tourbillon, openworked bridges, 78 hours of hand-finishing.',
    desc:
      'Limited to 50 pieces annually, the Aurum Skeleton Tourbillon exposes its flying tourbillon through openworked bridges that are chamfered, black-polished and hand-engraved. Each movement represents approximately 78 hours of finishing by a single watchmaker, whose initials are engraved on the barrel bridge.',
    specs: {
      Movement: 'UM-901 hand-wound flying tourbillon, 100 h reserve',
      Case: '41.5 mm 18k rose gold, sapphire caseback',
      Dial: 'Openworked, black-polished gold bridges',
      Edition: 'Limited to 50 pieces per year',
      'Water resistance': '30 m / 3 ATM',
      Warranty: '8-year international',
    },
  }),

  /* ---------------- Fragrance ---------------- */
  P({
    id: 'p05',
    name: 'Noir Absolu Eau de Parfum',
    cat: 'fragrance',
    price: 320,
    img: 'img/p05.webp',
    rating: 4.8,
    reviews: 862,
    stock: 34,
    bestseller: true,
    blurb: 'Black pepper, incense and leather over a vetiver-amber base. 100 ml.',
    desc:
      'Noir Absolu opens with cracked black pepper and Somalian incense, settles into a smoked-leather heart, and closes on Haitian vetiver and grey amber. Composed in Grasse at 22% extrait concentration, it projects for roughly ten hours and leaves a distinctly warm sillage.',
    specs: {
      Concentration: 'Eau de Parfum, 22% extrait',
      Volume: '100 ml',
      'Top notes': 'Cracked black pepper, bergamot, pink peppercorn',
      'Heart notes': 'Somalian incense, smoked leather, orris',
      'Base notes': 'Haitian vetiver, grey amber, white musk',
      Origin: 'Composed and bottled in Grasse, France',
    },
  }),
  P({
    id: 'p06',
    name: 'Oud Royale Intense',
    cat: 'fragrance',
    price: 480,
    was: 540,
    img: 'img/p06.webp',
    rating: 4.9,
    reviews: 418,
    stock: 18,
    blurb: 'Laotian oud, Turkish rose and saffron. Our most concentrated extrait. 75 ml.',
    desc:
      'Oud Royale Intense is built around a single lot of aged Laotian oud, softened by Turkish rose absolute and lifted with saffron. At 30% concentration it is intentionally uncompromising — two sprays are the intended dose.',
    specs: {
      Concentration: 'Extrait de Parfum, 30%',
      Volume: '75 ml',
      'Top notes': 'Saffron, davana, bergamot',
      'Heart notes': 'Turkish rose absolute, Laotian oud',
      'Base notes': 'Sandalwood, tonka, labdanum',
      Origin: 'Composed and bottled in Grasse, France',
    },
  }),
  P({
    id: 'p07',
    name: 'Ivory Musk Eau de Parfum',
    cat: 'fragrance',
    price: 260,
    img: 'img/p07.webp',
    rating: 4.6,
    reviews: 527,
    stock: 41,
    blurb: 'A skin-close white musk with iris, ambrette and warm cashmeran. 100 ml.',
    desc:
      'Ivory Musk is the quietest fragrance we make — a translucent veil of white musk, powdered iris and ambrette seed over cashmeran. It reads as clean rather than sweet and layers beautifully beneath Noir Absolu.',
    specs: {
      Concentration: 'Eau de Parfum, 18%',
      Volume: '100 ml',
      'Top notes': 'Ambrette seed, pear, neroli',
      'Heart notes': 'Powdered iris, jasmine petals',
      'Base notes': 'White musk, cashmeran, blond woods',
      Origin: 'Composed and bottled in Grasse, France',
    },
  }),
  P({
    id: 'p08',
    name: 'Amber Meridian Travel Set',
    cat: 'fragrance',
    price: 210,
    was: 265,
    img: 'img/p08.webp',
    rating: 4.7,
    reviews: 233,
    stock: 0,
    blurb: 'Three 10 ml refillable atomisers in a lacquered travel case.',
    desc:
      'A lacquered travel case holding three 10 ml magnetic atomisers, pre-filled with Noir Absolu, Oud Royale Intense and Ivory Musk. The atomisers refill from any full bottle without a funnel.',
    specs: {
      Contents: '3 × 10 ml refillable atomisers',
      Fragrances: 'Noir Absolu, Oud Royale Intense, Ivory Musk',
      Case: 'Lacquered aluminium with magnetic closure',
      Cabin: 'Compliant with international carry-on limits',
      Origin: 'Assembled in France',
      Warranty: '2-year hardware',
    },
  }),

  /* ---------------- Leather ---------------- */
  P({
    id: 'p09',
    name: 'Continental Weekender Bag',
    cat: 'leather',
    price: 1890,
    img: 'img/p09.webp',
    rating: 4.9,
    reviews: 176,
    stock: 9,
    bestseller: true,
    blurb: '48-hour holdall in vegetable-tanned calfskin with suede lining.',
    desc:
      'Cut from a single hide of vegetable-tanned calfskin, the Continental Weekender is sized for 48 hours and for the overhead bin. The base carries five solid-brass studs, the lining is goat suede, and the saddle stitching is done by hand at eight stitches per inch.',
    specs: {
      Material: 'Vegetable-tanned full-grain calfskin',
      Lining: 'Goat suede with two slip pockets',
      Dimensions: '52 × 28 × 25 cm, 42 L',
      Hardware: 'Solid brass, palladium-finished',
      Construction: 'Hand saddle-stitched, edge-painted',
      Warranty: 'Lifetime repair programme',
    },
  }),
  P({
    id: 'p10',
    name: 'Meridian Bifold Wallet',
    cat: 'leather',
    price: 390,
    img: 'img/p10.webp',
    rating: 4.8,
    reviews: 641,
    stock: 27,
    blurb: 'Eight card slots, twin note compartments, 6 mm folded profile.',
    desc:
      'A bifold engineered to stay flat: skived to 0.8 mm at the fold, it measures 6 mm closed even when fully loaded. Eight card slots, two note compartments and a hidden pocket, all edge-painted in five coats.',
    specs: {
      Material: 'Full-grain calfskin, 0.8 mm skived',
      Capacity: '8 card slots, 2 note compartments, 1 hidden pocket',
      Dimensions: '11 × 9 cm, 6 mm folded',
      Finish: 'Five-coat hand-painted edges',
      Origin: 'Made in Florence, Italy',
      Warranty: 'Lifetime repair programme',
    },
  }),
  P({
    id: 'p11',
    name: 'Atelier Leather Briefcase',
    cat: 'leather',
    price: 2450,
    was: 2800,
    img: 'img/p11.webp',
    rating: 4.9,
    reviews: 88,
    stock: 5,
    blurb: 'Structured 16-inch briefcase with padded laptop sleeve and brass locks.',
    desc:
      'A structured briefcase built on a hand-formed leather frame rather than plastic, so it holds its line for decades. Padded 16-inch laptop sleeve, three document dividers, and twin solid-brass turn locks machined in-house.',
    specs: {
      Material: 'Full-grain calfskin over hand-formed leather frame',
      Laptop: 'Padded sleeve fits up to 16 inch',
      Dimensions: '41 × 31 × 11 cm',
      Hardware: 'Machined solid-brass turn locks',
      Strap: 'Detachable padded shoulder strap included',
      Warranty: 'Lifetime repair programme',
    },
  }),
  P({
    id: 'p12',
    name: 'Onyx Card Holder',
    cat: 'leather',
    price: 220,
    img: 'img/p12.webp',
    rating: 4.7,
    reviews: 512,
    stock: 46,
    blurb: 'Four-slot holder in black grained calfskin with RFID shielding.',
    desc:
      'A four-slot card holder in black grained calfskin, lined with an RFID-shielding membrane that blocks 13.56 MHz reads. Thin enough for a front pocket, rigid enough to keep cards from bowing.',
    specs: {
      Material: 'Grained full-grain calfskin',
      Capacity: '4 card slots, 1 central pocket',
      Security: 'RFID-shielding membrane, 13.56 MHz',
      Dimensions: '10 × 7 cm, 4 mm',
      Origin: 'Made in Florence, Italy',
      Warranty: 'Lifetime repair programme',
    },
  }),

  /* ---------------- Eyewear ---------------- */
  P({
    id: 'p13',
    name: 'Aviator Titanium Sunglasses',
    cat: 'eyewear',
    price: 520,
    img: 'img/p13.webp',
    rating: 4.8,
    reviews: 394,
    stock: 22,
    new: true,
    blurb: 'Japanese titanium frame, 21 g, polarised gradient lenses.',
    desc:
      'A modern aviator drawn in Japanese beta-titanium: 21 grams complete, with adjustable silicone nose pads and hand-polished barrel hinges. The polarised gradient lenses filter 100% of UVA and UVB.',
    specs: {
      Frame: 'Japanese beta-titanium, 21 g',
      Lenses: 'Polarised gradient, CR-39, category 3',
      Protection: '100% UVA / UVB, UV400',
      Fit: '58-14-145 mm, adjustable nose pads',
      Included: 'Leather case, microfibre cloth',
      Warranty: '2-year international',
    },
  }),
  P({
    id: 'p14',
    name: 'Sculpted Acetate Frames',
    cat: 'eyewear',
    price: 410,
    img: 'img/p14.webp',
    rating: 4.6,
    reviews: 271,
    stock: 19,
    blurb: 'Mazzucchelli acetate, tumbled 48 hours, with gold-tone core wires.',
    desc:
      'Milled from a single block of Mazzucchelli M49 acetate and tumbled for 48 hours in beechwood chips, these frames arrive with the depth of finish that only slow polishing produces. Gold-tone core wires and seven-barrel hinges.',
    specs: {
      Frame: 'Mazzucchelli M49 acetate, block-milled',
      Lenses: 'Demo lenses, prescription-ready',
      Hinges: 'Seven-barrel with gold-tone core wires',
      Fit: '51-19-145 mm',
      Included: 'Leather case, microfibre cloth',
      Warranty: '2-year international',
    },
  }),
  P({
    id: 'p15',
    name: 'Noir Shield Sunglasses',
    cat: 'eyewear',
    price: 580,
    was: 650,
    img: 'img/p15.webp',
    rating: 4.5,
    reviews: 147,
    stock: 3,
    blurb: 'Single-lens shield with mirrored coating and matte black temples.',
    desc:
      'A continuous single-lens shield with an anti-reflective interior coating and a mirrored exterior. The matte black temples are titanium with a five-degree wrap that keeps peripheral glare out without pressure at the temple.',
    specs: {
      Frame: 'Matte black titanium, 5° wrap',
      Lens: 'Single-piece shield, mirrored, category 3',
      Protection: '100% UVA / UVB, UV400',
      Fit: 'One size, adjustable nose bridge',
      Included: 'Hard case, microfibre cloth',
      Warranty: '2-year international',
    },
  }),
  P({
    id: 'p16',
    name: 'Optical Meridian Frames',
    cat: 'eyewear',
    price: 360,
    img: 'img/p16.webp',
    rating: 4.7,
    reviews: 205,
    stock: 31,
    blurb: 'Thin metal optical frame with blue-light filtering lenses included.',
    desc:
      'A 1.2 mm stainless optical frame weighing 16 grams, supplied with blue-light filtering lenses as standard. Designed for all-day screen work and accepted by most prescription labs without modification.',
    specs: {
      Frame: '1.2 mm stainless steel, 16 g',
      Lenses: 'Blue-light filtering, anti-reflective',
      Fit: '52-18-145 mm, silicone nose pads',
      Prescription: 'Accepts single-vision and progressive',
      Included: 'Slim case, microfibre cloth',
      Warranty: '2-year international',
    },
  }),

  /* ---------------- Jewelry ---------------- */
  P({
    id: 'p17',
    name: 'Signet Ring 18k Gold',
    cat: 'jewelry',
    price: 1650,
    img: 'img/p17.webp',
    rating: 4.9,
    reviews: 163,
    stock: 11,
    blurb: 'Solid 18k yellow gold, hand-engravable oval face, 14 g.',
    desc:
      'A solid 18k yellow-gold signet with a generous oval face left blank for hand engraving. Lost-wax cast, then filed and polished by hand over four stages. Complimentary monogram engraving is included with every order.',
    specs: {
      Metal: 'Solid 18k yellow gold, 14 g',
      Face: '15 × 13 mm oval, engravable',
      Sizing: 'US 5–13, complimentary resizing once',
      Engraving: 'Hand engraving included, 3 initials',
      Hallmark: 'Assayed and hallmarked 750',
      Warranty: 'Lifetime care programme',
    },
  }),
  P({
    id: 'p18',
    name: 'Onyx Cufflinks',
    cat: 'jewelry',
    price: 480,
    img: 'img/p18.webp',
    rating: 4.7,
    reviews: 198,
    stock: 24,
    blurb: 'Black onyx cabochons in gold-plated sterling with whale-back backs.',
    desc:
      'Hand-cut black onyx cabochons set into gold-plated sterling silver, with whale-back closures that pivot smoothly and stay flat against the cuff. Supplied in a lacquered presentation box.',
    specs: {
      Stone: 'Hand-cut black onyx cabochon, 14 mm',
      Metal: 'Gold-plated sterling silver, 5 micron',
      Closure: 'Pivoting whale-back',
      Included: 'Lacquered presentation box',
      Origin: 'Made in Italy',
      Warranty: '2-year international',
    },
  }),
  P({
    id: 'p19',
    name: 'Woven Gold Bracelet',
    cat: 'jewelry',
    price: 2300,
    was: 2600,
    img: 'img/p19.webp',
    rating: 4.8,
    reviews: 94,
    stock: 6,
    blurb: 'Hand-woven 18k mesh with concealed clasp and safety catch.',
    desc:
      'Over four hundred hand-woven 18k links form a mesh that drapes like fabric. The clasp is fully concealed within the weave and secured with a double safety catch, so the bracelet reads as a continuous band.',
    specs: {
      Metal: '18k yellow gold, 32 g',
      Construction: 'Hand-woven mesh, 400+ links',
      Clasp: 'Concealed with double safety catch',
      Sizing: '17 / 18.5 / 20 cm',
      Hallmark: 'Assayed and hallmarked 750',
      Warranty: 'Lifetime care programme',
    },
  }),
  P({
    id: 'p20',
    name: 'Diamond Pendant Necklace',
    cat: 'jewelry',
    price: 3900,
    img: 'img/p20.webp',
    rating: 5,
    reviews: 57,
    stock: 4,
    limited: true,
    blurb: '0.75 ct brilliant-cut solitaire, VS1, on an 18k cable chain.',
    desc:
      'A 0.75 carat brilliant-cut solitaire, graded VS1 clarity and F colour, held in a six-claw 18k setting that lifts the stone clear of the chain for maximum light return. Supplied with an independent grading certificate.',
    specs: {
      Stone: '0.75 ct brilliant-cut, VS1 clarity, F colour',
      Setting: 'Six-claw 18k white gold',
      Chain: '18k cable chain, 42 / 45 cm adjustable',
      Certification: 'Independent laboratory certificate included',
      Sourcing: 'Conflict-free, Kimberley Process compliant',
      Warranty: 'Lifetime care programme',
    },
  }),

  /* ---------------- Home ---------------- */
  P({
    id: 'p21',
    name: 'Noir Scented Candle 400g',
    cat: 'home',
    price: 145,
    img: 'img/p21.webp',
    rating: 4.8,
    reviews: 736,
    stock: 58,
    bestseller: true,
    blurb: 'Incense, cedar and amber in hand-blown black glass. 80-hour burn.',
    desc:
      'A three-wick candle poured in coconut-soy wax and scented with the Noir Absolu accord — incense, cedar and amber. The hand-blown black glass vessel is designed to be kept and reused once the 80-hour burn is finished.',
    specs: {
      Weight: '400 g, three wicks',
      'Burn time': 'Approximately 80 hours',
      Wax: 'Coconut-soy blend, lead-free cotton wicks',
      Scent: 'Somalian incense, cedar, grey amber',
      Vessel: 'Hand-blown black glass, reusable',
      Origin: 'Poured in France',
    },
  }),
  P({
    id: 'p22',
    name: 'Crystal Whisky Decanter Set',
    cat: 'home',
    price: 690,
    was: 790,
    img: 'img/p22.webp',
    rating: 4.9,
    reviews: 122,
    stock: 8,
    blurb: 'Mouth-blown lead-free crystal decanter with two cut tumblers.',
    desc:
      'A mouth-blown lead-free crystal decanter with a hand-ground stopper that seats airtight, accompanied by two tumblers cut with a twenty-four-facet base that throws light across the table.',
    specs: {
      Material: 'Mouth-blown lead-free crystal',
      Contents: '1 decanter (750 ml), 2 tumblers (300 ml)',
      Stopper: 'Hand-ground, airtight seat',
      Detail: '24-facet cut tumbler bases',
      Care: 'Hand wash only',
      Warranty: '2-year against manufacturing defects',
    },
  }),
  P({
    id: 'p23',
    name: 'Cashmere Throw',
    cat: 'home',
    price: 780,
    img: 'img/p23.webp',
    rating: 4.9,
    reviews: 211,
    stock: 14,
    blurb: 'Grade-A Mongolian cashmere, 130 × 180 cm, hand-finished fringe.',
    desc:
      'Woven from grade-A Mongolian cashmere with fibres of 15.5 microns or finer, this throw is brushed twice and finished with a hand-knotted fringe. Substantial enough for a sofa, light enough for a long flight.',
    specs: {
      Material: '100% grade-A Mongolian cashmere, 15.5 micron',
      Dimensions: '130 × 180 cm',
      Weight: '620 g',
      Finish: 'Double-brushed, hand-knotted fringe',
      Care: 'Dry clean or cold hand wash',
      Origin: 'Woven in Scotland',
    },
  }),
  P({
    id: 'p24',
    name: 'Marble Desk Organiser',
    cat: 'home',
    price: 420,
    img: 'img/p24.webp',
    rating: 4.6,
    reviews: 168,
    stock: 17,
    blurb: 'Nero Marquina marble with brass inlay and felted base.',
    desc:
      'Machined from a solid block of Nero Marquina marble with a brass inlay tray for small objects, and a felted base that protects the desk. Every piece carries a unique vein pattern.',
    specs: {
      Material: 'Solid Nero Marquina marble, brass inlay',
      Dimensions: '30 × 14 × 5 cm',
      Weight: '3.4 kg',
      Base: 'Full-coverage wool felt',
      Note: 'Vein pattern unique to each piece',
      Warranty: '2-year against manufacturing defects',
    },
  }),
];

/* ---------------- Reviews ---------------- */
const REVIEW_POOL = [
  {
    n: 'Alexandre R.',
    c: 'FR',
    t: 'The finishing is genuinely at a level I did not expect at this price. Packaging alone felt like an occasion.',
  },
  {
    n: 'Hana T.',
    c: 'JP',
    t: 'Third purchase from UMAR. Consistent quality, and the concierge answered my sizing question within the hour.',
  },
  {
    n: 'Daniel O.',
    c: 'US',
    t: 'Arrived in three days to New York, fully insured. It photographs well but looks better in hand.',
  },
  {
    n: 'Sofia M.',
    c: 'IT',
    t: 'I compared this against two better-known houses in a boutique. This one won on detail and on weight.',
  },
  {
    n: 'Omar K.',
    c: 'AE',
    t: 'Exactly as described. The engraving service was flawless and free, which is rare.',
  },
  {
    n: 'Elena V.',
    c: 'DE',
    t: 'Half a star off only because I wanted a second colourway. Otherwise faultless craftsmanship.',
  },
  {
    n: 'James H.',
    c: 'GB',
    t: 'Used daily for eight months, no visible wear. The lifetime repair promise made the decision easy.',
  },
  {
    n: 'Léa D.',
    c: 'CA',
    t: 'Gifted this and it landed perfectly. The presentation box is worth keeping on the shelf.',
  },
];

let seed = 7;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

export const REVIEWS = {};
PRODUCTS.forEach((p) => {
  const count = 3 + Math.floor(rnd() * 3);
  const list = [];
  for (let i = 0; i < count; i++) {
    const src = REVIEW_POOL[Math.floor(rnd() * REVIEW_POOL.length)];
    const stars = p.rating >= 4.85 ? 5 : rnd() > 0.28 ? 5 : 4;
    const d = new Date(2026, 7 - Math.floor(rnd() * 9), 1 + Math.floor(rnd() * 27));
    list.push({
      name: src.n,
      country: src.c,
      text: src.t,
      stars,
      date: d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      verified: rnd() > 0.15,
    });
  }
  REVIEWS[p.id] = list;
});

/* ---------------- Testimonials ---------------- */
export const TESTIMONIALS = [
  {
    quote: 'UMAR occupies a rare space — the restraint of a heritage maison with the service of a modern brand.',
    name: 'Marianne Devaux',
    role: 'Editor at Large, Atlas Quarterly',
  },
  {
    quote: 'I have bought four pieces in two years. Not one has needed a repair, and not one has felt ordinary.',
    name: 'Rohan Mehta',
    role: 'Collector, Singapore',
  },
  {
    quote: 'The packaging, the timing, the follow-up. They understand that luxury is mostly a sequence of small decisions.',
    name: 'Clara Lindqvist',
    role: 'Creative Director, Studio Nord',
  },
];

/* ---------------- Demo orders ---------------- */
export const DEMO_ORDERS = [
  {
    id: 'UMR-4820-9174',
    email: 'demo@umar.com',
    placed: 'Aug 21, 2026',
    eta: 'Sep 2, 2026',
    total: 5240,
    status: 'In transit',
    stage: 2,
    carrier: 'UMAR Secure Courier · 1Z994A7X2210',
    address: 'F-8/3, Islamabad, Pakistan',
    items: [
      { id: 'p01', qty: 1 },
      { id: 'p21', qty: 2 },
    ],
  },
  {
    id: 'UMR-4713-2065',
    email: 'umarjamil.nwl.pk@gmail.com',
    placed: 'Jul 04, 2026',
    eta: 'Delivered Jul 09, 2026',
    total: 700,
    status: 'Delivered',
    stage: 4,
    carrier: 'UMAR Secure Courier · 1Z994A6B0087',
    address: 'F-8/3, Islamabad, Pakistan',
    items: [
      { id: 'p05', qty: 1 },
      { id: 'p12', qty: 1 },
      { id: 'p21', qty: 1 },
    ],
  },
];

export const TRACK_STAGES = [
  { name: 'Order confirmed', note: 'Payment authorised and order registered with our atelier.' },
  { name: 'Prepared & authenticated', note: 'Piece inspected, serial recorded, and sealed in signature packaging.' },
  { name: 'In transit', note: 'Handed to our insured courier partner for international transport.' },
  { name: 'Out for delivery', note: 'Arriving today. A signature will be required at handover.' },
  { name: 'Delivered', note: 'Handover complete. Your 30-day return window begins now.' },
];

/* ---------------- Helpers ---------------- */
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
export const catName = (id) => (getCategory(id) || {}).name || id;
export const countIn = (id) => PRODUCTS.filter((p) => p.cat === id).length;
export const priceBounds = () => {
  const v = PRODUCTS.map((p) => p.price);
  return [Math.min(...v), Math.max(...v)];
};
