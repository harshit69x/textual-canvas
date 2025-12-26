import { ScrollReveal } from "../ScrollReveal";
import { useBlogs } from "@/hooks/usePortfolioData";
import { useState } from "react";

export const BlogSection = () => {
  const { data: blogs = [], isLoading } = useBlogs();
  const [hoveredBlog, setHoveredBlog] = useState<string | null>(null);

  // Show only visible and published blogs, limit to 4
  const displayBlogs = blogs.slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-32 px-6 md:px-12 lg:px-24" id="blog">
        <div className="max-w-6xl mx-auto">
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (displayBlogs.length === 0) {
    return null; // Don't render section if no blogs
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-card" id="blog">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
            // Latest Posts
          </p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
            Thoughts & <span className="gradient-text">Ideas</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {displayBlogs.map((blog, index) => (
            <ScrollReveal key={blog._id} delay={index * 100}>
              <a
                href={blog.postUrl || "#"}
                target={blog.postUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50"
                onMouseEnter={() => setHoveredBlog(blog._id)}
                onMouseLeave={() => setHoveredBlog(null)}
              >
                {blog.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-mono text-xs text-muted-foreground">
                      {formatDate(blog.publishedAt)}
                    </span>
                    {blog.readTime && (
                      <span className="text-mono text-xs text-muted-foreground">
                        {blog.readTime} min read
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 ${
                      hoveredBlog === blog._id ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {blog.title}
                  </h3>

                  {blog.excerpt && (
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>
                  )}

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-mono text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
