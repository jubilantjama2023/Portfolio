function Skills() {
  return (
    <div className="skills">

      <p className="skill-label">BUILD WITH</p>
      {/* Top Skills */}
      <div className="skill-group">
        <span className="skill-pill">JavaScript</span>
        <span className="skill-pill">Python</span>
        <span className="skill-pill">HTML/CSS</span>
        <span className="skill-pill">Power Apps</span>
      </div>

      {/* Section Label */}
      <p className="skill-label">AUTOMATE WITH</p>

      {/* Automation Tools */}
      <div className="skill-group">
        <span className="skill-pill green">Power Automate</span>
        <span className="skill-pill green">n8n</span>
        <span className="skill-pill green">Langflow</span>
      </div>
      
      <p className="skill-label">DEPLOY ON</p>
      <div className="skill-group">
        <span className="skill-pill yellow">AWS</span>
        <span className="skill-pill yellow">Sharepoint</span>
        <span className="skill-pill yellow">Microsoft 365</span>
      </div>


    </div>
  );
}

export default Skills;