import { createBrowserRouter } from "react-router-dom";
import { Root } from "./routes/root";
import { ErrorPage } from "./error-page/error-page";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Login } from "./page/login";
import { ProjectsManagement } from "./page/project-management/projects-management";
import { Dashboard } from "./page/dashboard";
import { ProjectsStatus } from "./page/projects-status";
import { DiscussionsSessions } from "./page/discussions-sessions";
import { All } from "./page/project-management/all";
import { Proposed } from "./page/project-management/proposed";
import { Featured } from "./page/project-management/featured";
import { Doctors } from "./page/manager/doctors";
import { Specialization } from "./page/manager/specialization";
import { Students } from "./page/manager/students";
import { ProfileSuper } from "./page/profile/profile-super";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Profile-super/:id",
        element: <ProfileSuper />,
      },
      {
        path: "/Projects-Management",
        element: <ProjectsManagement />,
        children: [
          {
            path: "/Projects-Management/All",
            element: <All />,
          },
          {
            path: "/Projects-Management/Proposed",
            element: <Proposed />,
          },
          {
            path: "/Projects-Management/Featured",
            element: <Featured />,
          },
        ],
      },
      {
        path: "/Projects-status",
        element: <ProjectsStatus />,
      },
      {
        path: "/Discussion-sessions",
        element: <DiscussionsSessions />,
      },
    ],
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Doctors",
        element: <Doctors />,
      },
      {
        path: "/Specialization",
        element: <Specialization />,
      },
      {
        path: "/Students",
        element: <Students />,
      },
    ],
  },
]);
