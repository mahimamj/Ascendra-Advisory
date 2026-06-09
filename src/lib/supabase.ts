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
  image?: string;
  whyChoose?: string[];
  items: {
    code: string;
    name: string;
    description: string;
    image?: string;
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
    title: "Working Capital",
    description: "OD/CC lines up to ₹250 Cr. Pay interest only on what you use.",
    icon: "ShieldAlert",
    image: "/images/working_capital.webp",
    whyChoose: [
      "Limits matched to turnover",
      "Interest on usage only",
      "Annual renewal in days",
    ],
    items: [
      { code: "OD", name: "Overdraft", description: "Flexible credit on demand.", features: ["Interest on used amount", "No lock-in"] },
      { code: "CC", name: "Cash Credit", description: "Backed by inventory & receivables.", features: ["High asset-based limits", "Easy renewal"] },
      { code: "LC", name: "Letter of Credit", description: "Guaranteed trade payments.", features: ["Domestic & export", "Risk mitigation"] },
      { code: "BG", name: "Bank Guarantee", description: "Tender & contract assurance.", features: ["No cash blocking", "Custom validity"] },
      { code: "WCTL", name: "WC Term Loan", description: "Medium-term working capital gap.", features: ["1–3 year tenure", "Fixed EMIs"] },
      { code: "RMF", name: "Raw Material Funding", description: "Bulk purchase financing.", image: "/images/raw_material_funding.webp", features: ["Fast disbursement", "Bulk discount leverage"] },
    ],
  },
  {
    id: "business-growth",
    title: "Business Loans",
    description: "Unsecured growth capital up to ₹1 Cr. Disbursed in 48–72 hours.",
    icon: "TrendingUp",
    image: "/images/business_financing.webp",
    whyChoose: [
      "No collateral required",
      "Cash-flow based sanction",
      "48-hour disbursal",
    ],
    items: [
      { code: "BL", name: "Business Loans", description: "Unsecured growth capital.", features: ["No collateral", "Cash-flow underwriting"] },
      { code: "BF", name: "Bridge Funding", description: "Short-term liquidity bridge.", features: ["Rapid approval", "Equity-round aligned"] },
      { code: "GC", name: "Growth Capital", description: "Expansion & acquisition debt.", features: ["Moratorium options", "Flexible amortization"] },
    ],
  },
  {
    id: "asset-financing",
    title: "Asset & Machinery",
    description: "Finance equipment without draining operating reserves.",
    icon: "Cpu",
    image: "/images/machinery_financing.webp",
    whyChoose: [
      "New & used machinery",
      "Up to 85% of invoice value",
      "EMIs matched to production cycles",
    ],
    items: [
      { code: "ML", name: "Machinery Loans", description: "Industrial equipment finance.", features: ["Up to 85% funding", "Direct vendor payout"] },
      { code: "WF", name: "Warehouse Finance", description: "Build or expand storage.", image: "/images/warehouse_financing.webp", features: ["Up to ₹10 Cr", "35% subsidy eligible"] },
      { code: "LRD", name: "Lease Rental Discounting", description: "Monetize rental income.", image: "/images/lease_rental.webp", features: ["90% of rent value", "Fast approval"] },
    ],
  },
  {
    id: "sector-specific",
    title: "Sector-Specific",
    description: "Debt shaped to your industry's cash cycle.",
    icon: "FileSpreadsheet",
    image: "/images/textile_financing.webp",
    whyChoose: [
      "Seasonal moratoriums",
      "Sector-priority lenders",
      "Faster approvals",
    ],
    items: [
      { code: "MF", name: "Manufacturing Credit", description: "Raw material & trade cycles.", features: ["Custom OD structures", "Uninterrupted ops"] },
      { code: "EX", name: "Export Credit", description: "Pre & post-shipment lines.", features: ["Packing credit", "Bill discounting"] },
      { code: "TX", name: "Textile Finance", description: "Fabric to fashion scaling.", image: "/images/textile_financing.webp", features: ["Subsidy up to ₹25L", "Fast disbursal"] },
      { code: "APF", name: "Agri Finance", description: "Post-harvest infrastructure.", image: "/images/agri_financing.webp", features: ["Multi-lender access", "Minimal paperwork"] },
    ],
  },
  {
    id: "startup-project",
    title: "Startup & Project",
    description: "Non-dilutive capital for startups and greenfield projects.",
    icon: "Compass",
    image: "/images/startup_financing.webp",
    whyChoose: [
      "No equity dilution",
      "Milestone-based EMIs",
      "Up to ₹250 Cr project finance",
    ],
    items: [
      { code: "SL", name: "Startup Loans", description: "VC-backed startup debt.", features: ["Non-dilutive", "Runway extension"] },
      { code: "FF", name: "Founder Funding", description: "Revenue-linked repayment.", features: ["No personal guarantee", "Flexible caps"] },
      { code: "PF", name: "Project Finance", description: "Large-scale greenfield setups.", image: "/images/project_finance.webp", features: ["Up to ₹250 Cr+", "Cash-flow repayment"] },
    ],
  },
  {
    id: "gov-backed",
    title: "Government Schemes",
    description: "CGTMSE collateral-free cover up to ₹10 Cr with subsidized rates.",
    icon: "Award",
    image: "/images/cgtmse_financing.webp",
    whyChoose: [
      "100% collateral-free",
      "Subsidized interest",
      "Priority PSU processing",
    ],
    items: [
      { code: "CGTMSE", name: "CGTMSE Cover", description: "Collateral-free up to ₹10 Cr.", image: "/images/cgtmse_financing.webp", features: ["Govt. & SIDBI backed", "MSME & startup eligible"] },
      { code: "SLF", name: "Subsidy Financing", description: "Tech upgrade subsidies.", features: ["Up to 15% capital subsidy", "Lower net cost"] },
      { code: "MSME", name: "MSME Lines", description: "Priority sector lending.", features: ["Faster approvals", "Lower fees"] },
    ],
  },
];

export const INDUSTRIES_DATA: IndustryData[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    image: "factory",
    challenge: "Raw material costs lock up cash for 90+ days.",
    solution: "Bill discounting + OD lines for uninterrupted supply.",
    growthPotential: "40% capacity increase",
  },
  {
    id: "export",
    name: "Export & Trade",
    image: "ship",
    challenge: "Pre-shipment liquidity gaps on global orders.",
    solution: "Packing credit, LC & export bill discounting.",
    growthPotential: "Trade in 35+ countries",
  },
  {
    id: "warehousing",
    name: "Warehousing",
    image: "warehouse",
    challenge: "High capex for cold-chain & compliance.",
    solution: "Project finance against future lease contracts.",
    growthPotential: "25% higher rental yield",
  },
  {
    id: "textiles",
    name: "Textiles",
    image: "scissors",
    challenge: "Seasonal cotton price swings drain margins.",
    solution: "Cash credit + TUFS subsidy schemes.",
    growthPotential: "18% margin improvement",
  },
  {
    id: "trading",
    name: "Wholesale & Trading",
    image: "store",
    challenge: "Bulk deals need instant cash payouts.",
    solution: "Quick-sanction demand loans & OD.",
    growthPotential: "15% bulk discounts secured",
  },
  {
    id: "startups",
    name: "Startups",
    image: "rocket",
    challenge: "High burn, no assets for traditional loans.",
    solution: "Venture debt mapped to MRR & contracts.",
    growthPotential: "9–12 months extra runway",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    image: "sprout",
    challenge: "Delayed mandi payouts & post-harvest costs.",
    solution: "AIF subsidies + warehouse receipt finance.",
    growthPotential: "30% faster cash flow",
  },
  {
    id: "msmes",
    name: "MSMEs",
    image: "network",
    challenge: "Rigid audits block low-interest bank lines.",
    solution: "CGTMSE cover + priority MSME credit.",
    growthPotential: "48-hour sanction cycles",
  },
];

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: "cgtmse",
    name: "CGTMSE",
    category: "CGTMSE",
    eligibility: "MSMEs needing up to ₹5 Cr, manufacturing or services.",
    benefits: "Collateral-free. 75–85% default risk covered by trust.",
    description: "Sovereign-backed credit for founders without property collateral.",
  },
  {
    id: "agri-infra",
    name: "Agriculture Infrastructure Fund",
    category: "Agri Schemes",
    eligibility: "FPOs, startups, warehousing players.",
    benefits: "3% interest subvention up to ₹2 Cr for 7 years.",
    description: "Post-harvest infrastructure debt financing.",
  },
  {
    id: "mudra-msme",
    name: "MUDRA & MSME Schemes",
    category: "MSME Schemes",
    eligibility: "Micro-enterprises up to ₹20 Lakhs.",
    benefits: "Zero collateral, subsidized rates.",
    description: "Funding for non-corporate small enterprises.",
  },
  {
    id: "clcss",
    name: "CLCSS",
    category: "MSME Subsidies",
    eligibility: "MSEs upgrading production technology.",
    benefits: "15% capital subsidy up to ₹1 Cr.",
    description: "Technology upgradation subsidy for machinery.",
  },
  {
    id: "textile-tufs",
    name: "ATUFS",
    category: "Textile Subsidies",
    eligibility: "Textile & garment manufacturers.",
    benefits: "10–15% capital subsidy, cap ₹30 Cr.",
    description: "Modernization subsidy for textile sector.",
  },
  {
    id: "wdra-warehousing",
    name: "WDRA Warehouse Finance",
    category: "Warehouse Subsidies",
    eligibility: "WDRA-registered warehouse operators.",
    benefits: "Subsidized rates against eNWR receipts.",
    description: "Finance inventory in accredited storage depots.",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    companyName: "Vardhman Texturizers",
    industry: "Textiles",
    fundingAmount: "₹24 Cr",
    challenge: "Cotton costs & outdated machinery capped export margins.",
    solution: "ATUFS subsidy + machinery loan + ₹10 Cr cash credit.",
    growth: "+45% output",
  },
  {
    id: "case-2",
    companyName: "LogiChain Warehousing",
    industry: "Warehousing",
    fundingAmount: "₹45 Cr",
    challenge: "200K sq.ft cold-chain build without equity dilution.",
    solution: "Project finance + lease rental discounting + AIF subvention.",
    growth: "100% occupancy",
  },
  {
    id: "case-3",
    companyName: "NurtureAgro Foods",
    industry: "Agriculture",
    fundingAmount: "₹12 Cr",
    challenge: "Monsoon procurement delays hurt farmer payouts.",
    solution: "Invoice discounting + ₹5 Cr CGTMSE cash credit.",
    growth: "2.5× capacity",
  },
  {
    id: "case-4",
    companyName: "Zenith TechLabs",
    industry: "Startups",
    fundingAmount: "₹8 Cr",
    challenge: "Needed runway without a down-round equity raise.",
    solution: "Non-dilutive venture debt against recurring revenue.",
    growth: "$1.2M → $3.5M ARR",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "CGTMSE: Secure up to ₹5 Cr Collateral-Free",
    category: "Government Schemes",
    date: "June 2, 2026",
    readTime: "6 min read",
    excerpt: "Updated CGTMSE limits, eligibility, and how to get approved in weeks.",
    content: "CGTMSE now offers up to ₹5 Cr collateral-free. We cover documentation and bank presentation for fast approval.",
    author: "Pranay Ascendra",
    authorRole: "Managing Director",
  },
  {
    id: "blog-2",
    title: "LC vs BG: Trade Finance Essentials",
    category: "Trade Finance",
    date: "May 28, 2026",
    readTime: "8 min read",
    excerpt: "When to use Letters of Credit vs Bank Guarantees for export scaling.",
    content: "LCs secure supplier payment on verified shipment. BGs protect performance tenders. Right structuring cuts margin money from 100% to under 10%.",
    author: "Meera Iyer",
    authorRole: "Head of Credit Structuring",
  },
  {
    id: "blog-3",
    title: "Venture Debt: Preserve Founder Equity",
    category: "Startup Finance",
    date: "May 15, 2026",
    readTime: "7 min read",
    excerpt: "How venture debt extends runway without diluting ownership.",
    content: "Venture debt complements equity rounds, stretching runway past valuation milestones. We cover covenants, warrants, and lender metrics.",
    author: "Siddharth Mehta",
    authorRole: "Lead Advisor, Startup Scaleup",
  },
];

// ----------------------------------------------------
// Mock Supabase / Database Operations Layer
// ----------------------------------------------------

export const dbService = {
  async submitLead(lead: Lead): Promise<{ success: boolean; data?: Lead; error?: string }> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const existingLeadsStr = localStorage.getItem("ascendra_leads") || "[]";
      const leads: Lead[] = JSON.parse(existingLeadsStr);
      const newLead: Lead = {
        ...lead,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };
      leads.push(newLead);
      localStorage.setItem("ascendra_leads", JSON.stringify(leads));
      console.log("[DB Mock Service] Lead Saved successfully:", newLead);
      return { success: true, data: newLead };
    } catch (e) {
      console.error("[DB Mock Service] Error saving lead:", e);
      return { success: false, error: e instanceof Error ? e.message : "Failed to record lead" };
    }
  },

  async submitAppointment(appointment: Appointment): Promise<{ success: boolean; data?: Appointment; error?: string }> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const existingApptsStr = localStorage.getItem("ascendra_appointments") || "[]";
      const appointments: Appointment[] = JSON.parse(existingApptsStr);
      const newAppt: Appointment = {
        ...appointment,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
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

  async getLeads(): Promise<Lead[]> {
    if (typeof window === "undefined") return [];
    const leadsStr = localStorage.getItem("ascendra_leads") || "[]";
    return JSON.parse(leadsStr);
  },

  async getAppointments(): Promise<Appointment[]> {
    if (typeof window === "undefined") return [];
    const apptsStr = localStorage.getItem("ascendra_appointments") || "[]";
    return JSON.parse(apptsStr);
  },
};
