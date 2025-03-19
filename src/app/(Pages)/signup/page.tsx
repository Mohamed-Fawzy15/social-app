"use client";
import { signUpInterface } from "@/Interfaces/Interfaces";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/Redux/slices/userSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // Navigation styles
import "swiper/css/pagination"; // Pagination styles
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { AppDispatch, GlobalState } from "@/Redux/store";
import { RiUserAddFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

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

  const schema = z
    .object({
      name: z.string().min(3, "Name is required"),
      email: z.string().email("Email must be valid"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must be at least 8 characters"
        ),
      rePassword: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must be at least 8 characters"
        ),
      dateOfBirth: z.string().date(),
      gender: z.string().min(1, "Gender is required"),
    })
    .refine((data) => data.password === data.rePassword, {
      // to check if the password and confirm password are the same
      message: "Passwords must match",
      path: ["rePassword"],
    });

  const defaultValues: signUpInterface = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<signUpInterface>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const signUpFunc = async (values: signUpInterface) => {
    const data = await dispatch(addUser(values));
    if (data.payload?.message === "success") {
      Swal.fire({
        title: "Custom width, padding, color, background.",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
    console.log(data);
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
        <form
          onSubmit={handleSubmit(signUpFunc)}
          className="flex flex-col gap-2 items-center w-full md:w-1/3 "
        >
          <div className=" py-2 justify-center">
            <div className="flex items-center">
              <RiUserAddFill className="text-3xl mx-2" />
              <h1 className="text-2xl">Sign Up</h1>
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
          {/* name */}
          <div className="w-3/4">
            <TextField
              {...register("name")}
              id="name"
              label="Your Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={inputStyle}
            />
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
          {/* confrim password */}
          <div className="w-3/4">
            <TextField
              {...register("rePassword")}
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              error={!!errors.rePassword}
              helperText={errors.rePassword?.message}
              sx={inputStyle}
            />
          </div>
          {/* date of birth */}
          <div className="w-3/4">
            <TextField
              {...register("dateOfBirth")}
              id="outlined-basic"
              label="Date of Birth"
              variant="outlined"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
              sx={inputStyle}
            />
          </div>
          {/* gender */}
          <div className="w-3/4">
            <FormControl fullWidth error={!!errors.gender} sx={inputStyle}>
              <InputLabel id="gender">Gender</InputLabel>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <Select
                    labelId="gender"
                    id="gender"
                    label="Gender"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value || ""}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                )}
              />
              {errors.gender && (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>
          </div>

          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isLoading}
            startIcon={isLoading ? null : <RiUserAddFill />}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>

          <p>
            Already have account{" "}
            <Link href={"/login"} className="text-blue-500 underline">
              Log in?
            </Link>
          </p>
        </form>
      </Box>
    </div>
  );
}
