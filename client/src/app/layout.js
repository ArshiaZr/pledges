"use client";
import "../styles/global.css";
import MenuBar from "@/Components/MenuBar";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "Pledge",
//   description: "Hackathon 2024",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        {children}
        {pathname == "/login" || pathname == "/register" ? "" : <MenuBar />}
      </body>
    </html>
  );
}
