// Timeline.jsx
const milestones = [
  { year: "2021-2024", role: "Bachelor of science(Computer Science)", place: "Wits University" },
  { year: "2024-2024", role: "Bachelor of science Honours(Computer Science)", place: "Wits University" },
  { year: "2024", role: "Murex Analyst", place: "Kion" },
  { year: "2024–Current", role: "Junior Software Developer", place: "LNP Beyond Legal" },
];

function Timeline() {
  return (
    <div className="timeline">
      {milestones.map((m, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-dot" />
          <div className="timeline-text">
            <span className="timeline-year">{m.year}</span>
            <span className="timeline-role">{m.role}</span>
            <span className="timeline-place">{m.place}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;