import "./globals.css";
import Nav from "./components/Nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";
import { Playfair_Display, Lobster_Two } from "next/font/google";

//Define main font
const playfair = Playfair_Display({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
});
const lobster = Lobster_Two({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Fetch the user
  const session = await getServerSession(authOptions);
  //console.log(session) > this shows user in terminal
  return (
    <html className={`${playfair.variable} ${lobster.variable}`} lang="en">
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
