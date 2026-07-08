const milestones = [
  { year: "2021-2024", role: "BSc Computer Science", place: "Wits University" },
  { year: "2024", role: "BSc Honours CS", place: "Wits University" },
  { year: "2024", role: "Murex Analyst", place: "Kion" },
  { year: "2024-Now", role: "Junior Developer", place: "LNP Beyond Legal" },
];

function Timeline() {
  return (
    <div className="timeline">
      {milestones.map((m) => (
        <div className="timeline__item" key={`${m.year}-${m.role}`}>
          <div className="timeline__dot" />
          <div className="timeline__text">
            <span className="timeline__year">{m.year}</span>
            <span className="timeline__role">{m.role}</span>
            <span className="timeline__place">{m.place}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
