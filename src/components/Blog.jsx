import { Link } from "react-router-dom";
import { posts } from "../posts";

function Blog() {
  return (
    <section className="blog" id="blog">
      <div className="blog__inner">
        <div className="section-heading">
          <p className="eyebrow">Blog</p>
          <h2 className="section-title">Notes from the build process</h2>
          <p className="section-subtitle">
            Planned articles on frontend craft, automation, and building tools for real teams.
          </p>
        </div>

        <div className="blog__grid">
          {posts.map((post) => (
            <Link className="blog-card" key={post.slug} to={`/blog/${post.slug}`}>
              <div className="blog-card__meta">
                <span>{post.tag}</span>
                <span>{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="blog-card__status">Read more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;