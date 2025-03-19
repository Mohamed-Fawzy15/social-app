"use client";
import { loginInterface } from "@/Interfaces/Interfaces";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // Navigation styles
import "swiper/css/pagination"; // Pagination styles
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { AppDispatch, GlobalState } from "@/Redux/store";
import { RiUserAddFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { loginUser } from "@/Redux/slices/userSlice";

const inputStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
    backgroundColor: "white",
    borderRadius: "20px",
    overflow: "hidden",
  },
};

export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: GlobalState) => state.user);

  const router = useRouter();

  const schema = z.object({
    email: z.string().email("Email must be valid"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters"
      ),
  });

  const defaultValues: loginInterface = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<loginInterface>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const loginFunc = async (values: loginInterface) => {
    const data = await dispatch(loginUser(values));
    console.log(data);

    if (data.payload?.message === "success") {
      router.push("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <Box
        sx={{
          bgcolor: "#eeeeee",
          borderRadius: "20px",
          width: "100%",
          py: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSubmit(loginFunc)}
          className="flex flex-col gap-2 items-center w-full md:w-1/3 "
        >
          <div className=" py-2">
            <div className="flex items-center justify-center">
              <RiUserAddFill className="text-3xl mx-2" />
              <h1 className="text-2xl">Log In</h1>
            </div>

            {error && (
              <Typography
                color="error"
                variant="body1"
                sx={{ mb: 1, textAlign: "center" }}
              >
                {error} {/* e.g., "User already has an account" */}
              </Typography>
            )}
          </div>

          {/* email */}
          <div className="w-3/4">
            <TextField
              {...register("email")}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={inputStyle}
            />
          </div>
          {/* password */}
          <div className="w-3/4">
            <TextField
              {...register("password")}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={inputStyle}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isLoading}
            startIcon={isLoading ? null : <RiUserAddFill />}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Loading..." : "Log In"}
          </Button>

          <p>
            does doesn&apos;t have account{" "}
            <Link href={"/signup"} className="text-blue-500 underline">
              Sign Up?
            </Link>
          </p>
        </form>
        <div className="hidden md:flex md:w-2/3">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 2500, // Time in milliseconds between slides (2.5 seconds)
              disableOnInteraction: false, // Keeps autoplay running even after user interaction
            }}
            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          >
            <SwiperSlide>
              <div style={{ background: "#f00", height: "200px" }}>Slide 1</div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ background: "#0f0", height: "200px" }}>Slide 2</div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ background: "#00f", height: "200px" }}>Slide 3</div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ background: "#ff0", height: "200px" }}>Slide 4</div>
            </SwiperSlide>
          </Swiper>
        </div>
      </Box>
    </div>
  );
}
