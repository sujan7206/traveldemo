export const services = [
  {
    title: "Business Advisory, Tax & Accounting",
    short: "Business Advisory",
    slug: "business-advisory-tax-and-accounting-division",
    intro: "Strategic guidance, accounting and tax expertise to protect what you have built and create room for what comes next.",
    items: ["ATO Audits & Disputes", "International Tax", "Business Planning", "Business Development", "Tax & Compliance Services", "Bookkeeping Services", "Buy & Sell a Business", "Management Accounting", "Estate Planning", "Succession Planning"],
  },
  {
    title: "Wealth Management",
    short: "Wealth Management",
    slug: "financial-planning-and-wealth-management-division",
    intro: "Personal financial strategies designed around your ambitions, your family and every stage of life.",
    items: ["Strategic Financial Planning", "Investment Advice", "Retirement Planning", "Superannuation Advice", "Budgeting & Cashflow", "Self-Managed Super"],
  },
  {
    title: "Business Insurance",
    short: "Business Insurance",
    slug: "insurance-broking-division",
    intro: "Practical risk advice and carefully selected cover to protect your people, assets and momentum.",
    items: ["Insurance Broking & Risk Management", "Claims Management", "Consultancy Services", "Management Liability Insurance", "Personal Insurance"],
  },
  {
    title: "Legal Advice & Services",
    short: "Legal Advice",
    slug: "legal-services-division",
    intro: "Clear, commercial legal advice that makes complexity manageable and keeps your plans moving.",
    items: ["Business Law", "Mergers & Acquisitions", "Commercial Leasing", "Finance Law", "Employment Law", "Property Development Law"],
  },
  {
    title: "Managed IT & Cybersecurity",
    short: "Managed IT",
    slug: "managed-it-and-cybersecurity-division",
    intro: "Secure, dependable technology that helps your team work confidently wherever business takes you.",
    items: ["Managed IT Services", "Cyber Security", "VoIP & Business Communications", "System Design & IT Infrastructure", "IT Project Management"],
  },
  {
    title: "HR, Recruitment & Investigations",
    short: "HR & Recruitment",
    slug: "hr-recruitment-and-investigation-solutions-division",
    intro: "People solutions that strengthen teams, resolve workplace challenges and support sustainable growth.",
    items: ["Recruitment", "Outsourced HR Support", "Senior HR Advisory", "HR Strategy & Technology", "Workplace & Corporate Investigations"],
  },
  {
    title: "Finance Services",
    short: "Finance Services",
    slug: "business-finance-division",
    intro: "Flexible finance solutions for homes, investments, acquisitions and the next phase of your business.",
    items: ["Home & Investment Loans", "Refinancing & Consolidation", "Business Acquisition Finance", "Commercial Property Finance", "Business Loans"],
  },
  {
    title: "CFO & Bookkeeping",
    short: "CFO & Bookkeeping",
    slug: "cfo-services-and-bookkeeping-division",
    intro: "Reliable financial visibility, robust reporting and experienced oversight for better business decisions.",
    items: ["CFO Services", "Company Secretary", "Bookkeeping", "Management Accounting", "Budgeting & Cashflow Management"],
  },
];

export const audiences = [
  { title: "Value Architects", label: "For established business owners", copy: "Maximising efficiency and minimising risk while protecting and building long-term value for your business.", cta: "Maximise Impact", slug: "established-business-owners" },
  { title: "Wealth Magicians", label: "For families and individuals", copy: "Securing you and your family's future with individualised financial support through life's changes and exciting new chapters.", cta: "Unlock Wealth", slug: "high-net-worth-advisory" },
  { title: "Growth Optimisers", label: "For growth phase business owners", copy: "Empowering you to take your business further with strategic insights, smart structuring and streamlined systems.", cta: "Scale Up", slug: "business-growth-advisors" },
];

export const journey = ["Birth", "School", "University", "Employment", "Marriage", "First Home", "Business", "Children", "Investment Property", "Business Growth", "Succession", "Investments", "Wills", "Retirement"];

export const offices = [
  ["West Perth", "147 Colin Street, West Perth WA 6005"], ["Bibra Lake", "36 Port Kembla Dr, Bibra Lake WA 6163"],
  ["Maida Vale", "1/264 Kalamunda Rd, Maida Vale WA 6057"], ["Mandurah", "2/279 Pinjarra Road, Mandurah WA 6210"],
  ["Bunbury", "16 Stirling Street, Bunbury WA 6230"], ["Busselton", "104 Queen Street, Busselton WA 6280"],
  ["Margaret River", "4/23 Fearn Ave, Margaret River WA 6285"], ["Fortitude Valley", "470 St Pauls Terrace, Fortitude Valley QLD 4006"],
  ["Albany", "266 York Street, Albany WA 6330"], ["Geraldton", "125 Flores Rd, Webberton WA 6530"],
  ["Karratha", "18 Hedland Place, Karratha WA 6714"], ["Caringbah", "2-4 Northumberland Rd, Caringbah NSW 2229"],
];

export const leaders = [
  ["Michael Guggenheimer", "National Chairman", "MG"], ["Dinesh Aggarwal", "Founder and Group CEO", "DA"],
  ["Mili Aggarwal", "Director - Wealth Management", "MA"], ["Melvyn Gilbert", "Managing Director - Accounting", "MG"],
];

export const articles = [
  ["AI Assistants for Teams: What’s Real, What’s Hype, and What Actually Saves Money", "Technology", "https://site-assets.plasmic.app/6da92b197111d30753796fff5de5082f.png"],
  ["Don’t Just Use AI - How Easy Is It to Build an AI for Your Needs?", "Insights", "https://site-assets.plasmic.app/96abb740eafe6a897a5fef0d1f99e90d.png"],
  ["Is Your WA Business Protected If a Cyberattack Hits Tomorrow?", "Cybersecurity", "https://site-assets.plasmic.app/6c92c7655a6501cfe92f16bf0e0dc363.png"],
];

export const slugify = (value) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const itemToService = Object.fromEntries(services.flatMap((service) => service.items.map((item) => [slugify(item), { ...service, detailTitle: item }])));
