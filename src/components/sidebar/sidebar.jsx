/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "/public/image/Logo.png";
import Grade from "/public/image/grade.jpg";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

// eslint-disable-next-line react/prop-types
export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { pathname } = location;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getType = JSON.parse(localStorage.getItem("is_admin"));

  const sidebarData = getType
    ? [
        {
          url: "/Dashboard",
          text: "Dashboard",
        },
        {
          url: "/Projects-Management",
          text: "Projects management",
          isDropdown: true,
          icon: <KeyboardArrowDownOutlinedIcon />,
          dropdownItems: [
            {
              url: "/Projects-Management/All",
              text: "All Projects",
            },
            {
              url: "/Projects-Management/Proposed",
              text: "Proposed Projects",
            },
            {
              url: "/Projects-Management/Featured",
              text: "Featured Projects",
            },
          ],
        },
        {
          url: "/Projects-status",
          text: "Projects status",
        },
        {
          url: "/Discussion-sessions",
          text: "Discussion sessions",
        },
      ]
    : [
        {
          url: "/Doctors",
          text: "Doctors",
        },
        {
          url: "/Students",
          text: "Students",
        },
        {
          url: "/Specialization",
          text: "Specialization",
        },
      ];
  return (
    <React.Fragment>
      <div className="sidebar relative w-[300px] bg-white shadow-main-shadow">
        <div className="h-screen overflow-hidden dark:bg-firstDarkBgColor bg-sidebarLightBgColor flex justify-between flex-col">
          <div>
            <div className="relative">
              <div className="absolute top-[45%] left-0 translate-y-[-50%]">
                <img src={Logo} alt="" width={"100px"} height={"60px"} />
              </div>

              <div className="mt-[30px] ml-[100px]">
                <img
                  src={Grade}
                  alt=""
                  width={"140px"}
                  height={"60px"}
                  className="mt-1"
                />
              </div>
            </div>

            <ul className="mt-[50px]">
              {sidebarData.map((sideItem, key) => {
                if (sideItem.isDropdown) {
                  return (
                    <React.Fragment key={`${key}-${sideItem.text}`}>
                      <li
                        onClick={toggleDropdown}
                        className="transition hover:bg-main-color cursor-pointer dark:text-white hover:text-[#fff] px-[20px] flex items-center gap-2 py-[15px] mb-[0px] w-full"
                      >
                        <div className="w-full flex justify-between items-center">
                          <p>{sideItem.text}</p>
                          {sideItem?.icon ? (
                            <span> {sideItem?.icon} </span>
                          ) : null}
                        </div>
                        {/* Optionally add an icon here to show dropdown is expandable */}
                      </li>
                      {isDropdownOpen && (
                        <ul className="pl-[20px]">
                          {sideItem.dropdownItems.map(
                            (dropdownItem, dropdownKey) => (
                              <NavLink
                                to={dropdownItem.url}
                                key={`dropdown-${dropdownKey}-${dropdownItem.text}`}
                              >
                                <li
                                  onClick={onClose}
                                  className="transition hover:bg-main-color cursor-pointer dark:text-white hover:text-[#fff] px-[20px] flex items-center gap-2 py-[15px] mb-[0px] w-full"
                                >
                                  <p>{dropdownItem.text}</p>
                                </li>
                              </NavLink>
                            )
                          )}
                        </ul>
                      )}
                    </React.Fragment>
                  );
                } else {
                  return (
                    <NavLink to={sideItem.url} key={`${key}-${sideItem.text}`}>
                      <li
                        onClick={onClose}
                        className="transition hover:bg-main-color cursor-pointer dark:text-white hover:text-[#fff] px-[20px] flex items-center gap-2 py-[15px] mb-[0px] w-full"
                      >
                        <p>{sideItem.text}</p>
                      </li>
                    </NavLink>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed top-0 left-0 w-full h-full z-[998] bg-[rgba(0,0,0,0.2)]"
        ></div>
      )}
      <style>
        {`
           div.sidebar{
            position: fixed;
            top: 0;
            left: 0;
            width: 300px;
            height: 100%;
            z-index: 999;
            transition : 0.4s ease-in-out;
            }
           a.active {
            position : relative;
            background-color: #065AD80D;
            color: #065AD8;
            display: block;
            width: 100%;
            font-weight : 500;
            z-[3]
          }
          @media(max-width : 1024px){
            div.sidebar{
              position: fixed;
              top: 0;
              left: ${isOpen ? "0" : "-200%"};
              width: 300px;
              height: 100%;
              z-index: 999;
              transition : 0.4s ease-in-out;
            }
          }
        `}
      </style>
    </React.Fragment>
  );
};
