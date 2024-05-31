import { useForm } from "react-hook-form";

import { useChangePasswordMutation } from "../../api/login/cahnge-passowrd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const [changePassword, { isSuccess, error, isLoading }] =
    useChangePasswordMutation({});

  const onSubmit = (data) => {
    changePassword({
      old_password: data?.old,
      password: data?.new,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("access");
      localStorage.removeItem("userId");
      localStorage.removeItem("is_admin");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-main-shadow rounded-[10px]  p-4 my-2"
    >
      <div>
        <p className="text-[20px] font-[400] text-[#000000] mb-2">Password</p>
        <div>
          <label htmlFor="" className="text-[#8D8D8D] text-[16px]">
            Old password
          </label>
          <input
            className="w-full rounded-[4px] bg-[#F5F7FB] py-2 px-4"
            type="text"
            {...register("old")}
          />
        </div>

        <div>
          <label htmlFor="" className="text-[#8D8D8D] text-[16px]">
            New password
          </label>
          <input
            className="w-full rounded-[4px] bg-[#F5F7FB] py-2 px-4"
            type="text"
            {...register("new")}
          />
        </div>
      </div>

      <div className="">
        <p className="text-[red]"> {error?.data?.message} </p>
      </div>

      <div className="flex items-center justify-end gap-x-4 mt-[10px]">
        <button
          type="submit"
          className="bg-[#065AD8] w-[160px] text-[#fff] font-[400] rounded-[10px] p-2"
        >
          {isLoading ? "isLoading" : "Change"}
        </button>
      </div>
    </form>
  );
};
