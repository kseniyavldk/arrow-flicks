import { MantineProvider } from "@mantine/core";
import Layout from "./components/Layout.jsx";

const MyApp = ({ Component, pageProps }) => {
  return (
    <MantineProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
};
export default MyApp;
