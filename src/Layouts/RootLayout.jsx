import React from "react";
import Header from "../Component/Header";
import { Outlet } from "react-router";
import Footer from "../Component/Footer";
import Container from "../Component/Container";

const RootLayout = () => {
  return (
    <>
      <Header></Header>

      <main className="section-padding min-h-[calc(100vh-(120px+496px))] bg-base-200">  {/*min-h-[calc(100vh-(120px+496px))] ----- 576px = header(120px) + footer(456px) */}
        <Container className="flex flex-col gap-[120px]">
          <Outlet></Outlet>
        </Container>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default RootLayout;
