"use client";
import AddModal from "@/Components/AddModal";
import "../styles/global.css";
import MenuBar from "@/Components/MenuBar";
import { usePathname } from "next/navigation";
import AlertWrapper from "@/components/AlertWrapper";
import { AppStates } from "@/contexts/states";
import EditModal from "@/Components/EditModal";

// export const metadata = {
//   title: "Pledge",
//   description: "Hackathon 2024",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <AppStates>
      <html lang="en">
        <body>
          <AlertWrapper />
          {children}
          {pathname == "/login" || pathname == "/register" ? "" : <MenuBar />}
          {pathname == "/login" || pathname == "/register" ? "" : <AddModal />}
          {pathname == "/login" || pathname == "/register" ? "" : <EditModal />}
        </body>
      </html>
    </AppStates>
  );
}
