"use client";
import { Flex, Group, NavLink, Image, Burger } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./navbar.module.css";

const NavBar = () => {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);

  const hrefMovies = pathname === "/";
  const hrefRated = pathname === "/rated-movies";

  return (
    <Flex className={styles.navbar} direction="column" p={24} m={0}>
      <Group className={styles.header}>
        <Image src="logo.png" alt="Logo" className={styles.logo} />
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          className={styles.burger}
        />
      </Group>
      <Flex
        direction={"column"}
        w="100%"
        pt={40}
        gap={10}
        className={opened ? styles.navLinksOpened : styles.navLinksClosed}
      >
        <NavLink
          component={Link}
          href={"/"}
          label={"Movies"}
          color="#9854F6"
          classNames={{ root: styles.navlink }}
          style={{ borderRadius: 8 }}
          active={hrefMovies}
        />
        <NavLink
          component={Link}
          href={"/rated-movies"}
          label={"Rated movies"}
          color="#9854F6"
          classNames={{ root: styles.navlink }}
          style={{ borderRadius: 8 }}
          active={hrefRated}
        />
      </Flex>
    </Flex>
  );
};

export default NavBar;
