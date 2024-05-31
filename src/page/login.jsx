import LoginImage from "/public/image/login-image.png";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/login/login";

export const Login = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [login, { isLoading, isSuccess, error }] = useLoginMutation({});

  const onSubmit = (data) => {
    login(data);
  };

  const getType = JSON.parse(localStorage.getItem("is_admin"));

  useEffect(() => {
    if (isSuccess && getType === true) {
      navigate("/Dashboard");
    } else if (isSuccess && getType === false) {
      navigate("/Doctors");
    }
  }, [isSuccess, navigate, getType]);

  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex items-center justify-start ml-[120px] h-screen">
          <div>
            <p className="text-[#000] text-[35px] font-[600] mb-[75px]">
              Log into your Account
            </p>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="text-[#8D8D8D] text-[20px] font-[400] block mb-2">
                    Email
                  </label>
                  <input
                    className="w-[500px] rounded-[16px] bg-[#F1F1F1] py-4 px-4"
                    type="text"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-[red] text-[16px]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label className="text-[#8D8D8D] text-[20px] font-[400] block mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-[500px] rounded-[16px] bg-[#F1F1F1] py-4 px-4"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <span
                      className="absolute top-[50%] right-4 translate-y-[-50%] cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <RemoveRedEyeOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-[red] text-[16px]">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="w-[500px]">
                  <p className="text-[red]"> {error?.data?.message} </p>
                </div>

                <button
                  type="submit"
                  className="bg-[#065AD8] w-full text-[#fff] font-[400] rounded-[10px] p-4 mt-[100px]"
                  disabled={isLoading || isSuccess}
                >
                  {isLoading || isSuccess ? "isLoading..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center bg-[#065AD8] h-screen">
          <img src={LoginImage} alt="login image" />
        </div>
      </div>
    </div>
  );
};
