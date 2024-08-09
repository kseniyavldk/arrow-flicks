import React from "react";
import { Image } from "@mantine/core";
import styles from "./StarImage.module.css";

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
      <Image src={starImageSrc} alt={alt} className={styles.starImage} />
    </div>
  );
};

export default StarImage;
