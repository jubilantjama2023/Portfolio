import { useState } from "react";

const T = {
  bg: "#f7f6f2", bgAlt: "#fff", border: "#dddbd3", text: "#1a1a1a",
  muted: "#888780", dim: "#b4b2a9", accent: "#534ab7", accentLight: "#eeedfe",
  accentMid: "#afa9ec", accentDark: "#3c3489", green: "#1d9e75",
  greenLight: "#e1f5ee", greenDark: "#085041", amber: "#ef9f27",
  amberLight: "#faeeda", amberDark: "#633806", gray: "#f1efe8",
  grayBorder: "#d3d1c7",
};

function NexArchVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="10" y="10" width="58" height="32" rx="4" fill={T.accentLight} stroke={T.accentMid} strokeWidth="0.5"/>
      <text x="39" y="30" textAnchor="middle" fontSize="10" fill={T.accentDark}>Tasks</text>
      <rect x="81" y="10" width="58" height="32" rx="4" fill={T.accentLight} stroke={T.accentMid} strokeWidth="0.5"/>
      <text x="110" y="30" textAnchor="middle" fontSize="10" fill={T.accentDark}>Calendar</text>
      <rect x="152" y="10" width="58" height="32" rx="4" fill={T.accentLight} stroke={T.accentMid} strokeWidth="0.5"/>
      <text x="181" y="30" textAnchor="middle" fontSize="10" fill={T.accentDark}>Matters</text>
      <line x1="110" y1="42" x2="110" y2="62" stroke={T.accentMid} strokeWidth="0.5"/>
      <rect x="40" y="62" width="140" height="32" rx="4" fill={T.accent} stroke={T.accentDark} strokeWidth="0.5"/>
      <text x="110" y="82" textAnchor="middle" fontSize="10" fill={T.accentLight}>Nex-Arch Engine</text>
      <line x1="80" y1="94" x2="58" y2="112" stroke="#5dcaa5" strokeWidth="0.5"/>
      <line x1="110" y1="94" x2="110" y2="112" stroke="#5dcaa5" strokeWidth="0.5"/>
      <line x1="140" y1="94" x2="162" y2="112" stroke="#5dcaa5" strokeWidth="0.5"/>
      <rect x="18" y="112" width="78" height="26" rx="4" fill={T.greenLight} stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="57" y="129" textAnchor="middle" fontSize="9" fill={T.greenDark}>Auto-allocate</text>
      <rect x="71" y="112" width="78" height="26" rx="4" fill={T.greenLight} stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="110" y="129" textAnchor="middle" fontSize="9" fill={T.greenDark}>Dashboard</text>
      <rect x="124" y="112" width="78" height="26" rx="4" fill={T.greenLight} stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="163" y="129" textAnchor="middle" fontSize="9" fill={T.greenDark}>Alerts</text>
    </svg>
  );
}

function NexAccessVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="20" y="12" width="180" height="126" rx="6" fill="#fff" stroke={T.border} strokeWidth="0.5"/>
      <rect x="20" y="12" width="180" height="26" rx="6" fill={T.accentLight}/>
      <circle cx="36" cy="25" r="5" fill={T.accent}/>
      <text x="48" y="29" fontSize="9" fill={T.accentDark}>Nex-Access Client Portal</text>
      <rect x="30" y="48" width="74" height="12" rx="3" fill={T.gray}/>
      <rect x="116" y="48" width="74" height="12" rx="3" fill={T.gray}/>
      <rect x="30" y="68" width="160" height="8" rx="2" fill={T.gray}/>
      <rect x="30" y="80" width="116" height="8" rx="2" fill={T.gray}/>
      <rect x="30" y="100" width="160" height="26" rx="4" fill={T.greenLight} stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="110" y="117" textAnchor="middle" fontSize="9" fill={T.greenDark}>Download document</text>
    </svg>
  );
}

function NexAddVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="30" y="16" width="160" height="118" rx="6" fill="#fff" stroke={T.border} strokeWidth="0.5"/>
      <text x="110" y="42" textAnchor="middle" fontSize="10" fill={T.muted}>New matter form</text>
      <rect x="44" y="52" width="132" height="10" rx="2" fill={T.gray}/>
      <rect x="44" y="68" width="132" height="10" rx="2" fill={T.gray}/>
      <rect x="44" y="84" width="80" height="10" rx="2" fill={T.gray}/>
      <rect x="70" y="104" width="80" height="22" rx="4" fill={T.accent}/>
      <text x="110" y="119" textAnchor="middle" fontSize="9" fill={T.accentLight}>Submit + notify</text>
    </svg>
  );
}

function WordAddinVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="10" y="10" width="200" height="130" rx="6" fill="#fff" stroke={T.border} strokeWidth="0.5"/>
      <rect x="10" y="10" width="60" height="130" rx="6" fill={T.accentLight} stroke={T.accentMid} strokeWidth="0.5"/>
      <text x="40" y="32" textAnchor="middle" fontSize="8" fontWeight="500" fill={T.accentDark}>LNP Add-in</text>
      <rect x="18" y="42" width="44" height="10" rx="3" fill={T.accent}/>
      <text x="40" y="51" textAnchor="middle" fontSize="7" fill="#fff">Apply Style</text>
      <rect x="18" y="58" width="44" height="10" rx="3" fill="#fff" stroke={T.accentMid} strokeWidth="0.5"/>
      <text x="40" y="67" textAnchor="middle" fontSize="7" fill={T.accentDark}>Format Table</text>
      <rect x="18" y="74" width="44" height="10" rx="3" fill="#fff" stroke={T.accentMid} strokeWidth="0.5"/>
      <text x="40" y="83" textAnchor="middle" fontSize="7" fill={T.accentDark}>AI Classify</text>
      <rect x="82" y="22" width="120" height="8" rx="2" fill={T.gray}/>
      <rect x="82" y="36" width="100" height="6" rx="2" fill={T.gray}/>
      <rect x="82" y="48" width="120" height="6" rx="2" fill={T.gray}/>
      <rect x="82" y="60" width="88" height="6" rx="2" fill={T.gray}/>
      <rect x="82" y="78" width="120" height="6" rx="2" fill={T.accentLight}/>
      <rect x="82" y="90" width="110" height="6" rx="2" fill={T.accentLight}/>
      <rect x="82" y="108" width="120" height="6" rx="2" fill={T.gray}/>
      <rect x="82" y="120" width="80" height="6" rx="2" fill={T.gray}/>
    </svg>
  );
}

function EmailRouterVis() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150">
      <rect x="10" y="20" width="52" height="38" rx="4" fill={T.amberLight} stroke="#fac775" strokeWidth="0.5"/>
      <text x="36" y="38" textAnchor="middle" fontSize="8" fill={T.amberDark}>Email</text>
      <text x="36" y="50" textAnchor="middle" fontSize="7" fill={T.amberDark}>attachment</text>
      <line x1="62" y1="39" x2="80" y2="39" stroke={T.border} strokeWidth="1"/>
      <polygon points="80,35 88,39 80,43" fill={T.border}/>
      <rect x="88" y="20" width="60" height="38" rx="4" fill={T.accentLight} stroke={T.accentMid} strokeWidth="0.5"/>
      <text x="118" y="38" textAnchor="middle" fontSize="8" fontWeight="500" fill={T.accentDark}>Claude AI</text>
      <text x="118" y="50" textAnchor="middle" fontSize="7" fill={T.accentDark}>classifier</text>
      <line x1="148" y1="39" x2="165" y2="39" stroke={T.border} strokeWidth="0.5"/>
      <line x1="165" y1="39" x2="165" y2="60" stroke={T.border} strokeWidth="0.5"/>
      <line x1="165" y1="39" x2="165" y2="110" stroke={T.border} strokeWidth="0.5"/>
      <rect x="168" y="48" width="44" height="28" rx="3" fill={T.greenLight} stroke="#5dcaa5" strokeWidth="0.5"/>
      <text x="190" y="62" textAnchor="middle" fontSize="6.5" fill={T.greenDark}>Correspondence</text>
      <text x="190" y="71" textAnchor="middle" fontSize="6.5" fill={T.greenDark}>→ SharePoint</text>
      <rect x="168" y="98" width="44" height="28" rx="3" fill={T.gray} stroke={T.grayBorder} strokeWidth="0.5"/>
      <text x="190" y="112" textAnchor="middle" fontSize="6.5" fill="#5f5e5a">Documents</text>
      <text x="190" y="121" textAnchor="middle" fontSize="6.5" fill="#5f5e5a">→ SharePoint</text>
    </svg>
  );
}

const PROJECTS = [
  {
    id: "nex-arch", tag: "Featured · Workload management", name: "Nex-Arch",
    category: "power-platform", featured: true,
    problem: '"No one knew who was overloaded until it was too late."',
    desc: "A smart workload management app for legal teams. Auto-allocates tasks based on real-time availability, surfaces performance dashboards, and syncs with Microsoft Teams calendars to align work with matter codes.",
    outcome: "Eliminated manual workload tracking — team transparency improved across the firm",
    stack: ["Power Apps", "Power Automate", "Teams Calendar API", "SharePoint"],
    Vis: NexArchVis,
  },
  {
    id: "nex-access", tag: "Client portal", name: "Nex-Access",
    category: "fullstack", featured: false,
    problem: '"Clients had to call us to find out where their matter stood."',
    desc: "A secure branded client portal built with HTML, CSS, JS, Langflow, and Power Automate. Clients can track matter status, view legal team assignments, and download documents — no phone call needed.",
    outcome: "Clients self-serve document access and matter tracking 24/7",
    stack: ["HTML/CSS/JS", "Langflow", "MongoDB", "Power Automate"],
    Vis: NexAccessVis,
  },
  {
    id: "nex-add", tag: "Matter intake", name: "Nex-Add",
    category: "power-platform", featured: false,
    problem: '"Intake was manual, slow, and inconsistent across departments."',
    desc: "A legal matter intake system using Power Apps and Power Automate. Automates form capture, document generation, and multi-department notifications with real-time matter retrieval by unique ID.",
    outcome: "Significantly reduced manual admin effort and intake turnaround time",
    stack: ["Power Apps", "Power Automate", "SharePoint"],
    Vis: NexAddVis,
  },
  {
    id: "lnp-word-addin", tag: "Developer tooling", name: "LNP Word Add-in",
    category: "fullstack", featured: false,
    problem: '"Formatting legal documents to house style took hours of manual work."',
    desc: "A Microsoft Word task pane add-in using the Office JavaScript API. Applies LNP house styles, table borders, heading hierarchies, and AI-assisted paragraph classification — all from a single panel.",
    outcome: "Formatting time cut from hours to minutes across the legal team",
    stack: ["Office.js", "JavaScript", "HTML/CSS", "OpenRouter API"],
    Vis: WordAddinVis,
  },
  {
    id: "email-classifier", tag: "AI automation", name: "Email Attachment Router",
    category: "automation", featured: false,
    problem: '"Incoming email attachments got lost or miscategorised in shared inboxes."',
    desc: "A Power Automate flow powered by Claude AI via OpenRouter. Classifies incoming email attachments as correspondence or documents and routes them to the correct SharePoint folder automatically.",
    outcome: "Zero manual sorting — all attachments land in the right place on arrival",
    stack: ["Power Automate", "OpenRouter", "Claude API", "SharePoint"],
    Vis: EmailRouterVis,
  },
  { id: "coming-soon", comingSoon: true },
];

const FILTERS = [
  { id: "all", label: "All projects" },
  { id: "power-platform", label: "Power Platform" },
  { id: "fullstack", label: "Full-stack" },
  { id: "automation", label: "Automation / AI" },
];

function OutcomeBadge({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 18 }}>
      <div style={{
        width: 16, height: 16, borderRadius: "50%", background: T.greenLight,
        border: `0.5px solid ${T.green}`, flexShrink: 0, marginTop: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.green }} />
      </div>
      <span style={{ fontSize: 13, color: T.greenDark, lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

function StackPill({ label }) {
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 20, fontSize: 11,
      background: T.gray, color: "#5f5e5a", border: `0.5px solid ${T.grayBorder}`,
    }}>{label}</span>
  );
}

function FilterTab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 18px", borderRadius: 20, fontSize: 12, cursor: "pointer",
      fontFamily: "inherit",
      border: active ? `0.5px solid ${T.accentMid}` : `0.5px solid ${T.border}`,
      background: active ? T.accentLight : "transparent",
      color: active ? T.accentDark : T.muted,
      transition: "all 0.15s ease",
    }}>{label}</button>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const { Vis } = project;

  if (project.comingSoon) {
    return (
      <div style={{
        padding: 36, borderRadius: 10, background: T.bgAlt,
        border: `0.5px dashed ${T.border}`,
        display: "grid", gridTemplateColumns: "minmax(0,1fr) 260px",
        gap: 36, alignItems: "center", opacity: 0.45,
      }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", color: T.accent, textTransform: "uppercase", marginBottom: 10 }}>Personal project</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: T.dim, marginBottom: 14 }}>Coming soon</div>
          <p style={{ fontSize: 14, color: "#5f5e5a", lineHeight: 1.65 }}>A personal project with open-source code — currently in progress.</p>
        </div>
        <div style={{
          height: 170, borderRadius: 8, background: T.bg,
          border: `0.5px dashed ${T.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <line x1="16" y1="4" x2="16" y2="28" stroke={T.grayBorder} strokeWidth="1"/>
            <line x1="4" y1="16" x2="28" y2="16" stroke={T.grayBorder} strokeWidth="1"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 36, borderRadius: 10,
        background: project.featured ? "#faf9ff" : T.bgAlt,
        border: `0.5px solid ${project.featured ? T.accentMid : hovered ? T.accentMid : T.border}`,
        display: "grid", gridTemplateColumns: "minmax(0,1fr) 260px",
        gap: 36, alignItems: "center",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? "0 4px 24px rgba(83,74,183,0.07)" : "none",
      }}
    >
      <div>
        {project.featured && (
          <div style={{ marginBottom: 10 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 10px", borderRadius: 20,
              background: T.accentLight, color: T.accentDark,
              border: `0.5px solid ${T.accentMid}`, fontSize: 10, letterSpacing: "0.06em",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent, display: "inline-block" }} />
              Featured
            </span>
          </div>
        )}
        <div style={{ fontSize: 11, letterSpacing: "0.1em", color: T.accent, textTransform: "uppercase", marginBottom: 10 }}>
          {project.tag}
        </div>
        <div style={{ fontSize: 22, fontWeight: 500, color: T.text, marginBottom: 5 }}>{project.name}</div>
        <div style={{ fontSize: 13, color: T.dim, fontStyle: "italic", marginBottom: 14 }}>{project.problem}</div>
        <p style={{ fontSize: 14, color: "#5f5e5a", lineHeight: 1.65, marginBottom: 14 }}>{project.desc}</p>
        {project.outcome && <OutcomeBadge text={project.outcome} />}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.stack.map(s => <StackPill key={s} label={s} />)}
        </div>
      </div>
      <div style={{
        height: 170, borderRadius: 8, background: T.bg,
        border: `0.5px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
      }}>
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
    <div style={{
      padding: "72px 40px", background: T.bg,
      borderTop: `0.5px solid ${T.border}`,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      minHeight: "100vh",
      
    }}>
      <div style={{ fontSize: 11, letterSpacing: "0.14em", color: T.accent, textTransform: "uppercase", marginBottom: 10, textAlign: "left" }}>Projects</div>
      <div style={{ fontSize: 28, fontWeight: 500, color: T.text, marginBottom: 8, textAlign: "left" }}>What I've shipped</div>
      <div style={{ fontSize: 15, color: T.muted, marginBottom: 36,textAlign: "left"}}>Case studies from production work and personal builds.</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
        {FILTERS.map(f => (
          <FilterTab key={f.id} label={f.label} active={active === f.id} onClick={() => setActive(f.id)} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {visible.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>

      <div style={{
        marginTop: 32, paddingTop: 24, borderTop: `0.5px solid ${T.border}`,
        fontSize: 13, color: T.dim, display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        
        <span style={{ color: T.accentMid, fontSize: 12 }}>More coming soon</span>
      </div>
    </div>
  );
}

