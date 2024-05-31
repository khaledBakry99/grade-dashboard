import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import { store } from "./store/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
