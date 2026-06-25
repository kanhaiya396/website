export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-bookkeeping-2026",
    title: "The state of AI bookkeeping in 2026",
    excerpt: "Where the technology actually delivers, where it still falls short, and what to expect this year.",
    author: "Priya Shah",
    date: "May 28, 2026",
    readTime: "8 min read",
    category: "Industry",
    content: [
      "Three years ago, 'AI bookkeeping' meant little more than OCR plus a few hand-written rules. In 2026 the gap between marketing and reality has narrowed significantly — but it's still there.",
      "Document extraction is genuinely solved. Modern multimodal models hit >99% line-item accuracy on standard UK invoices, and the few edge cases (handwritten receipts, faded thermal prints) are handled by a human-in-the-loop queue rather than silently failing.",
      "Where AI still struggles is the judgement layer: which expense category, which VAT treatment, which client this should be billed back to. The winning teams treat the model as a junior bookkeeper — fast, tireless, occasionally wrong — and design review workflows accordingly.",
    ],
  },
  {
    slug: "mtd-itsa-readiness",
    title: "Getting your firm MTD ITSA-ready before April",
    excerpt: "A practical 6-week checklist for practices migrating self-assessment clients to Making Tax Digital.",
    author: "James Okafor",
    date: "May 14, 2026",
    readTime: "6 min read",
    category: "Compliance",
    content: [
      "HMRC's Making Tax Digital for Income Tax Self Assessment phase-in is finally here. If you have clients with combined property and self-employment income above £30,000, they're in scope from April 2027.",
      "Most firms underestimate how much of the work is data hygiene, not software setup. Start by auditing which clients still send shoeboxes of receipts — those are the ones that need an onboarding conversation now, not next March.",
    ],
  },
  {
    slug: "category-mapping-accuracy",
    title: "Why category mapping is the hardest part of automation",
    excerpt: "Extraction is solved. Telling the difference between 'office supplies' and 'IT equipment' is not.",
    author: "Lena Romano",
    date: "April 30, 2026",
    readTime: "5 min read",
    category: "Engineering",
    content: [
      "Ask any practice owner what part of the month-end cycle annoys them most, and the answer is rarely data entry. It's the back-and-forth over which nominal code something should hit.",
      "We rebuilt our category model around per-client memory: the system learns that for Acme Ltd, 'Stripe' fees go to bank charges, but for Beta Studios they go to cost of sales. Same vendor, different treatment, no rule to write.",
    ],
  },
  {
    slug: "scaling-bookkeeping-team",
    title: "Scaling a bookkeeping team without scaling headcount",
    excerpt: "How a 12-person Manchester firm doubled client load in a year without hiring.",
    author: "Priya Shah",
    date: "April 9, 2026",
    readTime: "7 min read",
    category: "Case Study",
    content: [
      "When Marsden & Co. came to us in early 2025, they were turning away clients because every senior was at capacity. Twelve months later they've onboarded 84 new clients with the same team.",
      "The unlock wasn't a single feature — it was removing the 30+ context switches per day each bookkeeper was making between Xero, Hubdoc, email, and Slack.",
    ],
  },
];
