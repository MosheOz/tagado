import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Home from "./home/home.component";
import Nav from "./nav/nav.component";
import Display from "./display/display.component";
import Create from "./create/create.component";

import "./App.css";

function App() {
  return (
    <Grid
      container
      direction="column"
      sx={{ alignItems: "center", height: "100vh" }}
    >
      <Grid item xs={10}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="display" element={<Display />} />
            <Route path="create" element={<Create />} />
          </Route>
        </Routes>
      </Grid>
      <Grid item xs={2}>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Nav />
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
