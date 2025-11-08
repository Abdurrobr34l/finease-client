import React from "react";
import Header from "../Component/Header";
import { Outlet } from "react-router";
import Footer from "../Component/Footer";

const RootLayout = () => {
  return (
    <>
      <Header></Header>

      <div>     {/*min-h-[calc(100vh-(92px+52px))] ----- 140px = header(92px) + footer(52px) */}
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </>
  );
};

export default RootLayout;
