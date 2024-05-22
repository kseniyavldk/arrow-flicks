import React from "react";
import { Image } from "@mantine/core";

interface StarProps {
  alt: string;
  src: string;
}

const StarImage: React.FC<StarProps> = ({ alt, src }) => {
  return (
    <div>
      <Image src="/images/star.svg" alt="Star img" />
    </div>
  );
};

export default StarImage;
