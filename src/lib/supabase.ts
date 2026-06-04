// Ascendra Advisory - Premium Fintech & Business Financing Platform
// Service layer for data structures, local persistence, and Supabase hooks

export interface Lead {
  id?: string;
  name: string;
  company: string;
  industry: string;
  turnover: string;
  fundingRequirement: string;
  phone: string;
  email: string;
  fundingObjective: string;
  createdAt?: string;
}

export interface Appointment {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt?: string;
}

export interface FinancingCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: {
    code: string;
    name: string;
    description: string;
    features: string[];
  }[];
}

export interface IndustryData {
  id: string;
  name: string;
  image: string;
  challenge: string;
  solution: string;
  growthPotential: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  category: string;
  eligibility: string;
  benefits: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  industry: string;
  fundingAmount: string;
  challenge: string;
  solution: string;
  growth: string;
  companyName: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
}

// ----------------------------------------------------
// Structured Datasets (Fintech Premium Focus)
// ----------------------------------------------------

export const FINANCING_SOLUTIONS: FinancingCategory[] = [
  {
    id: "working-capital",
    title: "Working Capital & Trade Finance",
    description: "Optimize daily liquidity and secure import-export trades with custom structured capital lines.",
    icon: "ShieldAlert", // Map to icons dynamically
    items: [
      { code: "OD", name: "Overdraft Limit", description: "Flexible credit line accessed as needed, paying interest only on utilized capital.", features: ["Interest only on used amount", "No lock-in periods", "Secured against property or liquid assets"] },
      { code: "CC", name: "Cash Credit", description: "Primary funding facility backed by stocks, debtors, and raw material inventories.", features: ["High limit based on current assets", "Easy renewal cycles", "Ideal for wholesale and manufacturing"] },
      { code: "LC", name: "Letter of Credit", description: "Bank-backed payment undertaking guaranteeing international and domestic vendor terms.", features: ["Mitigates global trade risks", "Improves supplier payment terms", "Standardized ICC banking rules"] },
      { code: "BG", name: "Bank Guarantee", description: "Institutional assurance validating project tenders, performance contracts, and financial defaults.", features: ["Builds high client trust", "Avoids blocking cash margins", "Customized validity durations"] },
      { code: "WCTL", name: "Working Capital Term Loan", description: "Structured medium-term loan to clear working capital deficits and inventory build-up gaps.", features: ["Fixed monthly repayment models", "Longer tenures (1-3 years)", "Favorable for scaling business seasons"] },
      { code: "WCDL", name: "Working Capital Demand Loan", description: "Short-term funding line callable at short notice with lower financing rates.", features: ["Cheaper than conventional term loans", "Flexible roll-over terms", "Best for immediate arbitrage inventory deals"] }
    ]
  },
  {
    id: "invoice-financing",
    title: "Invoice Financing & Bill Discounting",
    description: "Convert accounts receivables into immediate cash to eliminate 60-90 day credit cycle bottlenecks.",
    icon: "FileSpreadsheet",
    items: [
      { code: "BD", name: "Bill Discounting", description: "Immediate disbursement against trade bills approved by credit-worthy corporate buyers.", features: ["Zero balance-sheet debt weight", "Up to 90% of invoice values instantly", "Confidential discounting options"] }
    ]
  },
  {
    id: "business-growth",
    title: "Business Growth Financing",
    description: "Unsecured and structured financing to fund corporate expansion, mergers, or marketing scale-ups.",
    icon: "TrendingUp",
    items: [
      { code: "BL", name: "Business Loans", description: "Unsecured high-ticket growth loans designed for cash-rich enterprises needing quick cap-ex.", features: ["No collateral requirements", "Sanction based on cash-flow health", "Disbursements in 48-72 hours"] },
      { code: "BF", name: "Bridge Funding", description: "Short-term temporary liquidity bridging the gap before equity rounds or long-term debt sanctions.", features: ["Repayable on main funding round close", "Rapid approval frameworks", "Customized covenants for venture-backed teams"] },
      { code: "TU", name: "Top-Up Loans", description: "Additional credit top-ups built on top of active debt lines to capitalize on unexpected deals.", features: ["Minimal documentation", "Preferred lower rate brackets", "Instant digital top-ups"] },
      { code: "GC", name: "Growth Capital", description: "Strategic debt structured to support international market expansion and key technology acquisitions.", features: ["Flexible amortizations", "Interest-only moratorium windows", "Partnership credit terms"] }
    ]
  },
  {
    id: "asset-financing",
    title: "Asset & Machinery Financing",
    description: "Acquire high-tech industrial hardware or warehouse setups without draining operating reserves.",
    icon: "Cpu",
    items: [
      { code: "ML", name: "Machinery Loans", description: "Equipment-backed debt facilities for installing advanced industrial machinery.", features: ["Funding up to 85% of machinery invoices", "Direct manufacturer payouts", "Tenures matching asset depreciation"] },
      { code: "EF", name: "Equipment Funding", description: "Flexible asset finance covering commercial fleets, testing gear, and IT infrastructures.", features: ["Preserves operational liquid funds", "Tax-deductible leasing option modules", "Easy hardware upgrade options"] },
      { code: "WF", name: "Warehouse Finance", description: "Specialized financing for setting up state-of-the-art cold chains and storage systems.", features: ["Structured mortgage options", "High loan-to-value limits", "Assists logistics and distribution scale"] }
    ]
  },
  {
    id: "startup-project",
    title: "Startup & Project Finance",
    description: "Tailored structures for venture-stage companies and heavy greenfield infrastructure setups.",
    icon: "Compass",
    items: [
      { code: "SL", name: "Startup Loans", description: "Tailored debt options designed for early-revenue startups backed by institutional VCs.", features: ["Pre-approved covenants", "Supports working capital runway", "Non-dilutive growth support"] },
      { code: "FF", name: "Founder Funding", description: "Alternative capital models matching founder milestones and cash-flow horizons.", features: ["No personal guarantees", "Repayments linked to revenue velocities", "Flexible scaling caps"] },
      { code: "PF", name: "Project Finance", description: "Off-balance sheet funding structured around long-term industrial projects and infrastructure assets.", features: ["Non-recourse or limited-recourse models", "Consortium debt structuring", "Repayment tied directly to project yield"] }
    ]
  },
  {
    id: "gov-backed",
    title: "Government Backed Funding",
    description: "Tap into sovereign credit guarantees and interest subsidy schemes dedicated to MSME growth.",
    icon: "Award",
    items: [
      { code: "CGTMSE", name: "CGTMSE Collateral-Free Cover", description: "Sovereign guaranteed loans for micro and small enterprises up to ₹5 Crores without collateral.", features: ["Government of India backed trust cover", "Reduced interest parameters", "Available for retail, service, and manufacturing"] },
      { code: "SLF", name: "Subsidy Linked Financing", description: "Credit-linked capital subsidies for technology upgrades and environment-friendly units.", features: ["Direct capital subsidies up to 15%", "Lower net borrowing cost ratios", "Speeds up green manufacturing migration"] },
      { code: "MSME", name: "MSME Scheme Lines", description: "Special priority sector lending programs offering faster approvals and subsidized interest.", features: ["Priority processing queues", "Lower processing fee margins", "Special terms for women-led ventures"] }
    ]
  }
];

export const INDUSTRIES_DATA: IndustryData[] = [
  {
    id: "manufacturing",
    name: "Manufacturing & Heavy Engineering",
    image: "factory",
    challenge: "High upfront capital requirements for raw materials, raw steel, and equipment upgrades. Long credit cycles from bulk institutional buyers often freeze operational cash flow.",
    solution: "Customized Bill Discounting networks mapped with structural Overdraft (OD) lines to ensure uninterrupted supply-chain cycles and asset acquisition.",
    growthPotential: "Expands capacity by up to 40% and reduces cash-conversion cycle times from 90 days down to 5 days."
  },
  {
    id: "export",
    name: "Export & Trade Businesses",
    image: "ship",
    challenge: "High global freight volatility, exchange rate shifts, and complex cross-border documentation terms (FOB/CIF) demanding immediate pre-shipment liquidity.",
    solution: "Structured packing credits paired with Letters of Credit (LC) and Export Bill Discounting under global partner banking channels.",
    growthPotential: "Enables exporters to confidently quote larger order volumes and safely trade in 35+ countries."
  },
  {
    id: "warehousing",
    name: "Warehousing & Cold Chain Logistics",
    image: "warehouse",
    challenge: "Massive capital expenditure required for real-estate acquisition, climate-control automation, and regulatory warehouse compliance audits.",
    solution: "Structured Warehouse Finance terms with long-term Project Finance loans, securing loans against future lease contracts.",
    growthPotential: "Facilitates multi-site expansion, modernizing storage capacities to yield 25% higher rental values."
  },
  {
    id: "textiles",
    name: "Textiles & Apparels",
    image: "scissors",
    challenge: "Extreme raw material price fluctuations (cotton/yarn) coupled with highly seasonal fashion market cycles requiring elastic inventory funding.",
    solution: "Flexible Cash Credit (CC) limits combined with Government Subsidy schemes (TUFS) and MSME working capital schemes.",
    growthPotential: "Helps manufacturers buy cotton in bulk during harvest lows, maximizing gross margins by 18%."
  },
  {
    id: "trading",
    name: "Wholesale & Trading",
    image: "store",
    challenge: "Fast-moving inventory opportunities requiring instantaneous cash payouts to capitalize on bulk volume discounts from primary manufacturers.",
    solution: "Dynamic, quick-sanction Working Capital Demand Loans (WCDL) and short-term clean Overdraft accounts.",
    growthPotential: "Empowers trading houses to scale distribution velocity, securing bulk discounts up to 15%."
  },
  {
    id: "startups",
    name: "Startups & Tech Ventures",
    image: "rocket",
    challenge: "Rapid cash burn, high product R&D investments, and lack of hard assets to pledge for traditional banking loans.",
    solution: "Non-dilutive Venture Debt, Founder Funding models, and Startup Credit Schemes mapped to recurring contract values (SaaS MRR).",
    growthPotential: "Extends operational runway by 9-12 months without diluting founder equity before subsequent Series-A/B rounds."
  },
  {
    id: "agriculture",
    name: "Agriculture & Post-Harvest",
    image: "sprout",
    challenge: "Delayed payouts from mandis and volatile farmgate prices, compounded by high capital costs for setting up drip irrigation, sorting, or drying units.",
    solution: "Agri Infrastructure Fund (AIF) subsidized lines matched with warehouse receipt financing and collateral-free CGTMSE cover.",
    growthPotential: "Improves cash flow velocity by 30% and locks in post-harvest asset value at minimal borrowing rates."
  },
  {
    id: "msmes",
    name: "MSMEs & Service Enterprises",
    image: "network",
    challenge: "Limited access to low-interest bank lines due to rigid audit standards, and delay in securing small-scale technology upgrade grants.",
    solution: "Priority sector MSME credit lines, technology upgradation capital subsidies (CLCSS), and quick-release CGTMSE coverage.",
    growthPotential: "Reduces processing times from months to 48 hours, scaling operational credit lines at bank rates."
  }
];

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: "cgtmse",
    name: "CGTMSE (Credit Guarantee Fund Trust for Micro & Small Enterprises)",
    category: "CGTMSE",
    eligibility: "New & existing Micro & Small Enterprises engaged in manufacturing or service activities, with loan requirements up to ₹5 Crore.",
    benefits: "Collateral-free credit facility. The trust covers up to 75% to 85% of the default risk, enabling easy bank lending without mortgage assets.",
    description: "Sovereign-backed scheme designed to encourage financial institutions to extend credit to capable founders who lack traditional property collaterals."
  },
  {
    id: "agri-infra",
    name: "Agriculture Infrastructure Fund (AIF)",
    category: "Agri Schemes",
    eligibility: "Agri-entrepreneurs, FPOs, PACS, Startups, and Warehousing players building post-harvest management infrastructure.",
    benefits: "3% interest subvention per annum for loans up to ₹2 Crore, for a maximum period of 7 years, along with CGTMSE fee coverage.",
    description: "Medium-long term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets."
  },
  {
    id: "mudra-msme",
    name: "Pradhan Mantri MUDRA Yojana & MSME Schemes",
    category: "MSME Schemes",
    eligibility: "Micro-enterprises, small business units, retail shops, and artisans requiring capital up to ₹20 Lakhs.",
    benefits: "Zero collateral, subsidized low processing fees, and lower interest rates classified into Shishu, Kishor, and Tarun brackets.",
    description: "Provides structured funding solutions to non-corporate, non-farm small/micro enterprises to support local employment generation."
  },
  {
    id: "clcss",
    name: "Credit Linked Capital Subsidy Scheme (CLCSS)",
    category: "MSME Subsidies",
    eligibility: "Micro and Small Enterprises (MSEs) upgrading their production technology with state-of-the-art machinery.",
    benefits: "15% upfront capital subsidy on institutional credit up to ₹1 Crore for buying approved technological machinery.",
    description: "Aims at facilitating technology upgradation of MSEs by providing capital subsidy for induction of well-established and improved technologies."
  },
  {
    id: "textile-tufs",
    name: "Amended Technology Upgradation Fund Scheme (ATUFS)",
    category: "Textile Subsidies",
    eligibility: "Textile entities, weaving mills, and garment manufacturers implementing modernization programs.",
    benefits: "Capital Investment Subsidy (CIS) ranging from 10% to 15% on eligible machinery, with a maximum cap of ₹30 Crore.",
    description: "Promotes ease of doing business in the textile sector, encouraging capital investments, quality standards, and export expansion."
  },
  {
    id: "wdra-warehousing",
    name: "WDRA Warehouse Subsidy & Finance",
    category: "Warehouse Subsidies",
    eligibility: "Warehouse operators, cold storages, and farmers utilizing WDRA registered warehouse receipts.",
    benefits: "Post-harvest loans at subsidized rates (e.g., 7% p.a.) against electronic Negotiable Warehouse Receipts (eNWR).",
    description: "Helps prevent distress sales by farmers and warehousing companies by financing inventory holdings in WDRA-accredited storage depots."
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    companyName: "Vardhman Texturizers",
    industry: "Textiles",
    fundingAmount: "₹24 Crore",
    challenge: "High cost of raw cotton procurement cycles and outdated spinning machinery restricting competitive export margins.",
    solution: "Structured an ATUFS subsidy scheme coupled with a machinery loan and a ₹10Cr Cash Credit line for seasonal bulk buying.",
    growth: "45% increase in production output, 18% savings on raw cotton cost, and upgraded to zero-carbon machinery setup.",
  },
  {
    id: "case-2",
    companyName: "LogiChain Warehousing",
    industry: "Warehousing & Logistics",
    fundingAmount: "₹45 Crore",
    challenge: "Securing capital to construct a 200,000 sq.ft cold-chain terminal in a prime freight corridor without diluting sponsor equity.",
    solution: "Arranged long-term Project Finance backed by future lease rental discount covenants and an interest subvention under the Agri Infrastructure Fund.",
    growth: "Built terminal 3 months ahead of schedule, secured 100% occupancy with global clients, and achieved a 3% net interest discount.",
  },
  {
    id: "case-3",
    companyName: "NurtureAgro Foods",
    industry: "Agriculture & Food Processing",
    fundingAmount: "₹12 Crore",
    challenge: "High crop procurement volatility during monsoons, causing payment delays to local farmers and supply chain friction.",
    solution: "Implemented pre-shipment invoice discounting and a CGTMSE collateral-free cash credit limit of ₹5 Crore.",
    growth: "Zero delay in farmer payouts, increased supply network by 300+, and expanded processing capacity by 2.5x.",
  },
  {
    id: "case-4",
    companyName: "Zenith TechLabs",
    industry: "Startups & Technology",
    fundingAmount: "₹8 Crore",
    challenge: "Venture-backed AI startup requiring product scaling runway without wanting to raise expensive equity in a down-market.",
    solution: "Structured custom non-dilutive Venture Debt aligned against recurring contract revenues and VC investor backup guarantees.",
    growth: "Scaled annual recurring revenue (ARR) from $1.2M to $3.5M, postponing Series-A by 12 months for a 3x higher valuation.",
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Navigating CGTMSE: How to Secure up to ₹5 Crore Collateral-Free Loans",
    category: "Government Schemes",
    date: "June 2, 2026",
    readTime: "6 min read",
    excerpt: "Demystifying the updated guidelines of the Credit Guarantee Fund Trust, including expanded limits, lower interest caps, and credit eligibility frameworks.",
    content: "The CGTMSE scheme has recently undergone major reforms, increasing the borrowing limit to ₹5 Crore and simplifying the application process. For MSMEs and tech startups, this represents a golden opportunity to access institutional capital without having to mortgage residential or business properties. In this post, we explain how to present credit-appraisal-ready cash flow statements to partner banks, compile required documentation, and secure approval within weeks.",
    author: "Pranay Ascendra",
    authorRole: "Managing Director"
  },
  {
    // Trade Finance post
    id: "blog-2",
    title: "Understanding LC vs BG: Structuring Trade Finance for Global Export Scaling",
    category: "Trade Finance",
    date: "May 28, 2026",
    readTime: "8 min read",
    excerpt: "A deep dive into Letters of Credit (LC) and Bank Guarantees (BG), comparing risk transfers, cash margin setups, and global compliance models.",
    content: "For export and import houses, trade finance instruments form the bedrock of growth. Utilizing a Letter of Credit (LC) ensures that your supplier receives payment only upon showing verified bills of lading, while a Bank Guarantee (BG) serves as a robust shield for performance tenders. Selecting and structuring the right instrument can prevent cash locks, reducing required margin money from 100% to under 10% in leading banking consortia.",
    author: "Meera Iyer",
    authorRole: "Head of Credit Structuring"
  },
  {
    id: "blog-3",
    title: "The Shift to Venture Debt: Preserving Founder Equity in Early-Revenue Stages",
    category: "Startup Finance",
    date: "May 15, 2026",
    readTime: "7 min read",
    excerpt: "Why capital-efficient startups are complementing equity rounds with venture debt to fund cash runway, inventory setups, and acquisitions.",
    content: "Equity is the most expensive form of capital a startup will ever raise. In this comprehensive guide, we dissect how venture debt operates as a complementary tool, enabling founders to stretch their cash runway past critical valuation inflection milestones. We highlight structural covenants, warrant allocations, and the specific metrics lenders evaluate.",
    author: "Siddharth Mehta",
    authorRole: "Lead Advisor, Startup Scaleup"
  }
];

// ----------------------------------------------------
// Mock Supabase / Database Operations Layer
// ----------------------------------------------------

export const dbService = {
  /**
   * Submits a new lead form to database
   */
  async submitLead(lead: Lead): Promise<{ success: boolean; data?: Lead; error?: string }> {
    try {
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store in LocalStorage
      const existingLeadsStr = localStorage.getItem("ascendra_leads") || "[]";
      const leads: Lead[] = JSON.parse(existingLeadsStr);
      
      const newLead: Lead = {
        ...lead,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      
      leads.push(newLead);
      localStorage.setItem("ascendra_leads", JSON.stringify(leads));
      
      // Log to console for audit in dev mode
      console.log("[DB Mock Service] Lead Saved successfully:", newLead);
      
      return { success: true, data: newLead };
    } catch (e) {
      console.error("[DB Mock Service] Error saving lead:", e);
      return { success: false, error: e instanceof Error ? e.message : "Failed to record lead" };
    }
  },

  /**
   * Registers a client appointment booking
   */
  async submitAppointment(appointment: Appointment): Promise<{ success: boolean; data?: Appointment; error?: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const existingApptsStr = localStorage.getItem("ascendra_appointments") || "[]";
      const appointments: Appointment[] = JSON.parse(existingApptsStr);
      
      const newAppt: Appointment = {
        ...appointment,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      
      appointments.push(newAppt);
      localStorage.setItem("ascendra_appointments", JSON.stringify(appointments));
      
      console.log("[DB Mock Service] Appointment Saved successfully:", newAppt);
      
      return { success: true, data: newAppt };
    } catch (e) {
      console.error("[DB Mock Service] Error saving appointment:", e);
      return { success: false, error: e instanceof Error ? e.message : "Failed to book slot" };
    }
  },

  /**
   * Fetches saved leads (useful for a private administrative dashboard if needed)
   */
  async getLeads(): Promise<Lead[]> {
    if (typeof window === "undefined") return [];
    const leadsStr = localStorage.getItem("ascendra_leads") || "[]";
    return JSON.parse(leadsStr);
  },

  /**
   * Fetches saved appointments
   */
  async getAppointments(): Promise<Appointment[]> {
    if (typeof window === "undefined") return [];
    const apptsStr = localStorage.getItem("ascendra_appointments") || "[]";
    return JSON.parse(apptsStr);
  }
};
