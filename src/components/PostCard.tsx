import service from "../appwrite/config";
import { Link } from "react-router-dom";

interface Post {
  $id: string;
  title: string;
  featuredImage: string;
}

function PostCard({ $id, title, featuredImage }: Post) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-amber-50 rounded-xl  p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="w-full rounded-xl"
          />
        </div>
        <div className="">
          <header>
            <h1 className="text-xl text-gray-800 font-bold">{title}</h1>
          </header>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
