import localFont from "next/font/local";

export const font_name = localFont({
  src: [
    {
      path: "../../public/fonts/<font_path>",
      weight: "<font_weight>",
      // weight: "200",
      style: "<font_style>"
      // style: "normal"
    },
    // .... and so on
  ],
  display: 'swap',
  variable: '--<font_name>'
});