import { createBrowserRouter } from "react-router-dom";
import LogIn from "../components/LogIn/Login";
import Home from "../components/Home/Home";
import NewJobFormular from "../components/NewJobFormular/NewJobFormular";
import JobsOverview from "../components/JobsOverview/JobsOverview";
import RegisterFormular from "../components/RegisterFormular/RegisterFormular";
import CompanyFormular from "../components/CompanyFormular/CompanyFormular";
import DetailJob from "../components/DetailJob/DetailJob";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn></LogIn>,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/newJobFormular",
    element: <NewJobFormular></NewJobFormular>,
  },
  {
    path: "/jobsOverview",
    element: <JobsOverview></JobsOverview>,
    children: [
      {
        path: ":itemID",
        element: <DetailJob></DetailJob>,
      },
    ],
  },
  {
    path: "/registrieren",
    element: <RegisterFormular></RegisterFormular>,
  },
  {
    path: "/newCompany/:itemID",
    element: <CompanyFormular></CompanyFormular>,
  },
  {},
]);
