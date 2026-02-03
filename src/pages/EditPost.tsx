import { useEffect, useState } from "react";
import { PostForm, Container } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import type { Models } from "appwrite";
// Define the Post type
interface Post extends Models.Document {
  title: string;
  content: string;
  slug: string;
  featuredImage: string;
  status: "active" | "inactive";
  userId: string;
  // Add other fields as needed
}
function EditPost() {
  const [post, setPost] = useState<Post | null>(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post as unknown as Post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
