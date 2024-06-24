"use client";
import React, { useEffect, useState } from "react";
import { Select, Flex } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { fetchMovieSortOptions } from "@/app/api/api";

interface MovieSortProps {
  defaultSortOption: string;
  onSortChange: (value: string) => void;
}

interface Option {
  value: string;
  label: string;
}

const MovieSort: React.FC<MovieSortProps> = ({
  defaultSortOption,
  onSortChange,
}) => {
  const [sortOptions, setSortOptions] = useState<Option[]>([]);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>(defaultSortOption);

  useEffect(() => {
    fetchMovieSortOptions()
      .then((options) => {
        setSortOptions(options);
        setSelectedSortOption(defaultSortOption);
      })
      .catch((error) =>
        console.error("Error fetching movie sort options:", error)
      );
  }, [defaultSortOption]);

  const handleSortChange = (value: string | null) => {
    if (value !== null) {
      setSelectedSortOption(value);
      onSortChange(value);
    }
  };

  return (
    <Flex justify="flex-end">
      <Select
        style={{ width: "200px" }}
        rightSection={
          <IconChevronDown style={{ width: "1rem", height: "1rem" }} />
        }
        size="md"
        radius="md"
        label="Sort by"
        placeholder="Most popular"
        data={sortOptions}
        value={selectedSortOption}
        onChange={handleSortChange}
      />
    </Flex>
  );
};

export default MovieSort;
