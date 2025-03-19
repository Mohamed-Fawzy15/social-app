"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, GlobalState } from "@/Redux/store";
import { useEffect } from "react";
import { getAllPosts } from "@/Redux/slices/postsSlice";
export default function Home() {
  const { token } = useSelector((store: GlobalState) => store.user);
  const dispatch = useDispatch<AppDispatch>();
  const { posts, isLoading } = useSelector((store: GlobalState) => store.posts);

  useEffect(() => {
    if (token) {
      dispatch(getAllPosts(token));
    }
  }, []); 

  if (isLoading) {
    return <>loading........................</>;
  }

  return <>{posts.length > 0 ? "posts" : "empty"}</>;
}
