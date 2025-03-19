import { loginInterface } from "@/Interfaces/Interfaces";
import { getUserData, loginUser } from "@/Redux/slices/userSlice";
import { AppDispatch, GlobalState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";

export function useUserSlice() {
    const dispatch = useDispatch<AppDispatch>();
    
    const {isLoading, token, user, error} = useSelector((store: GlobalState) => store.user)
    
    const loginFn = (userData: loginInterface) => dispatch(loginUser(userData))
    const getUserDataFn = (token: string) => dispatch(getUserData(token))
    
    return {
        loginFn, getUserDataFn, userSliceData: {
            isLoading, token, user, error
        } 
    }
    }