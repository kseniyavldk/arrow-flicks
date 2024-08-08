"use client";
import React from "react";
import NextImage from "next/image";
import { Title, Image, Group, Box, rem } from "@mantine/core";
import placeholder from "/public/images/movie-frame.png";

type MovieProductionProps = {
  src: string;
  title: string;
};

function MovieProduction({ src, title }: MovieProductionProps) {
  return (
    <Group gap="md">
      <Box
        pos="relative"
        miw={rem(40)}
        mih={rem(40)}
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          border: "0.5px solid var(--mantine-color-gray-0)",
        }}
      >
        <Image
          component={NextImage}
          sizes="100%"
          src={src || placeholder.src}
          alt={title}
          fit="contain"
          fill
          priority
          style={{ objectFit: "contain" }}
        />
      </Box>

      <Title fz="sm" fw="700" lh="xs" ta={{ base: "center", sm: "left" }}>
        {title}
      </Title>
    </Group>
  );
}

export default MovieProduction;
