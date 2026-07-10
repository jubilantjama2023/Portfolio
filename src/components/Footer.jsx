function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__cta">
          <p className="eyebrow">Contact</p>
          <h2>Let's build something useful.</h2>
          <p>
            Want help turning manual work into a clean internal tool? Get in Touch
          </p>
        </div>

        <div className="footer__links" aria-label="Contact links">
          <a href="mailto:jpchikukwa@gmail.com">Email</a>
          <a href="mailto:jpchikukwa@gmail.com?subject=CV%20request">
            Request CV
          </a>
          <a href="https://www.linkedin.com/in/jubilant-p-chikukwa-29305b267?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
         
        </div>
      </div>

      <div className="footer__bottom">
        <span>Jubilant Chikukwa</span>
        <span>Backend Developer / Johannesburg</span>
      </div>
    </footer>
  );
}

export default Footer;
