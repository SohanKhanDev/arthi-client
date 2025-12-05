import React from "react";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet } from "react-router";
import MyContainer from "../containers/MyContainer";

const RootLayout = () => {
  return (
    <div className="font-main">
      <Navbar />
      <MyContainer>
        <Outlet />
      </MyContainer>
      <Footer />
    </div>
  );
};

export default RootLayout;
