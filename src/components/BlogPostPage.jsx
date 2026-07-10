import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { posts } from "../posts";
import BlogTopicNav from "./BlogTopicNav";

function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/" replace />;

  return (
    <div className="blog-post-layout">
      <BlogTopicNav />

      <section className="blog-post" id="blog-post">
        <div className="blog-post__inner">
          <p className="eyebrow">{post.tag}</p>
          <h1>{post.title}</h1>
          <p className="blog-post__date">{post.date}</p>
          <div className="blog-post__body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostPage;