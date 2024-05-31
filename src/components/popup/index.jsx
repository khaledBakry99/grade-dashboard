import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Popup = ({ isOpen, title, children, handleClose }) => {
  return (
    isOpen && (
      <>
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[999999999] bg-[#fff] w-[600px] rounded-[16px] ">
          <div className="popup-header w-full border-b pb-4 flex items-center justify-between p-4">
            <h2>{title}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="body p-4">{children}</div>
        </div>
        <div
          className="fixed top-0 left-0 bg-[rgba(0,0,0,0.1)] w-full h-screen z-[999999998]"
          onClick={handleClose}
        ></div>
      </>
    )
  );
};

export default Popup;
