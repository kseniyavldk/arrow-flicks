import NavBar from "@/app/components/NavBar/NavBar";
import { PropsWithChildren } from "react";
import styles from "./layout.module.css";

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
};
