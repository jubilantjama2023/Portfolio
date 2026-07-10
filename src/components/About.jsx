import Skills from "./Skills";
import Timeline from "./Timeline";

const certifications = [
  {
    issuer: "AWS",
    title: "AWS Certified Cloud Practitioner",
    href: "https://www.credly.com/badges/0c46f72e-6aeb-4ec2-b146-f6196f4abb0f/public_url",
  },
  {
    issuer: "AWS",
    title: "AWS Certified Solutions Architect",
    href: "https://www.credly.com/badges/d18d91f4-03e9-4844-b1c2-5307904e34d3/public_url",
  },
  {
    issuer: "Microsoft",
    title: "Power Automate Certification",
    href: "https://udemy-certificate.s3.amazonaws.com/image/UC-0e4aa089-b85b-4cf1-b5a8-b4bedb0e35e4.jpg",
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
              {certifications.map((cert) => {
                const hasCredentialLink = cert.href !== "#";

                return (
                  <a
                    className="certification-card"
                    href={cert.href}
                    key={cert.title}
                    rel={hasCredentialLink ? "noreferrer" : undefined}
                    target={hasCredentialLink ? "_blank" : undefined}
                  >
                    <span>{cert.issuer}</span>
                    <strong>{cert.title}</strong>
                    <em>{hasCredentialLink ? "View credential" : "Credential link placeholder"}</em>
                  </a>
                );
              })}
            </div>
          </div>

          <Timeline />
        </div>
      </div>
    </section>
  );
}

export default About;
