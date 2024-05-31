import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useGetFeaturedQuery } from "../../api/project/featured";
import "../style.css";
import { dateFormatter } from "../../util/date-formatter/date-formatter";
export const Featured = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetFeaturedQuery({ word: search });

  useEffect(() => {
    if (data?.data) {
      setRows(data.data);
    }
  }, [data]);

  return (
    <div className="mx-[35px]">
      <div className="header mt-[50px] mb-[30px]">
        <p className="text-[#000000] text-[30px] font-[400]">
          Projects Management
        </p>
        <p className="text-[#8D8D8D] text-[24px] font-[400]">
          Projects Management | Featured Projects
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
            <div className="col-span-1">Specialty</div>
            <div className="col-span-1">Project Date</div>
            {/* <div className="col-span-1">Dead line</div> */}
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
                      <Typography>{row?.specialty?.title}</Typography>
                    </div>
                    <div className="col-span-1">
                      <Typography>{dateFormatter(row?.created_at)}</Typography>
                    </div>
                    {/* <div className="col-span-1">
                    <Typography>{dateFormatter(row?.deadline)}</Typography>
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
