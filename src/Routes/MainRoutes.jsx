import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/Profile/Profile";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import AddTransaction from "../Pages/AddTransaction/AddTransaction";
import MyTransactions from "../Pages/MyTransactions/MyTransactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      //* -------------PRIVATE ROUTES-------------------
      {
        path: "/profile",
        element:
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
      },
      {
        path: "/update-profile",
        element:
          <PrivateRoutes>
            <UpdateProfile />
          </PrivateRoutes>
      },
      {
        path: "/add-transaction",
        element:
          <PrivateRoutes>
            <AddTransaction />
          </PrivateRoutes>
      },
      {
        path: "/my-transactions",
        element:
          <PrivateRoutes>
            <MyTransactions />
          </PrivateRoutes>
      },
      //* -------------PRIVATE ROUTES-------------------
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  },
]);

export default router;
