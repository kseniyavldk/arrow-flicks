import React from "react";
import NavBar from "./NavBar";
import { AppShell } from "@mantine/core";

const Layout = ({ opened, children }) => {
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <NavBar />
      <AppShell.Main style={{ marginLeft: "60px", marginRight: "60px" }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
