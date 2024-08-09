import React from "react";
import { Image, Text } from "@mantine/core";

const EmptyResult = () => {
  const starImageSrc = "/images/no-results.png";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Image
        src={starImageSrc}
        alt="No results"
        style={{ width: "200px", height: "150px", objectFit: "contain" }}
      />
      <Text style={{ marginTop: "20px", fontSize: "20px", fontWeight: 600 }}>
        We don&apos;t have such movies, look for another one
      </Text>
    </div>
  );
};

export default EmptyResult;
