import Skills from "./Skills";
import Timeline from "./Timeline";

const certifications = [
  {
    issuer: "AWS",
    title: "AWS Certified Cloud Practitioner",
    href: "#",
  },
  {
    issuer: "AWS",
    title: "AWS Certified Solutions Architect",
    href: "#",
  },
  {
    issuer: "Microsoft",
    title: "Power Automate Certification",
    href: "#",
  },
];

function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div>
          <p className="about__eyebrow">About</p>
          <h2 className="about__title">The developer behind the tools</h2>
          <p className="about__bio">
            I'm a junior developer based in Johannesburg, currently building
            production tools at LNP Beyond Legal. I work across the full stack,
            from Power Apps and automation flows to JavaScript front-ends and
            AI-assisted workflows. I care about software that actually gets used,
            not just shipped.
          </p>

          <Skills />

          <div className="certifications">
            <p className="skills__label">Certifications</p>
            <div className="certifications__list">
              {certifications.map((cert) => (
                <a className="certification-card" href={cert.href} key={cert.title}>
                  <span>{cert.issuer}</span>
                  <strong>{cert.title}</strong>
                  <em>Credential link placeholder</em>
                </a>
              ))}
            </div>
          </div>

          <Timeline />
        </div>
      </div>
    </section>
  );
}

export default About;
