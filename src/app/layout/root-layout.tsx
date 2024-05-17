import NavBar from "@/app/components/NavBar";
import { Flex } from "@mantine/core";
import { PropsWithChildren } from "react";

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      justify="flex-start"
      align="flex-start"
      direction="row"
      h={"100%"}
      bg="#EAEBED"
    >
      <NavBar />
      {children}
    </Flex>
  );
};
