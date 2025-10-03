import React from "react";
import "../styles/Service.css";

import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import ServiceDetails from "../components/ServiceDetails";
import InterestButton from "../components/InterestButton";

function Service() {
  return (
    <div className="App">
      <Header />
      <main className="content">
          <UserProfile />
          <ServiceDetails />
          <InterestButton />
      </main>
    </div>
  );
}

export default Service;