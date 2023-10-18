import { Bebas_Neue, IBM_Plex_Mono, Pixelify_Sans } from "next/font/google";

export const pixelify_sans = Pixelify_Sans({
  weight: ["400", "500","700"],
  subsets: ["latin"],
  display: "swap",
});

export const ibm_plex_mono = IBM_Plex_Mono({
    weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const bebas_neue = Bebas_Neue({
    weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
