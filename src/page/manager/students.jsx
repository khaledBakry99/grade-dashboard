import { useEffect, useState } from "react";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../style.css";
import { useGetAllStudentsQuery } from "../../api/users/users";

export const Students = () => {
  const [search, setSearch] = useState("");

  const [rows, setRows] = useState([]);

  const { data, isLoading } = useGetAllStudentsQuery({ word: search });

  useEffect(() => {
    // Check if there's data and it has a `data` property
    if (data?.data) {
      setRows(data.data); // Update the local state with the new data
    }
  }, [data]);

  return (
    <div className="mx-[35px]">
      <div className="header mt-[50px] mb-[30px]">
        <p className="text-[#000000] text-[30px] font-[400]">Students</p>
        <p className="text-[#8D8D8D] text-[24px] font-[400]">
          Students | Students List
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

        {isLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {" "}
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
                    <Avatar alt={row?.username} src={row?.image} />
                  </div>
                  <div className="col-span-1">
                    <Typography>{row?.specialty?.title}</Typography>
                  </div>
                </div>
              </Box>
            ))}{" "}
          </>
        )}
      </div>
    </div>
  );
};
