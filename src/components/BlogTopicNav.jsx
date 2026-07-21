import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { posts } from "../posts";
import {
  createExpandedCategoryState,
  groupPostsByCategory,
  toggleCategoryState,
} from "../postUtils";

const categories = groupPostsByCategory(posts);

function BlogTopicNav() {
  const { slug } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(() =>
    createExpandedCategoryState(categories),
  );

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
        <span className="blog-sidebar__label">Categories</span>
        <ul className="blog-sidebar__categories">
          {categories.map((category) => {
            const isExpanded = Boolean(expandedCategories[category.name]);
            const categoryId = `blog-category-${category.name.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <li className="blog-sidebar__category" key={category.name}>
                <button
                  type="button"
                  className="blog-sidebar__category-toggle"
                  onClick={() =>
                    setExpandedCategories((current) =>
                      toggleCategoryState(current, category.name),
                    )
                  }
                  aria-expanded={isExpanded}
                  aria-controls={categoryId}
                >
                  <span>{category.name}</span>
                  {isExpanded ? (
                    <ChevronDown size={16} strokeWidth={2} />
                  ) : (
                    <ChevronRight size={16} strokeWidth={2} />
                  )}
                </button>

                {isExpanded ? (
                  <ul className="blog-sidebar__list" id={categoryId}>
                    {category.posts.map((post) => (
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
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default BlogTopicNav;
