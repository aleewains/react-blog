import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

// 1. Define the Post interface based on your Appwrite schema
interface PostData {
  $id: string;
  title: string;
  content: string;
  featuredImage: string;
  userId: string;
}

export default function Post() {
  // Explicitly typing the state
  const [post, setPost] = useState<PostData | null>(null);

  // useParams can return undefined for specific keys
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((state: RootState) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        // Casting the response to our interface
        if (post) setPost(post as unknown as PostData);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = useCallback(() => {
    if (post) {
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
    <article className="py-12">
      <Container>
        {/* Hero Image */}
        <div className="relative mb-10 overflow-hidden rounded-2xl bg-bg-secondary">
          <img
            src={service.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full max-h object-cover"
          />

          {isAuthor && (
            <div className="absolute right-4 top-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <Button variant="danger" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title */}
        <header className="mb-8">
          <h1 className="font-heading text-4xl leading-tight text-text-primary">
            {post.title}
          </h1>
        </header>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert">
          {parse(post.content)}
        </div>
      </Container>
    </article>
  );
}
