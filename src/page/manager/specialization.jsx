import { useEffect, useState } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../style.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Popup from "../../components/popup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  useGetAllSpecialtyQuery,
  useAddSpecialtyMutation,
  useDeleteSpecialtyMutation,
  useEditSpecialtyMutation,
} from "../../api/specialty/specialty";

export const Specialization = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [rows, setRows] = useState([]);

  const { data, isLoading } = useGetAllSpecialtyQuery({ word: search });
  const [addSpecialty] = useAddSpecialtyMutation({});
  const [deleteSpecialty] = useDeleteSpecialtyMutation({});
  const [editSpecialty] = useEditSpecialtyMutation({});

  useEffect(() => {
    // Check if there's data and it has a `data` property
    if (data?.data) {
      setRows(data.data); // Update the local state with the new data
    }
  }, [data]);

  const schema = yup.object().shape({
    specialization: yup.string().required("Specialization name is required"),
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
    if (editData) {
      editSpecialty({ title: data.specialization, id: editData?.id });
      setIsOpen(false);
    } else {
      addSpecialty({ title: data.specialization });
      setIsOpen(false);
    }
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
        title="Add Specialization"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="w-full  bg-[#F1F1F1] py-2 px-2 my-2 h-[60px]"
              type="text"
              placeholder="specialization Name"
              defaultValue={editData ? editData?.title : ""}
              {...register("specialization")}
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
              className="bg-[#E9E9E9] w-[160px] text-[#fff] font-[400] rounded-[10px] p-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#065AD8] w-[200px] text-[#fff] font-[400] rounded-[10px] p-2"
            >
              Add
            </button>
          </div>
        </form>
      </Popup>
      <div className="header mt-[50px] mb-[30px]">
        <p className="text-[#000000] text-[30px] font-[400]">Specializations</p>
        <p className="text-[#8D8D8D] text-[24px] font-[400]">
          Specializations | Specializations List
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
          <AddIcon /> Add Specialization
        </button>
      </div>

      <div className="bg-[#fff] p-6 rounded-[5px] overflow-y-auto">
        <div className="w-full bg-[#F9F9F9] rounded-[6px] p-3  mb-[25px]">
          <div className="grid grid-cols-3 text-[#8D8D8D] font-[500]">
            <div className="col-span-1">ID</div>
            <div className="col-span-1">Specialization Name</div>
            <div className="col-span-1">Actions</div>
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
                <div className="grid grid-cols-3 w-full items-center">
                  <div className="col-span-1">
                    <Typography>{key}</Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography>{row?.title}</Typography>
                  </div>
                  <div className="col-span-1 flex">
                    <IconButton onClick={() => handleGetItemById(row?.id)}>
                      <ModeEditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteSpecialty({ id: row?.id })}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
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
