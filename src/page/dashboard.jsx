import { Box, CircularProgress, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import "./style.css";
import { useEffect, useState } from "react";
import { useGetRecentQuery } from "../api/project/recent";
import { dateFormatter } from "../util/date-formatter/date-formatter";
import { useGetDashboardInfoQuery } from "../api/dashboard";
import SearchIcon from "@mui/icons-material/Search";

export const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetRecentQuery({ word: search });
  const { data: dashboardData } = useGetDashboardInfoQuery({});

  useEffect(() => {
    if (data?.data) {
      setRows(data.data);
    }
  }, [data]);

  return (
    <div className="mx-[35px]">
      <div className="dashboard-charts">
        <div className="grid grid-cols-4 gap-4 my-[40px]">
          <div className="col-span-1 rounded shadow-main-shadow h-[200px] pt-[40px] pb-[20px] bg-[#fff] px-4">
            <div className="w-[60px] h-[60px] rounded-full bg-[#065AD8] text-[#fff] flex items-center justify-center">
              <PeopleAltOutlinedIcon className="text-[#fff]" />
            </div>
            <p className="text-[18px] text-[#000000] font-[500] mt-2">
              Total Students
            </p>
            <p className="text-[24px] text-[#000000] font-[500]">
              {" "}
              {dashboardData?.data?.specialization_students}{" "}
            </p>
          </div>

          <div className="col-span-1 rounded shadow-main-shadow h-[200px] pt-[40px] pb-[20px] bg-[#fff] px-4">
            <div className="w-[60px] h-[60px] rounded-full bg-[#FFDA18] text-[#fff] flex items-center justify-center">
              <PersonOutlineOutlinedIcon className="text-[#fff]" />
            </div>

            <p className="text-[18px] text-[#000000] font-[500] mt-2">
              Featured Projects
            </p>
            <p className="text-[24px] text-[#000000] font-[500]">
              {dashboardData?.data?.featured_projects} /<sub> 300 </sub>
            </p>
          </div>

          <div className="col-span-1 rounded shadow-main-shadow h-[200px] pt-[40px] pb-[20px] bg-[#fff] px-4">
            <div className="w-[60px] h-[60px] rounded-full bg-[#854AB3] text-[#fff] flex items-center justify-center">
              <img src="/image/all-project.jpg" alt="" />
            </div>
            <p className="text-[18px] text-[#000000] font-[500] mt-2">
              All Projects
            </p>
            <p className="text-[24px] text-[#000000] font-[500]">
              {dashboardData?.data?.all_projects}
            </p>
          </div>

          <div className="col-span-1 rounded shadow-main-shadow h-[200px] pt-[40px] pb-[20px] bg-[#fff] px-4">
            <div className="w-[60px] h-[60px] rounded-full bg-[#4AB37E] text-[#fff] flex items-center justify-center">
              <AddTaskOutlinedIcon className="text-[#fff]" />
            </div>
            <p className="text-[18px] text-[#000000] font-[500] mt-2">
              Proposed Projects
            </p>
            <p className="text-[24px] text-[#000000] font-[500]">
              {dashboardData?.data?.proposed_projects} /<sub> 200 </sub>
            </p>
          </div>
        </div>
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
        <p className="text-[30px] text-[#000000] font-[400] mb-4">
          Recent Projects
        </p>
        <div className="w-full bg-[#F9F9F9] rounded-[6px] p-3  mb-[25px]">
          <div className="grid grid-cols-5 text-[#8D8D8D] font-[500]">
            <div className="col-span-1">ID</div>
            <div className="col-span-1">Student Name</div>
            <div className="col-span-1">Project Name</div>
            <div className="col-span-1">Specialty</div>
            <div className="col-span-1">Project Date</div>
          </div>
        </div>

        {isLoading ? (
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
                  <Typography>{key}</Typography>

                  <div className="col-span-1">
                    <Typography>{row.students[0]?.username}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>{row.title}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>{row.specialty.title}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>{dateFormatter(row?.created_at)}</Typography>
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
