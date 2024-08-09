"use client";
import React, { useState } from "react";
import { Title, Group, Box, rem, Image } from "@mantine/core";
import placeholder from "/public/images/movie-frame.png";

type MovieProductionProps = {
  src: string | null;
  title: string;
};

function MovieProduction({ src, title }: MovieProductionProps) {
  const [imageSrc, setImageSrc] = useState<string>(src || placeholder.src);

  const handleError = () => {
    setImageSrc(placeholder.src);
  };

  return (
    <Group gap="md" align="center">
      <Box
        pos="relative"
        style={{
          width: rem(40),
          height: rem(40),
          borderRadius: "50%",
          overflow: "hidden",
          border: "0.5px solid var(--mantine-color-gray-0)",
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          onError={handleError}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Box>

      <Title fz="sm" fw="700" lh="xs" ta={{ base: "center", sm: "left" }}>
        {title}
      </Title>
    </Group>
  );
}

export default MovieProduction;
