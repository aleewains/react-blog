import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";

interface PostData {
  $id: string;
  title: string;
  content: string;
  featuredImage: string;
  userId: string;
  $createdAt: string;
}

export default function Post() {
  const [post, setPost] = useState<PostData | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post as unknown as PostData);
        else navigate("/");
        const isAuthor =
          post && userData ? post.userId === userData.$id : false;
        setIsAuthor(isAuthor);
      });
    }
  }, [slug, navigate]);

  const deletePost = useCallback(() => {
    if (
      post &&
      window.confirm("Are you sure you want to delete this masterpiece?")
    ) {
      service.deletePost(post.$id).then((status) => {
        if (status) {
          service.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  }, [post, navigate]);

  if (!post) return null;

  return (
    <div className="bg-bg-primary min-h-screen pb-20">
      {/* Navigation & Actions Bar */}
      <nav className="sticky top-20 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle mb-8">
        <Container>
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} /> Back to Journal
            </button>

            {isAuthor && (
              <div className="flex items-center gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-md bg-bg-muted text-text-primary hover:bg-border transition-all">
                    <Pencil size={12} />
                    Edit
                  </button>
                </Link>

                <button
                  onClick={deletePost}
                  className="flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-md bg-red-50/50 text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </Container>
      </nav>

      <article>
        <Container>
          {/* Header Section */}
          <header className="max-w-3xl mx-auto text-center mb-12 pt-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">
                Journal Entry
              </span>
              <span className="h-px w-12 bg-border-default"></span>
              <time className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {post.$createdAt
                  ? new Date(post.$createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Just now"}
              </time>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-text-primary mb-8">
              {post.title}
            </h1>
          </header>

          {/* Large Hero Image */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="aspect-21/9 overflow-hidden rounded-sm shadow-premium bg-bg-secondary">
              <img
                src={service.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="max-w mx-auto">
            <div
              className="rich-text-content prose prose-lg prose-neutral 
              prose-headings:font-heading prose-headings:font-normal prose-headings:text-text-primary
              prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-8
              prose-blockquote:border-l-accent prose-blockquote:text-accent prose-blockquote:italic
              prose-img:rounded-xl"
            >
              {parse(post.content)}
            </div>
          </div>

          {/* Footer Marker */}
          <footer className="max-w-2xl mx-auto mt-20 pt-10 border-t border-border-subtle text-center">
            <div className="inline-block px-4 py-1 border border-accent rounded-full text-[10px] uppercase tracking-widest text-accent font-bold">
              End of Entry
            </div>
          </footer>
        </Container>
      </article>
    </div>
  );
}
