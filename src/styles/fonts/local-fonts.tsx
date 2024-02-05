import localFont from "next/font/local";

const MabryPro = localFont({
  src: [
    {
      path: "mabry/MabryPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "mabry/MabryPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "mabry/MabryPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "mabry/MabryPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "mabry/MabryPro-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mabry",
  style: "normal",
});

export { MabryPro };
