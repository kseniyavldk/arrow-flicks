import React from "react";
import { Box, Text, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const NoRatedMovies = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        textAlign: "center",
      }}
    >
      <Image src="/images/loading.png" alt="Loading" width={500} height={400} />
      <Text
        style={{
          marginTop: "20px",
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        You haven&apos;t rated any films yet
      </Text>
      <Link href="/" passHref>
        <Button
          style={{
            marginTop: "20px",
            background: "#9854F6",
            width: "122px",
            height: "40px",
            padding: "10px 20px",
            gap: "10px",
            borderRadius: "8px",
          }}
        >
          Find movies
        </Button>
      </Link>
    </Box>
  );
};

export default NoRatedMovies;
