import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { posts } from "../posts";

function BlogTopicNav() {
  const { slug } = useParams();
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <aside className="blog-sidebar blog-sidebar--collapsed">
        <button
          className="blog-sidebar__toggle blog-sidebar__toggle--icon"
          onClick={() => setCollapsed(false)}
          aria-expanded={false}
          aria-label="Expand post list"
        >
          <PanelLeftOpen size={18} strokeWidth={2} />
        </button>
      </aside>
    );
  }

  return (
    <aside className="blog-sidebar">
      <div className="blog-sidebar__top">
        <button
          className="blog-sidebar__toggle blog-sidebar__toggle--icon"
          onClick={() => setCollapsed(true)}
          aria-expanded={true}
          aria-label="Collapse post list"
        >
          <PanelLeftClose size={18} strokeWidth={2} />
        </button>
        <Link className="blog-sidebar__portfolio" to="/">
          ← Portfolio
        </Link>
      </div>

      <nav className="blog-sidebar__nav" aria-label="More blog topics">
        <span className="blog-sidebar__label">More posts</span>
        <ul className="blog-sidebar__list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className={`blog-sidebar__link${
                  post.slug === slug ? " blog-sidebar__link--active" : ""
                }`}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default BlogTopicNav;