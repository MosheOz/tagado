import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Outlet />
    </div>
  );
}

export default Home;
