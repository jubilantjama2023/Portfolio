function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__cta">
          <p className="eyebrow">Contact</p>
          <h2>Let's build something useful.</h2>
          <p>
            Want help turning manual work into a clean internal tool? I work on
            frontend projects, Power Platform systems, and practical AI-assisted
            workflows.
          </p>
        </div>

        <div className="footer__links" aria-label="Contact links">
          <a href="mailto:jubilant.chikukwa@example.com">Email</a>
          <a href="mailto:jubilant.chikukwa@example.com?subject=CV%20request">
            Request CV
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>Jubilant Chikukwa</span>
        <span>Frontend Developer / Johannesburg</span>
      </div>
    </footer>
  );
}

export default Footer;
