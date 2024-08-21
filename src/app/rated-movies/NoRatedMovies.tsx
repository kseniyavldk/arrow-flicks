import React from "react";
import { Box, Text, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

const NoRatedMovies = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: isMobile ? "0vh" : "70vh",
        textAlign: "center",
      }}
    >
      <Image
        src="/images/loading.png"
        alt="Loading"
        width={isMobile ? 300 : 500}
        height={isMobile ? 240 : 400}
      />
      <Text
        style={{
          marginTop: "20px",
          fontSize: isMobile ? "16px" : "20px",
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
