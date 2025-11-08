import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />
  },
]);

export default router;
