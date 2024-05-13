import "@mantine/core/styles.css";
import { RootLayout } from "@/app/layout/root-layout";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function MyRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <RootLayout>{children}</RootLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
