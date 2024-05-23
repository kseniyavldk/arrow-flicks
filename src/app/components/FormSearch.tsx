import React, { useState } from "react";
import { TextInput, rem, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface FormSearchProps {
  onSearch: (query: string) => void;
}

const FormSearch = ({ onSearch }: FormSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <form style={{ display: "flex", alignItems: "center" }}>
      <TextInput
        name="search"
        size="md"
        miw={rem(477)}
        radius="md"
        placeholder="Search movie title"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        leftSection={<IconSearch size={16} />}
        styles={{
          input: {
            paddingLeft: rem(40),
            paddingRight: rem(8),
            height: "auto",
          },
        }}
        rightSection={
          <Button
            miw="fit-content"
            bg="#9854F6"
            size="s"
            style={{
              height: rem(32),
              borderRadius: "8px",
              marginLeft: rem(4),
              padding: "0 20px",
              marginRight: rem(8),
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        }
        rightSectionWidth="auto"
        rightSectionProps={{
          style: {
            marginInlineEnd: "0",
          },
        }}
      />
    </form>
  );
};

export default FormSearch;
