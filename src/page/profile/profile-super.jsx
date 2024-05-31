import { Avatar } from "@mui/material";
import {
  useEditProfileMutation,
  useGetProfileQuery,
} from "../../api/profile/profile";
import { useForm } from "react-hook-form";
import { ChangePassword } from "./change-password";
// import { useState } from "react";

export const ProfileSuper = () => {
  const id = localStorage.getItem("userId");

  const { data } = useGetProfileQuery({ id: id });
  const [editProfile, { isLoading }] = useEditProfileMutation({});

  const { register, handleSubmit } = useForm();
  const onSubmit = (form_data) => {
    const formData = new FormData();

    formData.append(
      "maximum_project",
      form_data.maximum_project
        ? form_data.maximum_project
        : data?.data?.maximum_project
    );
    formData.append("bio", form_data.bio);
    formData.append(
      "email",
      form_data.email ? form_data.email : data?.data?.email
    );
    formData.append("username", data?.data?.username);
    formData.append("university_id", data?.data?.university_id);

    editProfile(formData);
  };

  console.log({ data });

  const getType = JSON.parse(localStorage.getItem("is_admin"));

  return (
    <div className="container mx-auto grid grid-cols-12 gap-4 py-[60px]">
      <div className="xl:col-span-3 col-span-12 h-[400px] flex flex-col gap-4 items-center justify-center bg-white shadow-main-shadow rounded-[10px]">
        <p className="text-main-color text-[16px] font-[500]">
          Personal Details
        </p>

        {/* <label htmlFor="image"> */}
        <Avatar
          alt="profile-image"
          src={data?.data?.image}
          sx={{
            width: "170px",
            height: "170px",
            border: "1px solid #065AD8",
          }}
        />
        {/* </label> */}
        {/* <input
          onChange={(e) => setImage(e.target.value)}
          type="file"
          id="image"
          hidden
        /> */}

        <p className="text-[28px] font-[600] text-[#000000]">
          {data?.data?.username}
        </p>
        <p className="text-[16px] font-[400] text-[#cccccc]">
          {data?.data?.specialty?.title}
        </p>
      </div>
      <div className="xl:col-span-9 col-span-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <p className="text-[22px] font-[600] text-[#000000] mb-2">
            My profile
          </p>

          <div className="bg-white shadow-main-shadow rounded-[10px]  p-4 my-2">
            <p className="text-[20px] font-[400] text-[#000000] mb-2">
              Contact Info
            </p>
            <div>
              <label htmlFor="" className="text-[#8D8D8D] text-[16px]">
                Email
              </label>
              <input
                className="w-full rounded-[4px] bg-[#F5F7FB] py-2 px-4"
                type="text"
                defaultValue={data ? data?.data?.email : ""}
                {...register("email")}
              />
            </div>
          </div>

          {getType ? (
            <div className="bg-white shadow-main-shadow rounded-[10px]  p-4 my-2">
              <p className="text-[20px] font-[400] text-[#000000] mb-2">
                Projects
              </p>
              <div>
                <div
                  htmlFor=""
                  className="text-[#8D8D8D] text-[16px] flex items-center justify-between w-full mb-1"
                >
                  Maximum number of project
                  <span className="text-red-500">
                    {data?.data?.active_projects
                      ? data?.data?.maximum_project -
                        data?.data?.active_projects
                      : data?.data?.maximum_project}{" "}
                    Projects left
                  </span>
                </div>
                <input
                  className="w-full rounded-[4px] bg-[#F5F7FB] py-2 px-4"
                  type="text"
                  defaultValue={data ? data?.data?.maximum_project : ""}
                  {...register("maximum_project")}
                />
              </div>
            </div>
          ) : null}

          <div className="bg-white shadow-main-shadow rounded-[10px]  p-4 my-2">
            <p className="text-[20px] font-[400] text-[#000000] mb-2">
              Personal Info
            </p>
            {getType ? (
              <div>
                <label htmlFor="" className="text-[#8D8D8D] text-[16px]">
                  specialization
                </label>
                <input
                  className="w-full rounded-[4px] bg-[#F5F7FB] py-2 px-4"
                  type="text"
                  defaultValue={data ? data?.data?.specialty?.title : ""}
                  {...register("specialization")}
                />
              </div>
            ) : null}
            <div>
              <label htmlFor="" className="text-[#8D8D8D] text-[16px]">
                About me
              </label>
              <textarea
                {...register("bio")}
                className="w-full rounded-[4px] bg-[#F5F7FB] py-2 px-4 h-[120px] resize-none"
                type="text"
                defaultValue={data ? data?.data?.bio : ""}
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 mt-[10px]">
            <button
              type="submit"
              className="bg-[#065AD8] w-[160px] text-[#fff] font-[400] rounded-[10px] p-2"
            >
              {isLoading ? "isLoading" : "Save"}
            </button>
          </div>
        </form>

        {getType ? <ChangePassword /> : null}
      </div>
    </div>
  );
};
