import { useEffect, useState } from "react";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../style.css";
import Popup from "../../components/popup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";

import {
  useGetAllDoctorsQuery,
  useAddDoctorsMutation,
} from "../../api/doctors/doctors";
import { useGetAllSpecialtyQuery } from "../../api/specialty/specialty";

export const Doctors = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [rows, setRows] = useState([]);

  const [specials, setSpecials] = useState([]);
  const { data, isLoading: isLoadingGetDoctors } = useGetAllDoctorsQuery({
    word: search,
  });
  const { data: specialtyData } = useGetAllSpecialtyQuery({ word: search });
  const [addDoctors, { isLoading, isSuccess }] = useAddDoctorsMutation({});

  useEffect(() => {
    if (data?.data) {
      setRows(data.data);
      setSpecials(specialtyData?.data);
    }
  }, [data, specialtyData]);

  const schema = yup.object().shape({
    username: yup.string().required("Name is required"),
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required"),
    specialization: yup.string().required("Specialization is required"),
    // image: yup.mixed().required("A image is required"),
    universityId: yup.string().required("University id is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append text fields to formData
    formData.append("is_admin", true);
    formData.append("is_superuser", false);
    formData.append("email", data.email);
    formData.append("email_verified", true);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("university_id", data.universityId);
    formData.append("specialty", data.specialization);

    // Extracting and appending the file to formData
    // Assuming `data.image` is the FileList from an input of type file
    if (data.image && data.image.length > 0) {
      // Access the first file in the FileList
      const file = data.image[0];
      formData.append("image", file);
    }

    // Use your mutation hook to send the formData
    addDoctors(formData);
    reset();
    // Assuming you're handling modal or popup visibility
  };
  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <div className="mx-[35px]">
      <Popup
        isOpen={isOpen}
        handleClose={handleClose}
        title="Required Information"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="text-[#8D8D8D] text-[16px] font-[400] block mb-2">
                Name
              </label>
              <input
                className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
                type="text"
                placeholder="Enter Name here"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-[red] text-[16px]">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className="text-[#8D8D8D] text-[16px] font-[400] block mb-2">
                Personal Photo
              </label>
              <input
                className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
                type="file"
                {...register("image")}
              />
              {errors.image && (
                <p className="text-[red] text-[16px]">{errors.image.message}</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="text-[#8D8D8D] text-[16px] font-[400] block mb-2">
                Specialization
              </label>
              <select
                {...register("specialization")}
                className="w-full bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              >
                <option disabled value="" selected>
                  Select one
                </option>
                {specials?.map((item, key) => (
                  <option value={item?.id} key={key}>
                    {item?.title}
                  </option>
                ))}
              </select>

              {errors.specialization && (
                <p className="text-[red] text-[16px]">
                  {errors.specialization.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className="text-[#8D8D8D] text-[16px] font-[400] block mb-2">
                University ID
              </label>
              <input
                className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
                type="text"
                placeholder="Enter University ID"
                {...register("universityId")}
              />
              {errors.universityId && (
                <p className="text-[red] text-[16px]">
                  {errors.universityId.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label className="text-[#8D8D8D] text-[16px] font-[400] block mb-2">
                Email
              </label>
              <input
                className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
                type="text"
                placeholder="Enter Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[red] text-[16px]">{errors.email.message}</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="text-[#8D8D8D] text-[16px] font-[400] block mb-2">
                Password
              </label>
              <input
                className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
                type="text"
                placeholder="Enter Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-[red] text-[16px]">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 mt-[10px]">
            <button
              className="bg-[#E9E9E9] w-[160px] text-[#fff] font-[400] rounded-[10px] p-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#065AD8] w-[200px] text-[#fff] font-[400] rounded-[10px] p-2"
              disabled={isLoading}
            >
              {isLoading ? "isLoading..." : "Add"}
            </button>
          </div>
        </form>
      </Popup>
      <div className="header mt-[50px] mb-[30px]">
        <p className="text-[#000000] text-[30px] font-[400]">Doctors</p>
        <p className="text-[#8D8D8D] text-[24px] font-[400]">
          Doctors | Doctors List
        </p>
      </div>

      <div className="table-header flex items-center justify-between mb-[15px]">
        <div className="relative search-filed w-[300px] rounded-[8px] overflow-hidden">
          <span className="absolute top-[50%] left-[10px] translate-y-[-50%] text-[#8D8D8D]">
            <SearchIcon className="text-[#8D8D8D]" />
          </span>
          <input
            type="text"
            name="search"
            placeholder="Search here.."
            className="w-full text-[#8D8D8D] py-[10px] pl-[40px] font-[500]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="table-header-button" onClick={() => setIsOpen(true)}>
          <AddIcon /> Add Doctor
        </button>
      </div>

      <div className="bg-[#fff] p-6 rounded-[5px] overflow-y-auto">
        <div className="w-full bg-[#F9F9F9] rounded-[6px] p-3  mb-[25px]">
          <div className="grid grid-cols-5 text-[#8D8D8D] font-[500]">
            <div className="col-span-1">ID</div>
            <div className="col-span-1">Name</div>
            <div className="col-span-1">Email</div>
            <div className="col-span-1">Image</div>
            <div className="col-span-1">Specialization</div>
          </div>
        </div>

        {isLoadingGetDoctors ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {rows?.map((row, key) => (
              <Box
                key={row.id}
                sx={{
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
                  borderRadius: "5px",
                  borderLeft: "6px solid #4AB37E33",
                  marginBottom: "10px",
                  padding: "15px",
                }}
              >
                <div className="grid grid-cols-5 w-full items-center">
                  <div className="col-span-1">
                    <Typography>{key}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>{row?.username}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>{row?.email}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Avatar alt={row.name} src={row.image} />
                  </div>
                  <div className="col-span-1">
                    <Typography>{row?.specialty?.title}</Typography>
                  </div>
                </div>
              </Box>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
