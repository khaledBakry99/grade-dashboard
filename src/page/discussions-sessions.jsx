import { Box, CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../components/popup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import { useEffect, useState } from "react";
import { useAddSessionMutation, useGetAllSessionQuery } from "../api/session";

export const DiscussionsSessions = () => {
  const { data, isLoading } = useGetAllSessionQuery();
  const [addSession] = useAddSessionMutation({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Check if there's data and it has a `data` property
    if (data?.data) {
      setRows(data.data); // Update the local state with the new data
    }
  }, [data]);

  console.log({ rows });

  const [isOpen, setIsOpen] = useState(false);

  const schema = yup.object().shape({
    SessionDate: yup.string().required("Project name is required"),
    SessionTime: yup.string().required("Session Time is required"),
    Class: yup.string().required("Class is required"),
    SessionLink: yup.string().required("Session Link is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addSession({
      class_number: data?.Class,
      time: data?.SessionTime,
      date: data?.SessionDate,
      session_url: data?.SessionLink,
    });
    setIsOpen(false);
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <div className="mx-[35px]">
      <Popup isOpen={isOpen} handleClose={handleClose} title="Add New Session">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-[#8D8D8D] text-[14px] font-[400] block mb-2">
              Session Date
            </label>
            <input
              className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              type="date"
              {...register("SessionDate")}
            />
            {errors.SessionDate && (
              <p className="text-[red] text-[16px]">
                {errors.SessionDate.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              type="text"
              placeholder="Session time"
              {...register("SessionTime")}
            />
            {errors.SessionTime && (
              <p className="text-[red] text-[16px]">
                {errors.SessionTime.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              type="text"
              placeholder="Class number"
              {...register("Class")}
            />
            {errors.Class && (
              <p className="text-[red] text-[16px]">{errors.Class.message}</p>
            )}
          </div>

          <div>
            <input
              className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              type="text"
              placeholder="Session Link"
              {...register("SessionLink")}
            />
            {errors.SessionLink && (
              <p className="text-[red] text-[16px]">
                {errors.SessionLink.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-x-4 mt-[10px]">
            <button
              type="submit"
              className="bg-[#E9E9E9] w-[160px] text-[#fff] font-[400] rounded-[10px] p-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#065AD8] w-[160px] text-[#fff] font-[400] rounded-[10px] p-2"
            >
              Add
            </button>
          </div>
        </form>
      </Popup>
      <div className="header mt-[50px] mb-[30px]">
        <p className="text-[#000000] text-[30px] font-[400]">
          Discussion Sessions
        </p>
      </div>

      <div className="table-header flex items-center justify-between mb-[15px]">
        {/* <div className="relative search-filed w-[300px] rounded-[8px] overflow-hidden">
          <span className="absolute top-[50%] left-[10px] translate-y-[-50%] text-[#8D8D8D]">
            <SearchIcon className="text-[#8D8D8D]" />
          </span>
          <input
            type="text"
            name="search"
            placeholder="Search here.."
            className="w-full text-[#8D8D8D] py-[10px] pl-[40px] font-[500 ]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div> */}
        <button className="table-header-button" onClick={() => setIsOpen(true)}>
          <AddIcon /> New Sessions
        </button>
      </div>

      <div className="bg-[#fff] p-6 rounded-[5px] overflow-y-auto">
        <div className="w-full bg-[#F9F9F9] rounded-[6px] p-3  mb-[25px]">
          <div className="grid grid-cols-4 text-[#8D8D8D] font-[500]">
            <div className="col-span-1">Date</div>
            <div className="col-span-1">Time</div>
            <div className="col-span-1">Class</div>
            <div className="col-span-1">Session link</div>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {rows.map((row) => (
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
                <div className="grid grid-cols-4 w-full items-center">
                  <div className="col-span-1">
                    <Typography>{row.date}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>{row.time?.slice(0, 8)}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>{row.class_number}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>
                      <a href="" className="text-[#065AD8] underline-[#065AD8]">
                        {row.session_url}
                      </a>
                    </Typography>
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
