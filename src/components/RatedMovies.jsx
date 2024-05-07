import React from "react";
import { Button, Text } from "@mantine/core";
import Image from "next/image";

const RatedMovies = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Image
          src="/images/loading.png"
          alt="Picture of the author"
          width={500}
          height={400}
        />
        <Text
          style={{
            marginTop: "20px",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          You haven't rated any films yet
        </Text>
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
      </div>
    </div>
  );
};

export default RatedMovies;
