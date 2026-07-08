import CanvasAnimation from "./CanvasAnimation";
import Button from "./Button";

function Hero() {
  const highlights = [
    { value: "5+", label: "production tools" },
    { value: "React", label: "frontend builds" },
    { value: "Power Platform", label: "business systems" },
    { value: "Johannesburg", label: "based developer" },
  ];

  return (
    <section className="hero" id="home">
      <CanvasAnimation className="hero__canvas" />

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Frontend developer / Automation builder</p>
          <h1>Jubilant Chikukwa</h1>

          <p>
            Johannesburg-based developer building polished frontend tools, Power
            Platform systems, and practical automation workflows for real
            operational problems.
          </p>

          <div className="hero__buttons">
            <Button href="#projects">View My Work</Button>
            <Button href="#contact" variant="secondary">Get in touch</Button>
            <Button
              href="mailto:jubilant.chikukwa@example.com?subject=CV%20request"
              variant="secondary"
            >
              Request CV
            </Button>
          </div>

          <div className="impact-strip" aria-label="Portfolio highlights">
            {highlights.map((item) => (
              <div className="impact-strip__item" key={item.label}>
                <span>{item.value}</span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-visual" aria-label="Frontend and automation workflow visual">
          <div className="hero-visual__window">
            <div className="hero-visual__bar">
              <span />
              <span />
              <span />
            </div>

            <div className="workflow-node workflow-node--primary">
              <span>Design</span>
              <strong>Interface</strong>
            </div>
            <div className="workflow-line" />
            <div className="workflow-node">
              <span>Build</span>
              <strong>React app</strong>
            </div>
            <div className="workflow-line workflow-line--short" />
            <div className="workflow-node">
              <span>Automate</span>
              <strong>Business flow</strong>
            </div>

            <div className="hero-visual__chips">
              <span>JavaScript</span>
              <span>AWS</span>
              <span>Power Apps</span>
              <span>SharePoint</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
