"use client";

import { useEffect } from "react";
import { usePostsSlice } from "@/Hooks/usePostsSlice";
import PostCard from "./(Component)/Card/PostCard";
import { useUserSlice } from "@/Hooks/useUserSlice";
import { Grid2 as Grid } from "@mui/material";
import { postData } from "@/Interfaces/Interfaces";
import HomeSideProfile from "./(Component)/HomeSideProfile/HomeSideProfile";
import ContactSide from "./(Component)/ContactSide/ContactSide";
import { IoMdSearch, IoIosMore } from "react-icons/io";

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
          <Grid
            size={{ xs: 0, md: 3 }}
            display={{ xs: "none", md: "flex" }}
            position={"sticky"}
          >
            <HomeSideProfile />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {posts.map((post: postData) => (
              <div key={post._id} className="my-5">
                <PostCard post={post} />
              </div>
            ))}
          </Grid>
          <Grid
            size={{ xs: 0, md: 3 }}
            display={{ xs: "none", md: "flex" }}
            className="contactSidebar"
          >
            <div className="fixed">
              <div className="flex justify-between mt-2">
                <h2>Contact</h2>

                <div className="flex ">
                  <IoMdSearch className="text-lg" />
                  <IoIosMore className="text-lg" />
                </div>
              </div>
              {posts.map((post: postData) => (
                <div key={post._id}>
                  <ContactSide user={post.user} />
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      ) : (
        "empty"
      )}
    </>
  );
}
