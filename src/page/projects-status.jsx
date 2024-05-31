import { Box, CircularProgress, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import Popup from "../components/popup";
import {
  useAddGradeMutation,
  useGetProjectStatusQuery,
} from "../api/project/status";
import { useAddToFeaturedMutation } from "../api/project/featured";

function daysUntilDeadline(deadline) {
  let deadlineDate = new Date(deadline);

  let currentDate = new Date();

  let differenceInMilliseconds = deadlineDate - currentDate;

  let differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  differenceInDays = Math.floor(differenceInDays);

  return differenceInDays;
}

export const ProjectsStatus = () => {
  const [status, setStatus] = useState("Delivered");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [statusNumber, setStatusNumber] = useState(3);

  const { data, isLoading } = useGetProjectStatusQuery({
    status: statusNumber,
    word: search,
  });
  const [addGrade] = useAddGradeMutation({});
  const [addToFeatured] = useAddToFeaturedMutation({});

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setRows(data.data);
    }
  }, [data]);

  const schema = yup.object().shape({
    Grade: yup
      .number()
      .typeError("Grade must be a number")
      .required("Grade is required")
      .min(0, "Grade must be at least 0")
      .max(100, "Grade must be at most 100"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [editData, setEditData] = useState(null);

  const onSubmit = (data) => {
    addGrade({ Grade: data?.Grade, id: editData?.id });
    setIsOpen(false);
  };

  const handleGetItemById = (id) => {
    const data = rows?.find((item) => item.id === id);
    setEditData(data);
    setIsOpen(true);
  };

  const handleClose = () => {
    setEditData(null);
    reset();
    setIsOpen(false);
  };

  return (
    <div className="mx-[35px]">
      <Popup
        isOpen={isOpen}
        handleClose={handleClose}
        title="Add Project Grade"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4">
              <label className="text-[#065AD8] text-[16px] font-[400] block mb-2">
                Project Grade
              </label>
              <input
                className="w-full rounded-[16px] bg-[#F1F1F1] py-4 px-4"
                type="text"
                {...register("Grade")}
              />
              {errors.Grade && (
                <p className="text-[red] text-[16px]">{errors.Grade.message}</p>
              )}
            </div>
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
        <p className="text-[#000000] text-[30px] font-[400]">Projects status</p>
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
            className="w-full text-[#8D8D8D] py-[10px] pl-[40px] font-[500 ]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* <button className="table-header-button">
          <AddIcon /> Add Project
        </button> */}
      </div>

      <div className="bg-[#fff] p-6 rounded-[5px] overflow-y-auto">
        <div className="select-status w-full mb-[50px]">
          <ul className="flex">
            <li
              className={`${
                status === "Delivered" ? "status-item-active" : "status-item"
              }`}
              onClick={() => {
                setStatus("Delivered");
                setStatusNumber(3);
              }}
            >
              Delivered
            </li>
            <li
              className={` ${
                status === "Un Delivered" ? "status-item-active" : "status-item"
              }`}
              onClick={() => {
                setStatus("Un Delivered");
                setStatusNumber(2);
              }}
            >
              Un Delivered
            </li>
            <li
              className={` ${
                status === "Evaluated" ? "status-item-active" : "status-item"
              }`}
              onClick={() => {
                setStatus("Evaluated");
                setStatusNumber(4);
              }}
            >
              Evaluated
            </li>
          </ul>
        </div>

        <div className="w-full bg-[#F9F9F9] rounded-[6px] p-3  mb-[25px]">
          <div className="grid grid-cols-5 text-[#8D8D8D] font-[500]">
            <div className="col-span-1"></div>
            <div className="col-span-1">ID</div>
            <div className="col-span-1">Project Name</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Action</div>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {rows.length == 0 ? (
              <div className="w-full h-[200px] flex items-center justify-center text-[#333333]">
                There are no data
              </div>
            ) : (
              <Box>
                {rows.map((row, key) => (
                  <Accordion
                    key={row.id}
                    sx={{
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
                      borderRadius: "5px",
                      borderLeft: "6px solid #4AB37E33",
                      marginBottom: "10px",
                    }}
                  >
                    <AccordionSummary>
                      <div className="grid grid-cols-5 w-full items-center">
                        <div className="col-span-1">
                          <ExpandMoreIcon color="blue" />
                        </div>
                        <div className="col-span-1">
                          <Typography>{key}</Typography>
                        </div>
                        <div className="col-span-1">
                          <Typography>{row.title}</Typography>
                        </div>
                        <div className="col-span-1">
                          {row.status === 3 ? (
                            <span className="bg-[rgb(74,179,126,0.1)] rounded-[50px] p-2 text-[#4AB37E] w-[200px]">
                              Delivered
                            </span>
                          ) : row.status === 2 ? (
                            <span className="bg-[rgb(235,64,64,0.1)] rounded-[50px] p-2 text-[#eb4040] w-[200px]">
                              Un Delivered
                            </span>
                          ) : row.status === 4 ? (
                            <span className="bg-[rgb(74,179,126,0.1)] rounded-[50px] p-2 text-[#4AB37E] w-[200px]">
                              Evaluated
                            </span>
                          ) : null}
                        </div>
                        <div className="col-span-1 flex gap-2">
                          {statusNumber === 3 ? (
                            <button
                              type="submit"
                              className="bg-[#065AD8] w-[140px] text-[14px] text-[#fff] font-[400] rounded-[10px] p-2"
                              onClick={() => handleGetItemById(row.id)}
                            >
                              Add Mark
                            </button>
                          ) : null}

                          {statusNumber === 4 ? (
                            <button
                              type="submit"
                              className="bg-[#065AD8] w-[140px] text-[14px] text-[#fff] font-[400] rounded-[10px] p-2"
                              onClick={() =>
                                addToFeatured({ id: row.id, status: true })
                              }
                            >
                              Add to featured
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="text-[20px] text-[#8D8D8D]">
                        Other Information :
                      </p>
                      <div className="grid grid-cols-4 gap-4">
                        {statusNumber === 4 ? null : (
                          <div className="col-span-2">
                            <label className="text-[#065AD8] text-[16px] font-[400] block mb-2">
                              Time Remaining
                            </label>
                            <input
                              className="w-full rounded-[16px] bg-[#F1F1F1] py-4 px-4"
                              type="text"
                              value={
                                row?.deadline
                                  ? daysUntilDeadline(row?.deadline)
                                  : ""
                              }
                              disabled
                            />
                          </div>
                        )}

                        {statusNumber === 4 ? null : (
                          <div className="col-span-2">
                            <label className="text-[#065AD8] text-[16px] font-[400] block mb-2">
                              Last Modified in
                            </label>
                            <input
                              className="w-full rounded-[16px] bg-[#F1F1F1] py-4 px-4"
                              type="date"
                              value={
                                row?.deadline
                                  ? row.deadline.substring(0, 10)
                                  : ""
                              }
                              disabled
                            />
                          </div>
                        )}

                        <div className="col-span-2">
                          <label className="text-[#065AD8] text-[16px] font-[400] block mb-2">
                            Project Grade
                          </label>
                          <input
                            className="w-full rounded-[16px] bg-[#F1F1F1] py-4 px-4"
                            type="text"
                            value={row?.grade ? row.grade.substring(0, 5) : ""}
                            disabled
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="text-[#065AD8] text-[16px] font-[400] block mb-2">
                            Project Members
                          </label>
                          <select className="w-full rounded-[16px] bg-[#F1F1F1] py-4 px-4">
                            <option disabled value="" selected>
                              Members
                            </option>
                            {row?.students?.map((item) => (
                              <option key={item.username} value={""}>
                                {item.username}
                              </option>
                            ))}
                          </select>
                        </div>

                        {statusNumber === 2 ? null : (
                          <div className="col-span-4 w-full mx-auto">
                            <label className="text-[#065AD8] text-[16px] font-[400] block mb-2">
                              Project File
                            </label>
                            {row?.brief ? (
                              <a
                                href={row?.brief}
                                target="_blank"
                                rel="noreferrer"
                                className="w-[200px]"
                              >
                                <img src="/image/pdf_2497547 2.png" alt="" />
                              </a>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}{" "}
          </>
        )}
      </div>
    </div>
  );
};
