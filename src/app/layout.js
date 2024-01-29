import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ClientSideProviderTest from "@/components/clientSideProviderTest";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default:"Next App Title",
    template: "%s | Next.js 14"
  },
  description: "Next.js starter app desc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSideProviderTest>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ClientSideProviderTest>
      </body>
    </html>
  );
}
