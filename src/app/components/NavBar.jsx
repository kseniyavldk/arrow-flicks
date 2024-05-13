import React, { useState } from "react";
import { AppShell, SegmentedControl, Flex, Button } from "@mantine/core";
import Link from "next/link";
/* import Link from "next/link";
import MovieGrid from "./MovieGrid.jsx";
import RatedMovies from "./RatedMovies.jsx"; */
import styles from "./navbar.module.css";

const Navbar = ({ opened }) => {
  const [activeButton, setActiveButton] = useState("movies");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <AppShell.Navbar className={styles.navbar}>
      <img src="logo.png" alt="Logo" className={styles.logo} />
      <div style={{ marginTop: "70px" }} />
      <Flex className={styles.buttonWrapper}>
        <Link href="/movies">
          <Button
            className={`${styles.button} ${
              activeButton === "movies" ? styles.active : styles.inactive
            }`}
            onClick={() => handleButtonClick("movies")}
          >
            Movies
          </Button>
        </Link>
        <Link href="/ratedMovies">
          <Button
            className={`${styles.button} ${
              activeButton === "rated" ? styles.active : styles.inactive
            }`}
            onClick={() => handleButtonClick("rated")}
          >
            Rated movies
          </Button>
        </Link>
      </Flex>
    </AppShell.Navbar>
  );
};

export default Navbar;
