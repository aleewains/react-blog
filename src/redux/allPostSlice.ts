import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import appWriteService from "../appwrite/config";
interface Post {
  $id: string;
  title: string;
  slug: string;
  content: string;
  status: "active" | "inactive";
  featuredImage: string;
  userId: string;
}
interface AllPosts {
  posts: Post[];
  loading: boolean;
  error: string | null;
}
const initialState: AllPosts = {
  posts: [],
  loading: true,
  error: null,
};

export const fetchPosts = createAsyncThunk<
  Post[], // return type on success
  void, // argument type
  { rejectValue: string }
>("posts/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await appWriteService.getAllPosts();
    if (response === false) {
      return rejectWithValue("failed to fetch posts");
    }
    return response.rows as Post[];
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getAllPosts: (state, action) => {},
  },
});
