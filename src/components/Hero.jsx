import CanvasAnimation from "./CanvasAnimation";
import Button from "./Button";

function Hero() {
  const highlights = [
    { value: "5+", label: "production tools" },
    { value: "React", label: "frontend builds" },
    { value: "Power Platform", label: "business systems" },
    { value: "AWS", label: "Cloud Computing" },
    { value: "Johannesburg", label: "based developer" },
  ];

  return (
    <section className="hero" id="home">
      <CanvasAnimation className="hero__canvas" />

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Backend developer / Automation builder / System Developer</p>
          <h1>Jubilant Chikukwa</h1>

          <p>
            Johannesburg-based developer building scalable backend systems, cloud applications, and practical 
            automation solutions for real-world problems. Passionate about AWS, APIs, system design, and creating 
            software that makes work more efficient.
          </p>

          <div className="hero__buttons">
            <Button href="#projects">View My Work</Button>
            <Button href="#contact" variant="secondary">Get in touch</Button>
            <Button
              href="mailto:jpchikukwa@gmail.com?subject=CV%20request"
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

        <aside className="hero-visual" aria-label="Deployment terminal visual">
          <div className="hero-visual__window">
            <div className="hero-visual__bar">
              <span />
              <span />
              <span />
            </div>

            <div className="hero-terminal">
              <p><span className="hero-terminal__prompt">$</span> deploy --flow automation</p>
              <p className="hero-terminal__log">→ building interface...</p>
              <p className="hero-terminal__log">→ compiling react app...</p>
              <p><span className="hero-terminal__ok">✓</span> business flow live</p>
              <p className="hero-terminal__cursor"><span className="hero-terminal__prompt">$</span> <span>_</span></p>
            </div>

            <div className="hero-visual__chips">
              <span>JavaScript</span>
              <span>AWS</span>
              <span>Power Apps</span>
              <span>SharePoint</span>
              <span>React</span>
              <span>HTML</span>
              <span>Node.js</span>
              <span>Python</span>
              <span>MongoDB</span>
              <span>SQL</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
