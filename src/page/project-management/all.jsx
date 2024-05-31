/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import "../style.css";
import Popup from "../../components/popup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddProjectMutation } from "../../api/project/add-project";
import { useGetProposedQuery } from "../../api/project/all";
import { dateFormatter } from "../../util/date-formatter/date-formatter";

export const All = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetProposedQuery({ word: search });

  useEffect(() => {
    if (data?.data) {
      setRows(data.data);
    }
  }, [data]);

  const [isOpen, setIsOpen] = useState(false);

  const schema = yup.object().shape({
    projectName: yup.string().required("Project name is required"),
    students: yup.string().required("Students number is required"),
    projectDeadline: yup.string().required("Project deadline is required"),
    description: yup.string().required("Description is required"),
    projectFile: yup.mixed().required("A file is required"),
    projectPlatform: yup.string().required("Project Platform is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [addProject] = useAddProjectMutation({});

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append text fields to formData

    formData.append("deadline", data.projectDeadline);
    formData.append("description", data.description);
    formData.append("title", data.projectName);
    formData.append("number_of_students", data.students);

    if (data.projectFile && data.projectFile.length > 0) {
      // Access the first file in the FileList
      const file = data.projectFile[0];
      formData.append("brief", file);
    }

    if (data.projectPlatform === "Web&mobile") {
      formData.append("is_mobile", true);
      formData.append("is_web", true);
    } else if (data.projectPlatform === "Mobile") {
      formData.append("is_mobile", true);
      formData.append("is_web", false);
    } else {
      formData.append("is_mobile", false);
      formData.append("is_web", true);
    }

    // Use your mutation hook to send the formData
    addProject(formData);
    reset();
    setIsOpen(false); // Assuming you're handling modal or popup visibility
  };
  const [editData, setEditData] = useState(null);
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
      <Popup isOpen={isOpen} handleClose={handleClose} title="Add New Project">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* <label className="text-[#8D8D8D] text-[14px] font-[400] block mb-2">
              Project name
            </label> */}
            <input
              className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              type="text"
              placeholder="Project Name"
              {...register("projectName")}
            />
            {errors.projectName && (
              <p className="text-[red] text-[16px]">
                {errors.projectName.message}
              </p>
            )}
          </div>

          <div>
            {/* <label className="text-[#8D8D8D] text-[14px] font-[400] block mb-2">
              Project name
            </label> */}
            <input
              className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              type="text"
              placeholder="Students number"
              {...register("students")}
            />
            {errors.students && (
              <p className="text-[red] text-[16px]">
                {errors.students.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("projectPlatform")}
              className="w-full bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
            >
              <option disabled value="" selected>
                Project Platform
              </option>
              <option value={"Mobile"}>Mobile</option>
              <option value={"Web"}>Web</option>
              <option value={"Web&mobile"}>Web & mobile</option>
            </select>

            {errors.projectPlatform && (
              <p className="text-[red] text-[16px]">
                {errors.projectPlatform.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              type="date"
              {...register("projectDeadline")}
            />
            {errors.projectDeadline && (
              <p className="text-[red] text-[16px]">
                {errors.projectDeadline.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <input
              className="w-full rounded-[16px] bg-[#F1F1F1] py-4 px-4"
              type="file"
              accept=".pdf"
              {...register("projectFile")}
            />
            {errors.projectFile && (
              <p className="text-[red] text-[16px]">
                {errors.projectFile.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              className="w-full rounded-[16px] bg-[#F1F1F1] py-2 px-2 my-2  resize-none h-[200px]"
              placeholder="Description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-[red] text-[16px]">
                {errors.description.message}
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
          Projects Management
        </p>
        <p className="text-[#8D8D8D] text-[24px] font-[400]">
          Projects Management | All Projects
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
            className="w-full text-[#8D8D8D] py-[10px] pl-[40px] font-[500 ]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="table-header-button" onClick={() => setIsOpen(true)}>
          <AddIcon /> Add Project
        </button>
      </div>

      <div className="bg-[#fff] p-6 rounded-[5px] overflow-y-auto">
        <div className="w-full bg-[#F9F9F9] rounded-[6px] p-3  mb-[25px]">
          <div className="grid grid-cols-5 text-[#8D8D8D] font-[500]">
            <div className="col-span-1"></div>
            <div className="col-span-1">ID</div>
            <div className="col-span-1">Project Name</div>
            <div className="col-span-1">Project Date</div>
            <div className="col-span-1">Status</div>
            {/* <div className="col-span-1">Action</div> */}
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <Box>
            {rows?.map((row, key) => (
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
                      <Typography>{row?.title}</Typography>
                    </div>
                    <div className="col-span-1">
                      <Typography>{dateFormatter(row?.created_at)}</Typography>
                    </div>
                    <div className="col-span-1">
                      <label
                        className="inline-flex items-center me-5 cursor-pointer"
                        key={row.id}
                      >
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={row.status === 1 ? true : false}
                          // onChange={() => toggleStatus(row.id)} // Add onChange handler to toggle status
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#fff]  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-[#4AB37E] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#4AB37E33]"></div>
                      </label>
                    </div>
                    {/* <div className="col-span-1 flex">
                    <IconButton
                      color="primary"
                      onClick={() => handleGetItemById(row.id)}
                    >
                      <ModeEditOutlinedIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </div> */}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="text-[20px] text-[#8D8D8D]">
                    Other Information :{" "}
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <label className="text-[#065AD8] text-[16px] font-[400] block mb-2">
                        Project Deadline
                      </label>
                      <input
                        className="w-full rounded-[16px] bg-[#F1F1F1] py-4 px-4"
                        type="date"
                        value={
                          row?.deadline ? row.deadline.substring(0, 10) : ""
                        }
                        disabled
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-[#065AD8] text-[16px] font-[400] block mb-2">
                        Supervisor Name
                      </label>
                      <input
                        className="w-full rounded-[16px] bg-[#F1F1F1] py-4 px-4"
                        type="text"
                        value={row?.supervisor?.username}
                        disabled
                      />
                    </div>

                    <div className="col-span-2">
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

                    <div className="col-span-2">
                      <label className="text-[#065AD8] text-[16px] font-[400] block mb-2">
                        Description
                      </label>
                      <textarea
                        disabled
                        className="w-full h-[200px] resize-none rounded-[16px] bg-[#F1F1F1] py-4 px-4"
                      >
                        {row?.description}
                      </textarea>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </div>
    </div>
  );
};
