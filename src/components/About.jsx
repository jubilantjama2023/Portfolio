import Button from "./Button";
function About() {
  return (
    <section className="about">

    

      {/* Text Content */}
      <div className="about-content">

        <h1>
            Hi, I'm
        </h1>

        <p>
          Frontend Developer passionate about
          building modern web applications using
          React, JavaScript, and AWS.
        </p>

        <div className="hero-buttons">
          <Button>View My Work</Button>
          <Button variant="secondary">Get in touch</Button>
        </div>

     </div>

    </section>
  );
}
export default About;