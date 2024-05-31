import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import SearchIcon from "@mui/icons-material/Search";
import "../style.css";
import {
  useAcceptOrRejectMutation,
  useGetProgressQuery,
} from "../../api/project/progress";
import { dateFormatter } from "../../util/date-formatter/date-formatter";
import Popup from "../../components/popup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import Popup from "../../components/popup";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export const Proposed = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  const [rows, setRows] = useState([]);

  const { data, isLoading } = useGetProgressQuery({ word: search });
  const [acceptOrReject] = useAcceptOrRejectMutation({});

  useEffect(() => {
    if (data?.data) {
      setRows(data.data);
    }
  }, [data]);

  const schema = yup.object().shape({
    deadline: yup.string().required("Specialization name is required"),
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
    acceptOrReject({
      deadline: data.deadline,
      id: editData?.id,
      is_accepted: isAccepted,
    });
    setIsOpen(false);
  };

  const [editData, setEditData] = useState(null);
  const handleGetItemById = (id) => {
    const data = rows?.find((item) => item.id === id);
    setIsOpen(true);
    setEditData(data);
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
        title={isAccepted ? "Accept" : "Reject"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              type="date"
              placeholder="specialization Name"
              {...register("deadline")}
            />
            {errors.specialization && (
              <p className="text-[red] text-[16px]">
                {errors.specialization.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-x-4 mt-[10px]">
            <button
              type="submit"
              className="bg-[#E9E9E9] w-[120px] text-[#fff] font-[400] rounded-[10px] p-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#065AD8] w-[120px] text-[#fff] font-[400] rounded-[10px] p-2"
            >
              Submit
            </button>
          </div>
        </form>
      </Popup>
      <div className="header mt-[50px] mb-[30px]">
        <p className="text-[#000000] text-[30px] font-[400]">
          Projects Management
        </p>
        <p className="text-[#8D8D8D] text-[24px] font-[400]">
          Projects Management | Proposed Projects
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
      </div>

      <div className="bg-[#fff] p-6 rounded-[5px] overflow-y-auto">
        <div className="w-full bg-[#F9F9F9] rounded-[6px] p-3  mb-[25px]">
          <div className="grid grid-cols-5 text-[#8D8D8D] font-[500]">
            <div className="col-span-1"></div>
            <div className="col-span-1">ID</div>
            <div className="col-span-1">Project Name</div>
            <div className="col-span-1">Project Date</div>
            <div className="col-span-1">Action</div>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
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
                    <div className="grid grid-cols-5 gap-8 w-full items-center">
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
                        <Typography>
                          {dateFormatter(row?.created_at)}
                        </Typography>
                      </div>

                      <div className="col-span-1 flex items-start justify-start gap-4 mt-4">
                        <button
                          type="submit"
                          className="bg-[#E9E9E9] w-[80px] text-[16px] text-[#fff] font-[400] rounded-[10px] p-2"
                          // onClick={() => {
                          //   handleGetItemById(row?.id), setIsAccepted(false);
                          // }}
                          onClick={() =>
                            acceptOrReject({
                              deadline: null,
                              id: row?.id,
                              is_accepted: false,
                            })
                          }
                        >
                          Reject
                        </button>

                        <button
                          type="submit"
                          className="bg-[#065AD8] w-[80px] text-[16px] text-[#fff] font-[400] rounded-[10px] p-2"
                          onClick={() => {
                            handleGetItemById(row?.id), setIsAccepted(true);
                          }}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p className="text-[20px] text-[#8D8D8D]">
                      Other Information :{" "}
                    </p>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-4">
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
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </>
        )}
      </div>
    </div>
  );
};
