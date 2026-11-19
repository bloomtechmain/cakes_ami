/* =========================================================
   CAKES AMI — CONTENT
   Products, blog posts and portfolio. Edit freely.
   No prices: every cake is quoted on request. Images live in /assets/img/products/.
   ========================================================= */
(function () {
  const IMG = "assets/img/products/";

  const categories = [
    { id: "celebration", name: "Celebration Cakes", blurb: "Birthdays, showers & every reason to gather", cover: "maple-citizenship" },
    { id: "wedding",     name: "Wedding & Tiered",  blurb: "Elegant tiers for your biggest days",        cover: "garden-rose-tiers" },
    { id: "kids",        name: "Kids & Themed",     blurb: "Their favourite characters, in cake",        cover: "woodland-fox" },
    { id: "floral",      name: "Floral & Naked",    blurb: "Fresh blooms and soft, rustic finishes",     cover: "rose-basket" },
    { id: "luxe",        name: "Sculpted & Luxe",   blurb: "Show-stoppers that don't look like cake",    cover: "teapot" },
    { id: "cupcakes",    name: "Cupcakes",          blurb: "Boxed by the half dozen or dozen",           cover: "rose-cupcakes" }
  ];

  /* sizes: "single" (round cakes), "tiered", "cupcake" */
  const SIZES = {
    single: [
      { id: "6",  label: '6" round',  note: "serves 8–10",  add: 0 },
      { id: "8",  label: '8" round',  note: "serves 16–20" },
      { id: "10", label: '10" round', note: "serves 28–32" }
    ],
    tiered: [
      { id: "2t", label: "2 tiers", note: "serves 30–40" },
      { id: "3t", label: "3 tiers", note: "serves 60–75" }
    ],
    cupcake: [
      { id: "6",  label: "Half dozen", note: "6 cupcakes",  mult: 0.55 },
      { id: "12", label: "Dozen",      note: "12 cupcakes" },
      { id: "24", label: "Two dozen",  note: "24 cupcakes" }
    ]
  };

  const FLAVOURS = ["Vanilla Bean", "Rich Chocolate", "Red Velvet", "Lemon", "Strawberry", "Marble"];

  const P = (id, name, cat, imgs, size, desc, tag) => ({
    id, name, category: cat, size, tag: tag || "",
    images: imgs.map(i => IMG + i + ".jpg"), description: desc
  });

  const products = [
    P("rose-basket", "Rose Basket Cake", "floral", ["rose-basket"], "single",
      "A buttercream basket-weave cake overflowing with piped roses and leaves, finished with a gold topper.", "Best seller"),
    P("red-rose-bouquet", "Red Rose Bouquet Cake", "floral", ["red-rose-bouquet"], "single",
      "Smooth ivory buttercream crowned with fresh red roses and baby's breath. Made for anniversaries and romantic celebrations."),

    P("garden-rose-tiers", "Garden Rose Two-Tier", "wedding", ["garden-rose-tiers"], "tiered",
      "Lace-textured ivory tiers with a cascade of blush sugar roses and greenery. Elegant for weddings and engagements.", "Signature"),
    P("silver-jubilee", "Silver Jubilee Tiers", "wedding", ["silver-jubilee"], "tiered",
      "A tall, elegant tiered cake with silver detailing and lilac florals, made for milestone birthdays and anniversaries."),
    P("bride-to-be", "Bride-to-Be Blush Cake", "wedding", ["bride-to-be"], "single",
      "Ivory buttercream with blush roses and a gold topper of your choice. Made for bridal showers and engagements."),

    P("little-shark", "Little Shark Birthday Cake", "kids", ["little-shark"], "single",
      "A bright under-the-sea cake with a smiling shark, seashells and a big number on top.", "Kids' favourite"),
    P("woodland-fox", "Woodland Fox Cake", "kids", ["woodland-fox"], "single",
      "A tree-stump cake with a hand-modelled fox, toadstools and a name bunting. Sweet for first birthdays."),
    P("teddy-tiers", "Teddy Bear Tiers", "kids", ["teddy-tiers"], "tiered",
      "Stacked tiers with hand-modelled teddy bears, a ladder and a big pink bow. A favourite for first birthdays and baby showers."),

    P("dapper-shirt", "Dapper Shirt & Bow Tie", "celebration", ["dapper-shirt"], "single",
      "A crisp collared shirt with a chocolate bow tie. A classic for Father's Day, retirements and birthdays for him."),
    P("maple-citizenship", "Maple Citizenship Cake", "celebration", ["maple-citizenship"], "single",
      "Red and white with maple leaves, flags and a sugar passport. Made for citizenship celebrations and Canada Day."),
    P("graduation-cap", "Graduation Cap Cake", "celebration", ["graduation-cap"], "single",
      "A crisp white cake topped with a sculpted mortarboard and gold tassel, personalised for your graduate."),

    P("tea-party-teapot", "Tea Party Teapot", "luxe", ["teapot"], "single",
      "A fully sculpted porcelain-style teapot covered in sugar daisies. Made for high teas and Mother's Day.", "Show-stopper"),
    P("quilted-stiletto", "Quilted Stiletto Cake", "luxe", ["stiletto"], "single",
      "A white quilted cake with silver pearls and a hand-made sugar stiletto heel."),
    P("glam-makeup", "Glam Makeup Cake", "luxe", ["glam-makeup"], "single",
      "Lipsticks, polish, palettes and roses on a quilted cake. All edible, all made by hand."),

    P("rose-swirl-cupcakes", "Rose Swirl Cupcakes", "cupcakes", ["rose-cupcakes"], "cupcake",
      "Cupcakes piped with buttercream roses in your colours. Shown in coral and green.", "Best seller"),
    P("chocolate-shard-cupcakes", "Chocolate Shard Cupcakes", "cupcakes", ["dipped-treats"], "cupcake",
      "Chocolate cupcakes with a tall vanilla swirl and a chocolate shard on top."),
    P("dessert-cups", "Dessert Cups", "cupcakes", ["dessert-cups"], "cupcake",
      "Individual layered dessert cups with fresh berries. Perfect for party tables and showers."),

    /* kept last on purpose: shows at the bottom of the shop */
    P("frangipani-leaf", "Frangipani Leaf Cake", "floral", ["frangipani-leaf"], "single",
      "A sculpted leaf in glossy green with sugar frangipani blossoms. A beautiful choice for blessings, poojas and cultural celebrations.")
  ];

  /* Portfolio = every product photo, tagged by occasion */
  const portfolio = products.map(p => ({ src: p.images[0], title: p.name, category: p.category }));

  const posts = [
    {
      slug: "how-far-ahead-to-order",
      title: "How Far Ahead Should You Order Your Cake?",
      date: "2026-10-28",
      read: "4 min read",
      images: ["garden-rose-tiers", "little-shark", "rose-cupcakes"],
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
      images: ["red-rose-bouquet", "teapot", "dipped-treats"],
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
      images: ["silver-jubilee", "rose-basket", "dessert-cups"],
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
