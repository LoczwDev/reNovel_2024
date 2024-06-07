import React from "react";
import MainLayout from "../../components/MainLayout";
// import Banner from "./container/banner";
import Articles from "./container/Articles";
import Banner from "./container/Banner";
import { Landing } from "./container/Landing";

const HomePage = () => {
  return (
    <MainLayout>
      <Landing />
      <Banner />
      <Articles />
    </MainLayout>
  );
};

export default HomePage;
