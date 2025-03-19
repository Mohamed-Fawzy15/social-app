"use client";

import { useEffect } from "react";
import { usePostsSlice } from "@/Hooks/usePostsSlice";
import PostCard from "./(Component)/Card/PostCard";
import { useUserSlice } from "@/Hooks/useUserSlice";
import { Grid2 as Grid } from "@mui/material";
import { postData } from "@/Interfaces/Interfaces";
export default function Home() {
  const {
    getAllPostsFn,
    postSliceData: { posts, isLoading, error },
  } = usePostsSlice();

  const {
    getUserDataFn,
    userSliceData: { token, user },
  } = useUserSlice();

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (storedToken && !token) {
      getAllPostsFn(storedToken);
      getUserDataFn(storedToken);
    } else if (token && !user) {
      getAllPostsFn(token);
      getUserDataFn(token);
    }
  }, []);

  if (isLoading) {
    return <>loading........................</>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      {posts.length > 0 ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 0, md: 2 }} display={{ xs: "none", md: "flex" }}>
            <div>{user?.name}</div>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            {posts.map((post: postData) => (
              <div key={post._id} className="my-5">
                <PostCard post={post} />
              </div>
            ))}
          </Grid>
          <Grid size={{ xs: 0, md: 2 }} display={{ xs: "none", md: "flex" }}>
            <div></div>
          </Grid>
        </Grid>
      ) : (
        "empty"
      )}
    </>
  );
}
