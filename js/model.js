/* =====================================================================
   PRINCE VYAS PORTFOLIO — DATA MODEL
   Content/state lives here. The interaction engine remains data-driven.
   ===================================================================== */

const Model = {

  githubUser: "ZenxPrince",

  // Contact endpoint. Replace with a public contact address when ready.
  contactEmail: "",

  state: {
    screen: "home",
    menuIndex: 0,
    reposLoaded: false,
    skillsBuilt: false,
  },

  // These are intentionally framed as current systems / explorations,
  // not invented employment, clients, funding, users, or performance.
  featured: [
    {
      title: "PHOENIX",
      tag: "AI Systems",
      color: "#e60012",
      url: "https://github.com/ZenxPrince",
      cta: "Explore GitHub →",
      desc: "An experimental persistent AI architecture exploring orchestration, memory, tool-mediated execution, model routing, and resource-aware computation across heterogeneous environments.",
    },
    {
      title: "AI & AGENT SYSTEMS",
      tag: "Intelligence",
      color: "#f1e05a",
      url: "https://github.com/ZenxPrince",
      cta: "View systems →",
      desc: "Explorations across LLMs, agentic workflows, context management, automation, local inference, and the infrastructure required to turn models into usable systems.",
    },
    {
      title: "EMBEDDED / ROBOTICS",
      tag: "Physical Systems",
      color: "#3178c6",
      url: "https://github.com/ZenxPrince",
      cta: "View work →",
      desc: "Experiments spanning microcontrollers, sensors, networking, electronics, edge computation, and software-controlled physical systems.",
    },
    {
      title: "FINANCIAL COMPUTING",
      tag: "FinTech",
      color: "#3dff6e",
      url: "https://github.com/ZenxPrince",
      cta: "Explore →",
      desc: "Exploring the intersection of computational systems and finance through financial data, analytics, automation, AI-assisted workflows, and technology infrastructure.",
    },
  ],

  // Featured items are conceptual/system areas, so no repository is hidden by name.
  featuredRepoNames: [],

  fallbackRepos: [],

  projectImages: {},

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219",
    C: "#555", "C++": "#f34b7d", Rust: "#dea584", Go: "#00ADD8",
    Kotlin: "#A97BFF", Swift: "#F05138", Dart: "#00B4AB", Shell: "#89e051",
  },

  // Domains rather than fake proficiency percentages.
  skills: [
    { group: "INTELLIGENCE", items: [
      ["Artificial Intelligence", 100],
      ["AI Agents & LLM Systems", 100],
      ["Machine Learning", 100],
      ["Computer Vision", 100],
      ["Context / Memory Architectures", 100],
    ]},
    { group: "SYSTEMS", items: [
      ["Systems Engineering", 100],
      ["Software Engineering", 100],
      ["Distributed Systems", 100],
      ["Networking", 100],
      ["Cloud / Infrastructure", 100],
      ["Automation", 100],
    ]},
    { group: "PHYSICAL COMPUTATION", items: [
      ["Embedded Systems", 100],
      ["Robotics", 100],
      ["Electronics", 100],
      ["Microcontrollers / Edge", 100],
      ["Sensors / Device Integration", 100],
    ]},
    { group: "SECURITY + FINANCIAL COMPUTING", items: [
      ["Cybersecurity", 100],
      ["Defensive Systems", 100],
      ["Financial Technology", 100],
      ["Financial Data / Analytics", 100],
      ["Technology + Finance", 100],
    ]},
  ],

  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
