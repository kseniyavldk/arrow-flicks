"use client";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Text,
  SegmentedControl,
  UnstyledButton,
  rem,
  Select,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

function Demo() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md" style={{ backgroundColor: "#F2EBF9" }}>
        <img src="logo.png" alt="Logo" style={{ width: 150 }} />
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
          }}
          data={["Movies", "Rated movies"]}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <div>
          <Text
            style={{
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: "44.8px",
              textAlign: "left",
            }}
          >
            Movies
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Select
            rightSection={
              <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
            }
            label="Genres"
            placeholder="Select genre"
            data={[]}
          />
          <Select
            rightSection={
              <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
            }
            label="Release year"
            placeholder="Select release year"
            data={[]}
          />
          <Select label="Ratings" placeholder="From" data={[]} />
          <Select placeholder="To" data={[]} />
          <UnstyledButton>Reset filters</UnstyledButton>
        </div>
        <div>
          <Select
            rightSection={
              <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
            }
            label="Sort by"
            data={["Most popular"]}
          />
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
export default Demo;
