import { useState } from "react";

/* SVG visuals */
function NexArchVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="10" y="10" width="58" height="32" rx="4" fill="#eeedfe" stroke="#afa9ec" strokeWidth="0.5"/>
      <text x="39" y="30" textAnchor="middle" fontSize="10" fill="#3c3489">Tasks</text>
      <rect x="81" y="10" width="58" height="32" rx="4" fill="#eeedfe" stroke="#afa9ec" strokeWidth="0.5"/>
      <text x="110" y="30" textAnchor="middle" fontSize="10" fill="#3c3489">Calendar</text>
      <rect x="152" y="10" width="58" height="32" rx="4" fill="#eeedfe" stroke="#afa9ec" strokeWidth="0.5"/>
      <text x="181" y="30" textAnchor="middle" fontSize="10" fill="#3c3489">Matters</text>
      <line x1="110" y1="42" x2="110" y2="62" stroke="#afa9ec" strokeWidth="0.5"/>
      <rect x="40" y="62" width="140" height="32" rx="4" fill="#534ab7" stroke="#3c3489" strokeWidth="0.5"/>
      <text x="110" y="82" textAnchor="middle" fontSize="10" fill="#eeedfe">Nex-Arch Engine</text>
      <line x1="80" y1="94" x2="58" y2="112" stroke="#5dcaa5" strokeWidth="0.5"/>
      <line x1="110" y1="94" x2="110" y2="112" stroke="#5dcaa5" strokeWidth="0.5"/>
      <line x1="140" y1="94" x2="162" y2="112" stroke="#5dcaa5" strokeWidth="0.5"/>
      <rect x="18" y="112" width="78" height="26" rx="4" fill="#e1f5ee" stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="57" y="129" textAnchor="middle" fontSize="9" fill="#085041">Auto-allocate</text>
      <rect x="71" y="112" width="78" height="26" rx="4" fill="#e1f5ee" stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="110" y="129" textAnchor="middle" fontSize="9" fill="#085041">Dashboard</text>
      <rect x="124" y="112" width="78" height="26" rx="4" fill="#e1f5ee" stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="163" y="129" textAnchor="middle" fontSize="9" fill="#085041">Alerts</text>
    </svg>
  );
}

function NexAccessVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="20" y="12" width="180" height="126" rx="6" fill="#fff" stroke="#e4e2da" strokeWidth="0.5"/>
      <rect x="20" y="12" width="180" height="26" rx="6" fill="#eeedfe"/>
      <circle cx="36" cy="25" r="5" fill="#534ab7"/>
      <text x="48" y="29" fontSize="9" fill="#3c3489">Nex-Access Client Portal</text>
      <rect x="30" y="48" width="74" height="12" rx="3" fill="#f2f0ea"/>
      <rect x="116" y="48" width="74" height="12" rx="3" fill="#f2f0ea"/>
      <rect x="30" y="68" width="160" height="8" rx="2" fill="#f2f0ea"/>
      <rect x="30" y="80" width="116" height="8" rx="2" fill="#f2f0ea"/>
      <rect x="30" y="100" width="160" height="26" rx="4" fill="#e1f5ee" stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="110" y="117" textAnchor="middle" fontSize="9" fill="#085041">Download document</text>
    </svg>
  );
}

function NexAddVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="30" y="16" width="160" height="118" rx="6" fill="#fff" stroke="#e4e2da" strokeWidth="0.5"/>
      <text x="110" y="42" textAnchor="middle" fontSize="10" fill="#6b6470">New matter form</text>
      <rect x="44" y="52" width="132" height="10" rx="2" fill="#f2f0ea"/>
      <rect x="44" y="68" width="132" height="10" rx="2" fill="#f2f0ea"/>
      <rect x="44" y="84" width="80" height="10" rx="2" fill="#f2f0ea"/>
      <rect x="70" y="104" width="80" height="22" rx="4" fill="#534ab7"/>
      <text x="110" y="119" textAnchor="middle" fontSize="9" fill="#eeedfe">Submit + notify</text>
    </svg>
  );
}

function WordAddinVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="10" y="10" width="200" height="130" rx="6" fill="#fff" stroke="#e4e2da" strokeWidth="0.5"/>
      <rect x="10" y="10" width="60" height="130" rx="6" fill="#eeedfe" stroke="#afa9ec" strokeWidth="0.5"/>
      <text x="40" y="32" textAnchor="middle" fontSize="8" fontWeight="500" fill="#3c3489">LNP Add-in</text>
      <rect x="18" y="42" width="44" height="10" rx="3" fill="#534ab7"/>
      <text x="40" y="51" textAnchor="middle" fontSize="7" fill="#fff">Apply Style</text>
      <rect x="18" y="58" width="44" height="10" rx="3" fill="#fff" stroke="#afa9ec" strokeWidth="0.5"/>
      <text x="40" y="67" textAnchor="middle" fontSize="7" fill="#3c3489">Format Table</text>
      <rect x="18" y="74" width="44" height="10" rx="3" fill="#fff" stroke="#afa9ec" strokeWidth="0.5"/>
      <text x="40" y="83" textAnchor="middle" fontSize="7" fill="#3c3489">AI Classify</text>
      <rect x="82" y="22" width="120" height="8" rx="2" fill="#f2f0ea"/>
      <rect x="82" y="36" width="100" height="6" rx="2" fill="#f2f0ea"/>
      <rect x="82" y="48" width="120" height="6" rx="2" fill="#f2f0ea"/>
      <rect x="82" y="60" width="88" height="6" rx="2" fill="#f2f0ea"/>
      <rect x="82" y="78" width="120" height="6" rx="2" fill="#eeedfe"/>
      <rect x="82" y="90" width="110" height="6" rx="2" fill="#eeedfe"/>
      <rect x="82" y="108" width="120" height="6" rx="2" fill="#f2f0ea"/>
      <rect x="82" y="120" width="80" height="6" rx="2" fill="#f2f0ea"/>
    </svg>
  );
}

function EmailRouterVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="10" y="20" width="52" height="38" rx="4" fill="#faeeda" stroke="#fac775" strokeWidth="0.5"/>
      <text x="36" y="38" textAnchor="middle" fontSize="8" fill="#633806">Email</text>
      <text x="36" y="50" textAnchor="middle" fontSize="7" fill="#633806">attachment</text>
      <line x1="62" y1="39" x2="80" y2="39" stroke="#e4e2da" strokeWidth="1"/>
      <polygon points="80,35 88,39 80,43" fill="#e4e2da"/>
      <rect x="88" y="20" width="60" height="38" rx="4" fill="#eeedfe" stroke="#afa9ec" strokeWidth="0.5"/>
      <text x="118" y="38" textAnchor="middle" fontSize="8" fontWeight="500" fill="#3c3489">Claude AI</text>
      <text x="118" y="50" textAnchor="middle" fontSize="7" fill="#3c3489">classifier</text>
      <line x1="148" y1="39" x2="165" y2="39" stroke="#e4e2da" strokeWidth="0.5"/>
      <line x1="165" y1="39" x2="165" y2="60" stroke="#e4e2da" strokeWidth="0.5"/>
      <line x1="165" y1="39" x2="165" y2="110" stroke="#e4e2da" strokeWidth="0.5"/>
      <rect x="168" y="48" width="44" height="28" rx="3" fill="#e1f5ee" stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="190" y="62" textAnchor="middle" fontSize="6.5" fill="#085041">Correspondence</text>
      <text x="190" y="71" textAnchor="middle" fontSize="6.5" fill="#085041">to SharePoint</text>
      <rect x="168" y="98" width="44" height="28" rx="3" fill="#f2f0ea" stroke="#d3d1c7" strokeWidth="0.5"/>
      <text x="190" y="112" textAnchor="middle" fontSize="6.5" fill="#5f5e5a">Documents</text>
      <text x="190" y="121" textAnchor="middle" fontSize="6.5" fill="#5f5e5a">to SharePoint</text>
    </svg>
  );
}

const PROJECTS = [
  {
    id: "nex-arch", tag: "Featured / Workload management", name: "Nex-Arch",
    category: "fullstack", featured: true,
    problem: "No one knew who was overloaded until it was too late.",
    solution: "Built a smart workload management app that auto-allocates tasks, surfaces dashboards, and syncs with Microsoft Teams calendars.",
    impact: "Eliminated manual workload tracking and improved team transparency across the firm.",
    stack: ["JavaScript","React", "Teams Calendar API", "SharePoint"],
    links: ["Private internal tool"],
    Vis: NexArchVis,
  },
  {
    id: "lnp-word-addin", tag: "Developer tooling", name: "LNP Word Add-in",
    category: "fullstack", featured: false,
    problem: "Formatting legal documents to house style took hours of manual work.",
    solution: "Built a Word task pane add-in that applies house styles using ai, table borders, heading hierarchies, and AI-assisted paragraph correction.",
    impact: "Cut formatting time from hours to minutes across the legal team.",
    stack: ["Office.js", "JavaScript", "HTML/CSS", "OpenRouter API"],
    links: ["Private internal tool"],
    Vis: WordAddinVis,
  },
  {
    id: "email-classifier", tag: "power-platform", name: "Email Attachment Router",
    category: "power-platform", featured: false,
    problem: "Incoming emails and email attachments got lost or miscategorised in our teams channels.",
    solution: "Created a Power Automate flow to classify emails and attachments and route them to SharePoint by extracting the matter number from the email and directing them to the right sharepoint folder",
    impact: "Removed manual sorting so attachments land in the right place on arrival.",
    stack: ["Power Automate", "OpenRouter", "Claude API", "SharePoint"],
    links: ["Private internal tool"],
    Vis: EmailRouterVis,
  },
  { id: "coming-soon", comingSoon: true },
];

const FILTERS = [
  { id: "all",            label: "All projects" },
  { id: "power-platform", label: "Power Platform" },
  { id: "fullstack",      label: "Full-stack" },
  { id: "automation",     label: "Automation / AI" },
];

function CaseStudyRow({ label, text }) {
  return (
    <div className="case-row">
      <span>{label}</span>
      <p>{text}</p>
    </div>
  );
}

function StackPill({ label }) {
  return <span className="pill">{label}</span>;
}

function FilterTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`filter-tab${active ? " filter-tab--active" : ""}`}
    >
      {label}
    </button>
  );
}

function ProjectCard({ project }) {
  const { Vis } = project;

  if (project.comingSoon) {
    return (
      <div className="project-card project-card--coming-soon">
        <div>
          <div className="project-card__tag">Personal project</div>
          <div className="project-card__name" style={{ color: "#b4b2a9" }}>Coming soon</div>
          <p className="project-card__desc">A personal project with open-source code, currently in progress.</p>
          <div className="project-card__links">
            <span>Public repo planned</span>
          </div>
        </div>
        <div className="project-card__vis">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <line x1="16" y1="4" x2="16" y2="28" stroke="#d3d1c7" strokeWidth="1"/>
            <line x1="4" y1="16" x2="28" y2="16" stroke="#d3d1c7" strokeWidth="1"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`project-card${project.featured ? " project-card--featured" : ""}`}>
      <div>
        {project.featured && (
          <div className="project-card__featured-badge">
            <span className="project-card__featured-dot" />
            Featured
          </div>
        )}
        <div className="project-card__tag">{project.tag}</div>
        <div className="project-card__name">{project.name}</div>
        <div className="case-list">
          <CaseStudyRow label="Problem" text={project.problem} />
          <CaseStudyRow label="Solution" text={project.solution} />
          <CaseStudyRow label="Impact" text={project.impact} />
        </div>
        <div className="project-card__stack">
          {project.stack.map(s => <StackPill key={s} label={s} />)}
        </div>
        <div className="project-card__links">
          {project.links.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
      </div>
      <div className="project-card__vis">
        <Vis />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState("all");

  const visible = PROJECTS.filter(p => {
    if (p.comingSoon) return active === "all";
    return active === "all" || p.category === active;
  });

  return (
    <section className="projects" id="projects">
      <p className="eyebrow">Projects</p>
      <h2 className="section-title">What I've shipped</h2>
      <p className="section-subtitle">Case studies from production work and personal builds.</p>

      <div className="projects__filters">
        {FILTERS.map(f => (
          <FilterTab key={f.id} label={f.label} active={active === f.id} onClick={() => setActive(f.id)} />
        ))}
      </div>

      <div className="projects__list">
        {visible.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>

      <div className="projects__footer">
        <span>More coming soon</span>
      </div>
    </section>
  );
}
