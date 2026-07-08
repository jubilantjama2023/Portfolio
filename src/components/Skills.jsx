function Skills() {
  return (
    <div className="skills">
      <p className="skills__label">Build with</p>
      <div className="skills__group">
        <span className="pill pill--accent">JavaScript</span>
        <span className="pill pill--accent">Python</span>
        <span className="pill pill--accent">HTML / CSS</span>
        <span className="pill pill--accent">Power Apps</span>
      </div>

      <p className="skills__label">Automate with</p>
      <div className="skills__group">
        <span className="pill pill--green">Power Automate</span>
        <span className="pill pill--green">n8n</span>
        <span className="pill pill--green">Langflow</span>
      </div>

      <p className="skills__label">Deploy on</p>
      <div className="skills__group">
        <span className="pill pill--amber">AWS</span>
        <span className="pill pill--amber">SharePoint</span>
        <span className="pill pill--amber">Microsoft 365</span>
      </div>
    </div>
  );
}

export default Skills;
