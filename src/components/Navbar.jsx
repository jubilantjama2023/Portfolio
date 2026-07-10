import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isBlogPost = location.pathname.startsWith("/blog/");

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="navbar" aria-label="Primary navigation">
      {isBlogPost ? (
        <Link className="navbar__logo" to="/" aria-label="Jubilant Chikukwa home">
          JC
        </Link>
      ) : (
        <a className="navbar__logo" href="#home" aria-label="Jubilant Chikukwa home">
          JC
        </a>
      )}

      {!isBlogPost && (
        <ul className="navbar__links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;