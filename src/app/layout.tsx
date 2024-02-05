import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import ConvexClientProvider from "~/providers/convex-client-provider";
import { MabryPro } from "~/styles/fonts/local-fonts";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Hive",
  description: "Real-time collaboration whiteboard.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        MabryPro.variable,
        // Other Fonts
      )}
    >
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
