import NavBar from "@/app/components/NavBar";
import { Flex } from "@mantine/core";
import { PropsWithChildren } from "react";

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      justify="flex-start"
      align="flex-start"
      direction={{ base: "column", sm: "row" }}
      h={"100%"}
      bg="#F5F5F6"
    >
      <NavBar />
      <Flex direction="column" w="100%">
        {children}
      </Flex>
    </Flex>
  );
};
