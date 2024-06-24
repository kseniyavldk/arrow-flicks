import React, { useState } from "react";
import { TextInput, rem, Button, Box } from "@mantine/core";
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
    <form style={{ width: "100%" }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          gap: rem(8),
        }}
        className="form-search-container"
      >
        <TextInput
          name="search"
          size="md"
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
          style={{ flexGrow: 1, minWidth: rem(200) }}
          rightSectionWidth="auto"
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
        />
      </Box>

      <style jsx>{`
        @media (max-width: 768px) {
          .form-search-container {
            flex-direction: column;
            align-items: stretch;
          }

          .form-search-container .mantine-TextInput-root {
            width: 100%;
            margin-bottom: ${rem(8)};
          }

          .form-search-container .mantine-Button-root {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
};

export default FormSearch;
