import Button from "./Button";
import Skills from "./Skills";
import profileImg from "../assets/hero.png";
function About() {
  return (
    <section className="about">

    

      {/* Text Content */}
      <div className="about-content">

        <h1 className="about-label">
            About
        </h1>

        <h1 className="about-paragraph">
            The developer behind the tools
        </h1>

        <p>
        CS Honours graduate building scalable APIs, integrations, and systems that solve real problems.
        </p>

        {/* NEW WRAPPER */}
        <div className="about-row">

          {/* IMAGE */}
          <img
            src={profileImg}   // put your image in public folder
            alt="Developer portrait"
            className="about-image"
          />
          <div className="right-bar">
            <p className="side-paragraph">
              I'm a junior developer based in Johannesburg, currently building production tools at LNP Beyond Legal.
              I work across the full stack — from Power Apps and automation flows to JavaScript front-ends and AI-assisted workflows. 
              I care about software that actually gets used, not just shipped.
            </p>

            <Skills/>
        </div>

          

      </div>





        <div className="hero-buttons">
          <Button>View My Work</Button>
          <Button variant="secondary">Get in touch</Button>
        </div>

     </div>

    </section>
  );
}
export default About;