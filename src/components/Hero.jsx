import CanvasAnimation from "./CanvasAnimation";
import { TypeAnimation } from "react-type-animation";
import Button from "./Button";

function BounceText({ text }) {
  return (
    <span className="bounce-wrapper">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="bounce-letter"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function Hero() {
  return (
    <section className="hero">

      {/* Background Animation */}
      <CanvasAnimation />

      {/* Text Content */}
      <div className="hero-content">

        <h1>
            Hi, I'm{" "}
            <span className="accent">
                <BounceText text="Jubilant Chikukwa" />
            </span>
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

export default Hero;