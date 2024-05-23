import React from "react";
import { Image } from "@mantine/core";

interface StarProps {
  alt: string;
  rated: boolean;
}

const StarImage: React.FC<StarProps> = ({ alt, rated }) => {
  const starImageSrc = rated
    ? "/images/star-background.svg"
    : "/images/star.svg";

  return (
    <div>
      <Image src={starImageSrc} alt={alt} />
    </div>
  );
};

export default StarImage;
