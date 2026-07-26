import localFont from "next/font/local";

export const eudoxusSans = localFont({
  src: [
    {
      path: "../../public/fonts/eudoxus-sans/EudoxusSans-300.woff2",
      weight: "300",
      style: "normal"
    },
    {
      path: "../../public/fonts/eudoxus-sans/EudoxusSans-400.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/eudoxus-sans/EudoxusSans-500.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "../../public/fonts/eudoxus-sans/EudoxusSans-700.woff2",
      weight: "700",
      style: "normal"
    },
  ],
  display: 'swap',
  variable: '--font-eudoxusSans'
});