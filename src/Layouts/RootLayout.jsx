import React from "react";
import Header from "../Component/Header";
import { Outlet } from "react-router";
import Footer from "../Component/Footer";

const RootLayout = () => {
  return (
    <>
      <Header></Header>

      <div className="min-h-[calc(100vh-(120px+456px))]">     {/*min-h-[calc(100vh-(120px+456px))] ----- 576px = header(120px) + footer(456px) */}
        <Outlet></Outlet>
      </div>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default RootLayout;
