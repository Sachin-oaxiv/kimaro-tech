import { useMemo, useState } from "react";

const products = [
  {
    id: "cam",
    name: "Kimaro Vision 4K",
    category: "Cameras",
    price: 249,
    tagline: "Look sharp. Sound clear.",
    description: "A compact 4K webcam for creators, calls, and everything worth sharing.",
    colors: [
      { name: "Graphite", hex: "#343936", image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=90" },
      { name: "Silver", hex: "#c8cbc6", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=90" },
      { name: "Moss", hex: "#6f8069", image: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=1200&q=90" }
    ],
    cover: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=90",
    label: "BESTSELLER",
    specs: ["4K UHD video", "AI-assisted autofocus", "USB-C connection", "Low-light image tuning"]
  },
  {
    id: "head",
    name: "Kimaro Studio One",
    category: "Audio",
    price: 179,
    tagline: "Find your frequency.",
    description: "Comfort-first wireless headphones with a focused, immersive sound profile.",
    colors: [
      { name: "Midnight", hex: "#242525", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=90" },
      { name: "Cloud", hex: "#e3ded4", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=90" },
      { name: "Olive", hex: "#69785e", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=90" }
    ],
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=90",
    label: "CREATOR FAVORITE",
    specs: ["Wireless listening", "Up to 35-hour battery", "Soft-touch ear cushions", "Fold-flat travel design"]
  },
  {
    id: "speaker",
    name: "Kimaro Pulse Mini",
    category: "Audio",
    price: 89,
    tagline: "Big sound. Small footprint.",
    description: "A portable speaker made for desks, slow mornings, and spontaneous playlists.",
    colors: [
      { name: "Charcoal", hex: "#383c39", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=90" },
      { name: "Sand", hex: "#c9b99e", image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=90" },
      { name: "Forest", hex: "#385d4c", image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=1200&q=90" }
    ],
    cover: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=90",
    label: "NEW ARRIVAL",
    specs: ["Portable wireless audio", "Compact desktop design", "Rechargeable battery", "Room-filling sound"]
  },
  {
    id: "keyboard",
    name: "Kimaro Type 75",
    category: "Desk setup",
    price: 129,
    tagline: "Make every keystroke count.",
    description: "A considered mechanical keyboard for a desk setup that feels like yours.",
    colors: [
      { name: "Dark", hex: "#343638", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=90" },
      { name: "Light", hex: "#dedbd2", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=90" },
      { name: "Sage", hex: "#8a9a87", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=90" }
    ],
    cover: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=90",
    label: "DESK ESSENTIAL",
    specs: ["75% compact layout", "Tactile mechanical keys", "Hot-swappable switches", "Mac and Windows compatible"]
  }
];

const money = n => `$${n.toFixed(2)}`;

export default function App() {
  const [activeId, setActiveId] = useState("cam");
  const [selectedColors, setSelectedColors] = useState({ cam: 0, head: 0, speaker: 0, keyboard: 0 });
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [activeSpec, setActiveSpec] = useState(0);

  const active = products.find(p => p.id === activeId) || products[0];
  const colorIndex = selectedColors[active.id] || 0;
  const activeColor = active.colors[colorIndex];
  const filtered = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function chooseProduct(id) {
    setActiveId(id);
    setActiveSpec(0);
    document.getElementById("product-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function chooseColor(productId, index) {
    setSelectedColors(prev => ({ ...prev, [productId]: index }));
  }
  function addToCart(product, color) {
    setCart(prev => [...prev, { key: `${product.id}-${color.name}-${Date.now()}`, id: product.id, name: product.name, price: product.price, color: color.name, image: color.image }]);
    setNotice(`${product.name} · ${color.name} added to your bag`);
    setCartOpen(true);
  }

  return <div className="site">
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER $100 <span>↗</span></div>
    <nav className="nav">
      <a className="brand" href="#top" aria-label="Kimaro home"><span className="brand-mark">K</span>KIMARO<span className="dot">.</span></a>
      <div className="nav-links"><a href="#collection">Shop all</a><a href="#story">Our approach</a><a href="#support">Support</a></div>
      <button className="bag-button" onClick={() => setCartOpen(true)}>Bag <span>{cart.length}</span> ↗</button>
    </nav>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot"/> TECHNOLOGY, WITH INTENTION</p>
          <h1>Tools for your<br/>next <em>big idea.</em></h1>
          <p className="hero-intro">Thoughtful tech for the way you create, connect, and get things done. Less clutter. Better focus.</p>
          <div className="hero-actions"><a className="primary-btn" href="#collection">Explore the collection <span>↗</span></a><a className="text-link" href="#product-detail">Meet Kimaro Vision</a></div>
          <div className="hero-proof"><div className="avatar-stack"><i>✳</i><i>●</i><i>◒</i></div><div><strong>Made for everyday makers</strong><small>Creator-tested · Design-led · Ready to go</small></div></div>
        </div>
        <div className="hero-visual">
          <img src={activeColor.image} alt={`${active.name} in ${activeColor.name}`} key={`${active.id}-${activeColor.name}-hero`} />
          <div className="hero-image-shade"/>
          <div className="hero-kicker"><span>01 / THE COLLECTION</span><span>DESIGNED TO DO MORE.</span></div>
          <div className="hero-product-label"><span className="label-line"/><div><small>IN FOCUS</small><b>{active.name}</b><span>{active.tagline}</span></div></div>
          <div className="hero-counter"><b>0{products.findIndex(p => p.id === active.id) + 1}</b><span> / 04</span></div>
        </div>
      </section>

      <section className="trust-row">
        <span>✳ CONSIDERED DESIGN</span><span>◉ EASY SETUP</span><span>⌁ MADE FOR DAILY USE</span><span>↗ SUPPORT THAT SHOWS UP</span>
      </section>

      <section className="collection" id="collection">
        <div className="section-head"><div><p className="eyebrow">THE KIMARO EDIT</p><h2>Good tech. <em>No noise.</em></h2></div><p>Useful things, beautifully considered.<br/>Find your next everyday essential.</p></div>
        <div className="collection-tools">
          <div className="filters">{["All", "Cameras", "Audio", "Desk setup"].map(c => <button key={c} className={category === c ? "selected" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the collection…" aria-label="Search products"/>
        </div>
        <div className="product-grid">
          {filtered.map((p, index) => {
            const c = p.colors[selectedColors[p.id] || 0];
            return <article className={`product-card ${activeId === p.id ? "is-active" : ""}`} key={p.id}>
              <button className="product-image" onClick={() => chooseProduct(p.id)} aria-label={`View ${p.name}`}>
                <img src={c.image} alt={`${p.name}, ${c.name}`} loading="lazy"/>
                <span className="product-label">{p.label}</span><span className="view-arrow">↗</span>
              </button>
              <div className="product-info"><div><span className="category-label">{p.category}</span><h3>{p.name}</h3><p>{p.tagline}</p></div><b>{money(p.price)}</b></div>
              <div className="swatches" aria-label={`${p.name} color options`}>{p.colors.map((col,i)=><button key={col.name} className={i === (selectedColors[p.id] || 0) ? "swatch chosen" : "swatch"} style={{"--swatch":col.hex}} title={col.name} aria-label={`${col.name} color`} onClick={() => chooseColor(p.id,i)}/>)}
                <span>{c.name}</span>
              </div>
              <div className="card-actions"><button className="view-product" onClick={() => chooseProduct(p.id)}>View details <span>↗</span></button><button className="add-small" onClick={() => addToCart(p,c)}>＋ Add</button></div>
            </article>;
          })}
        </div>
        {filtered.length === 0 && <div className="empty">No products found. Try a different search or category.</div>}
      </section>

      <section className="detail" id="product-detail">
        <div className="detail-image">
          <img src={activeColor.image} alt={`${active.name} product view in ${activeColor.name}`} key={`${active.id}-${activeColor.name}-detail`}/>
          <span className="detail-index">KIMARO / PRODUCT {String(products.findIndex(p=>p.id===active.id)+1).padStart(2,"0")}</span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">A CLOSER LOOK / {active.category.toUpperCase()}</p>
          <h2>{active.name}<span className="detail-period">.</span></h2>
          <p className="detail-tagline">{active.tagline}</p>
          <p className="detail-description">{active.description}</p>
          <div className="detail-price">{money(active.price)} <span>Taxes calculated at checkout</span></div>
          <div className="color-select"><div className="field-label">FINISH <strong>{activeColor.name}</strong></div><div className="large-swatches">{active.colors.map((c,i)=><button key={c.name} onClick={()=>chooseColor(active.id,i)} className={i===colorIndex?"large-swatch active":"large-swatch"} style={{"--swatch":c.hex}} aria-label={`Select ${c.name}`} title={c.name}><span>{i===colorIndex?"✓":""}</span></button>)}</div></div>
          <button className="add-to-bag" onClick={()=>addToCart(active,activeColor)}>Add to bag — {money(active.price)} <span>↗</span></button>
          <p className="shipping-note">✓ Secure checkout demo　 ·　 ↗ Free shipping over $100</p>
          <div className="spec-list"><div className="field-label">WHY YOU'LL LOVE IT</div>{active.specs.map((s,i)=><button className={activeSpec===i?"spec-row expanded":"spec-row"} key={s} onClick={()=>setActiveSpec(activeSpec===i?-1:i)}><span><i>0{i+1}</i>{s}</span><b>{activeSpec===i?"−":"＋"}</b>{activeSpec===i&&<small>Designed to fit naturally into your setup, with straightforward everyday use in mind.</small>}</button>)}</div>
        </div>
      </section>

      <section className="manifesto" id="story"><p className="eyebrow">OUR POINT OF VIEW</p><h2>Technology should<br/>feel <em>effortless.</em></h2><p>We believe the best tech doesn't ask for attention. It earns a place in your everyday life through thoughtful design, useful details, and experiences that simply make sense.</p><a href="#collection">Find your everyday essential ↗</a><div className="manifesto-stamp">LESS<br/>FUSS.<br/><span>MORE</span><br/>FOCUS.</div></section>
    </main>

    <footer id="support"><a className="brand" href="#top"><span className="brand-mark">K</span>KIMARO<span className="dot">.</span></a><span>Tools for your next big idea. © 2026</span><div><a href="#collection">Shop</a><a href="#story">Our approach</a><a href="#top">Back to top ↑</a></div></footer>

    {cartOpen && <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCartOpen(false)}}><aside className="cart-drawer">
      <div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({cart.length})</span></h2></div><button className="close-drawer" onClick={()=>setCartOpen(false)} aria-label="Close cart">×</button></div>
      {cart.length===0 ? <div className="empty-cart"><div className="empty-symbol">K.</div><h3>Nothing in here. Yet.</h3><p>Your next everyday essential is waiting.</p><button className="primary-btn" onClick={()=>{setCartOpen(false);document.getElementById("collection")?.scrollIntoView({behavior:"smooth"})}}>Explore products ↗</button></div> :
        <><div className="cart-items">{cart.map(item=><div className="cart-item" key={item.key}><img src={item.image} alt={item.name}/><div className="cart-item-info"><b>{item.name}</b><span>{item.color} finish</span><strong>{money(item.price)}</strong><button onClick={()=>setCart(prev=>prev.filter(x=>x.key!==item.key))}>Remove</button></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="cart-disclaimer">Demo checkout only. No payment is taken.</p><button className="checkout-btn" onClick={()=>setNotice("This is a portfolio demo — checkout is not connected.")}>Continue to checkout ↗</button></>}
      {notice && <div className="notice">{notice}<button onClick={()=>setNotice("")}>×</button></div>}
    </aside></div>}
  </div>;
}
