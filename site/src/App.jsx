import React, { useEffect, useState } from "react";
import { adventures, homeNames, images, posts, products, videos } from "./nordkappData.js";

const money = (value) => `${value.toFixed(2).replace(".", ",")} €`;
const normalize = (path) => path === "/" ? "/" : `/${path.split("?")[0].replace(/^\/+|\/+$/g, "")}/`;

function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; }
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}

function Link({ to, children, className = "", onClick }) {
  return <a className={className} href={to} onClick={(event) => { event.preventDefault(); onClick?.(); history.pushState({}, "", to); window.dispatchEvent(new PopStateEvent("popstate")); window.scrollTo(0, 0); }}>{children}</a>;
}

const homeLinks = Object.entries(homeNames);
const menuGroups = [
  ["Homepages", homeLinks],
  ["Adventures", [["/adventure-standard/", "Standard"], ["/adventure-masonry/", "Masonry"], ["/adventure-gallery/", "Gallery"], ["/adventure-advanced-filter/", "Advanced Filter"]]],
  ["Shop", [["/shop/", "All Products"], ["/product-category/clothing/", "Clothing"], ["/product-category/clothing/women/", "Women"], ["/product-category/clothing/men/", "Men"]]],
  ["Journal", [["/blog-list/", "Blog List"], ["/blog-grid/", "Blog Grid"], ["/videos-standard/", "Videos"]]],
];

function Header({ navigate, cartCount, wishlistCount }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  return <>
    <header className="header">
      <Link to="/" className="logo"><span>NORD</span>KAPP</Link>
      <nav className="desktop-nav">
        {menuGroups.map(([name, links]) => <div className="nav-group" key={name}><button>{name}<span>+</span></button><div className="mega">{links.map(([to, text]) => <Link to={to} key={to}>{text}</Link>)}</div></div>)}
        <Link to="/about/">About</Link><Link to="/contact/">Contact</Link>
      </nav>
      <div className="header-actions"><button aria-label="Search" onClick={() => setSearch(true)}>⌕</button><Link to="/wishlist/" aria-label="Wishlist">♡<b>{wishlistCount}</b></Link><Link to="/cart" aria-label="Cart">Bag<b>{cartCount}</b></Link><button className="menu-button" onClick={() => setOpen(true)}>Menu</button></div>
    </header>
    <div className={`drawer ${open ? "open" : ""}`}><button className="close" onClick={() => setOpen(false)}>Close ×</button><Link to="/" onClick={() => setOpen(false)}>Home</Link><Link to="/adventure-standard/" onClick={() => setOpen(false)}>Adventures</Link><Link to="/shop/" onClick={() => setOpen(false)}>Shop</Link><Link to="/blog-grid/" onClick={() => setOpen(false)}>Journal</Link><Link to="/about/" onClick={() => setOpen(false)}>About</Link><Link to="/contact/" onClick={() => setOpen(false)}>Contact</Link></div>
    {search && <div className="search-overlay"><button className="close" onClick={() => setSearch(false)}>Close ×</button><p>What are you looking for?</p><input autoFocus placeholder="Search products and stories" onKeyDown={(e) => { if (e.key === "Enter") { navigate(`/shop/?search=${e.currentTarget.value}`); setSearch(false); } }} /></div>}
  </>;
}

function Footer() {
  return <footer><div className="footer-grid"><div><div className="logo light"><span>NORD</span>KAPP</div><p>Adventure is not about distance. It is about preparation, humility, and respect for nature.</p></div><div><h5>Quicklinks</h5><Link to="/cart">My Cart</Link><Link to="/my-account/">My Account</Link><Link to="/checkout">Checkout</Link><Link to="/wishlist/">Wishlist</Link></div><div><h5>Customer Service</h5><Link to="/returns/">Shipping & Returns</Link><Link to="/contact/">Assistance</Link><Link to="/order-tracking/">Order Tracking</Link></div><div><h5>Stay Connected</h5><Link to="/subscribe/">Newsletter Signup</Link><a href="#instagram">Instagram</a><a href="#youtube">Youtube</a></div></div><div className="footline"><span>© 2026 Nordkapp. All rights reserved.</span><span>Built for the wild.</span></div></footer>;
}

function ProductCard({ product, add, toggleWish, wished }) {
  return <article className="product-card"><div className="product-media">{product.oldPrice && <span className="sale">Sale</span>}<button className={`wish ${wished ? "active" : ""}`} onClick={() => toggleWish(product.id)}>♡</button><Link to={`/product/${product.slug}/`}><img src={product.image} alt={product.title} /></Link><button className="quick-add" onClick={() => add(product)}>Add to bag</button></div><p className="eyebrow">{product.category}</p><h3><Link to={`/product/${product.slug}/`}>{product.title}</Link></h3><p className="price">{product.oldPrice && <del>{money(product.oldPrice)}</del>} {money(product.price)}</p></article>;
}

function AdventureCard({ item, masonry = false }) {
  return <article className={`adventure-card ${masonry ? "masonry" : ""}`}><Link to={`/adventure/${item.slug}/`}><img src={item.image} alt={item.title} /><div className="adventure-copy"><p>{item.category}</p><h3>{item.title}</h3><span>{item.days} · {item.level}</span></div></Link></article>;
}

function PostCard({ post }) {
  return <article className="post-card"><Link to={`/2025/12/03/${post.slug}/`}><img src={post.image} alt="" /><p className="eyebrow">{post.category} · 9 months ago</p><h3>{post.title}</h3><span className="text-link">Read story →</span></Link></article>;
}

function Home({ variant, add, toggleWish, wishlist }) {
  const shopFirst = variant.includes("Shop");
  const blogFirst = variant.includes("Blog");
  return <main>
    <section className={`home-hero ${variant === "Hero Home" ? "hero-home" : ""}`} style={{ backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.62),rgba(0,0,0,.05)),url(${variant === "Hero Home" ? images.snow : images.hero})` }}><div className="hero-copy"><p className="eyebrow light">Nordkapp Outdoor · Est. 2026</p><h1>{shopFirst ? "GEAR FOR THE EDGE" : blogFirst ? "STORIES FROM THE WILD" : "UNFORGETTABLE ADVENTURES"}</h1><p>Go beyond the familiar. Explore raw landscapes, practical field knowledge and equipment made for demanding places.</p><Link className="button light-button" to={shopFirst ? "/shop/" : "/adventure-standard/"}>{shopFirst ? "Shop equipment" : "Plan your adventure"}</Link></div><div className="hero-index"><span>71°10′21″N</span><span>MAGERØYA · NORWAY</span></div></section>
    {!shopFirst && <section className="section"><div className="section-head"><div><p className="eyebrow">Find your line</p><h2>NEED ADVENTURE?</h2></div><Link className="text-link" to="/adventure-standard/">View all adventures →</Link></div><div className="adventure-grid">{adventures.slice(0, 4).map((x) => <AdventureCard item={x} key={x.slug} />)}</div></section>}
    <section className="statement"><p>TECHNICAL EQUIPMENT</p><h2>FROM THE TRAILHEAD<br />TO THE SUMMIT.</h2></section>
    <section className="section"><div className="section-head"><div><p className="eyebrow">Reliable essentials</p><h2>RECENT PRODUCTS</h2></div><Link className="text-link" to="/shop/">Shop all gear →</Link></div><div className="product-grid">{products.slice(0, 4).map((x) => <ProductCard product={x} add={add} toggleWish={toggleWish} wished={wishlist.includes(x.id)} key={x.id} />)}</div></section>
    <section className="image-break" style={{ backgroundImage: `url(${images.aurora})` }}><p>Field notes 026</p><h2>THE WILD<br />BECOMES HOME.</h2><Link className="button light-button" to="/about/">Our philosophy</Link></section>
    <section className="section"><div className="section-head"><div><p className="eyebrow">From the blog</p><h2>LATEST POSTS</h2></div><Link className="text-link" to="/blog-grid/">Read all stories →</Link></div><div className="post-grid">{posts.slice(0, 3).map((x) => <PostCard post={x} key={x.slug} />)}</div></section>
  </main>;
}

function ArchiveHero({ eyebrow, title, image = images.snow }) { return <section className="archive-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.55)),url(${image})` }}><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1></section>; }

function AdventuresPage({ path }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? adventures : adventures.filter((x) => x.category === filter);
  const layout = path.includes("masonry") ? "masonry-grid" : path.includes("gallery") ? "gallery-grid" : "adventure-list";
  return <main><ArchiveHero eyebrow="Into the unknown" title="ADVENTURES" /><section className="section"><div className="filters">{["All", ...new Set(adventures.map((x) => x.category))].map((x) => <button className={filter === x ? "active" : ""} onClick={() => setFilter(x)} key={x}>{x}</button>)}</div><div className={layout}>{filtered.map((x) => <AdventureCard item={x} masonry={layout === "masonry-grid"} key={x.slug} />)}</div></section></main>;
}

function AdventureDetail({ slug }) {
  const item = adventures.find((x) => x.slug === slug) || adventures[0];
  return <main><ArchiveHero eyebrow={item.category} title={item.title.toUpperCase()} image={item.image} /><section className="detail-grid section"><div><p className="lead">Leave the marked path behind and learn to move confidently through one of Europe's last great wildernesses.</p><h2>THE EXPERIENCE</h2><p>Built around capable guides, small groups and respect for the landscape, this journey balances practical learning with unhurried time outside. Weather shapes each day and no two departures follow exactly the same line.</p><img className="detail-image" src={images.camp} alt="Camp in the wilderness" /><h2>WHAT TO EXPECT</h2><p>Expect long daylight, shifting weather and memorable camps. All specialist safety equipment is included. A complete packing list arrives after booking.</p></div><aside className="booking"><p className="eyebrow">Trip information</p><dl><div><dt>Duration</dt><dd>{item.days}</dd></div><div><dt>Difficulty</dt><dd>{item.level}</dd></div><div><dt>Group</dt><dd>4–10 people</dd></div><div><dt>From</dt><dd>{money(item.price)}</dd></div></dl><label>Departure<select><option>June 14, 2026</option><option>July 19, 2026</option><option>August 23, 2026</option></select></label><Link className="button" to="/contact/">Request a place</Link></aside></section></main>;
}

function Shop({ add, toggleWish, wishlist }) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  let visible = category === "All" ? [...products] : products.filter((x) => x.category === category);
  if (sort === "low") visible.sort((a, b) => a.price - b.price); if (sort === "high") visible.sort((a, b) => b.price - a.price);
  return <main><ArchiveHero eyebrow="Technical equipment" title="THE SHOP" image={images.forest} /><section className="section"><div className="shop-tools"><div className="filters">{["All", "Men", "Women", "Camping Gear"].map((x) => <button className={category === x ? "active" : ""} onClick={() => setCategory(x)} key={x}>{x}</button>)}</div><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price low to high</option><option value="high">Price high to low</option></select></div><div className="product-grid">{visible.map((x) => <ProductCard product={x} add={add} toggleWish={toggleWish} wished={wishlist.includes(x.id)} key={x.id} />)}</div></section></main>;
}

function ProductDetail({ slug, add, toggleWish, wished }) {
  const item = products.find((x) => x.slug === slug) || products[0]; const [color, setColor] = useState(item.colors[0]); const [size, setSize] = useState("M");
  return <main className="product-detail section"><div className="product-gallery"><img src={item.image} alt={item.title} /><img src={item.image} alt="Alternate view" /></div><div className="product-info"><p className="eyebrow">{item.category} · Technical collection</p><h1>{item.title}</h1><p className="big-price">{item.oldPrice && <del>{money(item.oldPrice)}</del>} {money(item.price)}</p><p>Protective, packable and built for movement. Designed for exposed trails, variable weather and long days beyond the road.</p><fieldset><legend>Color: {color}</legend><div className="choices">{item.colors.map((x) => <button className={color === x ? "active" : ""} onClick={() => setColor(x)} key={x}>{x}</button>)}</div></fieldset><fieldset><legend>Size: {size}</legend><div className="choices">{["XS", "S", "M", "L", "XL"].map((x) => <button className={size === x ? "active" : ""} onClick={() => setSize(x)} key={x}>{x}</button>)}</div></fieldset><button className="button wide" onClick={() => add(item, { color, size })}>Add to bag</button><button className="plain-button" onClick={() => toggleWish(item.id)}>{wished ? "♥ Saved to wishlist" : "♡ Add to wishlist"}</button><div className="accordions"><details open><summary>Description</summary><p>Durable outer fabric, articulated fit and field-tested details. Easy to layer and simple to repair.</p></details><details><summary>Shipping & returns</summary><p>Free delivery over €150. Returns accepted within 30 days.</p></details></div></div></main>;
}

function BlogPage({ path }) { return <main><ArchiveHero eyebrow="Stories from outside" title="FIELD NOTES" image={images.bike} /><section className="section"><div className={path.includes("list") ? "post-list" : "post-grid"}>{posts.map((x) => <PostCard post={x} key={x.slug} />)}</div></section></main>; }
function PostDetail({ slug }) { const post = posts.find((x) => x.slug === slug) || posts[0]; return <main><ArchiveHero eyebrow={`${post.category} · December 3, 2025`} title={post.title.toUpperCase()} image={post.image} /><article className="article"><p className="lead">The outdoors rewards preparation. These are the practical lessons we return to before every trip.</p><h2>START WITH THE CONDITIONS</h2><p>Good decisions begin before the trailhead. Study the route, watch the weather pattern rather than a single forecast, and build enough margin to turn back without consequence.</p><blockquote>Adventure begins where certainty ends, but preparation should never be left behind.</blockquote><h2>PACK WITH PURPOSE</h2><p>Every item should solve a real problem. Test equipment close to home, organize it the same way each time and keep critical layers accessible when conditions shift.</p><img src={images.camp} alt="Prepared camp" /><p>Experience brings speed, but simple systems bring reliability. Keep notes after each trip and refine the kit that works for you.</p></article></main>; }

function VideosPage() { return <main><ArchiveHero eyebrow="In motion" title="WATCH THE WILD" /><section className="section video-grid">{videos.map((video) => <button className="video-card" key={video.title}><img src={video.image} alt="" /><span className="play">▶</span><h3>{video.title}</h3></button>)}</section></main>; }

const pageCopy = {
  "/about/": ["Our path", "BUILT BY THE NORTH", "Nordkapp is a field-led outdoor company. We create journeys and equipment for people who want to move with confidence through wild places."],
  "/services/": ["What we do", "FIELD SERVICES", "Guided expeditions, private routes, skills courses and equipment consultation, shaped by the terrain and your experience."],
  "/faq/": ["Good to know", "FREQUENTLY ASKED", "Clear answers for planning, packing, booking and moving safely through changing conditions."],
  "/returns/": ["Customer service", "SHIPPING & RETURNS", "Simple worldwide delivery and 30-day returns on unused equipment in its original condition."],
  "/privacy-policy/": ["Legal", "PRIVACY & TERMS", "We collect only the information required to provide orders, support and a better browsing experience."],
};
function ContentPage({ path }) { const copy = pageCopy[path] || ["Nordkapp", "THE WILD AWAITS", "Preparation, humility and respect for nature are at the heart of everything we do."]; return <main><ArchiveHero eyebrow={copy[0]} title={copy[1]} image={images.camp} /><section className="article"><p className="lead">{copy[2]}</p>{path === "/faq/" ? ["What experience do I need?", "What equipment is included?", "Can I change my booking?", "How are routes selected?"].map((x, i) => <details open={i === 0} key={x}><summary>{x}</summary><p>Each listing explains the required level. Our team will help you prepare and can recommend the right option before booking.</p></details>) : <><h2>GO FAR. TREAD LIGHTLY.</h2><p>We believe wild places ask something of us: attention, preparation and restraint. Our work is built to make time outside more capable, more memorable and less complicated.</p><p>Every route and product is tested against real conditions, not only a studio brief.</p></>}</section></main>; }

function Contact() { const [sent, setSent] = useState(false); return <main><ArchiveHero eyebrow="Talk to the team" title="CONTACT" image={images.aurora} /><section className="contact section"><div><p className="eyebrow">Start a conversation</p><h2>WHERE DO YOU WANT TO GO?</h2><p>Tell us the landscape, season and experience level. A route specialist will reply within two working days.</p><p><b>expeditions@nordkapp.example</b><br />+47 784 55 210<br />Honningsvåg, Norway</p></div>{sent ? <div className="success"><h3>MESSAGE RECEIVED</h3><p>We will be in touch shortly.</p></div> : <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}><input required placeholder="Name" /><input required type="email" placeholder="Email" /><select><option>Adventure enquiry</option><option>Product support</option><option>Returns</option></select><textarea required placeholder="How can we help?" rows="6" /><button className="button">Send enquiry</button></form>}</section></main>; }

function Cart({ cart, setCart }) {
  const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  return <main><ArchiveHero eyebrow="Your equipment" title="SHOPPING BAG" image={images.forest} /><section className="section cart-layout"><div>{cart.length === 0 ? <div className="empty"><h2>Your bag is empty</h2><Link className="button" to="/shop/">Explore the shop</Link></div> : cart.map((x) => <article className="cart-row" key={`${x.id}-${x.color}-${x.size}`}><img src={x.image} alt="" /><div><h3>{x.title}</h3><p>{x.color} {x.size && `· ${x.size}`}</p><div className="quantity"><button onClick={() => setCart(cart.map((y) => y === x ? { ...y, qty: Math.max(1, y.qty - 1) } : y))}>−</button><span>{x.qty}</span><button onClick={() => setCart(cart.map((y) => y === x ? { ...y, qty: y.qty + 1 } : y))}>+</button></div></div><div><b>{money(x.price * x.qty)}</b><button className="remove" onClick={() => setCart(cart.filter((y) => y !== x))}>Remove</button></div></article>)}</div>{cart.length > 0 && <aside className="summary"><h3>Order summary</h3><p><span>Subtotal</span><b>{money(total)}</b></p><p><span>Delivery</span><b>Free</b></p><hr /><p className="total"><span>Total</span><b>{money(total)}</b></p><Link className="button wide" to="/checkout">Proceed to checkout</Link></aside>}</section></main>;
}

function Checkout({ cart, setCart, setOrders }) {
  const [placed, setPlaced] = useState(null); const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  const submit = (e) => { e.preventDefault(); const order = { id: `NK${Date.now().toString().slice(-7)}`, total, date: new Date().toLocaleDateString(), items: cart }; setOrders((old) => [order, ...old]); setCart([]); setPlaced(order); };
  if (placed) return <main className="confirmation"><p className="eyebrow">Order confirmed</p><h1>THANK YOU.</h1><p>Your order <b>{placed.id}</b> is being prepared. A confirmation has been sent to your email.</p><Link className="button" to="/shop/">Continue shopping</Link></main>;
  return <main><ArchiveHero eyebrow="Secure checkout" title="CHECKOUT" /><form className="checkout section" onSubmit={submit}><div><h2>CONTACT</h2><input required type="email" placeholder="Email address" /><h2>DELIVERY</h2><div className="form-grid"><input required placeholder="First name" /><input required placeholder="Last name" /><input className="span-2" required placeholder="Street address" /><input required placeholder="Postal code" /><input required placeholder="City" /><select className="span-2"><option>Norway</option><option>United Kingdom</option><option>United States</option></select></div><h2>PAYMENT</h2><div className="payment-note">Demo checkout · No payment will be collected</div><input required inputMode="numeric" placeholder="Card number" defaultValue="4242 4242 4242 4242" /></div><aside className="summary"><h3>Your order</h3>{cart.map((x) => <p key={x.id}><span>{x.title} × {x.qty}</span><b>{money(x.price * x.qty)}</b></p>)}<hr /><p className="total"><span>Total</span><b>{money(total)}</b></p><button className="button wide" disabled={!cart.length}>Place order</button></aside></form></main>;
}

function Wishlist({ ids, toggleWish, add }) { const list = products.filter((x) => ids.includes(x.id)); return <main><ArchiveHero eyebrow="Saved for later" title="WISHLIST" /><section className="section">{list.length ? <div className="product-grid">{list.map((x) => <ProductCard product={x} add={add} toggleWish={toggleWish} wished key={x.id} />)}</div> : <div className="empty"><h2>No saved items yet</h2><Link className="button" to="/shop/">Find equipment</Link></div>}</section></main>; }

function Account({ orders }) { return <main><ArchiveHero eyebrow="Your Nordkapp" title="MY ACCOUNT" image={images.camp} /><section className="account section"><aside><button>Dashboard</button><button>Orders</button><button>Addresses</button><button>Account details</button></aside><div><p className="eyebrow">Welcome back</p><h2>YOUR EXPEDITIONS</h2>{orders.length ? orders.map((x) => <div className="order" key={x.id}><b>{x.id}</b><span>{x.date}</span><span>{x.items.length} items</span><b>{money(x.total)}</b></div>) : <p>You have not placed an order yet.</p>}</div></section></main>; }

function App() {
  const [path, setPath] = useState(normalize(location.pathname));
  const [cart, setCart] = useStored("nk-cart", []); const [wishlist, setWishlist] = useStored("nk-wishlist", []); const [orders, setOrders] = useStored("nk-orders", []); const [toast, setToast] = useState("");
  useEffect(() => { const sync = () => setPath(normalize(location.pathname)); addEventListener("popstate", sync); return () => removeEventListener("popstate", sync); }, []);
  const navigate = (to) => { history.pushState({}, "", to); setPath(normalize(to)); window.scrollTo(0, 0); };
  const add = (product, options = {}) => { setCart((old) => { const found = old.find((x) => x.id === product.id && x.color === options.color && x.size === options.size); return found ? old.map((x) => x === found ? { ...x, qty: x.qty + 1 } : x) : [...old, { ...product, ...options, qty: 1 }]; }); setToast(`${product.title} added to bag`); setTimeout(() => setToast(""), 2400); };
  const toggleWish = (id) => setWishlist((old) => old.includes(id) ? old.filter((x) => x !== id) : [...old, id]);
  let page;
  if (homeNames[path]) page = <Home variant={homeNames[path]} add={add} toggleWish={toggleWish} wishlist={wishlist} />;
  else if (path.startsWith("/adventure/") && path.split("/")[2]) page = <AdventureDetail slug={path.split("/")[2]} />;
  else if (path.includes("adventure-") || path.startsWith("/portfolio")) page = <AdventuresPage path={path} />;
  else if (path === "/shop/" || path.startsWith("/product-category/") || path === "/variation-swatches/") page = <Shop add={add} toggleWish={toggleWish} wishlist={wishlist} />;
  else if (path.startsWith("/product/")) page = <ProductDetail slug={path.split("/")[2]} add={add} toggleWish={toggleWish} wished={wishlist.includes((products.find((x) => x.slug === path.split("/")[2]) || {}).id)} />;
  else if (path.startsWith("/blog") || path === "/journal/") page = <BlogPage path={path} />;
  else if (/^\/2025\/12\/03\//.test(path)) page = <PostDetail slug={path.split("/")[4]} />;
  else if (path.startsWith("/video")) page = <VideosPage />;
  else if (path === "/contact/") page = <Contact />;
  else if (path === "/cart/") page = <Cart cart={cart} setCart={setCart} />;
  else if (path === "/checkout/") page = <Checkout cart={cart} setCart={setCart} setOrders={setOrders} />;
  else if (path === "/wishlist/") page = <Wishlist ids={wishlist} toggleWish={toggleWish} add={add} />;
  else if (path === "/my-account/" || path === "/order-tracking/") page = <Account orders={orders} />;
  else page = <ContentPage path={path} />;
  return <><Header navigate={navigate} cartCount={cart.reduce((n, x) => n + x.qty, 0)} wishlistCount={wishlist.length} />{page}<Footer />{toast && <div className="toast">{toast}<Link to="/cart">View bag</Link></div>}</>;
}

export default App;
