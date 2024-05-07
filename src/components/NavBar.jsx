"use client";
import React from "react";
import { AppShell, SegmentedControl } from "@mantine/core";
import { Link } from "react-router-dom";

const Navbar = ({ opened, setShowRatedMovies }) => {
  return (
    <AppShell.Navbar p="md" style={{ backgroundColor: "#F2EBF9" }}>
      <img src="logo.png" alt="Logo" style={{ width: 200 }} />
      <div style={{ marginTop: "70px" }} />
      <SegmentedControl
        orientation="vertical"
        fullWidth
        withItemsBorders={false}
        transitionDuration={500}
        color="#E5D5FA"
        style={{
          textAlign: "left",
          color: "black",
          backgroundColor: "#F2EBF9",
          fontSize: "50px",
        }}
        data={["Movies", "Rated movies"]}
        onChange={(value) => {
          if (value === "Rated movies") {
            setShowRatedMovies(true);
          } else {
            setShowRatedMovies(false);
          }
        }}
      />
    </AppShell.Navbar>
  );
};

export default Navbar;
