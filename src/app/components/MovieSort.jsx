import React from "react";
import { Select } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

function MovieSort() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Select
        style={{ width: "200px" }}
        rightSection={
          <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
        }
        label="Sort by"
        placeholder="Most popular"
        data={["Most popular", "Newest", "Oldest"]}
      />
    </div>
  );
}

export default MovieSort;
