import React from "react";
import { Title, SimpleGrid } from "@mantine/core";
import FormSearch from "./FormSearch";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const HeaderRatedMovies: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2 }}
      spacing="md"
      w="100%"
      mb="40px"
      miw="sm"
    >
      <Title order={1}>Rated movies</Title>
      <FormSearch onSearch={onSearch} />
    </SimpleGrid>
  );
};

export default HeaderRatedMovies;
