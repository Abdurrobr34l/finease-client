import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/Profile/Profile";
import UpdateProfile from "../Pages/Profile/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
       {
        path: "/register",
        element: <Register/>,
      },
       {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>,
      },
    ]
  },
]);

export default router;
