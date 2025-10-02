import React from "react";
import "./App.css";

import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import ServiceDetails from "./components/ServiceDetails";
import InterestButton from "./components/InterestButton";

function App() {
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

export default App;
