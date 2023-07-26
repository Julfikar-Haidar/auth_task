import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home page",
  description: "Task for Next JS Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="container">
            <Navbar />
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
