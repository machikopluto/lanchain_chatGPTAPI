import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const metadata = {
  title: "Langchain JavaScript",
  description: "Learn  LangChain and ChatGPT API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="flex flex-col pt-20 px-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
