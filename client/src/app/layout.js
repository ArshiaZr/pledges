import "../styles/global.css";
import MenuBar from "@/Components/MenuBar";

export const metadata = {
  title: "Pledge",
  description: "Hackathon 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <MenuBar />
      </body>
    </html>
  );
}
