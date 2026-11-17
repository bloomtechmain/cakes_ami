/* =========================================================
   CAKES AMI — CONTENT
   Products, blog posts and portfolio. Edit freely.
   Prices are in CAD. Images live in /assets/img/cakes/.
   ========================================================= */
(function () {
  const IMG = "assets/img/cakes/";

  const categories = [
    { id: "celebration", name: "Celebration Cakes", blurb: "Birthdays, showers & every reason to gather", cover: "pastel-rose-gold" },
    { id: "wedding",     name: "Wedding & Tiered",  blurb: "Elegant tiers for your biggest days",        cover: "blue-rose-tier" },
    { id: "kids",        name: "Kids & Themed",     blurb: "Their favourite characters, in cake",        cover: "dino-jungle" },
    { id: "floral",      name: "Floral & Naked",    blurb: "Fresh blooms and soft, rustic finishes",     cover: "naked-daisy" },
    { id: "luxe",        name: "Sculpted & Luxe",   blurb: "Show-stoppers that don't look like cake",    cover: "teapot" },
    { id: "cupcakes",    name: "Cupcakes",          blurb: "Boxed by the half dozen or dozen",           cover: "cupcakes-garden" }
  ];

  /* sizes: "single" (round cakes), "tiered", "cupcake" */
  const SIZES = {
    single: [
      { id: "6",  label: '6" round',  note: "serves 8–10",  add: 0 },
      { id: "8",  label: '8" round',  note: "serves 16–20", add: 35 },
      { id: "10", label: '10" round', note: "serves 28–32", add: 75 }
    ],
    tiered: [
      { id: "2t", label: "2 tiers", note: "serves 30–40", add: 0 },
      { id: "3t", label: "3 tiers", note: "serves 60–75", add: 160 }
    ],
    cupcake: [
      { id: "6",  label: "Half dozen", note: "6 cupcakes",  mult: 0.55 },
      { id: "12", label: "Dozen",      note: "12 cupcakes", mult: 1 },
      { id: "24", label: "Two dozen",  note: "24 cupcakes", mult: 1.9 }
    ]
  };

  const FLAVOURS = ["Vanilla Bean", "Rich Chocolate", "Red Velvet", "Lemon", "Strawberry", "Marble"];

  const P = (id, name, cat, price, imgs, size, desc, tag) => ({
    id, name, category: cat, price, size, tag: tag || "",
    images: imgs.map(i => IMG + i + ".jpg"), description: desc
  });

  const products = [
    P("wildflower-naked", "Wildflower Naked Cake", "floral", 95, ["naked-floral"], "single",
      "Soft vanilla layers with a barely-there buttercream finish, crowned with a hand-arranged posy of seasonal blooms. Effortless and romantic.", "Best seller"),
    P("daisy-eucalyptus", "Daisy & Eucalyptus Two-Tier", "floral", 230, ["naked-daisy"], "tiered",
      "Two semi-naked tiers dressed with white daisies and silver-dollar eucalyptus. Perfect for garden parties, showers and intimate weddings."),
    P("gerbera-garden", "Gerbera Garden Cake", "floral", 95, ["naked-gerbera"], "single",
      "A cheerful semi-naked cake topped with bright gerberas, roses and baby's breath."),
    P("frangipani-leaf", "Frangipani Leaf Cake", "floral", 110, ["leaf-frangipani", "leaf-frangipani-2", "leaf-frangipani-4"], "single",
      "A sculpted leaf in glossy green with sugar frangipani blossoms. A beautiful choice for blessings, poojas and cultural celebrations."),

    P("blue-rose-cascade", "Blue Rose Cascade", "wedding", 260, ["blue-rose-tier", "blue-rose-tier-2"], "tiered",
      "Smooth white tiers with a cascade of hand-made blue and lavender sugar roses. Timeless for weddings and anniversaries.", "Signature"),
    P("silver-jubilee", "Silver Jubilee Tiers", "wedding", 290, ["fiftieth-silver", "fiftieth-silver-2", "fiftieth-silver-3"], "tiered",
      "A tall, elegant tiered cake with silver detailing and lilac florals, made for milestone birthdays and anniversaries."),
    P("bride-to-be", "Bride-to-Be Blush Cake", "wedding", 125, ["bride-to-be"], "single",
      "Ivory buttercream with blush roses, peonies and a gold topper of your choice. Made for bridal showers and engagements."),
    P("teddy-tiers", "Teddy Bear Tiers", "wedding", 220, ["teddy-tiers"], "tiered",
      "Sweet stacked tiers in baby blue and white with hand-modelled teddy bears. A favourite for baby showers and first birthdays."),

    P("pastel-roses-gold", "Pastel Roses & Gold", "celebration", 115, ["pastel-rose-gold"], "single",
      "A white fondant cake with a gold-leaf crest and a garland of pastel sugar roses. Personalise it with any name or number."),
    P("blossom-bow", "Blossom & Bow", "celebration", 99, ["bow-blossom", "bow-blossom-2"], "single",
      "Pretty and polished, with a soft blush bow, sugar blossoms and a piped message on top."),
    P("dapper-shirt", "Dapper Shirt & Bow Tie", "celebration", 110, ["shirt-bowtie"], "single",
      "A crisp collared shirt with a red bow tie. A classic for Father's Day, retirements and milestone birthdays for him."),
    P("courtside", "Courtside Basketball Cake", "celebration", 135, ["basketball"], "single",
      "For the sports fan: a sculpted basketball on a team-colour base. Tell us their team and we'll match the colours."),
    P("gamer-controller", "Gamer's Controller Cake", "celebration", 125, ["gamer-controller"], "single",
      "A game controller rendered in fondant on a bold base, personalised with the birthday gamer's name."),
    P("canada-bear", "Maple Bear Cake", "celebration", 110, ["canada-bear"], "single",
      "A cuddly bear with a maple leaf, perfect for Canada Day, citizenship celebrations and welcome-home parties."),

    P("golden-crown", "Golden Crown Princess Cake", "kids", 125, ["golden-crown"], "single",
      "Sunny yellow fondant, a gold crown and red roses. Fit for a little princess."),
    P("pink-crown-set", "Pink Crown & Cupcake Set", "kids", 145, ["princess-crown"], "single",
      "A pink quilted crown cake with a matching dozen of pink swirl cupcakes. Everything for the party table in one order.", "Party set"),
    P("melon-friends", "Watermelon Friends Cake", "kids", 135, ["coco-birthday", "coco-birthday-2"], "single",
      "A bright watermelon-themed cake with a hand-modelled character on top, finished with a colourful birthday banner."),
    P("sweet-kitty", "Sweet Kitty Cake", "kids", 115, ["kitty-cake"], "single",
      "A sculpted kitty face with a pink bow, piped in soft buttercream fur."),
    P("dino-jungle", "Dino Jungle Adventure", "kids", 140, ["dino-jungle", "dino-jungle-2"], "single",
      "Friendly fondant dinosaurs in a lush buttercream jungle. Roar-some for 3 to 8 year olds.", "Kids' favourite"),
    P("rainbow-piggy", "Rainbow Piggy Party", "kids", 120, ["rainbow-piggy"], "single",
      "Pale blue with a rainbow, puffy clouds and a little piggy family on top."),
    P("pocket-monster", "Pocket Monster Party Cake", "kids", 145, ["pocket-monsters"], "single",
      "Bright, playful and packed with hand-modelled creature figures for the collector in your life."),
    P("game-night", "Game Night Characters Cake", "kids", 150, ["game-night-9"], "single",
      "Bold colours and hand-modelled game characters, finished with their name and age."),
    P("dark-knight", "Dark Knight Hero Cake", "kids", 115, ["superhero-bat"], "single",
      "A sleek black-and-yellow superhero cake with a sculpted mask on top."),
    P("under-the-sea", "Under the Sea Cake", "kids", 135, ["under-the-sea"], "single",
      "Seashells, starfish, coral and waves in soft ocean blues."),

    P("tea-party-teapot", "Tea Party Teapot", "luxe", 175, ["teapot"], "single",
      "A fully sculpted porcelain-style teapot covered in sugar daisies. Made for high teas and Mother's Day.", "Show-stopper"),
    P("sculpted-puppy", "Sculpted Puppy Cake", "luxe", 185, ["puppy-3d"], "single",
      "A life-like 3D puppy carved from cake. Send us a photo of your own pup and we'll recreate it."),
    P("rockstar", "Rockstar Music Cake", "luxe", 230, ["music-21st"], "tiered",
      "Black and gold tiers with a fondant guitar, records and sheet music. Made for 21sts and music lovers."),
    P("black-gold", "Black & Gold Luxe", "luxe", 145, ["black-gold-luxe"], "single",
      "A geometric black cake with a gold designer-style plaque. Modern and very chic."),
    P("little-black-dress", "Little Black Dress Cake", "luxe", 165, ["little-black-dress"], "single",
      "A sculpted black dress with gold detailing and a top hat, ideal for a glamorous birthday."),
    P("quilted-stiletto", "Quilted Stiletto Cake", "luxe", 165, ["stiletto"], "single",
      "A white quilted cake with silver pearls and a hand-made sugar stiletto heel."),
    P("glam-makeup", "Glam Makeup Cake", "luxe", 155, ["makeup-glam"], "single",
      "Lipsticks, palettes and brushes, all edible and all made by hand."),
    P("whiskey-barrel", "Whiskey Barrel Cake", "luxe", 175, ["whiskey-barrel"], "single",
      "A wood-grain barrel overflowing with candy ice. Bring your own mini bottles for the topper. A favourite for his birthday."),
    P("spooky-zombie", "Spooky Zombie Cake", "luxe", 160, ["zombie-halloween"], "single",
      "Gloriously gross: a sculpted zombie head for Halloween and horror fans."),

    P("pink-rose-cupcakes", "Pink Rose Cupcakes", "cupcakes", 42, ["cupcakes-pink-rose"], "cupcake",
      "Red velvet cupcakes piped with soft pink buttercream roses.", "Best seller"),
    P("ivory-eucalyptus-cupcakes", "Ivory Rose & Eucalyptus Cupcakes", "cupcakes", 48, ["cupcakes-eucalyptus"], "cupcake",
      "Chocolate cupcakes piped with ivory roses and green leaves. Elegant for weddings and showers."),
    P("garden-bouquet-cupcakes", "Garden Bouquet Cupcakes", "cupcakes", 48, ["cupcakes-garden"], "cupcake",
      "A bouquet in a box: assorted piped flowers in pinks, blues and greens."),
    P("pastel-flower-cupcakes", "Pastel Flower Cupcakes", "cupcakes", 45, ["cupcakes-floral"], "cupcake",
      "Hydrangea-style piping in pastel pink and blue."),
    P("strawberry-swirl-cupcakes", "Strawberry Swirl Cupcakes", "cupcakes", 38, ["cupcakes-swirl"], "cupcake",
      "Tall two-tone strawberry and vanilla swirls on a light vanilla sponge."),
    P("spiderweb-cupcakes", "Halloween Spiderweb Cupcakes", "cupcakes", 42, ["cupcakes-halloween"], "cupcake",
      "Blue and black swirls, chocolate spiderwebs and red candy lips. Spooky season only.")
  ];

  /* Portfolio = every photo, tagged by occasion */
  const portfolio = [
    ["naked-floral", "Wildflower naked cake", "floral"], ["blue-rose-tier", "Blue rose cascade", "wedding"],
    ["cupcakes-garden", "Garden bouquet cupcakes", "cupcakes"], ["dino-jungle", "Dino jungle birthday", "kids"],
    ["teapot", "Sculpted teapot", "luxe"], ["fiftieth-silver", "Silver 50th tiers", "wedding"],
    ["pastel-rose-gold", "Pastel roses & gold", "celebration"], ["naked-daisy", "Daisy & eucalyptus", "floral"],
    ["princess-crown", "Pink crown party set", "kids"], ["music-21st", "Rockstar 21st", "luxe"],
    ["cupcakes-eucalyptus", "Ivory rose cupcakes", "cupcakes"], ["bride-to-be", "Bride-to-be", "wedding"],
    ["leaf-frangipani", "Frangipani leaf", "floral"], ["puppy-3d", "Sculpted puppy", "luxe"],
    ["golden-crown", "Golden crown", "kids"], ["teddy-tiers", "Teddy bear tiers", "wedding"],
    ["shirt-bowtie", "Shirt & bow tie for Dad", "celebration"], ["cupcakes-pink-rose", "Pink rose cupcakes", "cupcakes"],
    ["stiletto", "Quilted stiletto", "luxe"], ["under-the-sea", "Under the sea", "kids"],
    ["naked-gerbera", "Gerbera garden", "floral"], ["basketball", "Courtside basketball", "celebration"],
    ["whiskey-barrel", "Whiskey barrel", "luxe"], ["kitty-cake", "Sweet kitty", "kids"],
    ["bow-blossom", "Blossom & bow", "celebration"], ["cupcakes-floral", "Pastel flower cupcakes", "cupcakes"],
    ["little-black-dress", "Little black dress", "luxe"], ["coco-birthday", "Watermelon friends", "kids"],
    ["canada-bear", "Maple bear", "celebration"], ["fiftieth-silver-3", "50th celebration", "wedding"],
    ["makeup-glam", "Glam makeup", "luxe"], ["pocket-monsters", "Pocket monsters", "kids"],
    ["cupcakes-swirl", "Strawberry swirl cupcakes", "cupcakes"], ["gamer-controller", "Gamer's controller", "celebration"],
    ["black-gold-luxe", "Black & gold luxe", "luxe"], ["rainbow-piggy", "Rainbow piggy", "kids"],
    ["cupcakes-halloween", "Spiderweb cupcakes", "cupcakes"], ["superhero-bat", "Dark knight", "kids"],
    ["zombie-halloween", "Spooky zombie", "luxe"], ["game-night-9", "Game night", "kids"],
    ["blue-rose-tier-2", "Blue roses, detail", "wedding"], ["dino-jungle-2", "Dino jungle, side view", "kids"]
  ].map(([img, title, cat]) => ({ src: IMG + img + ".jpg", title, category: cat }));

  const posts = [
    {
      slug: "how-far-ahead-to-order",
      title: "How Far Ahead Should You Order Your Cake?",
      date: "2026-10-28",
      read: "4 min read",
      images: ["blue-rose-tier", "golden-crown", "cupcakes-garden"],
      excerpt: "From simple birthday cakes to three-tier wedding showpieces, here's a friendly timeline so you never miss your date.",
      body: `
<p>Every cake we make is baked to order and decorated by hand, so a little planning goes a long way. Here's how far ahead we suggest booking, depending on what you have in mind.</p>
<h2>Quick guide</h2>
<ul>
  <li><strong>Cupcakes and simple buttercream cakes:</strong> at least 3 days' notice.</li>
  <li><strong>Themed and character cakes:</strong> 1–2 weeks. Hand-modelled figures need time to set.</li>
  <li><strong>Sculpted cakes (teapots, puppies, handbags…):</strong> 2–3 weeks.</li>
  <li><strong>Wedding and multi-tier cakes:</strong> 1–3 months, especially from May to September.</li>
</ul>
<blockquote>Weekends book up fast. If your date is a Saturday, reach out as soon as you know it.</blockquote>
<h2>What to send us</h2>
<p>The more we know, the closer we get to the cake you're picturing. When you get in touch, try to include:</p>
<ol>
  <li>Your pickup date and roughly how many guests.</li>
  <li>Inspiration photos, colours or a theme.</li>
  <li>The name, age or message for the cake.</li>
  <li>Any allergies or dietary needs.</li>
</ol>
<h2>Need it sooner?</h2>
<p>Call us anyway! We can often fit in a last-minute cake from our menu, especially cupcakes and our floral naked cakes.</p>`
    },
    {
      slug: "caring-for-your-cake",
      title: "Getting Your Cake Home Safely (and Keeping It Perfect)",
      date: "2026-09-15",
      read: "3 min read",
      images: ["naked-daisy", "teapot", "cupcakes-pink-rose"],
      excerpt: "You've picked up your beautiful cake. Now what? Our tips for transport, storage and serving.",
      body: `
<p>Your cake leaves our kitchen looking its best, and these simple tips will keep it that way until the candles are lit.</p>
<h2>On the drive home</h2>
<ul>
  <li>Set the box on a flat surface: the car floor or a level trunk, <em>never</em> on a lap or a sloped seat.</li>
  <li>Keep the car cool. Buttercream and fondant don't like heat or direct sun.</li>
  <li>Drive gently and take corners slowly. Tall and tiered cakes need extra care.</li>
</ul>
<h2>Before the party</h2>
<p>Buttercream and fresh-cream cakes should go in the fridge. Take them out <strong>1–2 hours before serving</strong> so the sponge softens and the flavours come through.</p>
<p>Fondant-covered cakes are happiest in a cool, dry room. The fridge can make fondant sweat.</p>
<blockquote>Fresh flowers on your cake are for decoration only. Please remove them before cutting.</blockquote>
<h2>Leftovers</h2>
<p>Wrap cut edges with plastic wrap and refrigerate. Enjoy within 3 days.</p>`
    },
    {
      slug: "choosing-cake-size",
      title: "How Much Cake Do You Need? A Simple Serving Guide",
      date: "2026-08-02",
      read: "3 min read",
      images: ["fiftieth-silver", "pastel-rose-gold", "cupcakes-eucalyptus"],
      excerpt: "6, 8 or 10 inches? One tier or three? Work out the right size for your guest list in under a minute.",
      body: `
<p>Choosing a size is easier than it looks. Our serving estimates are for standard party slices (about 1" × 2" × 4" tall).</p>
<h2>Round cakes</h2>
<ul>
  <li><strong>6" round:</strong> serves 8–10</li>
  <li><strong>8" round:</strong> serves 16–20</li>
  <li><strong>10" round:</strong> serves 28–32</li>
</ul>
<h2>Tiered cakes</h2>
<ul>
  <li><strong>2 tiers (6" + 8"):</strong> serves 30–40</li>
  <li><strong>3 tiers (6" + 8" + 10"):</strong> serves 60–75</li>
</ul>
<blockquote>Hosting a big crowd on a budget? Pair a smaller show cake with a few dozen matching cupcakes.</blockquote>
<h2>Cupcakes</h2>
<p>Plan on one cupcake per guest, plus a few extra. They always disappear faster than you expect!</p>
<p>Still unsure? Send us your guest count and we'll suggest the best option.</p>`
    }
  ];

  window.CA_DATA = { categories, products, portfolio, posts, SIZES, FLAVOURS, IMG };
})();
