const posts = [
  {
    title: "How I Think About Useful Automation",
    date: "Coming soon",
    tag: "Automation",
    excerpt:
      "A practical note on choosing workflows that remove real friction instead of adding another system for people to maintain.",
  },
  {
    title: "Building Legal Tools People Actually Use",
    date: "Coming soon",
    tag: "Product",
    excerpt:
      "Lessons from turning messy operational needs into clear interfaces, reliable flows, and better day-to-day visibility.",
  },
  {
    title: "From Frontend Polish to Business Impact",
    date: "Coming soon",
    tag: "Frontend",
    excerpt:
      "Why small UI decisions matter when a dashboard or portal becomes part of someone's daily work rhythm.",
  },
];

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
            <article className="blog-card" key={post.title}>
              <div className="blog-card__meta">
                <span>{post.tag}</span>
                <span>{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="blog-card__status">Draft planned</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
