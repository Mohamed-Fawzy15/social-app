import { getAllPosts } from "@/Redux/slices/postsSlice";
import { AppDispatch, GlobalState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";

export function usePostsSlice() {
    const dispatch = useDispatch<AppDispatch>();
    
    const {isLoading, posts , error} = useSelector((store: GlobalState) => store.posts)
    

    const getAllPostsFn = (token: string) => dispatch(getAllPosts(token))
    
    return {
         getAllPostsFn, postSliceData: {
            isLoading, posts, error
        } 
    }
    }