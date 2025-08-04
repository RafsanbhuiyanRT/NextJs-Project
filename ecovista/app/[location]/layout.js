import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eco Vista",
  description: "One Place Dashboard for Eco Information",
};

export default function RootLayout({
  children,
  weather,
  aqi,
  wind,
  temperature,
}) {
  return (
    <div className="wrapper">
      {/* <div className="overlay"></div> */}
      <Image
        src="/background.png"
        height={700}
        width={1200}
        alt="background image"
        className="h-full w-full bg-img"
      />
      <main className="!z-50 w-full">
        <div className="container">
          <div className="grid grid-cols-12 gap-y-8 py-16 lg:gap-8 2xl:gap-20 2xl:py-20">
            {children} {weather} {aqi} {wind} {temperature}
          </div>
        </div>
      </main>
    </div>
  );
}
