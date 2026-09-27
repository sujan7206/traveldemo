import React, { useEffect, useState } from "react";
import { articles, audiences, itemToService, journey, leaders, offices, services, slugify } from "./fortunaData.js";

const logo = "https://site-assets.plasmic.app/9ea0ccea1bee663ab535157ff01936f3.svg";
const heroImage = "https://img.plasmic.app/img-optimizer/v1/img?src=https%3A%2F%2Fimg.plasmic.app%2Fimg-optimizer%2Fv1%2Fimg%2Fab0d7a19bb383509d9b1a4c266eb6ab9.jpg&w=3840&q=78";

function Arrow() { return <span aria-hidden="true">↗</span>; }

function Link({ href, children, className = "", onClick }) {
  const handle = (event) => {
    if (href?.startsWith("/")) {
      event.preventDefault();
      window.history.pushState({}, "", href);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    onClick?.();
  };
  return <a href={href} className={className} onClick={handle}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return <>
    <header className="site-header">
      <div className="topbar">
        <a href="tel:0892404211" className="phone">⌕ <span>(08) 9240 4211</span></a>
        <nav className="utility-nav" aria-label="Utility navigation">
          <Link href="/about-us">About Us</Link><Link href="/locations">Locations</Link><Link href="/our-industries">Industries</Link>
          <Link href="/building-a-strong-foundation">Your Life Journey</Link><Link href="/case-study">Our Clients</Link><Link href="/blogs">Blog</Link><Link href="/resources">Resources</Link>
        </nav>
        <Link href="/contact-us" className="top-contact">Contact Us</Link>
      </div>
      <div className="main-nav">
        <Link href="/" className="brand"><img src={logo} alt="Fortuna Advisory Group" /></Link>
        <nav className="service-nav" aria-label="Services">
          {services.map((s) => <Link key={s.slug} href={`/${s.slug}`}>{s.short}<span>⌄</span></Link>)}
        </nav>
        <button className="menu-button" aria-label="Open menu" onClick={() => setOpen(true)}><span></span><span></span><span></span></button>
      </div>
    </header>
    <div className={`drawer-backdrop ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
    <aside className={`mobile-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="drawer-head"><img src={logo} alt="Fortuna" /><button onClick={() => setOpen(false)} aria-label="Close menu">×</button></div>
      <Link href="/about-us" onClick={() => setOpen(false)}>About Us</Link>
      <button className="drawer-services" onClick={() => setServicesOpen(!servicesOpen)}>Our Services <span>{servicesOpen ? "−" : "+"}</span></button>
      {servicesOpen && <div className="drawer-sub">{services.map((s) => <Link key={s.slug} href={`/${s.slug}`} onClick={() => setOpen(false)}>{s.title}</Link>)}</div>}
      <Link href="/locations" onClick={() => setOpen(false)}>Locations</Link><Link href="/our-industries" onClick={() => setOpen(false)}>Industries</Link>
      <Link href="/blogs" onClick={() => setOpen(false)}>Insights</Link><Link href="/contact-us" className="button lime" onClick={() => setOpen(false)}>Contact Us</Link>
    </aside>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-top shell">
      <div className="footer-brand"><img src={logo} alt="Fortuna Advisory Group" /><a href="tel:0892404211">(08) 9240 4211</a><a href="mailto:info@fortunaadvisors.com.au">info@fortunaadvisors.com.au</a><div className="socials"><span>in</span><span>f</span><span>ig</span><span>yt</span></div></div>
      <div><h3>Our Services</h3>{services.slice(0, 5).map((s) => <Link key={s.slug} href={`/${s.slug}`}>{s.title}</Link>)}</div>
      <div><h3>Discover</h3><Link href="/about-us">About Us</Link><Link href="/our-industries">Industries</Link><Link href="/locations">Locations</Link><Link href="/blogs">Articles</Link><Link href="/contact-us">Contact Us</Link></div>
      <div><h3>Find Us</h3><p>17+ locations across Australia</p><div className="city-list"><span>Perth</span><span>Sydney</span><span>Brisbane</span></div><Link href="/locations" className="text-link">Find your nearest office <Arrow /></Link></div>
    </div>
    <div className="disclaimer shell">Fortuna Advisory Group comprises multiple licensed entities. Unless specifically indicated, the information on this website is general in nature and does not take into account your personal situation. Consider whether the information is appropriate to your needs and seek personal advice from a qualified adviser.</div>
    <div className="footer-bottom shell"><span>Copyright © 2026 Fortuna Advisory Group</span><span>Privacy &nbsp; Terms & Conditions</span></div>
  </footer>;
}

function SectionHeading({ eyebrow, title, copy, action }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{action}</div>;
}

function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [review, setReview] = useState(0);
  const reviews = [
    ["Fortuna made tax time straightforward and stress-free. Their team is always responsive, professional and ready to explain the detail in everyday language.", "Natalie Sarstedt-McCarthy"],
    ["After changing accountants several times, we finally feel we are in safe hands. Having accounting and legal expertise under one roof made restructuring remarkably smooth.", "Vanesa Gonzalez"],
    ["The guidance we received through succession planning gave our family confidence and helped us move into retirement knowing the business was in good hands.", "Sharon and Jamie"],
  ];
  const active = services[activeService];
  return <main>
    <section className="hero shell-wide">
      <div className="hero-copy">
        <span className="hero-kicker">Invested in your tomorrow</span>
        <h1><em>Invested</em> in You,<br />For Life.</h1>
        <p>Whether you’re planning to build a home, expand your business, or prepare for retirement, our personalised financial advice puts you in charge of life’s big moments.</p>
        <strong>Making confident decisions today for a financially secure tomorrow.</strong>
        <div className="hero-cta"><span>Be Ambitious</span><Link href="/contact-us" className="button lime">Start Here</Link></div>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="orb one" /><div className="orb two" /><div className="fine-line" /></div>
    </section>

    <section className="trust-strip shell-wide" aria-label="Trusted by Australian organisations">
      {[
        ["IGNITE", "Community Network"], ["CMI", "Cowell Martin Industries"], ["JAYCO", "Caravanland"], ["AUSTRALIAN", "Government Initiative"], ["RDA", "Regional Development"], ["ALLDIN", "Group"],
      ].map(([name, sub]) => <div key={name}><strong>{name}</strong><small>{sub}</small></div>)}
    </section>

    <section className="audience-grid shell-wide">
      {audiences.map((a, i) => <article className="audience-card" key={a.title}>
        <span className="card-number">0{i + 1}</span><h2>{a.title}</h2><span className="audience-label">{a.label}</span><p>{a.copy}</p>
        <Link href={`/${a.slug}`} className="text-link light">{a.cta} <Arrow /></Link>
      </article>)}
    </section>

    <section className="awards-section">
      <div className="shell awards-inner"><div className="award-stat"><span className="laurel">{`{`}</span><strong>40</strong><span className="laurel">{`}`}</span><p>Top 100 Accounting Firms<br />List 2025</p></div>
      <div className="award-copy"><span className="eyebrow">National recognition</span><h2>Award-Winning Advice<br />That Puts People First</h2><div className="award-list"><span>Australian Financial Review</span><span>Australian Accounting Awards</span><span>Insurance Business Australia Awards</span></div><Link href="/about-us" className="text-link">See all of our awards <Arrow /></Link></div></div>
    </section>

    <section className="services-section shell">
      <SectionHeading eyebrow="Our Services" title="Expertise for every ambition." copy="With a full range of financial, legal and technology solutions in one place, you can feel secure as your life evolves." action={<Link href="/contact-us" className="button outline">Let's Chat <Arrow /></Link>} />
      <div className="service-tabs" role="tablist">{services.map((s, i) => <button key={s.slug} className={i === activeService ? "active" : ""} onClick={() => setActiveService(i)}>{s.short}</button>)}</div>
      <div className="service-feature">
        <div className="service-intro"><span>0{activeService + 1}</span><h3>{active.title}</h3><p>{active.intro}</p><Link href={`/${active.slug}`} className="text-link">All services <Arrow /></Link></div>
        <div className="service-items">{active.items.slice(0, 6).map((item, i) => <Link href={`/${slugify(item)}`} className="service-item" key={item}><span>0{i + 1}</span><h4>{item}</h4><p>{i % 2 ? "Practical support and trusted advice, tailored to your goals." : "Clear guidance to help you move forward with confidence."}</p><Arrow /></Link>)}</div>
      </div>
    </section>

    <section className="journey-section">
      <div className="shell"><SectionHeading eyebrow="Your Life Journey" title="We Stay With You For Life" copy="Your trusted partner for every financial milestone moment." />
      <div className="journey-track">{journey.map((item, i) => <div key={item} className="journey-step"><span>{i + 1}</span><strong>{item}</strong></div>)}</div>
      <div className="journey-callout"><div><span className="eyebrow">Wherever you are today</span><h3>Building a Strong Foundation</h3><p>Establish personal, educational and early-career financial foundations that support long-term growth.</p></div><Link href="/building-a-strong-foundation" className="button lime">Start Strong <Arrow /></Link></div></div>
    </section>

    <section className="testimonials shell">
      <SectionHeading eyebrow="Client stories" title="What Our Clients Say" action={<div className="review-controls"><button aria-label="Previous review" onClick={() => setReview((review + reviews.length - 1) % reviews.length)}>←</button><button aria-label="Next review" onClick={() => setReview((review + 1) % reviews.length)}>→</button></div>} />
      <div className="testimonial"><span className="quote-mark">“</span><blockquote>{reviews[review][0]}</blockquote><div><strong>{reviews[review][1]}</strong><span>★★★★★ &nbsp; Google Review</span></div></div>
    </section>

    <Offices compact />

    <section className="leadership shell">
      <SectionHeading eyebrow="Our Leadership" title="Experience that moves you forward." copy="Our expert team is dedicated to helping you transform potential into lasting prosperity." action={<Link href="/our-team" className="button outline">Meet the Team <Arrow /></Link>} />
      <div className="leader-grid">{leaders.map(([name, role, initials], i) => <article key={name} className="leader-card"><div className={`portrait p${i}`}><span>{initials}</span></div><h3>{name}</h3><p>{role}</p></article>)}</div>
    </section>

    <section className="industries-section"><div className="shell industries-inner"><div><span className="eyebrow">Sector expertise</span><h2>Stay Ahead in<br />Every Sector</h2><p>Client-focused thinking and tailored solutions deliver growth and efficiency across a diverse range of industries.</p><Link href="/our-industries" className="button lime">See all industries <Arrow /></Link></div><div className="industry-list">{["Agriculture", "Building & Construction", "Education", "Hospitality", "Logistics", "Manufacturing", "Medical", "Mining", "Real Estate"].map((x, i) => <span key={x}><small>0{i + 1}</small>{x}<Arrow /></span>)}</div></div></section>

    <section className="articles shell"><SectionHeading eyebrow="Fresh thinking" title="Stay One Step Ahead" copy="Explore expert articles that make complex money and business matters simple, relevant and meaningful." action={<Link href="/blogs" className="text-link">All articles <Arrow /></Link>} /><div className="article-grid">{articles.map(([title, category, image]) => <Link href={`/blogs/${slugify(title)}`} className="article-card" key={title}><img src={image} alt="" /><span>{category}</span><h3>{title}</h3><b>Read article <Arrow /></b></Link>)}</div></section>

    <ContactBand />
  </main>;
}

function ContactBand() { return <section className="contact-band"><div className="shell"><span className="eyebrow">Your next chapter</span><h2>Let's build your future together.</h2><p>Tell us where you want to go. We’ll connect you with the right advisor and help you take the next confident step.</p><Link href="/contact-us" className="button lime">Let's Chat <Arrow /></Link></div></section>; }

function Offices({ compact = false }) {
  const [query, setQuery] = useState("");
  const filtered = offices.filter(([name, address]) => `${name} ${address}`.toLowerCase().includes(query.toLowerCase()));
  return <section className={`offices ${compact ? "compact" : ""}`} id="offices"><div className="shell office-layout"><div className="map-art"><div className="map-dot d1" /><div className="map-dot d2" /><div className="map-dot d3" /><span>17+ locations<br />across Australia</span></div><div className="office-panel"><span className="eyebrow">Across Australia</span><h2>Our Offices</h2><input aria-label="Search locations" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search locations" /><div className="office-list">{filtered.slice(0, compact ? 5 : filtered.length).map(([name, address]) => <Link href={`/${slugify(name)}`} key={name}><strong>{name}</strong><span>{address}</span><Arrow /></Link>)}</div>{compact && <Link href="/locations" className="text-link">View all locations <Arrow /></Link>}</div></div></section>;
}

function PageHero({ eyebrow, title, copy, image = heroImage }) { return <section className="page-hero"><div className="page-hero-copy shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div><img src={image} alt="" /></section>; }

function ServicePage({ service, detailTitle }) {
  const title = detailTitle || service.title;
  return <main><PageHero eyebrow={detailTitle ? `Home / ${service.short}` : "Our Services"} title={title} copy={detailTitle ? `Our experienced team makes ${title.toLowerCase()} clear and manageable, with practical advice designed around your goals.` : service.intro} />
    <section className="detail-intro shell"><div><span className="eyebrow">Advice that makes a difference</span><h2>Clarity for your next decision.</h2></div><div><p>Our specialists combine deep technical knowledge with a genuine understanding of what matters to you. We simplify complexity, identify opportunities and stay beside you from first conversation to final outcome.</p><Link href="/contact-us" className="button dark">Talk to an advisor <Arrow /></Link></div></section>
    <section className="detail-services shell"><SectionHeading eyebrow={service.short} title={detailTitle ? "How we can help" : `Our ${service.title} Services`} /><div className="detail-grid">{service.items.map((item, i) => <Link href={`/${slugify(item)}`} key={item} className="detail-card"><span>0{i + 1}</span><h3>{item}</h3><p>Trusted guidance, practical solutions and genuine care to help you achieve your financial goals.</p><b>Find out more <Arrow /></b></Link>)}</div></section><ContactBand /></main>;
}

function AboutPage() { return <main><PageHero eyebrow="About Fortuna" title="Here For You At Every Stage Of Your Life" copy="As a multiservice advisory firm built on care, integrity and genuine connection, we put people and their financial wellbeing at the centre of everything we do." />
  <section className="detail-intro shell"><div><span className="eyebrow">Leading with heart and vision</span><h2>Invested in people since 2012.</h2></div><div><p>Dinesh Aggarwal founded Fortuna Advisory Group to provide trusted financial guidance that supports people through life's many twists and turns. Today, more than 120 professionals serve over 12,000 clients across Australia.</p><p>We may work with numbers, but our focus is always on people: clear communication, genuine care and practical guidance.</p></div></section>
  <section className="values shell"><SectionHeading eyebrow="What drives us" title="The values behind every conversation." /><div className="value-grid">{[["Integrity", "We are clear, responsive and client-first, always."], ["Quest for Excellence", "We aim high and strive higher, delivering advice that creates real impact."], ["Client Focus", "We build long-term relationships across businesses, families and generations."], ["People Culture", "Personalised attention from people who genuinely love what they do."]].map(([t,c],i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section><ContactBand /></main>; }

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <main><PageHero eyebrow="Start a conversation" title="Let's Chat" copy="Every great partnership begins with a simple conversation. Whether you have a question or are ready to take the next step, we'd love to hear from you." image="https://img.plasmic.app/img-optimizer/v1/img?src=https%3A%2F%2Fimg.plasmic.app%2Fimg-optimizer%2Fv1%2Fimg%2Fae7191dbc1b723158d518f849eb0c227.jpg&w=3840&q=78" />
    <section className="contact-layout shell"><div><span className="eyebrow">Contact Us</span><h2>How can we help?</h2><p>Share a few details and the right member of our team will be in touch.</p><div className="contact-details"><a href="tel:0892404211"><b>Phone</b>(08) 9240 4211</a><a href="mailto:info@fortunaadvisors.com.au"><b>Email</b>info@fortunaadvisors.com.au</a><span><b>Head Office</b>147 Colin Street, West Perth WA 6005</span></div></div>
    {sent ? <div className="form-success"><span>✓</span><h3>Thanks for reaching out.</h3><p>Your enquiry has been received. Our team will contact you shortly.</p></div> : <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><label>First name<input required name="firstName" /></label><label>Last name<input required name="lastName" /></label><label>Email<input required type="email" name="email" /></label><label>Phone<input required type="tel" name="phone" /></label><label className="full">Service<select name="service">{services.map((s)=><option key={s.slug}>{s.title}</option>)}</select></label><label className="full">How can we help?<textarea required rows="5" name="message" /></label><button className="button lime" type="submit">Send enquiry <Arrow /></button></form>}</section><Offices /></main>;
}

function ListingPage({ type }) {
  if (type === "locations") return <main><PageHero eyebrow="Our national network" title="Local Expertise, Across Australia" copy="Wherever you are, trusted advice is closer than you think. Explore our offices and connect with your local Fortuna team." /><Offices /></main>;
  if (type === "industries") return <main><PageHero eyebrow="Industry expertise" title="Advice Built Around Your World" copy="Specialist knowledge and tailored solutions help businesses across diverse sectors improve efficiency, manage risk and grow." /><section className="detail-services shell"><div className="detail-grid">{["Agriculture", "Building & Construction", "Engineering", "Education", "Food Services", "Hospitality", "Logistics", "Manufacturing", "Medical", "Mining", "Real Estate", "Arts"].map((item,i)=><Link href={`/our-industries/${slugify(item)}`} className="detail-card" key={item}><span>0{i+1}</span><h3>{item}</h3><p>Industry-aware advice built around the realities and opportunities of your sector.</p><b>Explore sector <Arrow /></b></Link>)}</div></section><ContactBand /></main>;
  return <main><PageHero eyebrow="Insights & resources" title="Stay One Step Ahead" copy="Stay informed, spark your curiosity and explore fresh ideas with expert articles that make complex matters simple." /><section className="articles shell"><div className="article-grid">{[...articles,...articles].map(([title,category,image],i)=><Link href={`/blogs/${slugify(title)}`} className="article-card" key={`${title}-${i}`}><img src={image} alt=""/><span>{category}</span><h3>{title}</h3><b>Read article <Arrow /></b></Link>)}</div></section></main>;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, []);
  const slug = path.replace(/^\//, "").replace(/\/$/, "");
  const service = services.find((s) => s.slug === slug);
  const detail = itemToService[slug];
  let page;
  if (!slug) page = <HomePage />;
  else if (slug === "about-us" || slug === "our-team" || slug === "case-study" || slug === "building-a-strong-foundation") page = <AboutPage />;
  else if (slug === "contact-us") page = <ContactPage />;
  else if (slug === "locations") page = <ListingPage type="locations" />;
  else if (slug === "our-industries") page = <ListingPage type="industries" />;
  else if (slug === "blogs" || slug === "resources" || slug.startsWith("blogs/")) page = <ListingPage type="articles" />;
  else if (service) page = <ServicePage service={service} />;
  else if (detail) page = <ServicePage service={detail} detailTitle={detail.detailTitle} />;
  else page = <ServicePage service={services[0]} detailTitle={slug.split("-").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ")} />;
  return <><Header />{page}<Footer /></>;
}

export default App;
